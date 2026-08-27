import React, { useState } from 'react';
import flyerImage from '../assets/images/getup_official_flyer_1787631482647.jpg';
import { CENTER_INFO, FLYER_STATS_2026 } from '../data/coursesData';
import { Trophy, Award, MapPin, Phone, Calendar, ZoomIn, X, CheckCircle2, Sparkles } from 'lucide-react';

export const OfficialFlyerSection: React.FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section id="affiche-officielle" className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-[#E8E2D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E8E2D2] text-[#5A5A40] border border-[#D9D9C3] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Affiche Officielle & Résultats d'Excellence 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#2D2A26] tracking-tight mb-4">
            Des Résultats qui <span className="italic text-[#D97757]">Parlent d'Eux-Mêmes</span>
          </h2>

          <p className="text-sm sm:text-base text-[#433E37]/90 leading-relaxed font-normal">
            Découvrez l'affiche officielle de <strong className="text-[#2D2A26]">{CENTER_INFO.fullName}</strong> et notre bilan exceptionnel aux examens nationaux de la session 2026.
          </p>
        </div>

        {/* Main Grid: Flyer Image (Left) & Detailed Results (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Flyer Image Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group cursor-pointer max-w-sm rounded-3xl overflow-hidden shadow-md border-4 border-white bg-white hover:shadow-xl transition-all">
              <img
                src={flyerImage}
                alt="Affiche Officielle LE GETUP Cours de Répétition et du Soir"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                onClick={() => setIsZoomed(true)}
              />

              {/* Overlay Hover button */}
              <button
                onClick={() => setIsZoomed(true)}
                className="absolute inset-0 bg-[#2D2A26]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
                aria-label="Agrandir l'affiche"
              >
                <div className="w-12 h-12 rounded-full bg-white/90 text-[#2D2A26] flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-[#2D2A26] px-3 py-1 rounded-full">
                  Cliquer pour agrandir l'affiche
                </span>
              </button>
            </div>

            {/* Quick Caption */}
            <div className="mt-3 flex items-center gap-2 text-xs text-[#5A5A40] font-medium">
              <Sparkles className="w-4 h-4 text-[#D97757]" />
              <span>Affiche officielle de rentrée 2026 • LE GETUP</span>
            </div>
          </div>

          {/* Right: Key Exam Stats & Location Hub */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slogan Banner */}
            <div className="bg-[#5A5A40] text-white p-5 rounded-3xl border border-[#484833] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F4D3C7] block">
                  Notre Engagement
                </span>
                <h3 className="font-serif italic font-bold text-base sm:text-lg text-[#FDFCF0]">
                  « {CENTER_INFO.motto} »
                </h3>
              </div>
              <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-2xl bg-white/10 items-center justify-center text-[#F4D3C7]">
                <Trophy className="w-6 h-6" />
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* BEPC Stats */}
              <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">BEPC 2026</span>
                  <span className="text-xs font-bold text-[#D97757] bg-[#FDF2ED] px-2 py-0.5 rounded-full">Jusqu'à 100%</span>
                </div>
                <div className="space-y-2 text-xs text-[#433E37]">
                  {FLYER_STATS_2026.bepc.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-[#E8E2D2]/60 pb-1.5 last:border-none">
                      <span className="font-medium">{item.serie}</span>
                      <span className="font-bold font-serif text-[#2D2A26]">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Probatoire Stats */}
              <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Probatoire</span>
                  <span className="text-xs font-bold text-[#5A5A40] bg-[#EFEFE4] px-2 py-0.5 rounded-full">ESG 2026</span>
                </div>
                <div className="space-y-2 text-xs text-[#433E37]">
                  {FLYER_STATS_2026.probatoire.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-[#E8E2D2]/60 pb-1.5 last:border-none">
                      <span className="font-medium">{item.serie}</span>
                      <span className="font-bold font-serif text-[#2D2A26]">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Baccalauréat Stats */}
              <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">Baccalauréat</span>
                  <span className="text-xs font-bold text-[#D97757] bg-[#FDF2ED] px-2 py-0.5 rounded-full">100% C & D</span>
                </div>
                <div className="space-y-2 text-xs text-[#433E37]">
                  {FLYER_STATS_2026.bac.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-[#E8E2D2]/60 pb-1.5 last:border-none">
                      <span className="font-medium">{item.serie}</span>
                      <span className="font-bold font-serif text-[#2D2A26]">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Commitments & Rentrée info box */}
            <div className="bg-white border border-[#E8E2D2] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E2D2] pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D97757]" />
                  <span className="text-xs font-bold text-[#2D2A26]">
                    Rentrée officielle : <strong className="text-[#D97757]">Lundi 14 Septembre 2026 à 16h30</strong>
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#5A5A40] text-white">
                  Tarif : 10 000 FCFA
                </span>
              </div>

              {/* 4 Pillars of Flyer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FLYER_STATS_2026.commitments.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-[#433E37] bg-[#FDFCF0] p-2 rounded-xl border border-[#E8E2D2]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              {/* Exact Location from Flyer */}
              <div className="bg-[#FDFCF0] p-3.5 rounded-2xl border border-[#E8E2D2] flex items-start gap-3 text-xs text-[#433E37]">
                <MapPin className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2A26]">Localisation exacte : </strong>
                  <span>{CENTER_INFO.location}</span>
                </div>
              </div>

              {/* Direct call button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-[#5A5A40]">
                  Contact & Inscriptions : <strong className="text-[#2D2A26] font-mono text-sm">{CENTER_INFO.phoneDisplay}</strong>
                </div>
                <a
                  href={`tel:${CENTER_INFO.phoneInternational}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#5A5A40] text-white hover:bg-[#484833] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Appeler le {CENTER_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] bg-white rounded-3xl p-2 sm:p-4 shadow-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#2D2A26] text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={flyerImage}
              alt="Affiche Officielle LE GETUP Haute Définition"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-2xl"
            />
            <div className="p-3 text-center text-xs text-[#433E37] font-medium">
              Affiche Officielle LE GETUP • Rentrée 14 Septembre 2026 à 16h30 • Contact : {CENTER_INFO.phoneDisplay}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
