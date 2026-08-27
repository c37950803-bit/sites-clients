import React, { useState } from 'react';
import { CENTER_INFO } from '../data/coursesData';
import { MessageCircle, Phone, Sparkles, Menu, X, BookOpen, Clock, Calendar, Award } from 'lucide-react';

interface NavbarProps {
  onNavigateToBooking: (level?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCF0]/95 backdrop-blur-md border-b border-[#E8E2D2] transition-all">
      {/* Top micro banner */}
      <div className="bg-[#5A5A40] text-[#FDFCF0] text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8E2D2] text-[#5A5A40] uppercase tracking-wider">
              Rentrée 2026
            </span>
            <span className="opacity-90">Rentrée : Lundi 14 Septembre 2026 à 16h30</span>
            <span className="text-[#F4D3C7] font-semibold hidden sm:inline">• Tarif : 10 000 FCFA</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${CENTER_INFO.phoneInternational}`}
              className="flex items-center gap-1 hover:text-[#F4D3C7] transition-colors"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CENTER_INFO.phoneDisplay}</span>
            </a>
            <a
              href={CENTER_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-[#F4D3C7] hover:text-white font-semibold transition-colors"
              id="topbar-whatsapp-link"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp : {CENTER_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand matching Natural Tones design */}
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('accueil');
            }}
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#5A5A40] flex items-center justify-center text-[#FDFCF0] shadow-sm group-hover:bg-[#484833] transition-colors">
              <span className="font-serif italic font-bold text-xl">G</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif italic text-[#5A5A40] font-bold tracking-tight">
                  LE GETUP
                </span>
                <span className="text-[10px] bg-[#E8E2D2] text-[#5A5A40] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  Répétition & Soir
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-widest text-[#433E37]/70 font-medium">
                Centre d'Excellence 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => scrollTo('affiche-officielle')}
              className="text-sm font-medium text-[#433E37] hover:text-[#D97757] transition-colors flex items-center gap-1.5"
              id="nav-flyer-btn"
            >
              <Award className="w-4 h-4 text-[#D97757]" />
              Affiche & Résultats
            </button>
            <button
              onClick={() => scrollTo('chronometre')}
              className="text-sm font-medium text-[#433E37] hover:text-[#D97757] transition-colors flex items-center gap-1.5"
              id="nav-countdown-btn"
            >
              <Clock className="w-4 h-4 text-[#5A5A40]" />
              Compte à Rebours
            </button>
            <button
              onClick={() => scrollTo('programmes')}
              className="text-sm font-medium text-[#433E37] hover:text-[#D97757] transition-colors flex items-center gap-1.5"
              id="nav-courses-btn"
            >
              <BookOpen className="w-4 h-4 text-[#5A5A40]" />
              Niveaux & Cours
            </button>
            <button
              onClick={() => scrollTo('tarifs')}
              className="text-sm font-medium text-[#433E37] hover:text-[#D97757] transition-colors"
              id="nav-pricing-btn"
            >
              Tarif (10 000 FCFA)
            </button>
            <button
              onClick={() => scrollTo('reserver')}
              className="text-sm font-medium text-[#433E37] hover:text-[#D97757] transition-colors flex items-center gap-1.5"
              id="nav-booking-btn"
            >
              <Calendar className="w-4 h-4 text-[#5A5A40]" />
              Réservation
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-sm font-medium text-[#433E37] hover:text-[#D97757] transition-colors"
              id="nav-faq-btn"
            >
              FAQ
            </button>
          </nav>

          {/* Actions CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${CENTER_INFO.phoneInternational}`}
              className="text-sm font-bold text-[#D97757] hover:text-[#b85d3f] transition-colors flex items-center gap-1.5"
              id="nav-phone-display"
            >
              <Phone className="w-4 h-4" />
              <span>{CENTER_INFO.phoneDisplay}</span>
            </a>

            <button
              onClick={() => {
                scrollTo('reserver');
                onNavigateToBooking();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#5A5A40] hover:bg-[#484833] shadow-xs transition-all"
              id="nav-reserve-cta"
            >
              <Sparkles className="w-4 h-4 text-[#F4D3C7]" />
              <span>S'inscrire Maintenant</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#433E37] hover:bg-[#E8E2D2]/50 focus:outline-none"
              aria-label="Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D2] bg-[#FDFCF0] px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <div className="grid gap-2">
            <button
              onClick={() => scrollTo('affiche-officielle')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-[#433E37] hover:bg-[#E8E2D2]/40"
            >
              <Award className="w-4 h-4 text-[#D97757]" />
              Affiche Officielle & Résultats 2026
            </button>
            <button
              onClick={() => scrollTo('chronometre')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-[#433E37] hover:bg-[#E8E2D2]/40"
            >
              <Clock className="w-4 h-4 text-[#5A5A40]" />
              Compte à Rebours (14 Septembre 2026)
            </button>
            <button
              onClick={() => scrollTo('programmes')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-[#433E37] hover:bg-[#E8E2D2]/40"
            >
              <BookOpen className="w-4 h-4 text-[#5A5A40]" />
              Classes : 4ème, 3ème, 1ère & Terminale
            </button>
            <button
              onClick={() => scrollTo('tarifs')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-[#433E37] hover:bg-[#E8E2D2]/40"
            >
              <span className="w-4 text-center font-bold text-[#D97757]">10k</span>
              Tarif Unique : 10 000 FCFA
            </button>
            <button
              onClick={() => scrollTo('reserver')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-[#433E37] hover:bg-[#E8E2D2]/40"
            >
              <Calendar className="w-4 h-4 text-[#5A5A40]" />
              Formulaire de Réservation
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-[#433E37] hover:bg-[#E8E2D2]/40"
            >
              Questions fréquentes (FAQ)
            </button>
          </div>

          <div className="pt-3 border-t border-[#E8E2D2] flex flex-col gap-2.5">
            <button
              onClick={() => {
                scrollTo('reserver');
                onNavigateToBooking();
              }}
              className="w-full py-3 px-4 rounded-full text-center font-bold text-white bg-[#5A5A40] hover:bg-[#484833] shadow-xs text-sm"
            >
              S'inscrire aux Cours (10 000 FCFA)
            </button>
            <a
              href={CENTER_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full text-center font-bold text-[#5A5A40] bg-[#E8E2D2] hover:bg-[#ded6c3] text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#5A5A40]" />
              Contacter sur WhatsApp ({CENTER_INFO.phoneDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
