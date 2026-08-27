import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { SolarDataService } from '../../services/solar-data.service';
import { ProductVisual } from '../product-visual/product-visual';

@Component({
  selector: 'app-product-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    ProductVisual
  ],
  template: `
    @if (product()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <button 
          type="button"
          (click)="closeModal.emit()"
          aria-label="Fermer la fenêtre"
          class="fixed inset-0 bg-black/60 transition-opacity cursor-pointer border-none w-full h-full p-0">
        </button>
        
        <!-- Modal Container -->
        <div class="relative z-10 w-full max-w-2xl bg-white border border-[#111315] shadow-2xl overflow-hidden my-auto font-sans">
          
          <!-- Modal Top Bar -->
          <div class="p-4 border-b border-[#111315]/15 bg-[#111315] text-white flex items-center justify-between">
            <div class="kicker text-[#8c9299]">FICHE TECHNIQUE & TARIFS</div>
            <button 
              type="button" 
              (click)="closeModal.emit()"
              aria-label="Fermer"
              class="w-7 h-7 flex items-center justify-center text-white hover:bg-white/20 border border-white/20 cursor-pointer">
              <mat-icon class="!w-4 !h-4 !text-[16px]">close</mat-icon>
            </button>
          </div>

          <div class="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            <!-- Header Info -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div class="sm:col-span-5 border border-[#e2e4e8] aspect-4/3 flex items-center justify-center">
                <app-product-visual [src]="product()!.image" [altText]="product()!.name" [type]="product()!.category"></app-product-visual>
              </div>

              <div class="sm:col-span-7 space-y-2">
                <div class="kicker text-[#e4002b]">{{ product()!.categoryLabel }}</div>
                <h3 class="text-xl sm:text-2xl font-black text-[#111315] tracking-tight">
                  {{ product()!.name }}
                </h3>
                <p class="text-xs text-[#5b6066] leading-relaxed">
                  {{ product()!.description }}
                </p>
                <div class="text-[11px] font-mono text-[#8c9299]">
                  GARANTIE : {{ product()!.specs.warranty }} • CERTIFICATION VÉRASOL
                </div>
              </div>
            </div>

            <!-- Price Selector Box -->
            <div class="border border-[#111315]/20 bg-[#f8f9fa] p-4 space-y-3">
              <div class="kicker text-[#111315]">MODES DE RÈGLEMENT DISPONIBLES</div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  type="button"
                  (click)="selectedMode.set('cash')"
                  [class]="selectedMode() === 'cash' ? 'border-[#111315] bg-white ring-2 ring-[#111315]' : 'border-[#e2e4e8] bg-white'"
                  class="p-3 border text-left cursor-pointer transition-all">
                  <div class="kicker text-[10px]">OPTION 01 • ACHAT COMPTANT</div>
                  <div class="text-lg font-black font-mono text-[#111315] mt-1">
                    {{ dataService.formatPrice(product()!.cashPrice) }}
                  </div>
                  <div class="text-[11px] text-[#5b6066] font-mono">Remise promo appliquée</div>
                </button>

                <button 
                  type="button"
                  (click)="selectedMode.set('financing')"
                  [class]="selectedMode() === 'financing' ? 'border-[#e4002b] bg-white ring-2 ring-[#e4002b]' : 'border-[#e2e4e8] bg-white'"
                  class="p-3 border text-left cursor-pointer transition-all">
                  <div class="kicker text-[10px] text-[#e4002b]">OPTION 02 • PAR MOIS ({{ product()!.financingMonths }}M)</div>
                  <div class="text-lg font-black font-mono text-[#e4002b] mt-1">
                    {{ dataService.formatPrice(product()!.financingMonthlyPayment) }}/m
                  </div>
                  <div class="text-[11px] text-[#5b6066] font-mono">
                    Acompte: {{ dataService.formatPrice(product()!.financingDownPayment) }}
                  </div>
                </button>
              </div>
            </div>

            <!-- Specifications Table -->
            <div class="space-y-2">
              <div class="kicker text-[#111315]">SPÉCIFICATIONS DÉTAILLÉES</div>
              <div class="border border-[#111315]/15 text-xs font-mono">
                <div class="grid grid-cols-2 border-b border-[#e2e4e8] p-2 bg-[#f8f9fa]">
                  <span class="text-[#5b6066]">Panneau Solaire :</span>
                  <span class="font-bold text-[#111315]">{{ product()!.specs.solarPanel }}</span>
                </div>
                <div class="grid grid-cols-2 border-b border-[#e2e4e8] p-2">
                  <span class="text-[#5b6066]">Batterie / Centrale :</span>
                  <span class="font-bold text-[#111315]">{{ product()!.specs.battery }}</span>
                </div>
                <div class="grid grid-cols-2 border-b border-[#e2e4e8] p-2 bg-[#f8f9fa]">
                  <span class="text-[#5b6066]">Autonomie Garantie :</span>
                  <span class="font-bold text-[#111315]">{{ product()!.specs.autonomy }}</span>
                </div>
                <div class="grid grid-cols-2 p-2">
                  <span class="text-[#5b6066]">Application Idéale :</span>
                  <span class="font-bold text-[#111315]">{{ product()!.idealFor }}</span>
                </div>
              </div>
            </div>

            <!-- Equipment list -->
            <div class="space-y-1.5">
              <div class="kicker text-[#111315]">ÉLÉMENTS INCLUS DANS CE PACK</div>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#5b6066]">
                @for (feat of product()!.features; track feat) {
                  <li class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-[#e4002b] shrink-0"></span>
                    <span>{{ feat }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Action CTAs -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#111315]/15">
              <button 
                type="button" 
                (click)="handleAddToCart()"
                class="py-3 px-4 bg-[#111315] hover:bg-[#e4002b] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <mat-icon class="!w-4 !h-4 !text-[16px]">shopping_bag</mat-icon>
                <span>Ajouter au panier</span>
              </button>

              <a 
                [href]="dataService.getWhatsAppOrderUrl(product()!.name, selectedMode())"
                target="_blank"
                class="py-3 px-4 border border-[#111315] text-[#111315] hover:bg-[#111315] hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
                <mat-icon class="!w-4 !h-4 !text-[16px]">chat</mat-icon>
                <span>Commander sur WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    }
  `
})
export class ProductModalComponent {
  product = input<Product | null>(null);
  closeModal = output<void>();

  cartService = inject(CartService);
  dataService = inject(SolarDataService);

  selectedMode = signal<'cash' | 'financing'>('cash');

  handleAddToCart(): void {
    const prod = this.product();
    if (prod) {
      this.cartService.addToCart(prod, this.selectedMode());
      this.closeModal.emit();
    }
  }
}
