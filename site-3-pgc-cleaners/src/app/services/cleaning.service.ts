/**
 * ============================================================================
 * SERVICE DE DONNÉES - PROFESSIONNAL GLOBAL CLEANERS (YAOUNDÉ BONAS)
 * ============================================================================
 * Ce service Angular fournit les informations statiques de l'entreprise :
 * - Coordonnées officielles (+237 654490978, Quartier Bonas, Yaoundé)
 * - Les 8 services spécialisés avec indexation éditoriale (01 à 08)
 * - Les quartiers d'intervention à Yaoundé
 * - Les méthodes de génération de messages pré-formatés pour WhatsApp
 * ============================================================================
 */

import { Injectable, signal } from '@angular/core';
import { CleaningService, YaoundeQuarter } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class CleaningServiceState {

  // --------------------------------------------------------------------------
  // 1. COORDONNÉES OFFICIELLES DU SIÈGE SOCIAL (YAOUNDÉ BONAS)
  // --------------------------------------------------------------------------
  readonly companyName = 'PROFESSIONNAL GLOBAL CLEANERS';
  readonly companyPhone = '+237 654490978';
  readonly companyRawPhone = '237654490978'; // Format sans espace pour les liens wa.me et tel:
  readonly companyLocation = 'Yaoundé, Quartier Bonas';
  readonly companyCountry = 'Cameroun';
  readonly openingHours = 'Lun - Sam : 07h30 - 18h30 | Dimanche : Sur rendez-vous';

  // --------------------------------------------------------------------------
  // 2. LES 8 SERVICES ÉDITORIALISÉS (SANS PRIX, SANS IMAGES, FORMAT VITRINE ÉPURÉE)
  // --------------------------------------------------------------------------
  readonly services = signal<CleaningService[]>([
    {
      numeral: '01',
      id: 'fin-chantier',
      title: 'Nettoyage des fins de chantiers',
      shortDescription: 'Remise en état complète après travaux : décapage des sols, vitrerie et dépoussiérage méticuleux.',
      fullDescription: 'Intervention lourde de remise à neuf post-construction ou rénovation pour villas, immeubles, bureaux et commerces. Élimination complète des résidus de plâtre, ciment, voiles de peinture et poussières incrustées.',
      category: 'nettoyage',
      categoryLabel: 'Remise en état',
      icon: 'bi-hammer',
      features: [
        'Dépoussiérage complet des hauteurs, plafonds, murs et plinthes',
        'Décapage mécanique et dégraissage en profondeur des sols carrelés',
        'Nettoyage et décapage minutieux des baies vitrées et châssis aluminium',
        'Désinfection et assainissement intégral des sanitaires et cuisines'
      ],
      equipmentUsed: [
        'Monobrosse industrielle haute vitesse',
        'Aspirateurs à poussières fines haute dépression',
        'Décapants professionnels neutres respectueux des matériaux'
      ],
      popular: true,
    },
    {
      numeral: '02',
      id: 'meubles',
      title: 'Nettoyage des meubles & canapés',
      shortDescription: 'Détachage, assainissement et rénovation des canapés en tissu, velours, microfibre et cuir.',
      fullDescription: 'Pressing d’ameublement à domicile à Yaoundé. Notre système d’injection-extraction élimine en profondeur les taches de boisson, nourriture, auréoles de transpiration et odeurs tout en ravivant la texture du textile et du cuir.',
      category: 'nettoyage',
      categoryLabel: 'Ameublement & Cuir',
      icon: 'bi-box-seam',
      features: [
        'Traitement ciblé pour canapés en tissu, velours, coton et cuir',
        'Élimination des taches tenaces, salissures incrustées et odeurs',
        'Assainissement antibactérien et neutralisation des acariens',
        'Soin protecteur nourrissant spécial pour salons en cuir'
      ],
      equipmentUsed: [
        'Injecteur-extracteur professionnel à chaud',
        'Brosses à poils souples pour fibres délicates',
        'Shampoings détachants hypoallergéniques'
      ],
      popular: true,
    },
    {
      numeral: '03',
      id: 'moquettes',
      title: 'Nettoyage des moquettes & tapis',
      shortDescription: 'Shampouinage en profondeur et ravivement des fibres pour bureaux, résidences et salons de réception.',
      fullDescription: 'Entretien en profondeur des revêtements textiles de sol et grands tapis d’ornement. Extraction de la poussière accumulée dans les trames et traitement des zones de passage piétonnier intense.',
      category: 'nettoyage',
      categoryLabel: 'Textiles & Moquettes',
      icon: 'bi-grid-3x3',
      features: [
        'Aspiration en profondeur des poussières et particules allergènes',
        'Shampouinage rotatif avec mousse active thermo-régulée',
        'Ravivement des teintes et de l’éclat naturel des fibres',
        'Désodorisation complète et séchage accéléré'
      ],
      equipmentUsed: [
        'Shampouineuse moquette industrielle',
        'Injecteur-extracteur haute pression textile',
        'Détergents thermo-actifs sans résidus gras'
      ],
      popular: false,
    },
    {
      numeral: '04',
      id: 'matelas',
      title: 'Nettoyage des lits et matelas',
      shortDescription: 'Désinfection thermique, élimination des acariens, des odeurs et des auréoles de transpiration.',
      fullDescription: 'Assainissement en profondeur de votre literie pour un environnement de sommeil parfaitement hygiénique. Traitement de tous formats de matelas (1 place, 2 places, King Size, lits d’enfants).',
      category: 'nettoyage',
      categoryLabel: 'Hygiène Literie',
      icon: 'bi-moon-stars',
      features: [
        'Traitement anti-acariens, punaises de lit et bactéries',
        'Détachage des auréoles d’humidité et de transpiration',
        'Désinfection respectant le garnissage et la mousse du matelas',
        'Parfumage subtil assainissant et temps de séchage optimisé'
      ],
      equipmentUsed: [
        'Extracteur haute dépression spécial literie',
        'Générateur de vapeur désinfectant',
        'Produits assainissants agréés sans solvants nocifs'
      ],
      popular: true,
    },
    {
      numeral: '05',
      id: 'baies-vitrees',
      title: 'Nettoyage des baies vitrées',
      shortDescription: 'Lavage intérieur et extérieur sans traces des grandes surfaces vitrées, baies coulissantes et vitrines.',
      fullDescription: 'Clarté, transparence et luminosité totale pour vos espaces de vie ou de travail. Nettoyage impeccable des vitres en hauteur, fenêtres coulissantes, balcons vitrés et rails en aluminium.',
      category: 'nettoyage',
      categoryLabel: 'Surfaces Vitrées',
      icon: 'bi-aspect-ratio',
      features: [
        'Finition sans aucune trace ni reflet résiduel',
        'Décrassage complet des rails, glissières et encadrements',
        'Nettoyage sécurisé des surfaces vitrées difficiles d’accès',
        'Traitement hydrofuge anti-poussière longue durée'
      ],
      equipmentUsed: [
        'Perches télescopiques en carbone',
        'Raclettes professionnelles en caoutchouc de précision',
        'Mouilleurs microfibres et solutions purifiées'
      ],
      popular: false,
    },
    {
      numeral: '06',
      id: 'vehicules',
      title: 'Nettoyage intérieur de véhicules',
      shortDescription: 'Pressing automobile haut de gamme à domicile : sièges, moquettes, tableau de bord et plafonnier.',
      fullDescription: 'Remise à neuf complète de l’habitacle de votre voiture à votre domicile ou à votre bureau à Yaoundé. Rénovation des textiles et cuirs, dépoussiérage des grilles de ventilation et nettoyage en profondeur des sols.',
      category: 'nettoyage',
      categoryLabel: 'Pressing Auto',
      icon: 'bi-car-front',
      features: [
        'Shampouinage en profondeur des sièges et moquettes de sol',
        'Nettoyage et rénovation satinée du tableau de bord et plastiques',
        'Dépoussiérage soigné du ciel de toit sans risque de décollement',
        'Désinfection des bouches de climatisation et coffre'
      ],
      equipmentUsed: [
        'Injecteur-extracteur portable haute performance',
        'Pistolet de nettoyage pulsé à air comprimé',
        'Rénovateurs plastiques mats anti-statiques'
      ],
      popular: true,
    },
    {
      numeral: '07',
      id: 'phytosanitaire',
      title: 'Traitement phytosanitaire (3D)',
      shortDescription: 'Désinsectisation (cafards, punaises, termites), dératisation et désinfection sanitaire certifiée.',
      fullDescription: 'Protection et hygiène sanitaire globale pour habitations, bureaux, restaurants et entrepôts à Yaoundé. Éradication durable de tous types de nuisibles avec des produits certifiés et respectueux de la santé.',
      category: 'traitement',
      categoryLabel: 'Hygiène 3D',
      icon: 'bi-shield-check',
      features: [
        'Désinsectisation ciblée : cafards, punaises de lit, termites, puces',
        'Dératisation avec postes d’appâtage sécurisés',
        'Désinfection antibactérienne et antivirale des volumes intérieurs',
        'Conseils préventifs anti-réinfestation et suivi méthodique'
      ],
      equipmentUsed: [
        'Nébulisateur ULV pour diffusion ultra-fine',
        'Pulvérisateurs professionnels à pression contrôlée',
        'Gels et appâts biocides homologués haute efficacité'
      ],
      popular: true,
    },
    {
      numeral: '08',
      id: 'demenagement',
      title: 'Déménagement et aménagement',
      shortDescription: 'Prise en charge intégrale : emballage soigné, protection, manutention, transport et installation.',
      fullDescription: 'Déménagement en toute sérénité à Yaoundé et ses environs. Nos équipes s’occupent de la protection de vos objets fragiles, du démontage/remontage de votre mobilier et de la mise en place dans vos nouveaux locaux.',
      category: 'demenagement',
      categoryLabel: 'Logistique & Confort',
      icon: 'bi-truck',
      features: [
        'Fourniture de cartons, papier bulle et housses de protection',
        'Démontage soigné et remontage méthodique de vos meubles',
        'Manutention professionnelle par des déménageurs qualifiés',
        'Transport sécurisé depuis Bonas vers tous les quartiers de Yaoundé'
      ],
      equipmentUsed: [
        'Véhicules de transport capitonnés et fermés',
        'Sangles et plateaux de manutention renforcés',
        'Couvertures et housses de calage professionnel'
      ],
      popular: true,
    },
  ]);

  // --------------------------------------------------------------------------
  // 3. QUARTIERS DE YAOUNDÉ DESSERVIS
  // --------------------------------------------------------------------------
  readonly yaoundeQuarters: YaoundeQuarter[] = [
    { name: 'Bonas (Siège PGC)', zone: 'Centre / Universitaire' },
    { name: 'Bastos', zone: 'Nord / Résidentiel & Ambassades' },
    { name: 'Omnisports', zone: 'Centre-Est' },
    { name: 'Mendong', zone: 'Sud-Ouest' },
    { name: 'Biyem-Assi', zone: 'Sud-Ouest' },
    { name: 'Nlongkak', zone: 'Centre-Nord' },
    { name: 'Ngoa-Ekellé', zone: 'Centre-Sud' },
    { name: 'Odza', zone: 'Sud / Axe Aéroport' },
    { name: 'Mvan', zone: 'Sud' },
    { name: 'Essos', zone: 'Est' },
    { name: 'Ngousso', zone: 'Nord-Est' },
    { name: 'Santa Barbara', zone: 'Nord' },
    { name: 'Tsinga', zone: 'Nord-Ouest' },
    { name: 'Mokolo', zone: 'Ouest' },
    { name: 'Simbock', zone: 'Périphérie Sud' },
    { name: 'Autre quartier de Yaoundé', zone: 'Yaoundé & environs' },
  ];

  // --------------------------------------------------------------------------
  // 4. GÉNÉRATEURS DE LIENS WHATSAPP ET TÉLÉPHONE
  // --------------------------------------------------------------------------

  /**
   * Construit le lien WhatsApp complet avec message pré-formaté et soigné.
   */
  getWhatsAppCustomUrl(clientName: string, quarter: string, selectedServicesNames: string[], messageNote?: string): string {
    const servicesList = selectedServicesNames.length > 0 
      ? selectedServicesNames.map(s => `• ${s}`).join('\n')
      : '• Demande de renseignements généraux sur vos prestations';

    const clientInfo = clientName.trim() ? clientName.trim() : 'Visiteur du site web';
    const quarterInfo = quarter.trim() ? quarter.trim() : 'Yaoundé';

    let text = `*PROFESSIONNAL GLOBAL CLEANERS (YAOUNDÉ BONAS)*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    text += `Bonjour, je vous contacte depuis votre vitrine officielle.\n\n`;
    text += `👤 *Nom / Client :* ${clientInfo}\n`;
    text += `📍 *Quartier à Yaoundé :* ${quarterInfo}\n\n`;
    text += `📋 *Service(s) sélectionné(s) :*\n${servicesList}\n`;

    if (messageNote && messageNote.trim()) {
      text += `\n📝 *Précisions :*\n${messageNote.trim()}\n`;
    }

    text += `\nMerci de m'indiquer vos disponibilités pour une intervention rapide.`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${this.companyRawPhone}?text=${encodedText}`;
  }

  /**
   * Lien rapide WhatsApp direct
   */
  getWhatsAppDirectUrl(customText?: string): string {
    const message = customText 
      ? encodeURIComponent(customText)
      : encodeURIComponent(`Bonjour PROFESSIONNAL GLOBAL CLEANERS, je souhaite solliciter vos services de nettoyage et déménagement à Yaoundé (Bonas).`);
    return `https://wa.me/${this.companyRawPhone}?text=${message}`;
  }

  /**
   * Lien pour déclencher un appel téléphonique direct sur mobile
   */
  getPhoneCallUrl(): string {
    return `tel:${this.companyRawPhone}`;
  }
}
