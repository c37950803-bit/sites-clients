import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { SolarDataService } from '../../services/solar-data.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  template: `
    <header class="w-full bg-white border-b border-[#111315]/15 sticky top-0 z-40">
      
      <!-- Micro Information Banner (Swiss Monospace Line) -->
      <div class="border-b border-[#111315]/10 bg-[#f8f9fa] px-4 sm:px-8 py-1.5 text-xs text-[#5b6066] font-mono">
        <div class="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="inline-block w-2 h-2 bg-[#e4002b]"></span>
            <span class="font-bold text-[#111315]">GREEN INNOVATORS SARL</span>
            <span>• DOUALA, CAMEROUN</span>
            <span class="hidden md:inline text-[#8c9299]">| GARANTIE 1 AN VÉRASOL</span>
          </div>

          <div class="flex items-center gap-4 text-xs">
            <a [href]="'tel:' + dataService.companyInfo.phoneClean1" class="hover:text-[#111315] hover:underline">
              TÉL : {{ dataService.companyInfo.phone1 }}
            </a>
            <span class="text-[#8c9299]">•</span>
            <a [href]="dataService.getWhatsAppGeneralUrl()" target="_blank" class="text-[#e4002b] font-bold hover:underline">
              WHATSAPP DIRECT
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div class="flex items-stretch justify-between h-16 sm:h-20">
          
          <!-- Logo & Brand Identity -->
          <a routerLink="/" class="flex items-center gap-3 pr-6 focus:outline-none border-r border-[#111315]/10" (click)="closeMobileMenu()">
            <div class="w-9 h-9 bg-[#111315] text-white flex items-center justify-center font-mono font-black text-base tracking-tighter">
              GI
            </div>
            <div>
              <div class="font-black text-sm sm:text-base tracking-tight text-[#111315] leading-none">
                GREEN INNOVATORS
              </div>
              <div class="kicker text-[10px] text-[#5b6066] mt-0.5">
                SYSTÈMES SOLAIRES & POMPAGE
              </div>
            </div>
          </a>

          <!-- Desktop Navigation Items -->
          <nav class="hidden md:flex items-stretch text-xs font-bold uppercase tracking-wider">
            <a 
              routerLink="/" 
              routerLinkActive="text-[#e4002b] border-b-2 border-[#e4002b]" 
              [routerLinkActiveOptions]="{ exact: true }"
              class="px-4 flex items-center text-[#111315] hover:text-[#e4002b] transition-colors border-r border-[#111315]/10">
              Accueil
            </a>

            <a 
              routerLink="/boutique" 
              routerLinkActive="text-[#e4002b] border-b-2 border-[#e4002b]"
              class="px-4 flex items-center text-[#111315] hover:text-[#e4002b] transition-colors border-r border-[#111315]/10">
              Boutique & Tarifs
            </a>

            <a 
              routerLink="/financement" 
              routerLinkActive="text-[#e4002b] border-b-2 border-[#e4002b]"
              class="px-4 flex items-center text-[#111315] hover:text-[#e4002b] transition-colors border-r border-[#111315]/10">
              Paiement par Mois
            </a>

            <a 
              routerLink="/services" 
              routerLinkActive="text-[#e4002b] border-b-2 border-[#e4002b]"
              class="px-4 flex items-center text-[#111315] hover:text-[#e4002b] transition-colors border-r border-[#111315]/10">
              Pompage & Services
            </a>

            <a 
              routerLink="/contact" 
              routerLinkActive="text-[#e4002b] border-b-2 border-[#e4002b]"
              class="px-4 flex items-center text-[#111315] hover:text-[#e4002b] transition-colors border-r border-[#111315]/10">
              Contact & Devis
            </a>
          </nav>

          <!-- Cart Drawer Button & Mobile Menu Trigger -->
          <div class="flex items-center gap-2 pl-4">
            <!-- Cart Trigger -->
            <button 
              (click)="cartService.toggleCart()" 
              type="button" 
              aria-label="Voir le panier"
              class="h-10 px-3 border border-[#111315] bg-white text-[#111315] hover:bg-[#111315] hover:text-white transition-colors flex items-center gap-2 text-xs font-mono font-bold cursor-pointer">
              <mat-icon class="!w-4 !h-4 !text-[16px]">shopping_bag</mat-icon>
              <span>PANIER</span>
              <span class="bg-[#e4002b] text-white text-[10px] px-1.5 py-0.2 font-mono">
                {{ cartService.itemCount() }}
              </span>
            </button>

            <!-- Mobile Hamburger -->
            <button 
              (click)="toggleMobileMenu()" 
              type="button" 
              aria-label="Menu"
              class="md:hidden h-10 w-10 border border-[#111315] bg-white text-[#111315] hover:bg-[#f1f3f5] flex items-center justify-center cursor-pointer">
              <mat-icon class="!w-5 !h-5 !text-[20px]">{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden border-t border-[#111315]/15 bg-white px-4 py-4 space-y-1 font-mono text-xs uppercase tracking-wider">
          <a 
            routerLink="/" 
            (click)="closeMobileMenu()" 
            class="block py-2.5 px-3 border-b border-gray-100 text-[#111315] hover:text-[#e4002b]">
            → 01. Accueil
          </a>
          <a 
            routerLink="/boutique" 
            (click)="closeMobileMenu()" 
            class="block py-2.5 px-3 border-b border-gray-100 text-[#111315] hover:text-[#e4002b]">
            → 02. Boutique & Tarifs
          </a>
          <a 
            routerLink="/financement" 
            (click)="closeMobileMenu()" 
            class="block py-2.5 px-3 border-b border-gray-100 text-[#111315] hover:text-[#e4002b]">
            → 03. Paiement par Mois
          </a>
          <a 
            routerLink="/services" 
            (click)="closeMobileMenu()" 
            class="block py-2.5 px-3 border-b border-gray-100 text-[#111315] hover:text-[#e4002b]">
            → 04. Pompage & Services
          </a>
          <a 
            routerLink="/contact" 
            (click)="closeMobileMenu()" 
            class="block py-2.5 px-3 border-b border-gray-100 text-[#111315] hover:text-[#e4002b]">
            → 05. Contact & Devis
          </a>

          <div class="pt-3 flex gap-2">
            <a 
              [href]="dataService.getWhatsAppGeneralUrl()" 
              target="_blank"
              class="flex-1 py-2.5 text-center bg-[#e4002b] text-white font-bold">
              WhatsApp Direct
            </a>
            <a 
              [href]="'tel:' + dataService.companyInfo.phoneClean1" 
              class="flex-1 py-2.5 text-center border border-[#111315] text-[#111315] font-bold">
              Appeler
            </a>
          </div>
        </div>
      }

    </header>
  `
})
export class HeaderComponent {
  cartService = inject(CartService);
  dataService = inject(SolarDataService);

  isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
