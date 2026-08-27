import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { SolarDataService } from './solar-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'gi_sarl_cart_v1';
  private solarDataService = inject(SolarDataService);

  items = signal<CartItem[]>([]);
  isCartOpen = signal<boolean>(false);
  lastAddedProduct = signal<Product | null>(null);
  toastMessage = signal<string | null>(null);

  itemCount = computed(() => {
    return this.items().reduce((total, item) => total + item.quantity, 0);
  });

  totalCashPrice = computed(() => {
    return this.items().reduce((total, item) => {
      const price = item.paymentMode === 'cash' ? item.product.cashPrice : item.product.financingTotalPrice;
      return total + (price * item.quantity);
    }, 0);
  });

  constructor() {
    this.loadFromStorage();

    // Effect to persist changes
    effect(() => {
      const currentItems = this.items();
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(currentItems));
        } catch {
          // Ignore storage errors in restricted contexts
        }
      }
    });
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(this.CART_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            this.items.set(parsed);
          }
        }
      } catch {
        // Fallback to empty
      }
    }
  }

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  toggleCart(): void {
    this.isCartOpen.update(v => !v);
  }

  addToCart(product: Product, paymentMode: 'cash' | 'financing' = 'cash', quantity = 1, openDrawer = false): void {
    this.items.update(current => {
      const existingIndex = current.findIndex(
        i => i.product.id === product.id && i.paymentMode === paymentMode
      );
      if (existingIndex > -1) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [...current, { product, quantity, paymentMode }];
      }
    });

    this.lastAddedProduct.set(product);
    this.showToast(`"${product.name}" ajouté à votre panier`);
    if (openDrawer) {
      this.openCart();
    }
  }

  getItemQuantity(productId: string, paymentMode: 'cash' | 'financing'): number {
    const item = this.items().find(i => i.product.id === productId && i.paymentMode === paymentMode);
    return item ? item.quantity : 0;
  }

  getTotalQuantityForProduct(productId: string): number {
    return this.items()
      .filter(i => i.product.id === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  }

  replaceItemProduct(oldProductId: string, oldPaymentMode: 'cash' | 'financing', newProduct: Product): void {
    this.items.update(current => {
      const oldIndex = current.findIndex(
        i => i.product.id === oldProductId && i.paymentMode === oldPaymentMode
      );
      if (oldIndex === -1) return current;

      const oldItem = current[oldIndex];
      const existingTargetIndex = current.findIndex(
        i => i.product.id === newProduct.id && i.paymentMode === oldPaymentMode
      );

      if (existingTargetIndex > -1 && existingTargetIndex !== oldIndex) {
        // Merge with existing
        const updated = [...current];
        updated[existingTargetIndex] = {
          ...updated[existingTargetIndex],
          quantity: updated[existingTargetIndex].quantity + oldItem.quantity
        };
        return updated.filter((_, idx) => idx !== oldIndex);
      } else {
        const updated = [...current];
        updated[oldIndex] = {
          ...oldItem,
          product: newProduct
        };
        return updated;
      }
    });
    this.showToast(`Article remplacé par "${newProduct.name}"`);
  }

  updateQuantity(productId: string, paymentMode: 'cash' | 'financing', newQty: number): void {
    if (newQty <= 0) {
      this.removeItem(productId, paymentMode);
      return;
    }

    this.items.update(current => {
      return current.map(item => {
        if (item.product.id === productId && item.paymentMode === paymentMode) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  }

  toggleItemPaymentMode(productId: string, currentMode: 'cash' | 'financing'): void {
    const targetMode: 'cash' | 'financing' = currentMode === 'cash' ? 'financing' : 'cash';
    this.items.update(current => {
      const itemIndex = current.findIndex(i => i.product.id === productId && i.paymentMode === currentMode);
      if (itemIndex === -1) return current;

      const item = current[itemIndex];
      const otherModeIndex = current.findIndex(i => i.product.id === productId && i.paymentMode === targetMode);

      if (otherModeIndex > -1) {
        // Merge
        const updated = [...current];
        updated[otherModeIndex] = {
          ...updated[otherModeIndex],
          quantity: updated[otherModeIndex].quantity + item.quantity
        };
        updated.splice(itemIndex, 1);
        return updated;
      } else {
        const updated = [...current];
        updated[itemIndex] = {
          ...item,
          paymentMode: targetMode
        };
        return updated;
      }
    });
  }

  removeItem(productId: string, paymentMode: 'cash' | 'financing'): void {
    this.items.update(current => 
      current.filter(item => !(item.product.id === productId && item.paymentMode === paymentMode))
    );
    this.showToast('Article retiré du panier');
  }

  clearCart(): void {
    this.items.set([]);
    this.showToast('Panier vidé');
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      if (this.toastMessage() === message) {
        this.toastMessage.set(null);
      }
    }, 3200);
  }

  generateWhatsAppOrderUrl(customerInfo: { name: string; phone: string; address: string; notes?: string }): string {
    const currentItems = this.items();
    if (currentItems.length === 0) return '';

    let text = `Bonjour Green Innovators SARL 👋,\nJe souhaite passer commande pour les articles suivants :\n\n`;

    currentItems.forEach((item, index) => {
      const unitPrice = item.paymentMode === 'cash' ? item.product.cashPrice : item.product.financingTotalPrice;
      const subtotal = unitPrice * item.quantity;
      const modeLabel = item.paymentMode === 'cash' 
        ? 'Achat Comptant' 
        : `Financement (${item.product.financingMonths} mois @ ${this.solarDataService.formatPrice(item.product.financingMonthlyPayment)}/m)`;
      
      text += `${index + 1}. *${item.product.name}* (x${item.quantity})\n   - Formule : ${modeLabel}\n   - Sous-total : ${this.solarDataService.formatPrice(subtotal)}\n\n`;
    });

    text += `💰 *TOTAL ESTIMÉ : ${this.solarDataService.formatPrice(this.totalCashPrice())}*\n\n`;
    text += `📋 *COORDONNÉES DE LIVRAISON :*\n`;
    text += `- Nom : ${customerInfo.name || 'Client'}\n`;
    text += `- Téléphone : ${customerInfo.phone || 'Non renseigné'}\n`;
    text += `- Ville / Quartier : ${customerInfo.address || 'Douala'}\n`;
    if (customerInfo.notes) {
      text += `- Précisions : ${customerInfo.notes}\n`;
    }
    text += `\nMerci de me contacter rapidement pour convenir de la date de livraison ou d'installation.`;

    return `https://wa.me/${this.solarDataService.companyInfo.whatsapp}?text=${encodeURIComponent(text)}`;
  }
}
