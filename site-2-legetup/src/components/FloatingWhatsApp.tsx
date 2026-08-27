import React, { useState, useEffect } from 'react';
import { CENTER_INFO } from '../data/coursesData';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {/* Dynamic Popover bubble */}
      {showTooltip && (
        <div className="bg-[#FDFCF0] border border-[#E8E2D2] text-[#433E37] p-3.5 rounded-3xl shadow-lg max-w-xs text-xs relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-[#433E37]/60 hover:text-[#2D2A26] cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5 pr-3">
            <span className="text-base text-[#D97757]">💬</span>
            <div>
              <p className="font-serif font-bold text-[#2D2A26] leading-tight">Une question sur les cours ?</p>
              <p className="text-[11px] text-[#433E37]/80 mt-0.5 font-normal">
                Écrivez-nous sur WhatsApp au <strong>{CENTER_INFO.phoneDisplay}</strong> (Tarif 10 000 FCFA).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main WhatsApp Button with Natural Tones Olive & Terracotta Accent */}
      <a
        href={CENTER_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white font-medium px-4 py-3 rounded-full shadow-md hover:shadow-lg transition-all group border border-[#E8E2D2]/30"
        id="floating-whatsapp-btn"
        aria-label="Contacter sur WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-[#F4D3C7]" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#D97757] rounded-full border border-white" />
        </div>
        <span className="text-xs font-semibold hidden sm:inline text-[#FDFCF0]">
          WhatsApp : {CENTER_INFO.phoneDisplay}
        </span>
      </a>
    </div>
  );
};
