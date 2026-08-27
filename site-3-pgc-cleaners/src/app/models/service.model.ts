/**
 * ============================================================================
 * MODÈLE DE DONNÉES - PROFESSIONNAL GLOBAL CLEANERS (YAOUNDÉ BONAS)
 * ============================================================================
 * Ce fichier TypeScript définit la structure de nos services et quartiers.
 * Il assure la cohérence des informations sur l'ensemble de la vitrine.
 * Aucun prix ni devis complexe n'est stocké ici : le site est purement vitrine.
 * ============================================================================
 */

/**
 * Interface représentant un service de nettoyage, traitement 3D ou déménagement.
 */
export interface CleaningService {
  /** Numéro d'ordre éditorial façon grille suisse (ex: '01', '02', '03') */
  numeral: string;

  /** Identifiant unique du service (ex: 'fin-chantier') */
  id: string;
  
  /** Titre officiel du service */
  title: string;
  
  /** Description concise et percutante */
  shortDescription: string;
  
  /** Description complète expliquant la méthode et l'intervention */
  fullDescription: string;
  
  /** Catégorie principale */
  category: 'nettoyage' | 'traitement' | 'demenagement';
  
  /** Libellé lisible de la catégorie */
  categoryLabel: string;
  
  /** Icône vectorielle Bootstrap Icons associée (ex: 'bi-hammer') */
  icon: string;
  
  /** Prestations et engagements inclus dans le service */
  features: string[];
  
  /** Matériel professionnel utilisé */
  equipmentUsed: string[];
  
  /** Indicateur de forte demande */
  popular?: boolean;
}

/**
 * Interface représentant un quartier de Yaoundé pour la zone d'intervention.
 */
export interface YaoundeQuarter {
  /** Nom du quartier (ex: 'Bonas', 'Bastos', 'Mendong') */
  name: string;
  /** Zone géographique de la ville */
  zone: string;
}
