import React, { useState } from 'react';
import { FAQS, CENTER_INFO } from '../data/coursesData';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FDFCF0] border-t border-[#E8E2D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E8E2D2] text-[#5A5A40] border border-[#D9D9C3] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Questions & Réponses Fréquentes</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#2D2A26] tracking-tight mb-4">
            Tout savoir sur les <span className="italic text-[#D97757]">Cours de Répétition</span>
          </h2>

          <p className="text-sm text-[#433E37]/80 font-normal">
            Retrouvez les réponses aux questions les plus courantes sur le fonctionnement de La Grâce Center of Répétition.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-3xl border transition-all ${
                  isOpen ? 'border-[#5A5A40] bg-white shadow-xs' : 'border-[#E8E2D2] bg-[#F4EFE6]/50 hover:bg-[#F4EFE6]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#2D2A26]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-[#5A5A40] text-white rotate-180' : 'bg-[#E8E2D2] text-[#5A5A40]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#433E37]/90 leading-relaxed border-t border-[#E8E2D2] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 bg-[#2D2A26] text-[#FDFCF0] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-md">
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#FDFCF0]">
              Vous avez une question spécifique ?
            </h3>
            <p className="text-xs sm:text-sm text-[#E8E2D2]/80 mt-1">
              Contactez directement notre responsable par appel direct ou message WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${CENTER_INFO.phoneInternational}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#2D2A26] bg-[#FDFCF0] hover:bg-white transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Appeler ({CENTER_INFO.phoneDisplay})</span>
            </a>

            <a
              href={CENTER_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#5A5A40] hover:bg-[#484833] transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#F4D3C7]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
