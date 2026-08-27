/**
 * ============================================================================
 * COMPOSANT PRINCIPAL - PROFESSIONNAL GLOBAL CLEANERS (YAOUNDÉ BONAS)
 * ============================================================================
 * Architecture & Design : Inspiré du style typographique international (Grille Suisse).
 * Ce composant gère :
 * 1. L'affichage des 8 prestations de nettoyage, 3D et déménagement
 * 2. La sélection instantanée d'un ou plusieurs services
 * 3. La préparation et l'envoi direct du message WhatsApp pré-rempli au +237 654490978
 * 4. L'activation optionnelle de la grille modulaire de contrôle visuel
 * ============================================================================
 */

import { ChangeDetectionStrategy, Component, computed, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CleaningServiceState } from './services/cleaning.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Service injecté fournissant la liste des services et les coordonnées à Bonas
  readonly cleaningService = inject(CleaningServiceState);
  private readonly fb = inject(FormBuilder);

  // --------------------------------------------------------------------------
  // 1. ÉTAT DE SÉLECTION DES SERVICES
  // --------------------------------------------------------------------------
  
  // Tableau contenant les IDs des services sélectionnés par l'utilisateur
  readonly selectedServiceIds = signal<string[]>([]);

  // Filtre actif de catégorie ('tous', 'nettoyage', 'traitement', 'demenagement')
  readonly activeCategoryFilter = signal<'tous' | 'nettoyage' | 'traitement' | 'demenagement'>('tous');

  // Affichage optionnel de la grille modulaire de mise en page (touche 'G' ou bouton)
  readonly isGridActive = signal<boolean>(false);

  // Formulaire épuré pour personnaliser le message WhatsApp
  readonly contactForm = this.fb.group({
    clientName: ['', [Validators.required]],
    quarter: ['Bonas (Siège PGC)', [Validators.required]],
    notes: ['']
  });

  // --------------------------------------------------------------------------
  // 2. SIGNAUX DÉRIVÉS (CALCUL AUTOMATIQUE DE L'ÉTAT)
  // --------------------------------------------------------------------------

  // Liste filtrée selon la catégorie active
  readonly filteredServices = computed(() => {
    const all = this.cleaningService.services();
    const filter = this.activeCategoryFilter();
    if (filter === 'tous') {
      return all;
    }
    return all.filter(s => s.category === filter);
  });

  // Liste complète des objets des services sélectionnés
  readonly selectedServicesList = computed(() => {
    const ids = this.selectedServiceIds();
    return this.cleaningService.services().filter(s => ids.includes(s.id));
  });

  // Nombre total de services sélectionnés
  readonly selectedCount = computed(() => this.selectedServiceIds().length);

  // --------------------------------------------------------------------------
  // 3. ACTIONS ET INTERACTIONS
  // --------------------------------------------------------------------------

  /**
   * Vérifie si un service est déjà sélectionné.
   */
  isServiceSelected(serviceId: string): boolean {
    return this.selectedServiceIds().includes(serviceId);
  }

  /**
   * Alterne l'état de sélection d'un service (Ajout / Retrait).
   */
  toggleServiceSelection(serviceId: string) {
    this.selectedServiceIds.update(currentIds => {
      if (currentIds.includes(serviceId)) {
        return currentIds.filter(id => id !== serviceId);
      } else {
        return [...currentIds, serviceId];
      }
    });
  }

  /**
   * Sélectionne tous les 8 services d'un coup.
   */
  selectAllServices() {
    const allIds = this.cleaningService.services().map(s => s.id);
    this.selectedServiceIds.set(allIds);
  }

  /**
   * Efface la sélection courante.
   */
  clearSelection() {
    this.selectedServiceIds.set([]);
  }

  /**
   * Modifie le filtre de catégorie.
   */
  setCategoryFilter(category: 'tous' | 'nettoyage' | 'traitement' | 'demenagement') {
    this.activeCategoryFilter.set(category);
  }

  /**
   * Alterne l'affichage de la grille modulaire de repère visuel.
   */
  toggleGrid() {
    this.isGridActive.update(v => !v);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('grid-active', this.isGridActive());
    }
  }

  /**
   * Écouteur clavier pour basculer la grille avec la touche 'G'.
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if ((event.key === 'g' || event.key === 'G') && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const target = event.target as HTMLElement;
      // Ne pas déclencher si l'utilisateur est en train d'écrire dans un champ de texte
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }
      this.toggleGrid();
    }
  }

  /**
   * Fait défiler la page de manière fluide vers la section ciblée.
   */
  scrollToSection(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Génère le lien WhatsApp officiel pré-formaté avec tous les détails.
   */
  getWhatsAppFinalUrl(): string {
    const clientName = this.contactForm.get('clientName')?.value || '';
    const quarter = this.contactForm.get('quarter')?.value || 'Yaoundé';
    const notes = this.contactForm.get('notes')?.value || '';
    const selectedNames = this.selectedServicesList().map(s => s.title);

    return this.cleaningService.getWhatsAppCustomUrl(clientName, quarter, selectedNames, notes);
  }
}
