import React from 'react';
import { CENTER_INFO } from '../data/coursesData';
import { Sparkles, MessageCircle, Phone, ArrowRight, BookOpen, CheckCircle2, Award, Calendar, Trophy } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreCourses }) => {
  const scrollToFlyer = () => {
    const el = document.getElementById('affiche-officielle');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden bg-[#FDFCF0]">
      {/* Background warm subtle ambient accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#E8E2D2]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -ml-24 w-80 h-80 rounded-full bg-[#F4EFE6]/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column : Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E2D2] text-[#5A5A40] border border-[#D9D9C3] text-xs sm:text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-[#D97757]" />
              <span>Inscriptions ouvertes • Rentrée Lundi 14 Septembre 2026 à 16h30</span>
            </div>

            {/* Main Title with Natural Tones Serif */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#5A5A40] block">
                {CENTER_INFO.fullName}
              </span>
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-serif text-[#2D2A26] leading-[1.18] tracking-tight">
                Cours de répétition & du soir pour <span className="font-sans font-extrabold text-[#2D2A26]">4ème, 3ème, 1ère & Tle</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#433E37]/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {CENTER_INFO.motto} Assurez la réussite et l'excellence aux examens officiels (BEPC, Probatoire, Baccalauréat) avec notre encadrement de qualité et notre suivi personnalisé.
            </p>

            {/* Highlighted Price pill & Quick Facts */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="inline-flex items-baseline gap-1.5 px-4 py-2 rounded-full bg-[#5A5A40] text-white shadow-xs">
                <span className="text-[11px] uppercase tracking-wider font-medium text-[#F4D3C7]">Tarif Unique :</span>
                <span className="text-xl font-bold font-serif text-white">10 000</span>
                <span className="text-xs font-semibold text-[#E8E2D2]">FCFA</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E8E2D2] text-[#433E37] text-xs font-semibold shadow-xs">
                <Calendar className="w-4 h-4 text-[#D97757] shrink-0" />
                <span>Rentrée : 14 Septembre (16h30)</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#EFEFE4] border border-[#D9D9C3] text-[#5A5A40] text-xs font-semibold shadow-xs">
                <Trophy className="w-4 h-4 text-[#D97757] shrink-0" />
                <span>Résultats prouvés jusqu'à 100%</span>
              </div>
            </div>

            {/* CTAs Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-[#5A5A40] hover:bg-[#484833] shadow-md hover:shadow-lg transition-all cursor-pointer"
                id="hero-reserve-btn"
              >
                <Sparkles className="w-5 h-5 text-[#F4D3C7]" />
                <span>Réserver ma place (10 000 F)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToFlyer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-base font-semibold text-[#5A5A40] bg-[#E8E2D2] hover:bg-[#ded6c3] transition-all cursor-pointer"
                id="hero-flyer-btn"
              >
                <Award className="w-5 h-5 text-[#D97757]" />
                <span>Voir l'Affiche & Résultats</span>
              </button>
            </div>

            {/* Phone quick call bar */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#433E37]/80">
              <Phone className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Contact direct & inscriptions : </span>
              <a href={`tel:${CENTER_INFO.phoneInternational}`} className="font-bold text-[#D97757] hover:underline">
                {CENTER_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right Column : Visual Showcase Card with Natural Tones */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative bg-white border border-[#E8E2D2] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                {/* Header of showcase */}
                <div className="flex items-center justify-between border-b border-[#E8E2D2] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EFEFE4] flex items-center justify-center text-[#5A5A40]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif italic font-bold text-[#2D2A26] text-base">Programme {CENTER_INFO.name} 2026</h3>
                      <p className="text-xs text-[#433E37]/70 font-medium">4 Niveaux disponibles</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E8E2D2] text-[#5A5A40]">
                    10 000 FCFA
                  </span>
                </div>

                {/* Level list preview */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-[#FDFCF0] border border-[#E8E2D2] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-[#5A5A40] text-white font-bold text-xs flex items-center justify-center">4e</span>
                      <div>
                        <div className="text-xs font-bold text-[#2D2A26]">Classe de 4ème</div>
                        <div className="text-[11px] text-[#433E37]/80">Bases solides & méthode de travail</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#5A5A40]">Inclus</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FDF2ED] border border-[#F4D3C7] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-[#D97757] text-white font-bold text-xs flex items-center justify-center">3e</span>
                      <div>
                        <div className="text-xs font-bold text-[#2D2A26]">Classe de 3ème</div>
                        <div className="text-[11px] text-[#433E37]/80">Objectif BEPC (Jusqu'à 100%)</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#D97757]">BEPC</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#EFEFE4] border border-[#D9D9C3] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-[#5A5A40] text-white font-bold text-xs flex items-center justify-center">1e</span>
                      <div>
                        <div className="text-xs font-bold text-[#2D2A26]">Classe de Première (1ère)</div>
                        <div className="text-[11px] text-[#433E37]/80">Objectif Probatoire ESG A, C, D</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#5A5A40]">Probatoire</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#F4EFE6] border border-[#E8E2D2] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-[#2D2A26] text-white font-bold text-xs flex items-center justify-center">Tle</span>
                      <div>
                        <div className="text-xs font-bold text-[#2D2A26]">Classe de Terminale (Tle)</div>
                        <div className="text-[11px] text-[#433E37]/80">Objectif BAC (100% C & D, 78% A4)</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#2D2A26]">BAC</span>
                  </div>
                </div>

                {/* Footer of showcase */}
                <div className="bg-[#FDFCF0] rounded-2xl p-4 border border-[#E8E2D2] text-xs text-[#433E37] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#D97757] shrink-0" />
                    <span>École Les Petits Anges</span>
                  </div>
                  <button
                    onClick={onExploreCourses}
                    className="font-bold text-[#D97757] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
