import React from 'react';
import { CENTER_INFO } from '../data/coursesData';
import { Phone, MessageCircle, Calendar, CheckCircle, MapPin, Trophy } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D2A26] text-[#E8E2D2]/80 text-xs border-t border-[#5A5A40]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] flex items-center justify-center text-[#FDFCF0] font-serif italic font-bold text-lg">
                G
              </div>
              <div>
                <h3 className="font-serif italic font-bold text-base text-[#FDFCF0]">
                  {CENTER_INFO.fullName}
                </h3>
                <span className="text-[11px] text-[#F4D3C7] font-medium">{CENTER_INFO.motto}</span>
              </div>
            </div>
            <p className="text-[#E8E2D2]/70 leading-relaxed text-xs">
              Cours de répétition et du soir intensifs pour les élèves de 4ème, 3ème, 1ère et Terminale. Encadrement de qualité et suivi personnalisé.
            </p>
            <div className="flex items-center gap-2 text-[#E8E2D2] font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#D97757]" />
              <span>Rentrée : {CENTER_INFO.deadlineDateFormatted}</span>
            </div>
          </div>

          {/* Col 2: Classes */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#FDFCF0] text-xs uppercase tracking-wider">
              Classes & Formules (10 000 FCFA)
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8E2D2]" />
                <span>Classe de 4ème (Bases & Méthode)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97757]" />
                <span>Classe de 3ème (Objectif BEPC)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8E2D2]" />
                <span>Classe de Première (Objectif Probatoire ESG)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97757]" />
                <span>Classe de Terminale (Objectif Baccalauréat)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#FDFCF0] text-xs uppercase tracking-wider">
              Contact & Inscriptions
            </h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${CENTER_INFO.phoneInternational}`}
                className="flex items-center gap-2 text-[#E8E2D2] hover:text-[#FDFCF0] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D97757]" />
                <span className="font-bold">{CENTER_INFO.phoneDisplay}</span>
              </a>
              <a
                href={CENTER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F4D3C7] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#D97757]" />
                <span>WhatsApp : {CENTER_INFO.phoneDisplay}</span>
              </a>
              <div className="flex items-start gap-2 text-[#E8E2D2]/80">
                <MapPin className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                <span className="leading-snug">{CENTER_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Note & Commitment */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#FDFCF0] text-xs uppercase tracking-wider">
              Engagement Pédagogique
            </h4>
            <div className="bg-[#38342F] border border-[#5A5A40]/60 rounded-2xl p-4 text-[#E8E2D2] text-[11px] leading-relaxed font-serif italic">
              « Le GETUP, votre partenaire pour la réussite ! Des résultats qui parlent d'eux-mêmes ! »
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#F4D3C7] font-medium">
              <Trophy className="w-3.5 h-3.5" />
              <span>Session 2026 : Jusqu'à 100% de réussite</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#5A5A40]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-[#E8E2D2]/50">
          <div>
            © {currentYear} {CENTER_INFO.fullName} — Tous droits réservés.
          </div>
          <div>
            Site officiel des cours de répétition et du soir (4ème, 3ème, 1ère, Tle).
          </div>
        </div>
      </div>
    </footer>
  );
};
