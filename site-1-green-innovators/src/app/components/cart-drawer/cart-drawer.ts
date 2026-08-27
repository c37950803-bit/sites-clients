import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { SolarDataService } from '../../services/solar-data.service';
import { ProductVisual } from '../product-visual/product-visual';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatIconModule,
    ProductVisual
  ],
  template: `
    @if (cartService.isCartOpen()) {
      <div class="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <button 
          type="button"
          (click)="cartService.closeCart()" 
          aria-label="Fermer le panier"
          class="fixed inset-0 bg-black/50 transition-opacity cursor-pointer border-none w-full h-full p-0">
        </button>

        <!-- Drawer Content -->
        <aside class="relative z-10 w-full max-w-lg bg-white h-full flex flex-col justify-between border-l border-[#111315]/20 shadow-2xl overflow-hidden font-sans">
          
          <!-- Header -->
          <div class="p-5 border-b border-[#111315]/15 bg-[#111315] text-white flex items-center justify-between">
            <div>
              <div class="kicker text-[#8c9299]">RÉCAPITULATIF DE COMMANDE</div>
              <h2 class="text-base font-black tracking-tight text-white mt-0.5">
                VOTRE SÉLECTION SOLAIRE ({{ cartService.itemCount() }})
              </h2>
            </div>

            <div class="flex items-center gap-2">
              <button 
                type="button"
                (click)="isQuickAddOpen.set(!isQuickAddOpen())"
                class="px-2.5 py-1 text-xs font-mono font-bold border border-white/40 hover:border-white text-white cursor-pointer">
                {{ isQuickAddOpen() ? 'FERMER CATALOGUE' : '+ AJOUTER UN KIT' }}
              </button>

              <button 
                (click)="cartService.closeCart()" 
                type="button" 
                aria-label="Fermer"
                class="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white border border-white/20 cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[18px]">close</mat-icon>
              </button>
            </div>
          </div>

          <!-- Inline Quick Add Selector -->
          @if (isQuickAddOpen()) {
            <div class="p-4 bg-[#f8f9fa] border-b border-[#111315]/15 space-y-2 max-h-52 overflow-y-auto">
              <div class="text-xs font-bold text-[#111315] uppercase tracking-wider font-mono">
                Ajouter un autre kit à la sélection :
              </div>
              <div class="space-y-1.5">
                @for (prod of allProducts(); track prod.id) {
                  <div class="p-2 bg-white border border-[#e2e4e8] flex items-center justify-between gap-2 text-xs">
                    <div class="min-w-0">
                      <div class="font-bold text-[#111315] truncate">{{ prod.name }}</div>
                      <div class="text-[#5b6066] font-mono">{{ dataService.formatPrice(prod.cashPrice) }}</div>
                    </div>
                    <div class="flex gap-1 shrink-0">
                      <button 
                        type="button"
                        (click)="quickAddProduct(prod, 'cash')"
                        class="px-2 py-1 bg-[#111315] text-white font-mono text-[10px] font-bold hover:bg-[#e4002b] cursor-pointer">
                        + CASH
                      </button>
                      <button 
                        type="button"
                        (click)="quickAddProduct(prod, 'financing')"
                        class="px-2 py-1 border border-[#111315] text-[#111315] font-mono text-[10px] font-bold hover:bg-[#111315] hover:text-white cursor-pointer">
                        + MOIS
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Items List -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4">
            @if (cartService.items().length === 0) {
              <div class="py-16 text-center space-y-3">
                <div class="font-mono text-xs uppercase tracking-widest text-[#8c9299]">Panier vide</div>
                <p class="text-sm text-[#5b6066] max-w-xs mx-auto">
                  Aucun kit sélectionné. Choisissez vos équipements dans la boutique ou le simulateur.
                </p>
                <a 
                  routerLink="/boutique" 
                  (click)="cartService.closeCart()"
                  class="inline-block mt-2 px-5 py-2.5 bg-[#111315] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#e4002b] transition-colors">
                  Consulter la boutique →
                </a>
              </div>
            } @else {
              @for (item of cartService.items(); track (item.product.id + '-' + item.paymentMode)) {
                <div class="p-3 border border-[#111315]/15 bg-white space-y-3">
                  
                  <div class="flex items-start gap-3">
                    <div class="w-16 h-16 shrink-0 border border-[#e2e4e8]">
                      <app-product-visual [src]="item.product.image" [altText]="item.product.name" [type]="item.product.category"></app-product-visual>
                    </div>

                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-1">
                        <h4 class="font-black text-sm text-[#111315] truncate">
                          {{ item.product.name }}
                        </h4>
                        <button 
                          type="button" 
                          (click)="cartService.removeItem(item.product.id, item.paymentMode)"
                          aria-label="Supprimer"
                          class="text-[#8c9299] hover:text-[#e4002b] p-1 cursor-pointer">
                          <mat-icon class="!w-4 !h-4 !text-[16px]">close</mat-icon>
                        </button>
                      </div>

                      <!-- In-place model switcher -->
                      <div class="mt-1">
                        <label [for]="'select-model-' + item.product.id + '-' + item.paymentMode" class="text-[10px] uppercase font-mono text-[#8c9299] block">Changer de modèle :</label>
                        <select 
                          [id]="'select-model-' + item.product.id + '-' + item.paymentMode"
                          [value]="item.product.id"
                          (change)="onProductChange(item.product.id, item.paymentMode, $event)"
                          class="w-full text-xs font-mono font-bold px-1.5 py-1 bg-white border border-[#111315]/20 text-[#111315]">
                          @for (p of allProducts(); track p.id) {
                            <option [value]="p.id">
                              {{ p.name }} ({{ dataService.formatPrice(item.paymentMode === 'cash' ? p.cashPrice : p.financingMonthlyPayment) }}{{ item.paymentMode === 'cash' ? '' : '/m' }})
                            </option>
                          }
                        </select>
                      </div>

                      <!-- Price & Payment Mode Switch -->
                      <div class="mt-2 flex items-center justify-between gap-2 border-t border-[#111315]/10 pt-2">
                        <div>
                          @if (item.paymentMode === 'cash') {
                            <span class="font-mono font-black text-[#111315] text-sm">
                              {{ dataService.formatPrice(item.product.cashPrice * item.quantity) }}
                            </span>
                            <span class="block text-[10px] font-mono text-[#5b6066]">Comptant promo</span>
                          } @else {
                            <span class="font-mono font-black text-[#e4002b] text-sm">
                              {{ dataService.formatPrice(item.product.financingMonthlyPayment * item.quantity) }}/mois
                            </span>
                            <span class="block text-[10px] font-mono text-[#5b6066]">
                              Acompte : {{ dataService.formatPrice(item.product.financingDownPayment * item.quantity) }}
                            </span>
                          }
                        </div>

                        <button 
                          type="button"
                          (click)="cartService.toggleItemPaymentMode(item.product.id, item.paymentMode)"
                          class="text-[10px] font-mono font-bold px-2 py-1 border border-[#111315] hover:bg-[#111315] hover:text-white cursor-pointer">
                          {{ item.paymentMode === 'cash' ? 'MODE: MENSUALITÉS' : 'MODE: CASH' }}
                        </button>
                      </div>

                      <!-- Quantity Controls -->
                      <div class="mt-2 flex items-center justify-between border-t border-[#111315]/10 pt-2">
                        <span class="text-xs font-mono text-[#5b6066]">Quantité :</span>
                        <div class="flex items-center border border-[#111315]">
                          <button 
                            type="button"
                            (click)="cartService.updateQuantity(item.product.id, item.paymentMode, item.quantity - 1)"
                            class="w-7 h-7 flex items-center justify-center text-[#111315] hover:bg-[#f1f3f5] cursor-pointer">
                            -
                          </button>
                          <span class="w-8 text-center text-xs font-mono font-bold">{{ item.quantity }}</span>
                          <button 
                            type="button"
                            (click)="cartService.updateQuantity(item.product.id, item.paymentMode, item.quantity + 1)"
                            class="w-7 h-7 flex items-center justify-center text-[#111315] hover:bg-[#f1f3f5] cursor-pointer">
                            +
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              }
            }
          </div>

          <!-- Checkout Form -->
          @if (cartService.items().length > 0) {
            <div class="p-5 border-t border-[#111315]/20 bg-[#f8f9fa] space-y-3">
              
              <div class="flex items-baseline justify-between font-mono">
                <span class="text-xs uppercase text-[#5b6066]">Estimation Totale :</span>
                <span class="text-lg font-black text-[#111315]">{{ dataService.formatPrice(cartService.totalCashPrice()) }}</span>
              </div>

              <form [formGroup]="checkoutForm" (ngSubmit)="submitCartOrder()" class="space-y-2">
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label for="cart-name" class="block text-[10px] font-mono uppercase text-[#5b6066] mb-0.5">Nom complet *</label>
                    <input 
                      id="cart-name"
                      type="text" 
                      formControlName="customerName" 
                      placeholder="Ex: M. Paul" 
                      class="w-full text-xs font-sans px-2.5 py-2 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none" />
                  </div>
                  <div>
                    <label for="cart-phone" class="block text-[10px] font-mono uppercase text-[#5b6066] mb-0.5">Téléphone *</label>
                    <input 
                      id="cart-phone"
                      type="tel" 
                      formControlName="phone" 
                      placeholder="674047592" 
                      class="w-full text-xs font-sans px-2.5 py-2 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label for="cart-addr" class="block text-[10px] font-mono uppercase text-[#5b6066] mb-0.5">Quartier / Ville à Douala *</label>
                  <input 
                    id="cart-addr"
                    type="text" 
                    formControlName="address" 
                    placeholder="Ex: Bonamoussadi, Akwa, Makepe..." 
                    class="w-full text-xs font-sans px-2.5 py-2 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none" />
                </div>

                <button 
                  type="submit" 
                  class="w-full py-3.5 bg-[#e4002b] hover:bg-[#c70025] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">chat</mat-icon>
                  <span>Envoyer ma commande sur WhatsApp</span>
                </button>
              </form>

              <div class="flex items-center justify-between text-[11px] font-mono text-[#8c9299] pt-1">
                <button 
                  type="button" 
                  (click)="cartService.clearCart()" 
                  class="hover:text-[#e4002b] underline cursor-pointer">
                  Vider le panier
                </button>
                <span>Paiement convenu à la pose</span>
              </div>

            </div>
          }

        </aside>
      </div>
    }
  `
})
export class CartDrawerComponent {
  cartService = inject(CartService);
  dataService = inject(SolarDataService);

  isQuickAddOpen = signal<boolean>(false);
  allProducts = computed<Product[]>(() => this.dataService.getProducts());

  checkoutForm = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    notes: new FormControl('')
  });

  quickAddProduct(product: Product, mode: 'cash' | 'financing'): void {
    this.cartService.addToCart(product, mode, 1, false);
  }

  onProductChange(oldProductId: string, oldMode: 'cash' | 'financing', event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newProductId = select.value;
    const newProduct = this.dataService.getProductById(newProductId);
    if (newProduct) {
      this.cartService.replaceItemProduct(oldProductId, oldMode, newProduct);
    }
  }

  submitCartOrder(): void {
    const val = this.checkoutForm.value;
    const url = this.cartService.generateWhatsAppOrderUrl({
      name: val.customerName || 'Client',
      phone: val.phone || 'Non renseigné',
      address: val.address || 'Douala',
      notes: val.notes || ''
    });

    if (url) {
      window.open(url, '_blank');
    }
  }
}
