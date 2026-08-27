import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SolarDataService } from '../../services/solar-data.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatIconModule
  ],
  template: `
    <div class="w-full font-sans pb-16 space-y-12">
      
      <!-- Contact Header -->
      <section class="border-b border-[#111315]/15 pt-8 sm:pt-12 pb-10 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div class="space-y-4 max-w-3xl">
          <div class="kicker text-[#e4002b]">SERVICE CLIENT & INTERVENTIONS DOUALA</div>
          
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111315] tracking-tight leading-tight">
            Contact & Devis Solaire
          </h1>

          <p class="text-sm sm:text-base text-[#5b6066] leading-relaxed">
            Une question technique, une demande de dimensionnement ou une commande immédiate ? Nos ingénieurs et techniciens vous répondent en continu.
          </p>
        </div>
      </section>

      <!-- Contact Info & Form -->
      <section class="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Coordonnées & Direct Lines -->
          <div class="lg:col-span-5 space-y-6">
            <div class="border border-[#111315]/15 bg-white p-6 space-y-6">
              <div class="kicker text-[#111315]">COORDONNÉES OFFICIELLES</div>

              <div class="space-y-4 text-xs font-mono">
                
                <!-- Phone 1 -->
                <div class="border-b border-[#111315]/10 pb-3">
                  <span class="text-[#8c9299] block text-[10px]">TÉLÉPHONE PRINCIPAL & WHATSAPP :</span>
                  <a [href]="'tel:' + dataService.companyInfo.phoneClean1" class="text-base font-black text-[#111315] hover:text-[#e4002b]">
                    {{ dataService.companyInfo.phone1 }}
                  </a>
                </div>

                <!-- Phone 2 -->
                <div class="border-b border-[#111315]/10 pb-3">
                  <span class="text-[#8c9299] block text-[10px]">LIGNE COMMERCIALE SECONDAIRE :</span>
                  <a [href]="'tel:' + dataService.companyInfo.phoneClean2" class="text-base font-black text-[#111315] hover:text-[#e4002b]">
                    {{ dataService.companyInfo.phone2 }}
                  </a>
                </div>

                <!-- Email -->
                <div class="border-b border-[#111315]/10 pb-3">
                  <span class="text-[#8c9299] block text-[10px]">EMAIL :</span>
                  <a [href]="'mailto:' + dataService.companyInfo.email" class="text-xs font-bold text-[#111315] hover:text-[#e4002b]">
                    {{ dataService.companyInfo.email }}
                  </a>
                </div>

                <!-- Location -->
                <div>
                  <span class="text-[#8c9299] block text-[10px]">SIÈGE & ZONE D'INTERVENTION :</span>
                  <strong class="text-[#111315] text-xs block leading-relaxed">
                    Douala, Cameroun (Interventions Littoral, Ouest, Centre, Nord & Sud)
                  </strong>
                </div>

              </div>

              <a 
                [href]="dataService.getWhatsAppGeneralUrl()"
                target="_blank"
                class="w-full py-3.5 px-4 bg-[#e4002b] hover:bg-[#c70025] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors">
                <mat-icon class="!w-4 !h-4 !text-[16px]">chat</mat-icon>
                <span>Écrire sur WhatsApp</span>
              </a>
            </div>

            <!-- Guarantee Box -->
            <div class="border border-[#111315]/15 bg-[#f8f9fa] p-5 space-y-2 text-xs font-mono">
              <div class="font-bold text-[#111315]">CERTIFICATION & SERVICE APRÈS-VENTE :</div>
              <p class="text-[#5b6066]">
                Tous nos équipements bénéficient de la garantie 1 an Vérasol et d'une prise en charge SAV directe par nos équipes à Douala.
              </p>
            </div>
          </div>

          <!-- Right Column: Devis Form -->
          <div class="lg:col-span-7 border border-[#111315] bg-white p-6 sm:p-8 space-y-6">
            <div>
              <div class="kicker text-[#e4002b]">FORMULAIRE EXPRESS</div>
              <h2 class="text-2xl font-black text-[#111315] tracking-tight mt-1">
                Demande de Devis ou Visite Technique
              </h2>
              <p class="text-xs text-[#5b6066] mt-1">
                Transmettez vos coordonnées pour recevoir une proposition de kit solaire ou un devis d'installation.
              </p>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="submitQuote()" class="space-y-4 font-mono text-xs">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contact-name" class="block uppercase text-[#5b6066] mb-1">Nom complet *</label>
                  <input 
                    id="contact-name"
                    type="text" 
                    formControlName="name" 
                    placeholder="Ex: M. Jean-Paul" 
                    class="w-full text-xs font-sans px-3 py-2.5 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none" />
                </div>

                <div>
                  <label for="contact-phone" class="block uppercase text-[#5b6066] mb-1">Numéro Téléphone / WhatsApp *</label>
                  <input 
                    id="contact-phone"
                    type="tel" 
                    formControlName="phone" 
                    placeholder="Ex: 674047592" 
                    class="w-full text-xs font-sans px-3 py-2.5 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="contact-location" class="block uppercase text-[#5b6066] mb-1">Quartier / Ville à Douala *</label>
                  <input 
                    id="contact-location"
                    type="text" 
                    formControlName="location" 
                    placeholder="Ex: Bonamoussadi, Akwa..." 
                    class="w-full text-xs font-sans px-3 py-2.5 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none" />
                </div>

                <div>
                  <label for="contact-service" class="block uppercase text-[#5b6066] mb-1">Équipement Souhaité *</label>
                  <select 
                    id="contact-service"
                    formControlName="service"
                    class="w-full text-xs font-sans px-3 py-2.5 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none">
                    <option value="Kit Éclairage Maison (Green Basic)">Kit Éclairage Maison (Green Basic)</option>
                    <option value="Kit Éclairage + TV 32 pouces (Green Premium)">Kit Éclairage + TV 32 pouces (Green Premium)</option>
                    <option value="Green Lantern Solar (25 200 FCFA)">Green Lantern Solar (25 200 FCFA)</option>
                    <option value="Générateur Solaire PowerPlay Pro 600W">Générateur Solaire PowerPlay Pro 600W</option>
                    <option value="Centrale PowerHub 3.3kW / 5kWh">Centrale PowerHub 3.3kW / 5kWh</option>
                    <option value="Pompage Solaire & Forage Agricole">Pompage Solaire & Forage Agricole</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="contact-message" class="block uppercase text-[#5b6066] mb-1">Détails de votre installation :</label>
                <textarea 
                  id="contact-message"
                  formControlName="message" 
                  rows="3" 
                  placeholder="Précisez vos appareils (lampes, TV, congélateur, pompe de forage...)"
                  class="w-full text-xs font-sans px-3 py-2.5 bg-white border border-[#111315]/30 focus:border-[#e4002b] focus:outline-none"></textarea>
              </div>

              <button 
                type="submit" 
                class="w-full py-3.5 bg-[#111315] hover:bg-[#e4002b] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <mat-icon class="!w-4 !h-4 !text-[16px]">send</mat-icon>
                <span>Envoyer ma demande sur WhatsApp</span>
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ContactComponent {
  dataService = inject(SolarDataService);

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    service: new FormControl('Kit Éclairage Maison (Green Basic)', [Validators.required]),
    message: new FormControl('')
  });

  submitQuote(): void {
    const val = this.contactForm.value;
    const url = this.dataService.getWhatsAppQuoteUrl(
      val.service || 'Installation Solaire',
      {
        name: val.name || 'Client',
        phone: val.phone || 'Non renseigné',
        location: val.location || 'Douala',
        needDesc: val.message || ''
      }
    );

    window.open(url, '_blank');
  }
}
