#!/usr/bin/env python3
"""
=============================================================================
  FIREBASE SETUP - Creation automatique des collections et documents
=============================================================================
  Ce script utilise la cle de service JSON pour :
  1. Se connecter a Firebase Admin SDK
  2. Creer la collection "sites"
  3. Creer les 3 documents (green-innovators, legetup, pgc-cleaners)
  4. Mettre a jour le fichier firebase-config.js

  Usage : python firebase_setup.py
=============================================================================
"""

import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Fix Windows encoding
if sys.platform == "win32":
    os.environ["PYTHONIOENCODING"] = "utf-8"
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

try:
    import firebase_admin
    from firebase_admin import credentials, firestore
except ImportError:
    print("=" * 70)
    print("  ERREUR : firebase-admin n'est pas installe.")
    print("  Installez-le avec :  pip install firebase-admin")
    print("=" * 70)
    sys.exit(1)

SCRIPT_DIR = Path(__file__).parent
SERVICE_ACCOUNT_FILE = None
FIREBASE_CONFIG_FILE = SCRIPT_DIR.parent / "admin" / "js" / "firebase-config.js"

SITES_DATA = [
    {
        "id": "green-innovators",
        "data": {
            "nom": "Green Innovators SARL",
            "url": "https://sites-clients-jt9w.vercel.app",
            "actif": True,
            "description": "Solutions solaires et energie photovoltaique - Douala",
            "dateModification": datetime.now().strftime("%Y-%m-%d"),
        },
    },
    {
        "id": "legetup",
        "data": {
            "nom": "LE GETUP - Cours Espagnol",
            "url": "https://sites-clients-6pfh.vercel.app",
            "actif": True,
            "description": "Cours de repetition et Espagnol - Yaounde",
            "dateModification": datetime.now().strftime("%Y-%m-%d"),
        },
    },
    {
        "id": "pgc-cleaners",
        "data": {
            "nom": "Professionnal Global Cleaners",
            "url": "https://sites-clients-bbl5.vercel.app",
            "actif": True,
            "description": "Nettoyage professionnel et demenagement - Yaounde Bonas",
            "dateModification": datetime.now().strftime("%Y-%m-%d"),
        },
    },
]


def find_service_account():
    global SERVICE_ACCOUNT_FILE
    json_files = list(SCRIPT_DIR.glob("*.json"))

    if not json_files:
        print("  [ERREUR] Aucun fichier JSON trouve dans firebase/")
        return False

    for f in json_files:
        try:
            with open(f, "r") as fp:
                data = json.load(fp)
            if data.get("type") == "service_account":
                SERVICE_ACCOUNT_FILE = f
                print("  [OK] Cle de service trouvee :", f.name)
                return True
        except (json.JSONDecodeError, KeyError):
            continue

    print("  [ERREUR] Aucun fichier de cle de service valide")
    return False


def init_firebase():
    try:
        cred = credentials.Certificate(str(SERVICE_ACCOUNT_FILE))
        firebase_admin.initialize_app(cred)
        print("  [OK] Firebase Admin SDK initialise")
        return True
    except Exception as e:
        print("  [ERREUR] Init Firebase :", e)
        return False


def create_sites_collection():
    db = firestore.client()
    col = db.collection("sites")

    print()
    print("  Creation de la collection 'sites'...")
    print()

    created = 0
    updated = 0

    for site in SITES_DATA:
        doc_id = site["id"]
        doc_data = site["data"]
        doc_ref = col.document(doc_id)
        doc = doc_ref.get()

        if doc.exists:
            doc_ref.set(doc_data)
            print("  [UPDATE]", doc_id, "-> Mis a jour")
            updated += 1
        else:
            doc_ref.set(doc_data)
            print("  [OK]", doc_id, "-> Cree")
            created += 1

    print()
    print("  Resultat :", created, "cree(s),", updated, "mis a jour")
    return True


def verify_collection():
    db = firestore.client()
    col = db.collection("sites")

    print()
    print("  Verification de la collection 'sites'...")
    print()

    docs = list(col.stream())

    if not docs:
        print("  [ERREUR] La collection est vide !")
        return False

    print(" ", len(docs), "document(s) trouve(s) :")
    print()

    for doc in docs:
        data = doc.to_dict()
        actif = "[ACTIF]" if data.get("actif") else "[INACTIF]"
        print("  -", doc.id, actif)
        print("    Nom :", data.get("nom", "N/A"))
        print("    URL :", data.get("url", "N/A"))
        print()

    return True


def update_firebase_config():
    if not FIREBASE_CONFIG_FILE.exists():
        print("  [ATTENTION] Fichier non trouve :", FIREBASE_CONFIG_FILE)
        return False

    with open(SERVICE_ACCOUNT_FILE, "r") as f:
        sa_data = json.load(f)

    project_id = sa_data.get("project_id", "")

    with open(FIREBASE_CONFIG_FILE, "r", encoding="utf-8") as f:
        config_content = f.read()

    print()
    print("  [ATTENTION] MISE A JOUR PARTIELLE DE firebase-config.js")
    print()
    print("  Le champ 'apiKey' doit etre recupere manuellement :")
    print("  -> Firebase Console -> Parametres -> General -> Vos applications")
    print("  -> Copier la valeur de 'apiKey'")
    print()

    replacements = {
        '"REMPLACER_PAR ton-projet.firebaseapp.com"': '"' + project_id + '.appspot.com"',
        '"REMPLACER_PAR ton-projet-id"': '"' + project_id + '"',
        '"REMPLACER_PAR ton-projet.appspot.com"': '"' + project_id + '.appspot.com"',
    }

    for old, new in replacements.items():
        if old in config_content:
            config_content = config_content.replace(old, new)

    with open(FIREBASE_CONFIG_FILE, "w", encoding="utf-8") as f:
        f.write(config_content)

    print("  [OK] projectId mis a jour :", project_id)
    print("  [OK] authDomain mis a jour :", project_id + ".appspot.com")
    print("  [OK] storageBucket mis a jour :", project_id + ".appspot.com")
    print()
    print("  Fichier modifie :", FIREBASE_CONFIG_FILE)
    return True


def activate_site(site_id, actif):
    """Active ou desactive un site."""
    db = firestore.client()
    doc_ref = db.collection("sites").document(site_id)
    doc = doc_ref.get()

    if not doc.exists:
        print("  [ERREUR] Site introuvable :", site_id)
        return False

    doc_ref.update({"actif": actif})
    status = "ACTIVE" if actif else "DESACTIVE"
    print("  [OK] Site", site_id, "->", status)
    return True


def show_status():
    """Affiche le statut de tous les sites."""
    db = firestore.client()
    docs = list(db.collection("sites").stream())

    print()
    print("  STATUT DES SITES :")
    print()

    for doc in docs:
        data = doc.to_dict()
        actif = data.get("actif", False)
        nom = data.get("nom", "N/A")
        url = data.get("url", "N/A")
        status = "[ACTIF]" if actif else "[INACTIF]"
        print("  -", doc.id)
        print("    Nom   :", nom)
        print("    URL   :", url)
        print("    Statut:", status)
        print()

    return True


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Firebase Setup")
    parser.add_argument("--site", help="ID du site a modifier")
    parser.add_argument("--actif", type=lambda x: x.lower() == "true", help="true ou false")
    parser.add_argument("--status", action="store_true", help="Afficher le statut")
    args = parser.parse_args()

    # Mode : afficher le statut
    if args.status:
        print()
        print("=" * 70)
        print("  STATUT DES SITES")
        print("=" * 70)
        if not find_service_account():
            sys.exit(1)
        if not init_firebase():
            sys.exit(1)
        show_status()
        sys.exit(0)

    # Mode : activer/desactiver un site
    if args.site and args.actif is not None:
        print()
        print("=" * 70)
        print("  MODIFICATION DE SITE")
        print("=" * 70)
        if not find_service_account():
            sys.exit(1)
        if not init_firebase():
            sys.exit(1)
        activate_site(args.site, args.actif)
        sys.exit(0)

    # Mode : setup initial
    print()
    print("=" * 70)
    print("  FIREBASE SETUP - Creation automatique")
    print("=" * 70)
    print()

    print("  ETAPE 1 : Recherche de la cle de service...")
    if not find_service_account():
        sys.exit(1)

    print()
    print("  ETAPE 2 : Connexion a Firebase...")
    if not init_firebase():
        sys.exit(1)

    print()
    print("  ETAPE 3 : Creation des donnees...")
    if not create_sites_collection():
        sys.exit(1)

    print()
    print("  ETAPE 4 : Verification...")
    if not verify_collection():
        sys.exit(1)

    print()
    print("  ETAPE 5 : Mise a jour de firebase-config.js...")
    update_firebase_config()

    print()
    print("=" * 70)
    print("  SETUP TERMINE AVEC SUCCES !")
    print("=" * 70)
    print()
    print("  Commandes utiles :")
    print("  python firebase_setup.py --status")
    print("  python firebase_setup.py --site pgc-cleaners --actif false")
    print("  python firebase_setup.py --site pgc-cleaners --actif true")
    print()


if __name__ == "__main__":
    main()
