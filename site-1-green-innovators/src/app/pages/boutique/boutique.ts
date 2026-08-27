import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { SolarDataService } from '../../services/solar-data.service';
import { ProductVisual } from '../../components/product-visual/product-visual';
import { ProductModalComponent } from '../../components/product-modal/product-modal';

@Component({
  selector: 'app-boutique',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    ProductVisual,
    ProductModalComponent
  ],
  template: `
    <div class="w-full font-sans pb-16 space-y-12">
      
      <!-- Boutique Header Section -->
      <section class="border-b border-[#111315]/15 pt-8 sm:pt-12 pb-10 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div class="space-y-4 max-w-3xl">
          <div class="kicker text-[#e4002b]">CATALOGUE OFFICIEL • TARIFS COMPLETS</div>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111315] tracking-tight leading-tight">
            Boutique Solaire Douala
          </h1>

          <p class="text-sm sm:text-base text-[#5b6066] leading-relaxed">
            Consultez nos 10 équipements solaires certifiés Vérasol. Vous pouvez ajouter plusieurs modèles à votre panier, ajuster les quantités et passer commande directement via WhatsApp.
          </p>

          <!-- Toggle Preferred Pricing Mode -->
          <div class="flex items-center gap-3 pt-2 font-mono text-xs">
            <span class="text-[#8c9299]">TARIFICATION :</span>
            <button 
              type="button"
              (click)="preferredMode.set('cash')"
              [class]="preferredMode() === 'cash' ? 'bg-[#111315] text-white' : 'border border-[#111315] text-[#111315] hover:bg-[#f1f3f5]'"
              class="px-3 py-1.5 font-bold cursor-pointer transition-colors">
              PRIX CASH (-10% PROMO)
            </button>
            <button 
              type="button"
              (click)="preferredMode.set('financing')"
              [class]="preferredMode() === 'financing' ? 'bg-[#e4002b] text-white' : 'border border-[#111315] text-[#111315] hover:bg-[#f1f3f5]'"
              class="px-3 py-1.5 font-bold cursor-pointer transition-colors">
              PAIEMENT PAR MOIS
            </button>
          </div>
        </div>
      </section>

      <!-- Category Filter Tabs -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#111315]/10 font-mono text-xs">
          <button 
            type="button"
            (click)="selectedCategory.set('all')"
            [class]="selectedCategory() === 'all' ? 'bg-[#111315] text-white font-bold' : 'text-[#5b6066] hover:text-[#111315] bg-[#f8f9fa]'"
            class="px-3 py-2 whitespace-nowrap cursor-pointer">
            TOUS LES KITS ({{ allProducts().length }})
          </button>

          <button 
            type="button"
            (click)="selectedCategory.set('lanterne')"
            [class]="selectedCategory() === 'lanterne' ? 'bg-[#111315] text-white font-bold' : 'text-[#5b6066] hover:text-[#111315] bg-[#f8f9fa]'"
            class="px-3 py-2 whitespace-nowrap cursor-pointer">
            LANTERNES SOLAIRES
          </button>

          <button 
            type="button"
            (click)="selectedCategory.set('basic')"
            [class]="selectedCategory() === 'basic' ? 'bg-[#111315] text-white font-bold' : 'text-[#5b6066] hover:text-[#111315] bg-[#f8f9fa]'"
            class="px-3 py-2 whitespace-nowrap cursor-pointer">
            KITS ÉCLAIRAGE BASIC
          </button>

          <button 
            type="button"
            (click)="selectedCategory.set('premium')"
            [class]="selectedCategory() === 'premium' ? 'bg-[#111315] text-white font-bold' : 'text-[#5b6066] hover:text-[#111315] bg-[#f8f9fa]'"
            class="px-3 py-2 whitespace-nowrap cursor-pointer">
            KITS TV SOLAIRE HD
          </button>

          <button 
            type="button"
            (click)="selectedCategory.set('powerplay')"
            [class]="selectedCategory() === 'powerplay' ? 'bg-[#111315] text-white font-bold' : 'text-[#5b6066] hover:text-[#111315] bg-[#f8f9fa]'"
            class="px-3 py-2 whitespace-nowrap cursor-pointer">
            GÉNÉRATEURS POWERPLAY
          </button>
        </div>
      </section>

      <!-- Products Grid -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (prod of filteredProducts(); track prod.id) {
            <div class="border border-[#111315]/15 bg-white flex flex-col justify-between hover:border-[#111315] transition-colors">
              
              <!-- Product Top & Info -->
              <div class="p-5 space-y-4">
                
                <div class="w-full aspect-4/3 border border-[#e2e4e8] bg-[#f8f9fa] flex items-center justify-center relative overflow-hidden">
                  <app-product-visual [src]="prod.image" [altText]="prod.name" [type]="prod.category"></app-product-visual>
                  
                  @if (prod.discountPercentage) {
                    <span class="absolute top-2 right-2 px-1.5 py-0.5 bg-[#e4002b] text-white font-mono text-[9px] font-bold">
                      -{{ prod.discountPercentage }}%
                    </span>
                  }
                </div>

                <div class="space-y-1">
                  <div class="kicker text-[10px] text-[#e4002b]">{{ prod.categoryLabel }}</div>
                  <h3 class="font-black text-base text-[#111315] leading-snug">
                    {{ prod.name }}
                  </h3>
                  <p class="text-xs text-[#5b6066] line-clamp-2 mt-1">
                    {{ prod.subtitle }}
                  </p>
                </div>

                <!-- Features list -->
                <div class="border-t border-[#111315]/10 pt-3 space-y-1 text-xs text-[#5b6066]">
                  @for (feat of prod.features.slice(0, 3); track feat) {
                    <div class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 bg-[#111315] shrink-0"></span>
                      <span class="truncate">{{ feat }}</span>
                    </div>
                  }
                </div>

                <!-- Pricing Box -->
                <div class="border border-[#111315]/15 p-3 bg-[#f8f9fa] font-mono space-y-1">
                  <div class="flex items-baseline justify-between">
                    <span class="text-[10px] uppercase text-[#8c9299]">PRIX CASH :</span>
                    <strong class="text-sm font-black text-[#111315]">{{ dataService.formatPrice(prod.cashPrice) }}</strong>
                  </div>

                  <div class="flex items-baseline justify-between border-t border-[#e2e4e8] pt-1">
                    <span class="text-[10px] uppercase text-[#e4002b]">PAR MOIS :</span>
                    <strong class="text-xs font-bold text-[#e4002b]">{{ dataService.formatPrice(prod.financingMonthlyPayment) }}/m</strong>
                  </div>
                </div>

              </div>

              <!-- Action Controls -->
              <div class="p-5 pt-0 space-y-2">
                @if (cartService.getTotalQuantityForProduct(prod.id) > 0) {
                  <div class="p-2 border border-[#111315] bg-[#f8f9fa] flex items-center justify-between text-xs font-mono">
                    <span class="text-[#111315] font-bold">
                      Dans le panier ({{ cartService.getTotalQuantityForProduct(prod.id) }})
                    </span>
                    <button 
                      type="button" 
                      (click)="cartService.openCart()" 
                      class="text-[#e4002b] font-bold underline cursor-pointer">
                      Modifier
                    </button>
                  </div>
                }

                <div class="grid grid-cols-2 gap-2 font-mono text-xs">
                  <button 
                    type="button"
                    (click)="openModal(prod)"
                    class="py-2.5 px-2 border border-[#111315] text-[#111315] hover:bg-[#f1f3f5] font-bold text-[11px] uppercase cursor-pointer text-center">
                    Fiche
                  </button>

                  <button 
                    type="button"
                    (click)="addToCart(prod, preferredMode())"
                    class="py-2.5 px-2 bg-[#111315] text-white hover:bg-[#e4002b] font-bold text-[11px] uppercase cursor-pointer text-center transition-colors">
                    + Panier
                  </button>
                </div>
              </div>

            </div>
          }
        </div>
      </section>

      <!-- Cart Bottom Alert -->
      @if (cartService.itemCount() > 0) {
        <section class="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div class="p-5 border border-[#111315] bg-[#111315] text-white flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div>
              <div class="font-bold text-sm">
                {{ cartService.itemCount() }} ARTICLE(S) DANS VOTRE PANIER
              </div>
              <div class="text-xs text-[#8c9299]">
                Total estimé : {{ dataService.formatPrice(cartService.totalCashPrice()) }}
              </div>
            </div>

            <button 
              type="button" 
              (click)="cartService.openCart()"
              class="px-6 py-3 bg-[#e4002b] hover:bg-[#c70025] text-white font-bold text-xs uppercase tracking-wider cursor-pointer">
              Vérifier & Envoyer ma commande →
            </button>
          </div>
        </section>
      }

    </div>

    <!-- Product Modal -->
    <app-product-modal 
      [product]="activeModalProduct()" 
      (closeModal)="activeModalProduct.set(null)">
    </app-product-modal>
  `
})
export class BoutiqueComponent {
  dataService = inject(SolarDataService);
  cartService = inject(CartService);

  allProducts = computed<Product[]>(() => this.dataService.getProducts());
  selectedCategory = signal<string>('all');
  preferredMode = signal<'cash' | 'financing'>('cash');

  activeModalProduct = signal<Product | null>(null);

  filteredProducts = computed<Product[]>(() => {
    const cat = this.selectedCategory();
    const prods = this.allProducts();
    if (cat === 'all') return prods;
    return prods.filter(p => p.category === cat);
  });

  openModal(product: Product): void {
    this.activeModalProduct.set(product);
  }

  addToCart(product: Product, mode: 'cash' | 'financing'): void {
    this.cartService.addToCart(product, mode, 1, false);
  }
}
