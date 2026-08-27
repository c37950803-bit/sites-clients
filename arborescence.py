#!/usr/bin/env python3
"""
=============================================================================
  EXPLORATEUR D'ARBORESCENCE
=============================================================================
  1. Selectionne un dossier parent via filedialog
  2. Detaille l'arborescence complete (dossiers + sous-dossiers + fichiers)
  3. Cree un fichier .txt au meme endroit que le dossier parent
=============================================================================
"""

import os
import sys
from pathlib import Path
from datetime import datetime

try:
    from tkinter import Tk, filedialog
except ImportError:
    print("tkinter non disponible")
    sys.exit(1)


def build_tree(folder: Path, prefix: str = "") -> list[str]:
    """Construit l'arborescence complete avec des tirets."""
    lines = []
    entries = sorted(folder.iterdir(), key=lambda e: (e.is_file(), e.name))

    dirs = [e for e in entries if e.is_dir()]
    files = [e for e in entries if e.is_file()]

    # Dabord les dossiers
    for i, d in enumerate(dirs):
        is_last_dir = (i == len(dirs) - 1) and len(files) == 0
        connector = "--- " if is_last_dir else "|-- "
        lines.append(f"{prefix}{connector}[DIR]  {d.name}/")
        extension = "    " if is_last_dir else "|   "
        lines.extend(build_tree(d, prefix + extension))

    # Ensuite les fichiers
    for i, f in enumerate(files):
        is_last = (i == len(files) - 1)
        connector = "--- " if is_last else "|-- "
        size = format_size(f.stat().st_size)
        lines.append(f"{prefix}{connector}{f.name}  ({size})")

    return lines


def format_size(size_bytes: int) -> str:
    if size_bytes < 1024:
        return f"{size_bytes} o"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} Ko"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} Mo"


def count_items(folder: Path) -> dict:
    """Compte les dossiers et fichiers."""
    dirs = 0
    files = 0
    total_size = 0
    for item in folder.rglob("*"):
        if item.is_dir():
            dirs += 1
        elif item.is_file():
            files += 1
            total_size += item.stat().st_size
    return {"dirs": dirs, "files": files, "size": total_size}


def main():
    # Selection du dossier
    root = Tk()
    root.withdraw()
    root.attributes("-topmost", True)

    folder = filedialog.askdirectory(
        title="Selectionnez le dossier a analyser",
        mustexist=True,
    )
    root.destroy()

    if not folder:
        print("Aucun dossier selectionne.")
        sys.exit(0)

    folder_path = Path(folder)
    abs_path = folder_path.resolve()

    print(f"Dossier selectionne : {abs_path}")
    print("Generation de l'arborescence...")

    # Compter les elements
    stats = count_items(folder_path)

    # Construire l'arborescence
    tree_lines = build_tree(folder_path)

    # Creer le fichier txt
    output_file = folder_path.parent / f"arborescence_{folder_path.name}.txt"

    with open(output_file, "w", encoding="utf-8") as f:
        f.write("=" * 80 + "\n")
        f.write("  ARBORESCENCE COMPLETE\n")
        f.write("=" * 80 + "\n")
        f.write(f"\n")
        f.write(f"  Dossier source : {abs_path}\n")
        f.write(f"  Date : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"\n")
        f.write(f"  Statistiques :\n")
        f.write(f"    - Dossiers : {stats['dirs']}\n")
        f.write(f"    - Fichiers : {stats['files']}\n")
        f.write(f"    - Taille   : {format_size(stats['size'])}\n")
        f.write(f"\n")
        f.write("=" * 80 + "\n")
        f.write("\n")
        f.write(f"  {folder_path.name}/\n")

        for line in tree_lines:
            f.write(f"  {line}\n")

        f.write("\n")
        f.write("=" * 80 + "\n")
        f.write(f"\n  Fichier genere le {datetime.now().strftime('%Y-%m-%d a %H:%M:%S')}\n")
        f.write("=" * 80 + "\n")

    print(f"Fichier cree : {output_file}")
    print(f"  - {stats['dirs']} dossier(s)")
    print(f"  - {stats['files']} fichier(s)")
    print(f"  - {format_size(stats['size'])} au total")


if __name__ == "__main__":
    main()
