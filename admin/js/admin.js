// ==========================================================================
// ADMIN.JS — Logique du panel d'administration
// ==========================================================================
// Ce script :
//   1. Se connecte à Firebase Firestore
//   2. Lit la collection "sites" pour connaître l'état actif/inactif
//   3. Met à jour les badges et styles des cartes
//   4. Gère les clics : ouvre le site OU redirige vers error.html
// ==========================================================================

import {
  SITES_COLLECTION,
  SITE_IDS,
  ERROR_PAGE_URL,
  initFirebase,
} from "./firebase-config.js";

// ── ÉLÉMENTS DOM ───────────────────────────────────────────────────────
const statusDot  = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");

// ── DONNÉES DES SITES (mapping ID → DOM) ───────────────────────────────
const SITES = {
  "green-innovators": {
    cardId:     "card-green-innovators",
    statusId:   "status-green-innovators",
    btnId:      "btn-green-innovators",
    url:        "https://sites-clients-jt9w.vercel.app",
  },
  "legetup": {
    cardId:     "card-legetup",
    statusId:   "status-legetup",
    btnId:      "btn-legetup",
    url:        "https://sites-clients-6pfh.vercel.app",
  },
  "pgc-cleaners": {
    cardId:     "card-pgc-cleaners",
    statusId:   "status-pgc-cleaners",
    btnId:      "btn-pgc-cleaners",
    url:        "https://sites-clients-bbl5.vercel.app",
  },
};

// ── FONCTIONS ──────────────────────────────────────────────────────────

/**
 * Met à jour le badge d'un site dans le DOM
 */
function updateSiteStatus(siteId, isActif) {
  const site = SITES[siteId];
  if (!site) return;

  const card   = document.getElementById(site.cardId);
  const status = document.getElementById(site.statusId);
  const btn    = document.getElementById(site.btnId);

  if (!card || !status || !btn) return;

  // Badge
  if (isActif) {
    status.innerHTML = '<span class="badge badge--active">● Actif</span>';
    card.classList.remove("site-card--disabled");
    btn.href = site.url;
    btn.onclick = null;
  } else {
    status.innerHTML = '<span class="badge badge--inactive">● Inactif</span>';
    card.classList.add("site-card--disabled");
    // Au clic → redirige vers error.html
    btn.href = ERROR_PAGE_URL;
    btn.onclick = function (e) {
      e.preventDefault();
      window.location.href = ERROR_PAGE_URL;
    };
  }
}

/**
 * Charge les statuts depuis Firebase
 */
async function loadSiteStatuses(firebaseModules) {
  const { collection, getDocs } = firebaseModules;
  const { db } = await import("./firebase-config.js");

  // Si db n'est pas encore dispo, on le récupère
  if (!db) {
    console.warn("[Admin] Firebase non initialisé, mode hors-ligne");
    // Mode dégradé : tous les sites considérés comme actifs
    SITE_IDS.forEach((id) => updateSiteStatus(id, true));
    return;
  }

  try {
    const querySnapshot = await getDocs(collection(db, SITES_COLLECTION));

    // Map pour checker quels sites ont été trouvés
    const foundSites = new Set();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const siteId = doc.id;

      if (SITE_IDS.includes(siteId)) {
        foundSites.add(siteId);
        updateSiteStatus(siteId, data.actif === true);
        console.log(`[Admin] ${siteId} → ${data.actif ? "✅ actif" : "❌ inactif"}`);
      }
    });

    // Sites non trouvés dans Firestore → considérés inactifs
    SITE_IDS.forEach((id) => {
      if (!foundSites.has(id)) {
        updateSiteStatus(id, false);
        console.warn(`[Admin] ${id} → ⚠️ non trouvé dans Firestore (traité comme inactif)`);
      }
    });

  } catch (error) {
    console.error("[Admin] Erreur lecture Firestore :", error);
    // Mode dégradé : tous actifs
    SITE_IDS.forEach((id) => updateSiteStatus(id, true));
  }
}

/**
 * Initialise le statut de connexion Firebase
 */
function setFirebaseStatus(state) {
  if (state === "connected") {
    statusDot.classList.add("status-dot--connected");
    statusText.textContent = "Firebase connecté";
  } else if (state === "error") {
    statusDot.classList.add("status-dot--error");
    statusText.textContent = "Erreur Firebase";
  } else {
    statusText.textContent = "Connexion...";
  }
}

// ── INITIALISATION ─────────────────────────────────────────────────────
async function main() {
  console.log("[Admin] 🚀 Démarrage du panel d'administration");

  // Tous les sites en mode chargement par défaut
  SITE_IDS.forEach((id) => {
    const status = document.getElementById(SITES[id].statusId);
    if (status) {
      status.innerHTML = '<span class="badge badge--loading">● Chargement...</span>';
    }
  });

  // Connexion Firebase
  setFirebaseStatus("connecting");
  const firebaseModules = await initFirebase();

  if (firebaseModules) {
    setFirebaseStatus("connected");
    await loadSiteStatuses(firebaseModules);
  } else {
    setFirebaseStatus("error");
    console.warn("[Admin] ⚠️ Mode hors-ligne : tous les sites affichés comme actifs");
    // Mode dégradé : tous actifs
    SITE_IDS.forEach((id) => updateSiteStatus(id, true));
  }
}

// Lancer au chargement
main();
