export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'lanterne' | 'basic' | 'radio' | 'premium' | 'powerplay' | 'pompage' | 'powerhub';
  categoryLabel: string;
  cashPrice: number;
  originalCashPrice?: number;
  discountPercentage?: number;
  promoLabel?: string;
  financingMonths: number;
  financingMonthlyPayment: number;
  financingDownPayment: number;
  financingTotalPrice: number;
  badge?: string;
  tagline: string;
  description: string;
  features: string[];
  poweredDevices: string[];
  specs: {
    solarPanel: string;
    battery: string;
    lighting: string;
    warranty: string;
    certification: string;
    autonomy: string;
    extras?: string;
  };
  idealFor: string;
  image: string;
  imageAlt: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  paymentMode: 'cash' | 'financing';
}

export interface SolarServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  targetAudience: string[];
  advantages: string[];
  steps: string[];
  badge: string;
  image: string;
}

export interface FieldGalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'terrain' | 'installation' | 'produit' | 'flyer';
  categoryLabel: string;
  location: string;
  image: string;
  badge: string;
  svgType: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  productUsed: string;
  comment: string;
  rating: number;
  avatarIcon: string;
  verifiedCustomer: boolean;
}

export interface TariffItem {
  name: string;
  components: string;
  cashPrice: number;
  downPayment: number;
  monthlyPayment: number;
  months: number;
  tag?: string;
}

