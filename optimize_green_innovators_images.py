#!/usr/bin/env python3
"""
=============================================================================
OPTIMISATEUR D'IMAGES — GREEN INNOVATORS SARL (SITE 1 — SOLAIRE DOUALA)
=============================================================================
Cible : 15 images JPG dans public/assets/images/ et src/assets/images/
Poids total actuel : ~25 Mo (public) + ~14 Mo (src) = ~39 Mo

Fonctionnement :
  1. Sélection du dossier via tkinter filedialog
  2. Scan récursif de tous les fichiers .jpg/.jpeg/.png/.webp
  3. Optimisation agressive (compression Pillow + webp conversion optionnelle)
  4. Écriture dans un dossier temporaire puis remplacement atomique
  5. Suppression des anciens fichiers
  6. Rapport de stats dans la console

Dépendances : pip install Pillow
=============================================================================
"""

import os
import sys
import shutil
import tempfile
import time
from pathlib import Path

try:
    from tkinter import Tk, filedialog, messagebox
    HAS_TK = True
except ImportError:
    HAS_TK = False

try:
    from PIL import Image, ImageFilter
except ImportError:
    print("=" * 70)
    print("  ERREUR : Pillow n'est pas installé.")
    print("  Installez-le avec :  pip install Pillow")
    print("=" * 70)
    sys.exit(1)


# ─────────────────────────────────────────────────────────────────────────────
# CONFIGURATION — Optimisation agressive pour le Site 1
# ─────────────────────────────────────────────────────────────────────────────

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"}

# Qualité maximale pour JPG (1 = pire, 95 = très bonne, 60 = agressive)
JPG_QUALITY = 62
JPG_OPTIMIZE = True
JPG_PROGRESSIVE = True  # JPG progressif = meilleur taux de compression

# Conserver les métadonnées EXIF (taille) ou non (légèreté)
STRIP_METADATA = True

# Conversion WebP en option (plus léger que JPG pour le web)
CONVERT_TO_WEBP = False  # Mettre True pour convertir en WebP
WEBP_QUALITY = 65

# Seuil : si une image fait déjà moins de X Ko, on la skip
MIN_SIZE_KB = 30

# Noms de fichiers du Site 1 Green Innovators (15 images cibles)
SITE1_TARGET_FILES = {
    "green_innovators_logo_1787573609521.jpg",
    "green_powerplay_pro_1787537976494.jpg",
    "lantern_tripod_1787573559411.jpg",
    "powerplay_box_1787536335157.jpg",
    "solar_freezer_home_1787537937733.jpg",
    "solar_irrigation_farm_1787573622091.jpg",
    "solar_living_room_1787537950092.jpg",
    "solar_poultry_farm_1787536289253.jpg",
    "solar_pumping_1787536352715.jpg",
    "solar_tv_kit_1787536318623.jpg",
    "sunking_radio_kit_1787573570678.jpg",
    "sunking_system_box_1787537963370.jpg",
    "team_village_handover_1787573583207.jpg",
    "technician_forest_walk_1787573595900.jpg",
    "technician_roof_1787536303760.jpg",
}


# ─────────────────────────────────────────────────────────────────────────────
# FONCTIONS UTILITAIRES
# ─────────────────────────────────────────────────────────────────────────────

def format_size(size_bytes: int) -> str:
    """Convertit les octets en format lisible."""
    if size_bytes < 1024:
        return f"{size_bytes} o"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} Ko"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} Mo"


def format_pct(pct: float) -> str:
    """Formate un pourcentage avec couleur console."""
    if pct < 0:
        return f"↓ {abs(pct):.1f}%"
    elif pct > 0:
        return f"↑ +{pct:.1f}%"
    else:
        return "  0.0%"


def print_header():
    """Affiche l'en-tête du script."""
    print()
    print("=" * 72)
    print("  🔧  OPTIMISEUR D'IMAGES — GREEN INNOVATORS SARL (SITE 1)")
    print("  📍  Cible : public/assets/images/ + src/assets/images/")
    print("  🎯  15 images JPG — Optimisation agressive sans conversion")
    print("=" * 72)
    print()


def print_separator():
    print("-" * 72)


def scan_images(folder: Path) -> list[Path]:
    """Scanne récursivement tous les fichiers images supportés."""
    images = []
    for f in sorted(folder.rglob("*")):
        if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS:
            # Exclure les fichiers déjà optimisés (suffixe _optimized)
            if "_optimized" in f.stem:
                continue
            images.append(f)
    return images


def optimize_image(
    src_path: Path,
    tmp_dir: Path,
    stats: dict,
    convert_webp: bool = False,
) -> Path | None:
    """
    Optimise une image unique.
    Écrit le résultat dans tmp_dir avec le même nom de fichier relatif.
    Retourne le chemin du fichier optimisé ou None en cas d'erreur.
    """
    try:
        original_size = src_path.stat().st_size
        stats["total_before"] += original_size
        stats["files_counted"] += 1

        # Skip si déjà très petit
        if original_size < MIN_SIZE_KB * 1024:
            stats["skipped"] += 1
            stats["total_after"] += original_size
            print(f"  ⏭  {src_path.name:<50} {format_size(original_size):>10}  (skip, déjà optimisé)")
            return None

        # Ouvrir l'image
        img = Image.open(src_path)

        # Convertir en RGB si nécessaire (supprime alpha pour JPG)
        if img.mode in ("RGBA", "P", "LA"):
            background = Image.new("RGB", img.size, (255, 255, 255))
            if img.mode == "P":
                img = img.convert("RGBA")
            background.paste(img, mask=img.split()[-1] if "A" in img.mode else None)
            img = background
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # Supprimer les métadonnées EXIF si configuré
        if STRIP_METADATA:
            data = list(img.getdata())
            clean_img = Image.new(img.mode, img.size)
            clean_img.putdata(data)
            img = clean_img

        # Calculer le chemin de sortie (même nom, même dossier relatif)
        relative = src_path.relative_to(src_path.parents[len(src_path.parts) - len(src_path.parts)])
        # Utiliser juste le nom du fichier pour la simplicité
        if convert_webp:
            out_name = src_path.stem + ".webp"
        else:
            out_name = src_path.name

        out_path = tmp_dir / out_name

        # Sauvegarder avec optimisation agressive
        if convert_webp:
            img.save(
                out_path,
                "WEBP",
                quality=WEBP_QUALITY,
                method=6,  # Compression maximale WebP (0-6, 6 = lent mais petit)
            )
        else:
            img.save(
                out_path,
                "JPEG",
                quality=JPG_QUALITY,
                optimize=JPG_OPTIMIZE,
                progressive=JPG_PROGRESSIVE,
            )

        optimized_size = out_path.stat().st_size
        stats["total_after"] += optimized_size

        # Calculer la réduction
        if original_size > 0:
            reduction_pct = ((original_size - optimized_size) / original_size) * 100
        else:
            reduction_pct = 0.0

        stats["total_reduction"] += (original_size - optimized_size)
        stats["reduction_pct_avg"] = (
            stats["total_reduction"] / stats["total_before"] * 100
            if stats["total_before"] > 0 else 0
        )

        # Color coding
        if reduction_pct > 60:
            badge = "🟢"
        elif reduction_pct > 40:
            badge = "🟡"
        elif reduction_pct > 20:
            badge = "🟠"
        else:
            badge = "⚪"

        print(
            f"  {badge} {src_path.name:<50} "
            f"{format_size(original_size):>10} → {format_size(optimized_size):>10}  "
            f"({format_pct(-reduction_pct)})"
        )

        return out_path

    except Exception as e:
        stats["errors"] += 1
        print(f"  ❌ {src_path.name:<50}  ERREUR : {e}")
        return None


def replace_file(src_path: Path, optimized_path: Path) -> bool:
    """Remplace un fichier par sa version optimisée de façon atomique."""
    try:
        # Supprimer l'ancien fichier
        src_path.unlink(missing_ok=True)
        # Copier le fichier optimisé à la place
        shutil.copy2(optimized_path, src_path)
        return True
    except Exception as e:
        print(f"  ⚠️  Erreur de remplacement pour {src_path.name}: {e}")
        return False


def print_stats(stats: dict, start_time: float):
    """Affiche le rapport final des statistiques."""
    elapsed = time.time() - start_time

    print()
    print("=" * 72)
    print("  📊  RAPPORT D'OPTIMISATION")
    print("=" * 72)
    print()
    print(f"  Fichiers analysés    : {stats['files_counted']}")
    print(f"  Fichiers optimisés   : {stats['files_counted'] - stats['skipped'] - stats['errors']}")
    print(f"  Fichiers skippés     : {stats['skipped']} (déjà < {MIN_SIZE_KB} Ko)")
    print(f"  Erreurs              : {stats['errors']}")
    print()
    print_separator()
    print()
    print(f"  Poids AVANT          : {format_size(stats['total_before'])}")
    print(f"  Poids APRÈS          : {format_size(stats['total_after'])}")
    print(f"  Économie totale      : {format_size(stats['total_reduction'])}")
    print(f"  Réduction moyenne    : {stats['reduction_pct_avg']:.1f}%")
    print()
    print_separator()
    print()
    print(f"  Temps total          : {elapsed:.1f}s")
    print()
    print("=" * 72)
    print()


# ─────────────────────────────────────────────────────────────────────────────
# POINT D'ENTRÉE PRINCIPAL
# ─────────────────────────────────────────────────────────────────────────────

def main():
    print_header()

    # ── 1. Sélection du dossier via tkinter ──────────────────────────────
    if HAS_TK:
        root = Tk()
        root.withdraw()
        root.attributes("-topmost", True)

        print("  📂 Sélectionnez le dossier contenant les images du Site 1...")
        print("     (Typiquement : SITE 1-green-innovators-sarl---solaire-douala (1)/)")
        print()

        folder = filedialog.askdirectory(
            title="Sélectionnez le dossier du Site 1 Green Innovators",
            mustexist=True,
        )

        root.destroy()

        if not folder:
            print("  ❌ Aucun dossier sélectionné. Annulation.")
            sys.exit(0)
    else:
        # Fallback sans tkinter
        if len(sys.argv) > 1:
            folder = sys.argv[1]
        else:
            folder = input("  📂 Entrez le chemin du dossier du Site 1 : ").strip()

    folder_path = Path(folder)

    if not folder_path.exists():
        print(f"  ❌ Le dossier '{folder}' n'existe pas.")
        sys.exit(1)

    print(f"  ✅ Dossier sélectionné : {folder_path}")
    print()

    # ── 2. Scan des images ───────────────────────────────────────────────
    print("  🔍 Scan en cours...")
    images = scan_images(folder_path)

    if not images:
        print("  ❌ Aucune image trouvée dans ce dossier.")
        sys.exit(1)

    # Afficher les 15 cibles du Site 1
    target_found = []
    target_missing = []
    for img in images:
        if img.name in SITE1_TARGET_FILES:
            target_found.append(img)
        else:
            target_missing.append(img)

    print(f"  📸 {len(images)} image(s) trouvée(s) au total")
    print(f"  🎯 {len(target_found)}/15 images cibles du Site 1 Green Innovators")
    if target_missing:
        print(f"  ⚠️  {len(target_missing)} autre(s) image(s) trouvée(s) :")
        for f in target_missing:
            print(f"      → {f.name}")
    print()

    # ── 3. Confirmation ──────────────────────────────────────────────────
    print_separator()
    print("  ⚠️  ATTENTION : Cette opération va :")
    print("     1. Recompresser chaque image avec une qualité JPG=62 + progressif")
    print("     2. Supprimer les métadonnées EXIF")
    print("     3. Remplacer les anciens fichiers par les versions optimisées")
    print("     4. Les anciens fichiers seront DÉFINITIVEMENT supprimés")
    print()
    print(f"  📂 Dossier cible : {folder_path}")
    print(f"  🎯 {len(images)} image(s) à optimiser")
    print_separator()
    print()

    if HAS_TK:
        root2 = Tk()
        root2.withdraw()
        root2.attributes("-topmost", True)
        confirm = messagebox.askyesno(
            "Confirmation — Optimisation d'images",
            f"Optimiser {len(images)} image(s) dans :\n{folder_path}\n\n"
            "Les anciens fichiers seront supprimés.\nContinuer ?",
        )
        root2.destroy()
        if not confirm:
            print("  ❌ Opération annulée par l'utilisateur.")
            sys.exit(0)
    else:
        answer = input("  Tapez OUI pour confirmer : ").strip().upper()
        if answer != "OUI":
            print("  ❌ Opération annulée.")
            sys.exit(0)

    # ── 4. Optimisation ──────────────────────────────────────────────────
    print()
    print("  🚀 Début de l'optimisation...")
    print()
    print_separator()
    print(f"  {'FICHIER':<52} {'AVANT':>10}  {'APRÈS':>10}  {'RÉDUCTION':>10}")
    print_separator()

    start_time = time.time()
    stats = {
        "total_before": 0,
        "total_after": 0,
        "total_reduction": 0,
        "reduction_pct_avg": 0.0,
        "files_counted": 0,
        "skipped": 0,
        "errors": 0,
    }

    # Créer un dossier temporaire pour les fichiers optimisés
    with tempfile.TemporaryDirectory(prefix="gi_optimize_") as tmp_dir:
        tmp_path = Path(tmp_dir)

        # Optimiser chaque image
        optimized_files = {}
        for img_path in images:
            optimized = optimize_image(img_path, tmp_path, stats)
            if optimized:
                optimized_files[img_path] = optimized

        print_separator()
        print()

        # ── 5. Remplacement atomique ─────────────────────────────────────
        print("  🔄 Remplacement des fichiers originaux...")
        replaced = 0
        for original, optimized in optimized_files.items():
            if replace_file(original, optimized):
                replaced += 1

        print(f"  ✅ {replaced}/{len(optimized_files)} fichier(s) remplacé(s) avec succès")
        print()

    # ── 6. Stats finales ─────────────────────────────────────────────────
    print_stats(stats, start_time)

    print("  🎉 Optimisation terminée avec succès !")
    print("     Les images du Site 1 Green Innovators sont maintenant optimisées.")
    print()

    # ── 7. Vérification post-optimisation ────────────────────────────────
    print("  📋 Vérification post-optimisation :")
    remaining = scan_images(folder_path)
    total_remaining = sum(f.stat().st_size for f in remaining)
    print(f"     {len(remaining)} image(s) dans le dossier")
    print(f"     Poids total restant : {format_size(total_remaining)}")
    print()
    print("=" * 72)


if __name__ == "__main__":
    main()
