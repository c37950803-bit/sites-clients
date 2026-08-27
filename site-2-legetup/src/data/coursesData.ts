import { CourseDetail, StudentLevel } from '../types';

export const CENTER_INFO = {
  name: 'LE GETUP',
  fullName: 'LE GETUP - Cours de Répétition et du Soir',
  motto: 'L\'excellence, notre engagement ! Des résultats qui parlent d\'eux-mêmes !',
  specialty: 'Cours de répétition et du soir toutes séries & Espagnol',
  levelsSummary: '4ème • 3ème • 1ère • Terminale',
  price: 10000,
  currency: 'FCFA',
  phoneDisplay: '692 816 463',
  phoneSecondary: '680 714 128',
  phoneRaw: '692816463',
  phoneInternational: '+237692816463',
  whatsappUrl: 'https://wa.me/237692816463',
  deadlineDateFormatted: '14 Septembre 2026 à 16h30',
  deadlineEvent: 'Rentrée Officielle des Cours',
  location: 'Situé après l\'entrée DÉPÔT GUINNESS, à 50 mètres du carrefour RADISON (à L\'ÉCOLE LES PETITS ANGES)',
};

export const FLYER_STATS_2026 = {
  year: '2026',
  bepc: [
    { serie: 'Série Allemande', presented: 10, admitted: 10, rate: '100%' },
    { serie: 'Série Espagnole', presented: 14, admitted: 13, rate: '92,85%' },
  ],
  probatoire: [
    { serie: 'Probatoire Série C', presented: 2, admitted: 2, rate: '100%' },
    { serie: 'Probatoire Série D', presented: 13, admitted: 11, rate: '84,61%' },
    { serie: 'Probatoire Série A', presented: 4, admitted: 2, rate: '50%' },
  ],
  bac: [
    { serie: 'Série C', presented: 3, admitted: 3, rate: '100%' },
    { serie: 'Série D', presented: 4, admitted: 4, rate: '100%' },
    { serie: 'Série A4', presented: 14, admitted: 11, rate: '78,57%' },
  ],
  commitments: [
    'Encadrement de qualité',
    'Des résultats prouvés',
    'Suivi personnalisé des élèves',
    'Votre futur, notre priorité',
  ],
};

export const COURSES_DATA: CourseDetail[] = [
  {
    id: '4ème',
    title: '4ème : Consolidation & Bases Solides',
    badge: 'Initiation & Renforcement',
    description: 'Posez des fondations inébranlables pour maîtriser la grammaire, la conjugaison et les bases méthodologiques.',
    keySkills: [
      'Maîtrise des verbes réguliers & irréguliers et temps fondamentaux',
      'Prononciation authentique & fluidité d\'expression',
      'Vocabulaire fondamental & compréhension de textes',
      'Méthode de travail rigoureuse dès le premier cycle'
    ],
    schedule: 'Séances du soir & week-end',
    color: 'from-[#5A5A40] to-[#433E37]',
    accentBg: 'bg-[#F4EFE6] text-[#5A5A40] border-[#E8E2D2]',
  },
  {
    id: '3ème',
    title: '3ème : Préparation Intensive BEPC',
    badge: 'Objectif Réussite BEPC',
    targetExam: 'Examen BEPC (92,85% à 100% de réussite)',
    description: 'Un entraînement méthodique axé sur les épreuves types BEPC pour garantir une excellente moyenne et une admission assurée.',
    keySkills: [
      'Traitement complet des épreuves types BEPC officielles',
      'Conjugaison avancée, grammaire & maniement de la langue',
      'Techniques de rédaction sans fautes d\'accord ni contresens',
      'Traitement intensif des anciennes épreuves corrigées'
    ],
    schedule: 'Séances ciblées du soir + simulations mensuelles',
    color: 'from-[#D97757] to-[#B85D3F]',
    accentBg: 'bg-[#FDF2ED] text-[#D97757] border-[#F4D3C7]',
  },
  {
    id: '1ère',
    title: '1ère (A, ABI, C, D) : Objectif Probatoire ESG',
    badge: 'Objectif Probatoire',
    targetExam: 'Probatoire ESG',
    description: 'Maîtrisez les exigences de l\'examen probatoire avec un suivi personnalisé selon les séries scientifiques et littéraires.',
    keySkills: [
      'Subjonctif, concordance des temps et structures complexes',
      'Commentaire de texte guidé & dissertation structurée',
      'Entraînement rigoureux aux épreuves scientifiques et littéraires',
      'Stratégies anti-pièges et barème d\'évaluation officiel'
    ],
    schedule: 'Séances du soir & week-end d\'entraînement',
    color: 'from-[#5A5A40] to-[#737357]',
    accentBg: 'bg-[#EFEFE4] text-[#5A5A40] border-[#D9D9C3]',
  },
  {
    id: 'Terminale',
    title: 'Terminale (A4, ABI, C, D) : Objectif BACCALAURÉAT',
    badge: 'Excellence & Mention BAC',
    targetExam: 'Baccalauréat (Jusqu\'à 100% de réussite)',
    description: 'Le programme d\'élite pour décrocher le Baccalauréat avec mention. Synthèse, dissertation, traitement d\'annales et coaching personnalisé.',
    keySkills: [
      'Maîtrise intégrale de l\'épreuve type Baccalauréat',
      'Dissertation et analyse critique de documents',
      'Simulations régulières en conditions réelles d\'examen',
      'Préparation mentale et méthodologie d\'excellence'
    ],
    schedule: 'Formule intensive avec suivi individuel régulier',
    color: 'from-[#2D2A26] to-[#5A5A40]',
    accentBg: 'bg-[#EDEBE3] text-[#2D2A26] border-[#D8D4C8]',
  },
];

export const ADVANTAGES = [
  {
    title: 'Des Résultats Prouvés (2026)',
    desc: 'Jusqu\'à 100% de réussite au BEPC, Probatoire et Baccalauréat grâce à notre encadrement de qualité.',
    icon: 'GraduationCap',
  },
  {
    title: 'Tarif Accessible et Transparent',
    desc: 'Un forfait unique de 10 000 FCFA comprenant les supports de cours et le suivi complet.',
    icon: 'Tag',
  },
  {
    title: 'Suivi Personnalisé des Élèves',
    desc: 'Chaque élève bénéficie d\'une attention continue pour combler ses lacunes spécifiques.',
    icon: 'Users',
  },
  {
    title: 'Assistance Continue & WhatsApp',
    desc: 'Contact direct au 692 816 463 pour toutes vos questions et suivi des progrès.',
    icon: 'MessageCircle',
  },
];

export const FAQS = [
  {
    question: 'Quel est le coût exact et que comprend le forfait de 10 000 FCFA ?',
    answer: 'Le tarif est fixé à 10 000 FCFA par élève. Il comprend l\'accès complet aux séances de répétition pour le niveau choisi (4ème, 3ème, 1ère ou Tle), les fascicules d\'exercices et résumés de cours, les examens blancs et le suivi.',
  },
  {
    question: 'Quand a lieu la rentrée officielle des cours ?',
    answer: 'La rentrée officielle a lieu le Lundi 14 Septembre 2026 à 16h30. Les inscriptions sont ouvertes dès maintenant pour garantir votre place.',
  },
  {
    question: 'Où sont situés les cours de répétition ?',
    answer: 'Le centre est situé après l\'entrée DÉPÔT GUINNESS, à 50 mètres du carrefour RADISON, au sein de L\'ÉCOLE LES PETITS ANGES.',
  },
  {
    question: 'Comment réserver ma place directement ?',
    answer: 'Remplissez le formulaire en ligne sur cette page ou contactez directement le responsable au 692 816 463 via appel ou WhatsApp.',
  },
  {
    question: 'Quels ont été les résultats obtenus aux derniers examens officiels 2026 ?',
    answer: 'LE GETUP a obtenu d\'excellents résultats : 100% en BEPC Série Allemande, 92,85% en BEPC Série Espagnole, 100% au Probatoire C, 84,61% au Probatoire D, 100% au Baccalauréat C et D, et 78,57% au Baccalauréat A4.',
  },
];
