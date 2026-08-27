import React from 'react';
import { CENTER_INFO } from '../data/coursesData';
import { Check, Sparkles, MessageCircle, ShieldCheck, Tag } from 'lucide-react';

interface PricingCardProps {
  onReserveClick: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ onReserveClick }) => {
  const inclusions = [
    'Accès complet à toutes les sessions de répétition du niveau choisi (4e, 3e, 1e ou Tle)',
    'Fascicules de cours synthétisés, résumés & fiches méthodologiques',
    'Banque d\'épreuves et examens blancs corrigés pas à pas (BEPC, Probatoire, BAC)',
    'Assistance et suivi direct sur WhatsApp pour toutes les questions difficiles',
    'Méthodologie anti-blocage pour la rédaction et les matières clés',
    'Conseils stratégiques pour décrocher la mention aux examens officiels'
  ];

  return (
    <section id="tarifs" className="py-16 sm:py-24 bg-[#F4EFE6] border-t border-[#E8E2D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8E2D2] text-[#5A5A40] border border-[#D9D9C3] mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Tarification Transparente & Sans Frais Cachés</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#2D2A26] tracking-tight mb-4">
            Un tarif unique de <span className="italic text-[#D97757]">10 000 FCFA</span> pour l'Excellence
          </h2>

          <p className="text-sm sm:text-base text-[#433E37]/90 leading-relaxed font-normal">
            {CENTER_INFO.fullName} s'engage à offrir un encadrement d'excellence accessible à toutes les familles.
          </p>
        </div>

        {/* Big Pricing Showcase */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E8E2D2] shadow-sm overflow-hidden">
          {/* Card Top Banner with Natural Tones Olive */}
          <div className="bg-[#5A5A40] text-[#FDFCF0] p-6 sm:p-8 text-center relative">
            <div className="inline-block px-3.5 py-1 bg-white/15 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 text-[#E8E2D2]">
              Forfait Complet par Élève
            </div>
            <h3 className="text-xl sm:text-2xl font-serif italic font-bold mb-2">
              Pack Répétition & Soir LE GETUP 2026
            </h3>
            <p className="text-[#E8E2D2] text-xs sm:text-sm max-w-md mx-auto font-normal">
              Valable pour 4ème, 3ème, 1ère ou Terminale • Rentrée : {CENTER_INFO.deadlineDateFormatted}
            </p>

            <div className="mt-6 inline-flex items-baseline gap-2 bg-[#2D2A26]/40 px-6 py-3 rounded-full border border-[#E8E2D2]/20">
              <span className="text-4xl sm:text-5xl font-serif font-bold text-[#F4D3C7]">
                10 000
              </span>
              <span className="text-lg font-bold text-[#FDFCF0] uppercase">
                {CENTER_INFO.currency}
              </span>
              <span className="text-xs text-[#E8E2D2]/80">/ session</span>
            </div>
          </div>

          {/* Inclusions list */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
              Ce qui est inclus dans votre inscription :
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#433E37]">
                  <div className="w-5 h-5 rounded-full bg-[#EFEFE4] text-[#5A5A40] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Actions & WhatsApp direct */}
            <div className="pt-6 border-t border-[#E8E2D2] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#433E37]">
                <ShieldCheck className="w-4 h-4 text-[#5A5A40] shrink-0" />
                <span>Paiement sécurisé et confirmation directe par WhatsApp</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onReserveClick}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#5A5A40] hover:bg-[#484833] shadow-xs transition-all cursor-pointer"
                  id="pricing-reserve-btn"
                >
                  <Sparkles className="w-4 h-4 text-[#F4D3C7]" />
                  <span>Réserver ma place</span>
                </button>

                <a
                  href={CENTER_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3 rounded-full text-[#D97757] bg-[#FDF2ED] hover:bg-[#fae7de] border border-[#F4D3C7] transition-colors"
                  title="Poser une question sur WhatsApp"
                  id="pricing-whatsapp-btn"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
