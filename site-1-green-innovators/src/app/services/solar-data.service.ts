import { Injectable } from '@angular/core';
import { FieldGalleryItem, Product, SolarServiceItem, TariffItem, Testimonial } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SolarDataService {
  readonly companyInfo = {
    name: 'Green Innovators SARL',
    shortName: 'Green Innovators',
    foundedDate: '2025',
    city: 'Douala',
    country: 'Cameroun',
    zone: 'Douala, Littoral, Ouest & tout le Cameroun',
    phone1: '+237 674 04 75 92',
    phone2: '+237 655 42 48 33',
    phoneClean1: '237674047592',
    phoneClean2: '237655424833',
    whatsapp: '237674047592',
    ussdOrangeMoney: '#150*47*913957*Montant#',
    assistanceDirecte: '8288',
    email: 'ginnovators1@gmail.com',
    slogan: 'Votre énergie solaire, notre expertise, vos économies, notre priorité !',
    mission: 'Nous rendons l\'énergie solaire plus accessible, plus fiable, plus durable',
    subMission: 'Solutions solaires pour maisons, entreprises et agriculture',
    warranty: 'Garantie 1 an certifiée Vérasol • SAV & suivi technique permanent',
    address: 'Douala et ses environs, Cameroun (Livraisons & chantiers sur tout le territoire)',
    workingHours: 'Lundi - Samedi : 07h30 - 18h30 (Assistance WhatsApp 24/7)'
  };

  private readonly productsData: Product[] = [
    {
      id: 'green-lantern',
      name: 'Lanterne Solaire Sun King Nomade',
      subtitle: 'Lanterne Solaire sur Trépied • Panneau solaire déporté • Charge Téléphone',
      category: 'lanterne',
      categoryLabel: 'Lanterne & Mobilité',
      cashPrice: 25200,
      originalCashPrice: 28000,
      discountPercentage: 10,
      promoLabel: 'Promo -10% : 25 200 FCFA',
      financingMonths: 7,
      financingMonthlyPayment: 2000,
      financingDownPayment: 20000,
      financingTotalPrice: 34000,
      badge: 'Payable en 07 mois',
      tagline: 'Lanterne solaire autonome avec trépied métallique, panneau déporté et charge GSM',
      description: 'Solution d\'éclairage mobile robuste et économique. Livrée avec son trépied métallique modulable, son panneau solaire déporté et son port de charge pour téléphone. Conforme aux normes de qualité Vérasol avec 1 an de garantie.',
      features: [
        'Payable en 7 mensualités de 2 000 FCFA après acompte de 20 000 FCFA',
        'Prix Cash promo immédiat : 25 200 FCFA (au lieu de 28 000 FCFA)',
        'Trépied métallique inclinable et modulable (pose table, sol ou suspension)',
        'Panneau solaire photovoltaïque haute sensibilité avec long câble',
        'Port USB universel pour recharge de téléphones portables',
        'Jusqu\'à 24h d\'autonomie lumineuse sur charge complète'
      ],
      poweredDevices: ['Éclairage nomade', 'Recharge téléphone portable', 'Étude nocturne', 'Kiosque / Marché'],
      specs: {
        solarPanel: 'Panneau solaire polycristallin cadré alu avec câble renforcé',
        battery: 'Batterie Lithium-Ion haute longévité avec gestion de charge',
        lighting: 'Faisceau LED haute intensité avec plusieurs modes',
        warranty: '1 an de garantie officielle Vérasol',
        certification: 'Vérasol certifié / Lighting Global',
        autonomy: 'Jusqu\'à 24 heures d\'éclairage continu',
        extras: 'Trépied métallique, câble de raccordement et connecteur GSM'
      },
      idealFor: 'Études des enfants, éclairage chambre, sentiers, sécurité, séjours en zone rurale et petits commerces',
      image: '/assets/images/lantern_tripod_1787573559411.jpg',
      imageAlt: 'Lanterne Solaire Sun King sur trépied avec panneau',
      inStock: true,
      rating: 4.9,
      reviewCount: 58
    },
    {
      id: 'green-basic',
      name: 'Kit Éclairage Solaire Sun King (4 Lampes)',
      subtitle: 'Centrale Murale Jaune • 4 Tubes Néons LED • Panneau solaire • Charge 2 Téléphones',
      category: 'basic',
      categoryLabel: 'Kit Éclairage Maison & Poulailler',
      cashPrice: 100000,
      originalCashPrice: 111112,
      discountPercentage: 10,
      promoLabel: 'Promo -10% : 100 000 FCFA (Économie de 50 000 F)',
      financingMonths: 30,
      financingMonthlyPayment: 3350,
      financingDownPayment: 50000,
      financingTotalPrice: 150000,
      badge: 'Payable en 30 mois',
      tagline: 'Éclairez jusqu\'à 4 pièces ou votre poulailler sans facture Eneo',
      description: 'Le système solaire d\'éclairage de référence Sun King. Il comprend une centrale murale jaune, 4 tubes néons solaires LED avec interrupteurs muraux individuels, un panneau solaire performant et 2 ports de charge GSM. Idéal pour maisons familiales, boutiques et poulaillers.',
      features: [
        'Payable en 30 mensualités de 3 350 FCFA après acompte de 50 000 FCFA',
        'Prix Cash promo : 100 000 FCFA (Économie de 38 888 F sur prix de base)',
        '4 tubes néons solaires LED haute luminosité avec interrupteurs muraux',
        'Centrale de contrôle murale Sun King avec affichage d\'état de batterie',
        'Panneau solaire polycristallin résistant aux intempéries',
        'Double sortie USB pour recharge simultanée de 2 smartphones'
      ],
      poweredDevices: ['4 pièces illuminées', 'Poulailler & élevage', 'Recharge 2 smartphones', 'Radio'],
      specs: {
        solarPanel: 'Panneau solaire cadré aluminium haute efficacité',
        battery: 'Batterie Lithium LFP sécurisée longue durée de vie',
        lighting: '4 tubes néons LED solaires à large diffusion',
        warranty: '1 an de garantie officielle Vérasol',
        certification: 'Certifié Vérasol International',
        autonomy: '18h à 24h d\'éclairage quotidien autonome',
        extras: 'Câbles de 6 mètres avec interrupteurs muraux et fixations'
      },
      idealFor: 'Maisons 3 à 4 pièces, élevages avicoles/poulaillers, épiceries, salons de coiffure et ateliers',
      image: '/assets/images/solar_poultry_farm_1787536289253.jpg',
      imageAlt: 'Kit Éclairage Solaire Sun King 4 lampes néons et centrale murale',
      inStock: true,
      rating: 4.96,
      reviewCount: 94
    },
    {
      id: 'green-radio-pack',
      name: 'Kit Éclairage Solaire Sun King Home 60 + Radio',
      subtitle: 'Centrale Murale • 3 Suspensions Solaires • Radio FM/MP3 Solaire • Clavier',
      category: 'radio',
      categoryLabel: 'Kit Solaire & Information',
      cashPrice: 75000,
      originalCashPrice: 85000,
      discountPercentage: 12,
      promoLabel: 'Pack Radio & Éclairage',
      financingMonths: 15,
      financingMonthlyPayment: 4500,
      financingDownPayment: 25000,
      financingTotalPrice: 92500,
      badge: 'Éclairage + Radio',
      tagline: '3 points lumineux solaires, radio FM/MP3 avec haut-parleur et recharge GSM',
      description: 'Système solaire complet Sun King Home 60 combinant 3 suspensions lumineuses à interrupteurs individuels, un panneau solaire, une centrale de distribution jaune et un poste de radio solaire FM/MP3 pour rester informé et diverti.',
      features: [
        '3 suspensions lumineuses solaires jaunes avec interrupteurs séparés',
        'Poste radio FM/MP3 solaire intégré avec haut-parleur clair et touches numériques',
        'Centrale de gestion de batterie murale avec indicateurs LED',
        'Panneau solaire à recharge rapide et câble multi-téléphone',
        'Garantie 1 an Vérasol avec service après-vente dédié'
      ],
      poweredDevices: ['3 pièces éclairées', 'Radio FM / Musique MP3', 'Recharge téléphones'],
      specs: {
        solarPanel: 'Panneau solaire 6Wp à 10Wp cadré alu',
        battery: 'Batterie Lithium LiFePO4 intégrée',
        lighting: '3 lampes suspendues de 100 lumens chacune',
        warranty: '1 an de garantie Vérasol',
        certification: 'Norme Vérasol',
        autonomy: 'Jusqu\'à 20 heures d\'éclairage et de radio',
        extras: 'Radio solaire avec antenne, câbles et crochets'
      },
      idealFor: 'Habitations, kiosques, fermes et résidences de campagne',
      image: '/assets/images/sunking_radio_kit_1787573570678.jpg',
      imageAlt: 'Kit Solaire Sun King Home 60 avec suspensions et radio',
      inStock: true,
      rating: 4.92,
      reviewCount: 47
    },
    {
      id: 'green-premium',
      name: 'Kit Éclairage + Téléviseur Solaire HD 32"',
      subtitle: 'TV Solaire 32" HD • Centrale Sun King Home 500X • 4 Tubes Néons • Plafonnier PIR',
      category: 'premium',
      categoryLabel: 'Kit Solaire Confort & TV',
      cashPrice: 270000,
      originalCashPrice: 300000,
      discountPercentage: 10,
      promoLabel: 'Promo -10% : 270 000 FCFA (Économie de 80 000 F)',
      financingMonths: 35,
      financingMonthlyPayment: 5000,
      financingDownPayment: 175000,
      financingTotalPrice: 350000,
      badge: 'Payable en 35 mois',
      tagline: 'Télévision 32 pouces HD basse consommation et éclairage complet sans interruption',
      description: 'Le pack confort roi de Green Innovators. Il associe une télévision solaire 32 pouces Haute Définition, un panneau solaire 50W haute puissance, la centrale numérique Sun King Home 500X, 4 tubes néons solaires LED, une veilleuse à détecteur de mouvement PIR et une télécommande.',
      features: [
        'Payable en 35 mensualités de 5 000 FCFA après acompte de 175 000 FCFA',
        'Prix Cash promo : 270 000 FCFA (au lieu de 350 000 FCFA total échelonné)',
        'Téléviseur solaire HD 32 pouces à très basse consommation avec télécommande',
        'Centrale numérique Sun King Home 500X avec écran LCD de contrôle et clavier',
        '4 tubes néons solaires LED jaunes avec interrupteurs muraux indépendants',
        'Plafonnier / spot de sécurité rond jaune à détection de mouvement PIR',
        'Panneau solaire 50W haute performance pour recharge rapide par tout temps'
      ],
      poweredDevices: ['Télévision HD 32"', '4 pièces illuminées', 'Spot sécurité PIR', 'Recharge smartphones & tablettes'],
      specs: {
        solarPanel: 'Panneau photovoltaïque 50W monocristallin haute sensibilité',
        battery: 'Centrale d\'énergie Lithium LFP 154Wh haute capacité',
        lighting: '4 tubes néons LED + 1 plafonnier veilleuse PIR',
        warranty: '1 an de garantie certifiée Vérasol',
        certification: 'Certifié Vérasol Gold International',
        autonomy: 'TV 6 à 8h d\'affilée par jour + éclairage toute la nuit',
        extras: 'Télécommande infrarouge, câbles longue portée 6m et supports muraux'
      },
      idealFor: 'Salons familiaux, résidences, foyers ruraux et périurbains, auberges et salles de détente',
      image: '/assets/images/solar_tv_kit_1787536318623.jpg',
      imageAlt: 'Kit Solaire Sun King Home 500X avec Télévision 32 pouces HD',
      inStock: true,
      rating: 5.0,
      reviewCount: 112
    },
    {
      id: 'green-powerplay-pro',
      name: 'Générateur Solaire PowerPlay Pro 600W',
      subtitle: 'Centrale Portative 600W • Batterie 720Wh LiFePO4 • Prises 220V AC & USB',
      category: 'powerplay',
      categoryLabel: 'Générateur Solaire 220V',
      cashPrice: 371075,
      originalCashPrice: 412305,
      discountPercentage: 10,
      promoLabel: 'Promo -10% : 371 075 FCFA (au lieu de 412 305 F)',
      financingMonths: 20,
      financingMonthlyPayment: 15625,
      financingDownPayment: 275000,
      financingTotalPrice: 587500,
      badge: 'Alimente 6 Appareils',
      tagline: 'Alimente réfrigérateur, TV, ordinateur portable, ventilateur, téléphone et routeur Wi-Fi',
      description: 'Le générateur solaire tout-en-un révolutionnaire signé Sun King et Green Innovators. Avec sa puissance de 600W, son onde sinusoïdale pure (Pure Sine Wave) et sa batterie Lithium LiFePO4 720Wh, il remplace avantageusement les groupes électrogènes bruyants et polluants sans aucun coût de carburant.',
      features: [
        'Prix promo Cash Nouvel An : 371 075 FCFA (au lieu de 412 305 FCFA)',
        'Alimente simultanément 6 appareils clés : Réfrigérateur, Ventilateur, TV, Laptop, Téléphone, Routeur wifi',
        'Sorties 220V AC standards françaises + ports USB-C / USB-A rapides',
        'Onduleur onde pure sinus préservant l\'électronique fragile',
        'Batterie Lithium LiFePO4 ultra-sécurisée avec plus de 3000 cycles',
        'Assistance technique directe au numéro gratuit 8288 ou sur WhatsApp'
      ],
      poweredDevices: ['Réfrigérateur / Conservateur', 'Ventilateur de salon', 'Téléviseur', 'Ordinateur portable', 'Smartphone', 'Box Wi-Fi Internet'],
      specs: {
        solarPanel: 'Panneau solaire 190Wp poly/monocristallin à haut rendement',
        battery: 'Batterie Lithium LiFePO4 720Wh intégrée (3000+ cycles de vie)',
        lighting: 'Compatible kits d\'éclairage 12V et 220V',
        warranty: '1 an de garantie officielle avec SAV réactif à Douala',
        certification: 'Normes CE, ISO et Vérasol',
        autonomy: 'Autonomie 24h/24 en relais continu selon consommation',
        extras: 'Câbles de connexion solaires étanches et chargeur secteur secours'
      },
      idealFor: 'Bureaux, pharmacies, télétravail, villas, conservation de nourriture et commerces',
      image: '/assets/images/green_powerplay_pro_1787537976494.jpg',
      imageAlt: 'Générateur Solaire PowerPlay Pro jaune avec ses 6 appareils connectés',
      inStock: true,
      rating: 4.98,
      reviewCount: 76
    },
    {
      id: 'green-pompage',
      name: 'Pompage Solaire & Forages Agricoles',
      subtitle: 'Solutions de Pompage & d\'Irrigation pour Agriculteurs, Pisciculteurs et Habitations',
      category: 'pompage',
      categoryLabel: 'Agriculture & Pompage',
      cashPrice: 650000,
      financingMonths: 24,
      financingMonthlyPayment: 32000,
      financingDownPayment: 250000,
      financingTotalPrice: 1018000,
      badge: 'Vous avez l\'eau, nous avons l\'énergie',
      tagline: 'De l\'eau en abondance et sans carburant pour vos forages, puits et plantations',
      description: 'L\'offre d\'ingénierie photovoltaïque complète pour l\'eau de Green Innovators SARL. Schéma en 5 étapes : Source d\'eau -> Énergie solaire garantie -> Pompage solaire haute performance -> Stockage & Distribution en réservoir -> Production agricole et piscicole.',
      features: [
        'Zéro coût de carburant, zéro facture électrique, énergie 100% renouvelable et gratuite',
        'Étude, diagnostic de débit et dimensionnement sur mesure de votre système solaire',
        'Pompes solaires immergées ou de surface Brushless en acier inox haute longévité',
        'Adapté aux profondeurs de 30m à 120m avec débits ajustables selon les besoins',
        'Intègre notre politique d\'économie circulaire (collecte, valorisation, recyclage)',
        'Installation professionnelle et contrat de maintenance SAV sur tout le Cameroun'
      ],
      poweredDevices: ['Forage profond (30m à 120m)', 'Puits & rivières', 'Bassins piscicoles', 'Irrigation maraîchère', 'Habitations & châteaux d\'eau'],
      specs: {
        solarPanel: 'Champ solaire photovoltaïque calibré de 300W à 3000W+',
        battery: 'Fonctionnement direct MPPT au fil du soleil ou avec stockage',
        lighting: 'N/A',
        warranty: '1 an de garantie complète + suivi technique',
        certification: 'Équipements certifiés haute durabilité',
        autonomy: 'Pompage continu automatique de 8h à 17h chaque jour',
        extras: 'Capteurs niveau d\'eau, coffret parafoudre, disjoncteur et raccords'
      },
      idealFor: 'Agriculteurs (maraîchage, pépinières, bétail), pisciculteurs (bassins) et habitations',
      image: '/assets/images/solar_pumping_1787536352715.jpg',
      imageAlt: 'Système complet de pompage et irrigation solaire au Cameroun',
      inStock: true,
      rating: 4.97,
      reviewCount: 43
    }
  ];

  // 15 Exact Gallery Items extracted from the user's 15 uploaded photos & flyers
  private readonly fieldGalleryData: FieldGalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Flyer Officiel des Offres & Tarifs Spéciaux',
      caption: 'Offre promotionnelle avec tarifs cash et mensualités échelonnées pour Lanterne, Kit Éclairage, Kit TV et Générateur Solaire avec code USSD Orange Money.',
      category: 'flyer',
      categoryLabel: 'Flyer & Tarifs',
      location: 'Douala, Cameroun',
      image: '/assets/images/sunking_system_box_1787537963370.jpg',
      badge: 'Flyer 1 • Offre Complète',
      svgType: 'flyer-promo'
    },
    {
      id: 'gal-2',
      title: 'Flyer Solutions Pompage & Forage Solaire',
      caption: 'Schéma complet en 5 étapes pour agriculteurs, pisciculteurs et habitations. "Vous avez l\'eau. Nous avons l\'énergie pour la pompe."',
      category: 'flyer',
      categoryLabel: 'Flyer Pompage',
      location: 'Douala & Littoral',
      image: '/assets/images/solar_pumping_1787536352715.jpg',
      badge: 'Flyer 2 • Pompage',
      svgType: 'flyer-pumping'
    },
    {
      id: 'gal-3',
      title: 'Identité Officielle Green Innovators SARL',
      caption: 'Logo officiel GI combinant le soleil levant, la feuille verte d\'énergie propre et la cellule solaire photovoltaïque bleue.',
      category: 'flyer',
      categoryLabel: 'Identité de Marque',
      location: 'Siège Social Douala',
      image: '/assets/images/green_innovators_logo_1787573609521.jpg',
      badge: 'Logo Officiel',
      svgType: 'brand-logo'
    },
    {
      id: 'gal-4',
      title: 'Ingénierie & Déploiement Solaire Agricole',
      caption: 'Nos ingénieurs sur le terrain au milieu des champs photovoltaïques et réseaux d\'irrigation : "Nous rendons l\'énergie solaire plus accessible, plus fiable, plus durable".',
      category: 'terrain',
      categoryLabel: 'Équipe & Mission',
      location: 'Champs solaires Cameroun',
      image: '/assets/images/solar_irrigation_farm_1787573622091.jpg',
      badge: 'Terrain 1 • Ingénierie',
      svgType: 'team-field'
    },
    {
      id: 'gal-5',
      title: 'Point de Distribution & Déballage des Kits',
      caption: 'Stand officiel Green Innovators présentant les cartons Sun King Eplus, Home 500X avec téléviseur et générateur solaire PowerPlay Pro.',
      category: 'terrain',
      categoryLabel: 'Distribution & Logistique',
      location: 'Point Relais Douala',
      image: '/assets/images/powerplay_box_1787536335157.jpg',
      badge: 'Terrain 2 • Déballage',
      svgType: 'team-stand'
    },
    {
      id: 'gal-6',
      title: 'Remise des Kits Solaires aux Bénéficiaires',
      caption: 'Techniciens Green Innovators remettant en mains propres les kits Sun King Home 500X et lanternes solaires aux planteurs et familles dans les villages.',
      category: 'terrain',
      categoryLabel: 'Impact Social',
      location: 'Village rural, Littoral',
      image: '/assets/images/team_village_handover_1787573583207.jpg',
      badge: 'Terrain 3 • Remise Kit',
      svgType: 'team-handover'
    },
    {
      id: 'gal-7',
      title: 'Livraison du Dernier Kilomètre en Forêt',
      caption: 'Technicien en gilet de sécurité Green Innovators acheminant les kits solaires à pied sur les sentiers ruraux pour équiper les zones les plus isolées.',
      category: 'terrain',
      categoryLabel: 'Dernier Kilomètre',
      location: 'Sentier forestier, Ouest',
      image: '/assets/images/technician_forest_walk_1787573595900.jpg',
      badge: 'Terrain 4 • Livraison',
      svgType: 'team-walk'
    },
    {
      id: 'gal-8',
      title: 'Installation Professionnelle sur Toiture',
      caption: 'Technicien qualifié avec casque de sécurité et gilet haute visibilité validant la pose d\'un module solaire photovoltaïque sur toiture à Douala.',
      category: 'installation',
      categoryLabel: 'Installation Toiture',
      location: 'Toiture résidentielle, Douala',
      image: '/assets/images/technician_roof_1787536303760.jpg',
      badge: 'Terrain 5 • Pose Toiture',
      svgType: 'technician-roof'
    },
    {
      id: 'gal-9',
      title: 'Pack Sun King Home Plus (4 Tubes Néons)',
      caption: 'Système complet composé du panneau solaire cadré alu, du boîtier mural jaune et des 4 tubes néons solaires LED avec interrupteurs muraux.',
      category: 'produit',
      categoryLabel: 'Pack Produit',
      location: 'Certifié Vérasol',
      image: '/assets/images/solar_poultry_farm_1787536289253.jpg',
      badge: 'Produit 1 • Kit 4 Tubes',
      svgType: 'prod-4tubes'
    },
    {
      id: 'gal-10',
      title: 'Pack Sun King Home 60 + Radio FM/MP3',
      caption: 'Kit comprenant 3 suspensions lumineuses solaires rondes jaunes, panneau solaire, boîtier mural et radio solaire avec touches numériques.',
      category: 'produit',
      categoryLabel: 'Pack Produit',
      location: 'Certifié Vérasol',
      image: '/assets/images/sunking_radio_kit_1787573570678.jpg',
      badge: 'Produit 2 • Home 60 Radio',
      svgType: 'prod-home60'
    },
    {
      id: 'gal-11',
      title: 'Lanterne Solaire Sun King Pro sur Trépied',
      caption: 'Lanterne solaire autonome jaune avec trépied métallique modulable, panneau solaire déporté et câble de recharge téléphone portable.',
      category: 'produit',
      categoryLabel: 'Pack Produit',
      location: 'Certifié Vérasol',
      image: '/assets/images/lantern_tripod_1787573559411.jpg',
      badge: 'Produit 3 • Lanterne Trépied',
      svgType: 'prod-lantern'
    },
    {
      id: 'gal-12',
      title: 'Pack TV Solaire HD 32" Sun King Home 500X',
      caption: 'Ensemble complet avec téléviseur 32 pouces HD, télécommande, panneau solaire 50W, boîtier numérique 500X, 4 tubes et capteur de présence PIR.',
      category: 'produit',
      categoryLabel: 'Pack Produit',
      location: 'Certifié Vérasol',
      image: '/assets/images/solar_tv_kit_1787536318623.jpg',
      badge: 'Produit 4 • Pack TV 32"',
      svgType: 'prod-tv500x'
    },
    {
      id: 'gal-13',
      title: 'Lanterne Solaire Audio & Enceinte Mobile',
      caption: 'Lanterne jaune multifonctions sur trépied avec enceinte sonore intégrée, station radio/téléphone portable et panneau solaire compact.',
      category: 'produit',
      categoryLabel: 'Pack Produit',
      location: 'Certifié Vérasol',
      image: '/assets/images/solar_living_room_1787537950092.jpg',
      badge: 'Produit 5 • Lanterne Audio',
      svgType: 'prod-boom'
    },
    {
      id: 'gal-14',
      title: 'Infographie Générateur PowerPlay Pro (6 Appareils)',
      caption: 'Schéma des 6 appareils alimentés simultanément par le PowerPlay Pro : Réfrigérateur, Ventilateur, TV, Laptop, Téléphone et Routeur Wi-Fi.',
      category: 'flyer',
      categoryLabel: 'Infographie Générateur',
      location: 'Assistance 8288',
      image: '/assets/images/green_powerplay_pro_1787537976494.jpg',
      badge: 'Flyer 3 • 6 Appareils',
      svgType: 'flyer-6devices'
    },
    {
      id: 'gal-15',
      title: 'Faisceau 4 Tubes Néons LED Solaires & Capteur PIR',
      caption: 'Détail des 4 tubes néons solaires LED jaunes haute puissance avec leurs 4 interrupteurs muraux et la veilleuse de sécurité à détecteur PIR.',
      category: 'produit',
      categoryLabel: 'Détail Accessoires',
      location: 'Certifié Vérasol',
      image: '/assets/images/solar_freezer_home_1787537937733.jpg',
      badge: 'Produit 6 • Tubes & PIR',
      svgType: 'prod-tubes-detail'
    }
  ];

  private readonly tariffTableData: TariffItem[] = [
    {
      name: 'Lanterne Solaire Nomade',
      components: 'Lanterne jaune + Trépied métal + Panneau déporté + Charge GSM',
      cashPrice: 25200,
      downPayment: 20000,
      monthlyPayment: 2000,
      months: 7,
      tag: '07 Mois • Promo -10%'
    },
    {
      name: 'Kit Éclairage Solaire Sun King',
      components: 'Centrale murale + 4 Tubes néons LED + Panneau alu + Charge 2 tél.',
      cashPrice: 100000,
      downPayment: 50000,
      monthlyPayment: 3350,
      months: 30,
      tag: '30 Mois • Idéal Maison'
    },
    {
      name: 'Kit Éclairage + TV Solaire HD 32"',
      components: 'TV 32" HD + Centrale Home 500X + 4 Tubes + Capteur PIR + Panneau 50W',
      cashPrice: 270000,
      downPayment: 175000,
      monthlyPayment: 5000,
      months: 35,
      tag: '35 Mois • Pack TV Roi'
    },
    {
      name: 'Générateur PowerPlay Pro 600W',
      components: 'Centrale 600W / 720Wh LiFePO4 + 220V AC (Frigo, TV, PC, Ventilo, Wifi)',
      cashPrice: 371075,
      downPayment: 275000,
      monthlyPayment: 15625,
      months: 20,
      tag: '6 Appareils 220V'
    },
    {
      name: 'Centrale PowerHub 3.3kW / 5kWh',
      components: 'Onduleur 3.3kW + Batterie 5kWh Lithium + Champ solaire 1800Wp',
      cashPrice: 1095000,
      downPayment: 1095000,
      monthlyPayment: 25250,
      months: 20,
      tag: 'Usage Pro & PME'
    }
  ];

  private readonly servicesData: SolarServiceItem[] = [
    {
      id: 'pompage-irrigation',
      title: 'Pompage Solaire & Forages (Agriculteurs, Pisciculteurs & Habitations)',
      shortDesc: 'Schéma 5 étapes : Source d\'eau -> Énergie Solaire -> Pompe Solaire -> Réservoir -> Votre Production.',
      fullDesc: 'Installation de pompes solaires immergées et de surface pour forages de 30m à 120m, irrigation goutte-à-goutte, abreuvement du bétail, alimentation des bassins piscicoles et adduction d\'eau pour habitations. Zéro carburant, autonomie totale.',
      iconName: 'water_drop',
      targetAudience: [
        'Agriculteurs (irrigation, maraîchage, pépinières, bétail)',
        'Pisciculteurs (alimentation et renouvellement bassins)',
        'Habitations & Châteaux d\'eau'
      ],
      advantages: [
        'Énergie 100% gratuite et renouvelable',
        'Réduit vos coûts : zéro carburant, zéro facture élevée',
        'Autonomie et sécurité de votre activité',
        '100% garanti et certifié haute durabilité',
        'Intègre l\'économie circulaire et le recyclage des équipements'
      ],
      steps: [
        '1. Étude et diagnostic de votre besoin et débit',
        '2. Dimensionnement de votre système solaire et pompe',
        '3. Fourniture de matériel certifié haute qualité',
        '4. Installation professionnelle et raccordement',
        '5. Service après-vente et maintenance'
      ],
      badge: 'Vous avez l\'eau, nous avons l\'énergie',
      image: '/assets/images/solar_pumping_1787536352715.jpg'
    },
    {
      id: 'kits-domestiques',
      title: 'Kits Solaires Éclairage & Télévision 32" HD',
      shortDesc: 'Paiement échelonné sur 7 à 35 mois avec acompte réduit à la pose.',
      fullDesc: 'Installation de systèmes solaires autonomes certifiés Vérasol (Lanterne, Sun King Home 4 tubes, Sun King Home 500X avec TV 32 pouces HD). Pose immédiate à Douala et expéditions dans toutes les régions.',
      iconName: 'lightbulb',
      targetAudience: ['Ménages & familles', 'Commerces & boutiques', 'Salons de coiffure', 'Étudiants & kiosques'],
      advantages: [
        'Élimination immédiate des pannes de courant Eneo',
        'Matériel certifié 1 an Vérasol avec SAV direct',
        'Paiement étalé possible sur 7, 30 ou 35 mois',
        'Pose rapide en moins de 24h à Douala'
      ],
      steps: ['Choix du kit adapté', 'Validation par WhatsApp ou téléphone', 'Livraison et pose sur site', 'Remise du certificat de garantie'],
      badge: 'Garantie 1 An Vérasol',
      image: '/assets/images/solar_tv_kit_1787536318623.jpg'
    },
    {
      id: 'generateurs-powerplay',
      title: 'Générateurs Solaires PowerPlay Pro 600W & Centrales',
      shortDesc: 'Alimente simultanément réfrigérateur, ventilateur, TV, PC portable, téléphone et Wi-Fi.',
      fullDesc: 'Centrales solaires avec batteries Lithium LiFePO4 et onduleurs pur sinus 220V pour alimenter l\'électroménager, les bureaux, les cliniques, les superettes et les congélateurs sans bruit ni carburant.',
      iconName: 'power',
      targetAudience: ['Bureaux & entreprises', 'Cliniques & pharmacies', 'Poissonnies & restaurants', 'Villas de standing'],
      advantages: [
        'Alimentation 220V directe pour réfrigérateur, ordinateurs et box Wi-Fi',
        'Technologie Lithium LiFePO4 (3000+ cycles de vie)',
        'Onde sinusoïdale pure sécurisant vos appareils sensibles',
        'Fonctionnement 100% silencieux sans émission polluante'
      ],
      steps: ['Bilan de puissance des équipements', 'Calibrage de la capacité batterie et panneaux', 'Pose et raccordement au tableau', 'Assistance technique 8288'],
      badge: 'Alimente 6 Appareils',
      image: '/assets/images/green_powerplay_pro_1787537976494.jpg'
    },
    {
      id: 'poulaillers-fermes',
      title: 'Éclairage Solaire pour Fermes & Poulaillers',
      shortDesc: 'Éclairage continu 24/24 pour élevages avicoles, porcins et hangars.',
      fullDesc: 'Kits d\'éclairage solaire renforcés Sun King pour poulaillers assurant un cycle lumineux continu pour la ponte et la croissance des volailles, sans coupure et avec zéro dépense de carburant.',
      iconName: 'agriculture',
      targetAudience: ['Éleveurs de poulets de chair / pondeuses', 'Fermes agricoles', 'Hangars et dépôts'],
      advantages: [
        'Croissance optimale des volailles sans arrêt de ponte',
        'Sécurité nocturne du site contre les vols et prédateurs',
        'Zéro coût de carburant pour groupe électrogène',
        'Matériel étanche résistant à l\'ammoniac et à l\'humidité'
      ],
      steps: ['Évaluation de la surface du bâtiment', 'Calibrage des rampes LED et panneaux', 'Installation sécurisée', 'Suivi de production'],
      badge: 'Rendement Avicole',
      image: '/assets/images/solar_poultry_farm_1787536289253.jpg'
    }
  ];

  private readonly testimonialsData: Testimonial[] = [
    {
      id: 'test-1',
      name: 'M. Jean-Paul Kamga',
      role: 'Éleveur avicole',
      location: 'Zone de Dibombari, Douala',
      productUsed: 'Kit Éclairage Solaire Sun King (4 Lampes)',
      comment: 'Avant Green Innovators, les coupures de courant la nuit provoquaient des pertes dans mon poulailler. Depuis l\'installation des rampes solaires Sun King, mes poussins ont un éclairage constant et les résultats de ponte sont excellents.',
      rating: 5,
      avatarIcon: 'person',
      verifiedCustomer: true
    },
    {
      id: 'test-2',
      name: 'Mme Chantal Nguemo',
      role: 'Mère de famille & Commerçante',
      location: 'Bonamoussadi, Douala',
      productUsed: 'Kit Éclairage + TV Solaire HD 32"',
      comment: 'La formule échelonnée à 5 000 FCFA par mois nous a permis d\'équiper notre maison d\'une superbe télévision 32 pouces solaire et de 4 lampes néons. Les enfants révisent le soir sans aucune coupure.',
      rating: 5,
      avatarIcon: 'person_outline',
      verifiedCustomer: true
    },
    {
      id: 'test-3',
      name: 'Dr. Eric Tchounga',
      role: 'Directeur de Cabinet Médical',
      location: 'Akwa, Douala',
      productUsed: 'Générateur Solaire PowerPlay Pro 600W',
      comment: 'Pour la conservation continue de vaccins, le routeur Wi-Fi et les ordinateurs de consultation, le PowerPlay Pro est une merveille. Silencieux, propre et extrêmement fiable.',
      rating: 5,
      avatarIcon: 'verified',
      verifiedCustomer: true
    }
  ];

  getProducts(): Product[] {
    return this.productsData;
  }

  getProductById(id: string): Product | undefined {
    return this.productsData.find(p => p.id === id);
  }

  getFieldGallery(): FieldGalleryItem[] {
    return this.fieldGalleryData;
  }

  getTariffTable(): TariffItem[] {
    return this.tariffTableData;
  }

  getServices(): SolarServiceItem[] {
    return this.servicesData;
  }

  getTestimonials(): Testimonial[] {
    return this.testimonialsData;
  }

  formatPrice(val: number): string {
    return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
  }

  getWhatsAppOrderUrl(productName: string, mode: 'cash' | 'financing'): string {
    const modeText = mode === 'cash' ? 'Achat au Comptant (Cash Promo)' : 'Formule Paiement Échelonné';
    const text = `Bonjour Green Innovators SARL 👋,\nJe souhaite commander le produit :\n👉 *${productName}*\nOption choisie : *${modeText}*\n\nMerci de m'indiquer la disponibilité et les modalités de livraison/installation à Douala.`;
    return `https://wa.me/${this.companyInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  getWhatsAppQuoteUrl(serviceTitle: string, userDetailsOrName: string | { name?: string; location?: string; phone?: string; needDesc?: string }, moreDetails?: string): string {
    let name = 'Client';
    let phone = 'Non renseigné';
    let location = 'Douala';
    let needDesc = '';

    if (typeof userDetailsOrName === 'string') {
      name = userDetailsOrName;
      if (moreDetails) {
        needDesc = moreDetails;
      }
    } else if (userDetailsOrName) {
      name = userDetailsOrName.name || 'Client';
      phone = userDetailsOrName.phone || 'Non renseigné';
      location = userDetailsOrName.location || 'Douala';
      needDesc = userDetailsOrName.needDesc || '';
    }

    const text = `Bonjour Green Innovators SARL 👋,\nDemande de devis solaire :\n- Sujet / Service : *${serviceTitle}*\n- Nom : ${name}\n- Téléphone : ${phone}\n- Localisation : ${location}\n- Détails : ${needDesc}\n\nMerci de me contacter pour une étude et un devis.`;
    return `https://wa.me/${this.companyInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  getWhatsAppGeneralUrl(): string {
    const text = `Bonjour Green Innovators SARL 👋,\nJe vous contacte depuis votre site web officiel pour des renseignements sur vos équipements solaires certifiés Vérasol et vos modalités à Douala.`;
    return `https://wa.me/${this.companyInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  }
}
