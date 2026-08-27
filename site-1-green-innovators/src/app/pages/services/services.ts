import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SolarServiceItem } from '../../models/product.model';
import { SolarDataService } from '../../services/solar-data.service';
import { ProductVisual } from '../../components/product-visual/product-visual';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    ProductVisual
  ],
  template: `
    <div class="w-full font-sans pb-16 space-y-12">
      
      <!-- Services Header -->
      <section class="border-b border-[#111315]/15 pt-8 sm:pt-12 pb-10 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div class="space-y-4 max-w-3xl">
          <div class="kicker text-[#e4002b]">INGÉNIERIE PHOTOVOLTAÏQUE & FORAGES • GREEN INNOVATORS SARL</div>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111315] tracking-tight leading-tight">
            Vous avez l'eau. Nous avons l'énergie pour la pompe.
          </h1>

          <p class="text-sm sm:text-base text-[#5b6066] leading-relaxed">
            Solutions solaires de pompage et d'irrigation pour <strong class="text-[#111315]">agriculteurs</strong>, <strong class="text-[#111315]">pisciculteurs</strong> et <strong class="text-[#111315]">habitations</strong>. Zéro facture d'électricité, zéro coût de carburant.
          </p>
        </div>
      </section>

      <!-- 5 STEPS SCHEMATIC SPREAD (Extracted directly from the official flyer) -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-6">
        <div class="border-b border-[#111315]/15 pb-2">
          <div class="kicker text-[#e4002b]">SCHÉMA EN 5 ÉTAPES DU SYSTÈME DE POMPAGE SOLAIRE</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          <!-- Step 1 -->
          <div class="border border-[#111315]/15 bg-white p-5 space-y-3">
            <div class="w-10 h-10 bg-[#e0f2fe] text-[#0284c7] border border-[#0284c7] flex items-center justify-center font-mono font-black text-sm">
              01
            </div>
            <h3 class="font-black text-base text-[#111315]">Source d'eau</h3>
            <p class="text-xs text-[#5b6066] leading-relaxed">
              Forage profond (30m à 120m), puits traditionnel, rivière ou source naturelle.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="border border-[#111315]/15 bg-white p-5 space-y-3">
            <div class="w-10 h-10 bg-[#fef3c7] text-[#d97706] border border-[#d97706] flex items-center justify-center font-mono font-black text-sm">
              02
            </div>
            <h3 class="font-black text-base text-[#111315]">Énergie solaire</h3>
            <p class="text-xs text-[#5b6066] leading-relaxed">
              Champ de panneaux solaires photovoltaïques 100% garanti et certifié haute durabilité.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="border border-[#111315]/15 bg-white p-5 space-y-3">
            <div class="w-10 h-10 bg-[#e0f2fe] text-[#0284c7] border border-[#0284c7] flex items-center justify-center font-mono font-black text-sm">
              03
            </div>
            <h3 class="font-black text-base text-[#111315]">Pompage solaire</h3>
            <p class="text-xs text-[#5b6066] leading-relaxed">
              Pompe immergée ou de surface Brushless en acier inoxydable haute performance.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="border border-[#111315]/15 bg-white p-5 space-y-3">
            <div class="w-10 h-10 bg-[#e0f2fe] text-[#0284c7] border border-[#0284c7] flex items-center justify-center font-mono font-black text-sm">
              04
            </div>
            <h3 class="font-black text-base text-[#111315]">Stockage & Distribution</h3>
            <p class="text-xs text-[#5b6066] leading-relaxed">
              Réservoir sur château d'eau et réseau d'acheminement par gravité.
            </p>
          </div>

          <!-- Step 5 -->
          <div class="border border-[#111315]/15 bg-white p-5 space-y-3">
            <div class="w-10 h-10 bg-[#dcfce7] text-[#16a34a] border border-[#16a34a] flex items-center justify-center font-mono font-black text-sm">
              05
            </div>
            <h3 class="font-black text-base text-[#111315]">Votre production</h3>
            <p class="text-xs text-[#5b6066] leading-relaxed">
              Irrigation des cultures maraîchères, abreuvement du bétail ou élevage de poissons.
            </p>
          </div>

        </div>
      </section>

      <!-- 3 TARGET PILLARS -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-6">
        <div class="border-b border-[#111315]/15 pb-2">
          <div class="kicker text-[#e4002b]">SOLUTIONS ADAPTÉES À VOTRE ACTIVITÉ</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div class="border-2 border-[#16a34a] bg-white overflow-hidden flex flex-col justify-between">
            <div class="h-44 w-full border-b border-[#16a34a]/20">
              <app-product-visual src="/assets/images/solar_irrigation_farm_1787573622091.jpg" altText="Irrigation solaire agricole"></app-product-visual>
            </div>
            <div class="p-6 space-y-3">
              <div class="text-xs font-mono font-bold text-[#16a34a] uppercase">01 • SECTEUR AGRICOLE</div>
              <h3 class="text-xl font-black text-[#111315]">Agriculteurs & Planteurs</h3>
              <p class="text-xs text-[#5b6066] leading-relaxed">
                Irrigation goutte-à-goutte, maraîchage intensif, arrosage de pépinières, grandes plantations de cacao/café/palmiers et abreuvement du bétail sans groupe électrogène.
              </p>
              <div class="text-[11px] font-mono text-[#16a34a] pt-2">
                ✓ Économies de 100% sur le carburant
              </div>
            </div>
          </div>

          <div class="border-2 border-[#0284c7] bg-white overflow-hidden flex flex-col justify-between">
            <div class="h-44 w-full border-b border-[#0284c7]/20">
              <app-product-visual src="/assets/images/solar_pumping_1787536352715.jpg" altText="Pompage solaire bassins piscicoles"></app-product-visual>
            </div>
            <div class="p-6 space-y-3">
              <div class="text-xs font-mono font-bold text-[#0284c7] uppercase">02 • SECTEUR PISCICOLE</div>
              <h3 class="text-xl font-black text-[#111315]">Pisciculteurs</h3>
              <p class="text-xs text-[#5b6066] leading-relaxed">
                Alimentation continue des bassins piscicoles, oxygénation naturelle, remplissage rapide et renouvellement permanent de l'eau pour la santé et la croissance rapide des alevins.
              </p>
              <div class="text-[11px] font-mono text-[#0284c7] pt-2">
                ✓ Fonctionnement silencieux non stressant
              </div>
            </div>
          </div>

          <div class="border-2 border-[#d97706] bg-white overflow-hidden flex flex-col justify-between">
            <div class="h-44 w-full border-b border-[#d97706]/20">
              <app-product-visual src="/assets/images/technician_roof_1787536303760.jpg" altText="Installation château d'eau et toiture solaire"></app-product-visual>
            </div>
            <div class="p-6 space-y-3">
              <div class="text-xs font-mono font-bold text-[#d97706] uppercase">03 • HABITATIONS & DOMAINES</div>
              <h3 class="text-xl font-black text-[#111315]">Habitations & Châteaux d'Eau</h3>
              <p class="text-xs text-[#5b6066] leading-relaxed">
                Approvisionnement en eau potable des maisons familiales, remplissage automatique des réservoirs de toit et châteaux d'eau, sans dépendre des coupures du réseau public.
              </p>
              <div class="text-[11px] font-mono text-[#d97706] pt-2">
                ✓ Remplissage automatique au fil du soleil
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- OUR 5-STEP ACCOMPANIMENT & CIRCULAR ECONOMY -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div class="border border-[#111315] bg-[#111315] text-white p-8 space-y-6">
          <div class="kicker text-[#f59e0b]">NOTRE ACCOMPAGNEMENT COMPLET DE BOUT EN BOUT</div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
            <div class="border border-white/20 p-4 space-y-2">
              <span class="text-[#f59e0b] font-bold">1. Diagnostic</span>
              <p class="text-[#8c9299]">Étude approfondie de votre besoin, profondeur et débit d'eau.</p>
            </div>

            <div class="border border-white/20 p-4 space-y-2">
              <span class="text-[#f59e0b] font-bold">2. Dimensionnement</span>
              <p class="text-[#8c9299]">Calcul précis du champ photovoltaïque et puissance pompe.</p>
            </div>

            <div class="border border-white/20 p-4 space-y-2">
              <span class="text-[#f59e0b] font-bold">3. Matériel Vérasol</span>
              <p class="text-[#8c9299]">Fourniture d'équipements de première qualité sous garantie.</p>
            </div>

            <div class="border border-white/20 p-4 space-y-2">
              <span class="text-[#f59e0b] font-bold">4. Pose sur Site</span>
              <p class="text-[#8c9299]">Installation professionnelle par nos techniciens à Douala.</p>
            </div>

            <div class="border border-white/20 p-4 space-y-2">
              <span class="text-[#f59e0b] font-bold">5. Suivi SAV</span>
              <p class="text-[#8c9299]">Maintenance réactive et politique d'économie circulaire.</p>
            </div>
          </div>

          <div class="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-xs text-[#8c9299] font-mono">
              ♻️ <strong class="text-white">Économie circulaire :</strong> Nous assurons la collecte, la valorisation et le recyclage de vos équipements solaires en fin de vie.
            </div>

            <a 
              [href]="dataService.getWhatsAppQuoteUrl('Système Pompage Solaire', 'Client', 'Demande étude de forage et pompage')"
              target="_blank"
              class="px-6 py-3 bg-[#e4002b] hover:bg-[#c70025] text-white font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              Demander une étude pompage →
            </a>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ServicesComponent {
  dataService = inject(SolarDataService);
  services = computed<SolarServiceItem[]>(() => this.dataService.getServices());
}
