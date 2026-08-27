// ==========================================================================
// FIREBASE-CONFIG.JS — Configuration Firebase (à compléter)
// ==========================================================================
// INSTRUCTIONS :
//   1. Crée un projet Firebase sur https://console.firebase.google.com
//   2. Active Firestore Database
//   3. Récupère ta config et remplace les valeurs ci-dessous
//   4. Ajoute les règles Firestore (voir firebase/TODO-FIREBASE.txt)
// ==========================================================================

// ── CONFIG FIREBASE (à remplacer par tes vraies clés) ──────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyD4b0DYPMFSawWSRfCIrdbk28rys0fEnU8",
  authDomain:        "sites-clients-admin.firebaseapp.com",
  projectId:         "sites-clients-admin",
  storageBucket:     "sites-clients-admin.firebasestorage.app",
  messagingSenderId: "939627448385",
  appId:             "1:939627448385:web:bf051e0b87357e6eb59ec0",
};

// ── NOM DE LA COLLECTION FIRESTORE ─────────────────────────────────────
// La collection qui contient les documents des sites
const SITES_COLLECTION = "sites";

// ── IDs DES 3 SITES (doivent matcher les noms de documents Firestore) ──
const SITE_IDS = [
  "green-innovators",
  "legetup",
  "pgc-cleaners",
];

// ── URLS DE REDIRECTION (erreur si site inactif) ───────────────────────
const ERROR_PAGE_URL = "error.html";

// ── IMPORTS FIREBASE (via CDN ES Module) ───────────────────────────────
// On utilise les imports ESM depuis le CDN de Firebase
let db = null;

async function initFirebase() {
  try {
    // Import dynamique des modules Firebase via CDN
    const { initializeApp } = await import(
      "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js"
    );
    const { getFirestore, collection, getDocs } = await import(
      "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
    );

    // Initialiser l'app
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    console.log("[Firebase] ✅ Connecté avec succès");
    return { db, collection, getDocs };
  } catch (error) {
    console.error("[Firebase] ❌ Erreur de connexion :", error);
    return null;
  }
}

// ── EXPORTS ────────────────────────────────────────────────────────────
export {
  firebaseConfig,
  SITES_COLLECTION,
  SITE_IDS,
  ERROR_PAGE_URL,
  initFirebase,
};
