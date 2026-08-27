import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { SolarDataService } from '../../services/solar-data.service';
import { ProductVisual } from '../../components/product-visual/product-visual';

@Component({
  selector: 'app-financement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    ProductVisual
  ],
  template: `
    <div class="w-full font-sans pb-16 space-y-12">
      
      <!-- Financement Header -->
      <section class="border-b border-[#111315]/15 pt-8 sm:pt-12 pb-10 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div class="space-y-4 max-w-3xl">
          <div class="kicker text-[#e4002b]">SIMULATEUR DE MENSUALITÉS • FORMULE PROGRESSIVE</div>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111315] tracking-tight leading-tight">
            Paiement Échelonné Solaire
          </h1>

          <p class="text-sm sm:text-base text-[#5b6066] leading-relaxed">
            Passez à l'autonomie énergétique dès aujourd'hui avec un acompte réduit à la pose et des mensualités fixes étalées sur 7 à 35 mois selon l'équipement choisi.
          </p>
        </div>
      </section>

      <!-- SIMULATION GRID -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Kit Selector -->
          <div class="lg:col-span-7 space-y-6">
            <div class="border-b border-[#111315]/15 pb-2">
              <div class="kicker text-[#111315]">01. SÉLECTIONNEZ LE MODÈLE À FINANCER</div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              @for (prod of products(); track prod.id) {
                <button 
                  type="button"
                  (click)="selectedProductId.set(prod.id)"
                  [class]="selectedProductId() === prod.id ? 'border-[#111315] bg-[#f8f9fa] ring-2 ring-[#111315]' : 'border-[#e2e4e8] hover:border-[#111315] bg-white'"
                  class="p-4 border text-left cursor-pointer transition-all flex items-start gap-3">
                  
                  <div class="w-14 h-14 border border-[#e2e4e8] shrink-0">
                    <app-product-visual [src]="prod.image" [altText]="prod.name" [type]="prod.category"></app-product-visual>
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="font-black text-sm text-[#111315] truncate">{{ prod.name }}</div>
                    <div class="text-[11px] text-[#5b6066] font-mono mt-0.5">{{ prod.financingMonths }} MOIS</div>
                    <div class="text-xs font-bold font-mono text-[#e4002b] mt-1">
                      {{ dataService.formatPrice(prod.financingMonthlyPayment) }}/m
                    </div>
                  </div>

                </button>
              }
            </div>

            <!-- Conditions & Documents Checklist -->
            <div class="border border-[#111315]/15 bg-[#f8f9fa] p-5 space-y-3">
              <div class="kicker text-[#111315]">DOCUMENTS REQUIS & CONDITIONS</div>
              <ul class="space-y-2 text-xs font-mono text-[#5b6066]">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#e4002b]"></span>
                  <span>Photocopie de la Carte Nationale d'Identité (CNI) ou passeport</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#e4002b]"></span>
                  <span>Plan de localisation du lieu d'installation à Douala ou environs</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#e4002b]"></span>
                  <span>Règlement de l'acompte initial lors de la livraison et pose</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#e4002b]"></span>
                  <span>Mensualités réglables par Mobile Money ou auprès du technicien</span>
                </li>
              </ul>
            </div>

          </div>

          <!-- Right Column: Live Math & Summary Box -->
          <div class="lg:col-span-5 border border-[#111315] bg-white p-6 space-y-6 sticky top-24">
            
            <div>
              <div class="kicker text-[#e4002b]">RÉCAPITULATIF FINANCIER CALCULÉ</div>
              <h3 class="text-xl font-black text-[#111315] tracking-tight mt-1">
                {{ selectedProduct().name }}
              </h3>
              <p class="text-xs text-[#5b6066] mt-0.5">{{ selectedProduct().subtitle }}</p>
            </div>

            <!-- Metric Breakdown Table -->
            <div class="border border-[#111315]/15 font-mono text-xs divide-y divide-[#111315]/10">
              <div class="p-3 bg-[#f8f9fa] flex items-baseline justify-between">
                <span class="text-[#5b6066] uppercase">MENSUALITÉ FIXE :</span>
                <span class="text-xl font-black text-[#e4002b] numeral">
                  {{ dataService.formatPrice(selectedProduct().financingMonthlyPayment) }}/m
                </span>
              </div>

              <div class="p-3 flex items-baseline justify-between">
                <span class="text-[#5b6066]">DURÉE :</span>
                <span class="font-bold text-[#111315]">{{ selectedProduct().financingMonths }} Mois</span>
              </div>

              <div class="p-3 flex items-baseline justify-between">
                <span class="text-[#5b6066]">ACOMPTE INITIAL :</span>
                <span class="font-bold text-[#111315]">{{ dataService.formatPrice(selectedProduct().financingDownPayment) }}</span>
              </div>

              <div class="p-3 flex items-baseline justify-between">
                <span class="text-[#5b6066]">COÛT TOTAL ÉCHELONNÉ :</span>
                <span class="font-bold text-[#111315]">{{ dataService.formatPrice(selectedProduct().financingTotalPrice) }}</span>
              </div>

              <div class="p-3 flex items-baseline justify-between bg-[#f8f9fa]">
                <span class="text-[#5b6066]">OPTION PRIX CASH :</span>
                <span class="font-bold text-[#111315]">{{ dataService.formatPrice(selectedProduct().cashPrice) }}</span>
              </div>
            </div>

            <!-- Inclusions -->
            <div class="space-y-1.5 text-xs text-[#5b6066] font-mono">
              <div class="text-[10px] text-[#8c9299] uppercase font-bold">Inclus dans la souscription :</div>
              <div>• Matériel certifié Vérasol sous garantie 1 an</div>
              <div>• Pose et raccordement par un technicien agréé</div>
              <div>• Transfert de propriété totale après la dernière échéance</div>
            </div>

            <!-- Actions -->
            <div class="space-y-2 pt-2 border-t border-[#111315]/15 font-mono text-xs">
              <a 
                [href]="getFinancingWhatsAppUrl()" 
                target="_blank"
                class="w-full py-3.5 bg-[#e4002b] hover:bg-[#c70025] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
                <mat-icon class="!w-4 !h-4 !text-[16px]">chat</mat-icon>
                <span>Souscrire sur WhatsApp</span>
              </a>

              <button 
                type="button" 
                (click)="addFinancingToCart()"
                class="w-full py-3.5 border border-[#111315] text-[#111315] hover:bg-[#111315] hover:text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[16px]">shopping_bag</mat-icon>
                <span>Ajouter l'option échelonnée au panier</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      <!-- FAQ Section -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 border-t border-[#111315]/15 space-y-6">
        <div class="kicker text-[#111315]">QUESTIONS FRÉQUENTES SUR L'ÉCHELONNEMENT</div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div class="border border-[#111315]/15 p-4 space-y-2">
            <h4 class="font-bold text-[#111315] text-sm">Mode de règlement des mensualités</h4>
            <p class="text-[#5b6066]">
              Les mensualités se règlent par Mobile Money ou directement auprès de notre technicien de zone à Douala.
            </p>
          </div>

          <div class="border border-[#111315]/15 p-4 space-y-2">
            <h4 class="font-bold text-[#111315] text-sm">Propriété finale du kit</h4>
            <p class="text-[#5b6066]">
              Une fois la dernière mensualité soldée, le système solaire devient votre propriété définitive sans frais résiduels.
            </p>
          </div>

          <div class="border border-[#111315]/15 p-4 space-y-2">
            <h4 class="font-bold text-[#111315] text-sm">Couverture SAV & Garantie</h4>
            <p class="text-[#5b6066]">
              Tous les kits sous financement bénéficient de la garantie 1 an Vérasol et du suivi technique complet de Green Innovators SARL.
            </p>
          </div>
        </div>
      </section>

    </div>
  `
})
export class FinancementComponent {
  dataService = inject(SolarDataService);
  cartService = inject(CartService);

  products = signal<Product[]>(this.dataService.getProducts());
  selectedProductId = signal<string>('green-basic');

  selectedProduct = computed<Product>(() => {
    return this.products().find(p => p.id === this.selectedProductId()) || this.products()[1];
  });

  getFinancingWhatsAppUrl(): string {
    const prod = this.selectedProduct();
    const details = `Demande de Financement pour : ${prod.name}\n- Mensualité : ${this.dataService.formatPrice(prod.financingMonthlyPayment)}/mois\n- Durée : ${prod.financingMonths} mois\n- Acompte installation : ${this.dataService.formatPrice(prod.financingDownPayment)}`;
    return this.dataService.getWhatsAppQuoteUrl(prod.name, 'Client', details);
  }

  addFinancingToCart(): void {
    const prod = this.selectedProduct();
    this.cartService.addToCart(prod, 'financing', 1, false);
  }
}
