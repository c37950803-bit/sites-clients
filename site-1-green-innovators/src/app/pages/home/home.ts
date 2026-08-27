import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SolarDataService } from '../../services/solar-data.service';
import { CartService } from '../../services/cart.service';
import { FieldGalleryItem, Product } from '../../models/product.model';
import { ProductVisual } from '../../components/product-visual/product-visual';
import { ProductModalComponent } from '../../components/product-modal/product-modal';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatIconModule,
    ProductVisual,
    ProductModalComponent
  ],
  template: `
    <div class="w-full font-sans pb-16 space-y-16 sm:space-y-24">
      
      <!-- HERO SPREAD: MÜLLER-BROCKMANN 12-COL GRID -->
      <section class="border-b border-[#111315]/15 pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          <!-- Col 1 to 7: Typography & Core Mandate -->
          <div class="md:col-span-7 space-y-6">
            <div class="kicker text-[#e4002b] flex items-center gap-2">
              <span class="inline-block w-2.5 h-2.5 bg-[#e4002b]"></span>
              <span>GREEN INNOVATORS SARL • VOS ÉCONOMIES, NOTRE PRIORITÉ</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111315] tracking-tight leading-[1.05]">
              Nous rendons l'énergie solaire plus accessible, plus fiable, plus durable.
            </h1>

            <p class="text-base sm:text-lg text-[#5b6066] max-w-xl leading-relaxed">
              Solutions solaires complètes pour <strong class="text-[#111315]">maisons</strong>, <strong class="text-[#111315]">entreprises</strong> et <strong class="text-[#111315]">agriculture</strong>. Équipements certifiés <strong class="text-[#111315]">Vérasol</strong> avec garantie 1 an, service après-vente permanent et paiement échelonné de 7 à 35 mois.
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a 
                routerLink="/boutique" 
                class="px-6 py-3.5 bg-[#111315] text-white hover:bg-[#e4002b] transition-colors font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2">
                <span>Consulter la boutique</span>
                <span>→</span>
              </a>

              <a 
                routerLink="/financement" 
                class="px-6 py-3.5 border border-[#111315] text-[#111315] hover:bg-[#111315] hover:text-white transition-colors font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2">
                <span>Simuler mes mensualités</span>
              </a>
            </div>
          </div>

          <!-- Col 8 to 12: Big Swiss Key Metric & Payment Code Block -->
          <div class="md:col-span-5 border-l-0 md:border-l border-[#111315]/15 md:pl-8 space-y-6">
            <div class="kicker text-[#8c9299]">PAIEMENT SÉCURISÉ & COORDONNÉES</div>

            <!-- USSD Orange Money Box -->
            <div class="border-2 border-[#111315] bg-[#fffbeb] p-4 space-y-2">
              <div class="flex items-center justify-between text-[11px] font-mono font-bold text-[#d97706]">
                <span>PAIEMENT MOBILE MONEY</span>
                <span>CODE OFFICIEL GI</span>
              </div>
              <div class="text-base sm:text-lg font-black font-mono text-[#111315] bg-white border border-[#111315] p-2 text-center select-all">
                {{ dataService.companyInfo.ussdOrangeMoney }}
              </div>
              <div class="text-[11px] text-[#5b6066] font-mono text-center">
                Assistance directe : <strong class="text-[#111315]">{{ dataService.companyInfo.phone1 }}</strong> / <strong class="text-[#111315]">{{ dataService.companyInfo.phone2 }}</strong>
              </div>
            </div>

            <div class="space-y-3">
              <div class="border-b border-[#111315]/10 pb-2">
                <div class="text-2xl sm:text-3xl font-black font-mono text-[#111315] numeral">1 AN</div>
                <div class="text-xs text-[#5b6066]">Garantie certifiée Vérasol avec SAV direct à Douala</div>
              </div>

              <div class="border-b border-[#111315]/10 pb-2">
                <div class="text-2xl sm:text-3xl font-black font-mono text-[#e4002b] numeral">35 MOIS</div>
                <div class="text-xs text-[#5b6066]">Financement échelonné accessible sans formalités bancaires</div>
              </div>

              <div class="border-b border-[#111315]/10 pb-2">
                <div class="text-2xl sm:text-3xl font-black font-mono text-[#111315] numeral">0 FCFA</div>
                <div class="text-xs text-[#5b6066]">Carburant requis pour vos kits photovoltaïques</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- SECTION 01: FLAGSHIP KITS & PRODUCTS -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#111315]/15 pb-4">
          <div>
            <div class="kicker text-[#e4002b]">SECTION 01 • SÉLECTION MATÉRIEL</div>
            <h2 class="text-2xl sm:text-3xl font-black text-[#111315] tracking-tight mt-1">
              Kits Solaires & Tarifs Promo Spéciale
            </h2>
          </div>

          <div class="flex items-center gap-4 text-xs font-mono">
            <span class="text-[#8c9299]">MODE DE PRIX :</span>
            <button 
              type="button"
              (click)="preferredMode.set('cash')"
              [class]="preferredMode() === 'cash' ? 'font-bold text-[#111315] underline decoration-[#e4002b] decoration-2' : 'text-[#5b6066] hover:text-[#111315]'"
              class="cursor-pointer">
              PRIX CASH PROMO
            </button>
            <span>/</span>
            <button 
              type="button"
              (click)="preferredMode.set('financing')"
              [class]="preferredMode() === 'financing' ? 'font-bold text-[#e4002b] underline decoration-[#e4002b] decoration-2' : 'text-[#5b6066] hover:text-[#111315]'"
              class="cursor-pointer">
              PAR MOIS
            </button>
          </div>
        </div>

        <!-- 4-Column Modular Product Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (prod of featuredProducts(); track prod.id) {
            <div class="border border-[#111315]/15 bg-white flex flex-col justify-between hover:border-[#111315] transition-colors group">
              
              <div class="p-5 space-y-4">
                <!-- Visual Box -->
                <div class="w-full aspect-4/3 border border-[#e2e4e8] bg-[#f8f9fa] flex items-center justify-center relative overflow-hidden">
                  <app-product-visual [src]="prod.image" [altText]="prod.name" [type]="prod.category"></app-product-visual>
                  
                  @if (prod.discountPercentage) {
                    <span class="absolute top-2 right-2 px-1.5 py-0.5 bg-[#e4002b] text-white font-mono text-[9px] font-bold">
                      -{{ prod.discountPercentage }}%
                    </span>
                  }
                </div>

                <!-- Product Info -->
                <div class="space-y-1">
                  <div class="kicker text-[10px] text-[#e4002b]">{{ prod.categoryLabel }}</div>
                  <h3 class="font-black text-base text-[#111315] leading-snug">
                    {{ prod.name }}
                  </h3>
                  <p class="text-xs text-[#5b6066] line-clamp-2 mt-1">
                    {{ prod.subtitle }}
                  </p>
                </div>

                <!-- Features bullet points -->
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

              <!-- Card Actions -->
              <div class="p-5 pt-0 grid grid-cols-2 gap-2 font-mono text-xs">
                <button 
                  type="button" 
                  (click)="openModal(prod)" 
                  class="py-2.5 px-2 border border-[#111315] text-[#111315] hover:bg-[#f1f3f5] font-bold text-[11px] uppercase cursor-pointer text-center">
                  Détails
                </button>

                <button 
                  type="button" 
                  (click)="addToCart(prod)" 
                  class="py-2.5 px-2 bg-[#111315] text-white hover:bg-[#e4002b] font-bold text-[11px] uppercase cursor-pointer text-center transition-colors">
                  + Panier
                </button>
              </div>

            </div>
          }
        </div>

        <div class="text-center pt-2">
          <a 
            routerLink="/boutique" 
            class="inline-block px-8 py-3.5 border border-[#111315] text-[#111315] hover:bg-[#111315] hover:text-white transition-colors font-mono text-xs font-bold uppercase tracking-wider">
            Consulter les kits du catalogue complet →
          </a>
        </div>

      </section>

      <!-- SECTION 02: 15 FIELD PHOTOS, FLYERS & TECHNICAL GALLERY -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#111315]/15 pb-4">
          <div>
            <div class="kicker text-[#e4002b]">SECTION 02 • GALERIE OFFICIELLE (15 SUPPORTS & RÉALISATIONS)</div>
            <h2 class="text-2xl sm:text-3xl font-black text-[#111315] tracking-tight mt-1">
              Sur le Terrain & Documentation Technique
            </h2>
            <p class="text-xs sm:text-sm text-[#5b6066] mt-1">
              Explorez nos chantiers d'installation à Douala, livraisons dans les villages, déploiements de pompage et flyers de tarifs.
            </p>
          </div>

          <!-- Gallery Category Filter -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
            <button 
              type="button"
              (click)="galleryFilter.set('all')"
              [class]="galleryFilter() === 'all' ? 'bg-[#111315] text-white font-bold' : 'bg-[#f8f9fa] text-[#5b6066] hover:text-[#111315]'"
              class="px-3 py-1.5 whitespace-nowrap cursor-pointer">
              TOUS (15)
            </button>
            <button 
              type="button"
              (click)="galleryFilter.set('terrain')"
              [class]="galleryFilter() === 'terrain' ? 'bg-[#111315] text-white font-bold' : 'bg-[#f8f9fa] text-[#5b6066] hover:text-[#111315]'"
              class="px-3 py-1.5 whitespace-nowrap cursor-pointer">
              TERRAIN & ÉQUIPE
            </button>
            <button 
              type="button"
              (click)="galleryFilter.set('produit')"
              [class]="galleryFilter() === 'produit' ? 'bg-[#111315] text-white font-bold' : 'bg-[#f8f9fa] text-[#5b6066] hover:text-[#111315]'"
              class="px-3 py-1.5 whitespace-nowrap cursor-pointer">
              PACKS PRODUITS
            </button>
            <button 
              type="button"
              (click)="galleryFilter.set('flyer')"
              [class]="galleryFilter() === 'flyer' ? 'bg-[#111315] text-white font-bold' : 'bg-[#f8f9fa] text-[#5b6066] hover:text-[#111315]'"
              class="px-3 py-1.5 whitespace-nowrap cursor-pointer">
              FLYERS & TARIFS
            </button>
          </div>
        </div>

        <!-- Gallery Grid (15 items) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of filteredGallery(); track item.id) {
            <div class="border border-[#111315]/15 bg-white flex flex-col justify-between hover:border-[#111315] transition-all">
              
              <div>
                <!-- Visual Box -->
                <div class="w-full aspect-16/10 border-b border-[#e2e4e8] bg-[#f8f9fa] flex items-center justify-center relative overflow-hidden">
                  <app-product-visual [src]="item.image" [type]="item.svgType" [altText]="item.title"></app-product-visual>
                  
                  <span class="absolute top-2 right-2 px-2 py-0.5 bg-[#111315] text-white font-mono text-[9px] font-bold">
                    {{ item.badge }}
                  </span>
                </div>

                <!-- Caption Content -->
                <div class="p-5 space-y-2">
                  <div class="flex items-center justify-between text-[10px] font-mono text-[#8c9299]">
                    <span class="text-[#e4002b] font-bold uppercase">{{ item.categoryLabel }}</span>
                    <span>{{ item.location }}</span>
                  </div>

                  <h3 class="font-black text-base text-[#111315] leading-snug">
                    {{ item.title }}
                  </h3>

                  <p class="text-xs text-[#5b6066] leading-relaxed">
                    {{ item.caption }}
                  </p>
                </div>
              </div>

              <!-- Action Link -->
              <div class="p-5 pt-0">
                <a 
                  [href]="dataService.getWhatsAppQuoteUrl(item.title, 'Client', 'Renseignements sur: ' + item.title)"
                  target="_blank"
                  class="w-full py-2.5 text-center border border-[#111315] hover:bg-[#111315] hover:text-white font-mono text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors">
                  <span>Demander infos</span>
                  <span>→</span>
                </a>
              </div>

            </div>
          }
        </div>

      </section>

      <!-- SECTION 03: OFFICIAL TARIFF MATRIX WITH FLYER NUMBERS -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-6">
        <div class="border-b border-[#111315]/15 pb-3">
          <div class="kicker text-[#e4002b]">SECTION 03 • GRILLE COMPARATIVE OFFICIELLE</div>
          <h2 class="text-2xl font-black text-[#111315] tracking-tight mt-1">
            Tableau Synthétique des Formules & Échéances
          </h2>
        </div>

        <div class="overflow-x-auto border border-[#111315]/20">
          <table class="w-full text-left text-xs font-mono">
            <thead class="bg-[#111315] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th class="p-3 border-r border-white/10">Équipement Solaire</th>
                <th class="p-3 border-r border-white/10">Composants & Détails Inclus</th>
                <th class="p-3 border-r border-white/10">Acompte Initial</th>
                <th class="p-3 border-r border-white/10">Mensualité Fixe</th>
                <th class="p-3 border-r border-white/10">Durée</th>
                <th class="p-3">Prix Cash Promo</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#111315]/10 bg-white">
              @for (item of tariffList(); track item.name) {
                <tr class="hover:bg-[#f8f9fa] transition-colors">
                  <td class="p-3 font-bold text-[#111315] border-r border-[#111315]/10">
                    <div>{{ item.name }}</div>
                    @if (item.tag) {
                      <span class="inline-block px-1.5 py-0.5 bg-[#fef08a] text-[#854d0e] text-[9px] font-bold mt-1">
                        {{ item.tag }}
                      </span>
                    }
                  </td>
                  <td class="p-3 text-[#5b6066] border-r border-[#111315]/10 max-w-xs">
                    {{ item.components }}
                  </td>
                  <td class="p-3 font-bold text-[#111315] border-r border-[#111315]/10">
                    {{ dataService.formatPrice(item.downPayment) }}
                  </td>
                  <td class="p-3 font-bold text-[#e4002b] border-r border-[#111315]/10">
                    {{ dataService.formatPrice(item.monthlyPayment) }}/m
                  </td>
                  <td class="p-3 font-bold text-[#111315] border-r border-[#111315]/10">
                    {{ item.months }} Mois
                  </td>
                  <td class="p-3 font-black text-[#111315]">
                    {{ dataService.formatPrice(item.cashPrice) }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 04: AGRICULTURAL PUMPING & WATER ENGINEERING -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div class="border border-[#111315] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#f8f9fa]">
          
          <div class="md:col-span-8 space-y-4">
            <div class="kicker text-[#e4002b]">SERVICES D'INGÉNIERIE • VOUS AVEZ L'EAU, NOUS AVONS L'ÉNERGIE</div>
            <h3 class="text-2xl sm:text-3xl font-black text-[#111315] tracking-tight">
              Solutions Solaires de Pompage et d'Irrigation
            </h3>
            <p class="text-xs sm:text-sm text-[#5b6066] leading-relaxed max-w-2xl">
              Alimentation sans carburant pour <strong class="text-[#111315]">agriculteurs</strong> (maraîchage, pépinières, bétail), <strong class="text-[#111315]">pisciculteurs</strong> (alimentation et renouvellement des bassins) et <strong class="text-[#111315]">habitations</strong> (adduction d'eau et châteaux d'eau).
            </p>
            <div class="flex flex-wrap gap-4 text-xs font-mono text-[#111315] pt-1">
              <span>✓ Forages de 30m à 120m</span>
              <span>✓ Étude de débit & dimensionnement</span>
              <span>✓ Collecte et recyclage des équipements</span>
            </div>
          </div>

          <div class="md:col-span-4 flex flex-col gap-2.5">
            <a 
              routerLink="/services" 
              class="w-full py-3.5 text-center bg-[#111315] text-white hover:bg-[#e4002b] transition-colors font-mono text-xs font-bold uppercase tracking-wider">
              Découvrir les 5 étapes du pompage →
            </a>
            <a 
              [href]="dataService.getWhatsAppGeneralUrl()" 
              target="_blank"
              class="w-full py-3.5 text-center border border-[#111315] text-[#111315] hover:bg-white transition-colors font-mono text-xs font-bold uppercase tracking-wider">
              Contacter un ingénieur GI
            </a>
          </div>

        </div>
      </section>

    </div>

    <!-- Product Modal -->
    <app-product-modal 
      [product]="activeModalProduct()" 
      (closeModal)="activeModalProduct.set(null)">
    </app-product-modal>
  `
})
export class HomeComponent {
  dataService = inject(SolarDataService);
  cartService = inject(CartService);

  allProducts = computed<Product[]>(() => this.dataService.getProducts());
  featuredProducts = computed<Product[]>(() => this.dataService.getProducts().slice(0, 4));
  galleryList = computed<FieldGalleryItem[]>(() => this.dataService.getFieldGallery());
  tariffList = computed(() => this.dataService.getTariffTable());

  preferredMode = signal<'cash' | 'financing'>('cash');
  galleryFilter = signal<string>('all');
  activeModalProduct = signal<Product | null>(null);

  filteredGallery = computed<FieldGalleryItem[]>(() => {
    const f = this.galleryFilter();
    const list = this.galleryList();
    if (f === 'all') return list;
    if (f === 'terrain') return list.filter(i => i.category === 'terrain' || i.category === 'installation');
    return list.filter(i => i.category === f);
  });

  openModal(product: Product): void {
    this.activeModalProduct.set(product);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.preferredMode(), 1, false);
  }
}
