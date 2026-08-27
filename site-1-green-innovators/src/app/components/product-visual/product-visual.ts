import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-product-visual',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative w-full h-full min-h-[140px] bg-[#f8f9fa] overflow-hidden flex items-center justify-center select-none group">
      
      <!-- Primary Image Element (Loaded directly from /assets/images/ for 100% offline support) -->
      @if (!hasError()) {
        <img 
          [src]="imageSrc()" 
          [alt]="altText() || 'Équipement Solaire Green Innovators'"
          (load)="onImageLoaded()"
          (error)="onImageError()"
          referrerpolicy="no-referrer"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          [class.opacity-0]="!isLoaded()"
          [class.opacity-100]="isLoaded()"
        />
      }

      <!-- Loading Placeholder Skeleton -->
      @if (!isLoaded() && !hasError()) {
        <div class="absolute inset-0 bg-[#e9ecef] animate-pulse flex items-center justify-center">
          <div class="w-8 h-8 rounded-full border-2 border-[#111315]/20 border-t-[#111315] animate-spin"></div>
        </div>
      }

      <!-- Offline Fallback in case of asset issue -->
      @if (hasError()) {
        <div class="absolute inset-0 bg-[#f1f3f5] flex flex-col items-center justify-center p-4 text-center">
          <div class="w-10 h-10 bg-[#111315]/10 rounded-full flex items-center justify-center text-[#111315] mb-2 font-mono font-bold text-xs">
            GI
          </div>
          <span class="text-xs font-mono font-bold text-[#111315] truncate max-w-full">
            {{ altText() || 'Matériel Solaire' }}
          </span>
          <span class="text-[10px] text-[#8c9299] font-mono mt-1">
            Green Innovators SARL
          </span>
        </div>
      }

      <!-- Subtle corner badge indicator -->
      <div class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111315]/80 text-white text-[8px] font-mono px-1.5 py-0.5 pointer-events-none uppercase">
        Vérasol HD
      </div>

    </div>
  `
})
export class ProductVisual {
  src = input<string>('');
  altText = input<string>('');
  type = input<string>('');

  isLoaded = signal<boolean>(false);
  hasError = signal<boolean>(false);

  // Map category/type to exact asset images stored in /assets/images/
  imageSrc = computed<string>(() => {
    const directSrc = this.src();
    if (directSrc && directSrc.trim() !== '') {
      return directSrc;
    }

    const t = (this.type() || '').toLowerCase();
    const a = (this.altText() || '').toLowerCase();

    // Flyer types
    if (t.includes('flyer-promo') || a.includes('tarifs') || t.includes('promo')) {
      return '/assets/images/solar_tv_kit_1787536318623.jpg';
    }
    if (t.includes('flyer-pumping') || t.includes('pompage') || a.includes('pompage') || a.includes('forage')) {
      return '/assets/images/solar_pumping_1787536352715.jpg';
    }
    if (t.includes('brand-logo') || a.includes('logo') || t.includes('logo')) {
      return '/assets/images/green_innovators_logo_1787573609521.jpg';
    }
    if (t.includes('flyer-6devices') || a.includes('6 appareils') || a.includes('alimenter') || t.includes('powerplay')) {
      return '/assets/images/green_powerplay_pro_1787537976494.jpg';
    }

    // Field types
    if (t.includes('team-field') || a.includes('ingénierie') || a.includes('champ')) {
      return '/assets/images/solar_irrigation_farm_1787573622091.jpg';
    }
    if (t.includes('team-stand') || a.includes('déballage') || a.includes('distribution')) {
      return '/assets/images/powerplay_box_1787536335157.jpg';
    }
    if (t.includes('team-handover') || a.includes('remise')) {
      return '/assets/images/team_village_handover_1787573583207.jpg';
    }
    if (t.includes('team-walk') || a.includes('livraison') || a.includes('forêt')) {
      return '/assets/images/technician_forest_walk_1787573595900.jpg';
    }
    if (t.includes('technician-roof') || a.includes('toiture') || t.includes('installation')) {
      return '/assets/images/technician_roof_1787536303760.jpg';
    }

    // Product types
    if (t.includes('prod-4tubes') || t.includes('basic') || a.includes('4 lampes') || a.includes('4 tubes') || a.includes('poulailler')) {
      return '/assets/images/solar_poultry_farm_1787536289253.jpg';
    }
    if (t.includes('prod-home60') || t.includes('radio') || a.includes('radio')) {
      return '/assets/images/sunking_radio_kit_1787573570678.jpg';
    }
    if (t.includes('prod-lantern') || t.includes('lanterne') || a.includes('lanterne') || a.includes('trépied')) {
      return '/assets/images/lantern_tripod_1787573559411.jpg';
    }
    if (t.includes('prod-tv500x') || t.includes('premium') || a.includes('tv') || a.includes('téléviseur') || a.includes('500x')) {
      return '/assets/images/solar_tv_kit_1787536318623.jpg';
    }
    if (t.includes('prod-boom') || a.includes('audio') || a.includes('enceinte')) {
      return '/assets/images/solar_living_room_1787537950092.jpg';
    }
    if (t.includes('prod-tubes-detail') || a.includes('accessoires')) {
      return '/assets/images/solar_freezer_home_1787537937733.jpg';
    }

    // Default fallback
    return '/assets/images/sunking_system_box_1787537963370.jpg';
  });

  onImageLoaded(): void {
    this.isLoaded.set(true);
    this.hasError.set(false);
  }

  onImageError(): void {
    this.hasError.set(true);
    this.isLoaded.set(true);
  }
}
