import React from 'react';
import { useCountdown, TARGET_DATE } from '../hooks/useCountdown';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { CENTER_INFO } from '../data/coursesData';
import { Calendar, AlertCircle, ArrowRight, ShieldCheck, Flame, BellRing } from 'lucide-react';

interface CountdownSectionProps {
  onReserveClick: () => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ onReserveClick }) => {
  const timeLeft = useCountdown(TARGET_DATE);
  const [containerRef, dimensions] = useResizeObserver<HTMLDivElement>();

  // Determine dynamic adapted message based on time left
  const getAdaptedMessage = () => {
    if (timeLeft.isExpired) {
      return {
        tag: 'C\'EST LA RENTRÉE !',
        title: 'Les cours ont officiellement commencé !',
        desc: 'Il reste encore quelques places de rattrapage disponibles. Inscrivez-vous sans attendre pour consolider vos acquis.',
        color: 'text-[#D97757]',
        badgeBg: 'bg-[#FDF2ED] text-[#D97757] border-[#F4D3C7]',
      };
    } else if (timeLeft.days < 7) {
      return {
        tag: 'URGENCE RENTRÉE - DERNIERS JOURS',
        title: 'Moins d\'une semaine avant le début des cours !',
        desc: 'Les groupes de 4ème, 3ème, 1ère et Terminale sont presque complets. Validez votre inscription à 10 000 FCFA dès aujourd\'hui.',
        color: 'text-[#D97757]',
        badgeBg: 'bg-[#FDF2ED] text-[#D97757] border-[#F4D3C7]',
      };
    } else if (timeLeft.days < 30) {
      return {
        tag: 'INSCRIPTIONS ACCÉLÉRÉES',
        title: 'La rentrée approche à grands pas !',
        desc: 'Préparez votre enfant ou réservez votre place pour dominer toutes les matières dès le premier trimestre.',
        color: 'text-[#D97757]',
        badgeBg: 'bg-[#FDF2ED] text-[#D97757] border-[#F4D3C7]',
      };
    } else {
      return {
        tag: 'PRÉ-INSCRIPTIONS OUVERTES',
        title: `Rentrée Officielle : ${CENTER_INFO.deadlineDateFormatted}`,
        desc: 'Profitez du tarif forfaitaire unique de 10 000 FCFA pour toute la session de répétition. Réservation directe en 1 clic.',
        color: 'text-[#5A5A40]',
        badgeBg: 'bg-[#E8E2D2] text-[#5A5A40] border-[#D9D9C3]',
      };
    }
  };

  const currentStatus = getAdaptedMessage();

  const timeBlocks = [
    { label: 'Jours', value: timeLeft.days, sub: 'días' },
    { label: 'Heures', value: timeLeft.hours, sub: 'horas' },
    { label: 'Minutes', value: timeLeft.minutes, sub: 'minutos' },
    { label: 'Secondes', value: timeLeft.seconds, sub: 'segundos' },
  ];

  return (
    <section id="chronometre" className="py-14 sm:py-20 bg-[#2D2A26] text-[#FDFCF0] relative overflow-hidden">
      {/* Decorative ambient natural glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5A5A40]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D97757]/20 rounded-full blur-3xl pointer-events-none" />

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        data-observed-width={dimensions.width}
      >
        {/* Header of Countdown */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold bg-[#3D3A35] text-[#F4D3C7] border border-[#5A5A40] mb-4 tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 text-[#D97757]" />
            <span>Chronomètre Officiel • Rentrée 2026</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#FDFCF0] tracking-tight mb-4">
            Compte à rebours avant la <span className="italic text-[#D97757]">Rentrée Officielle</span>
          </h2>

          <p className="text-[#E8E2D2]/90 text-sm sm:text-base leading-relaxed font-normal">
            Date officielle : <strong className="text-[#FDFCF0] font-semibold">{CENTER_INFO.deadlineDateFormatted}</strong>. Les cours de répétition et du soir débutent pour les classes de 4ème, 3ème, 1ère et Terminale.
          </p>
        </div>

        {/* Big Interactive Countdown Clock Card */}
        <div className="max-w-4xl mx-auto bg-[#38342F] border border-[#5A5A40]/60 rounded-3xl p-6 sm:p-10 shadow-lg relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {timeBlocks.map((block, idx) => (
              <div
                key={idx}
                className="relative bg-[#2D2A26] border border-[#5A5A40]/50 rounded-2xl p-4 sm:p-6 text-center group hover:border-[#D97757]/60 transition-colors"
              >
                <div className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#FDFCF0] tracking-tight tabular-nums mb-1 font-bold">
                  {String(block.value).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#D97757] uppercase tracking-wider">
                  {block.label}
                </div>
                <div className="text-[10px] sm:text-xs text-[#E8E2D2]/60 font-serif italic mt-0.5">
                  {block.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Adapted Dynamic Notice Box */}
          <div className="bg-[#2D2A26] border border-[#5A5A40]/70 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40]/40 border border-[#5A5A40] flex items-center justify-center shrink-0 text-[#F4D3C7]">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${currentStatus.badgeBg}`}>
                    {currentStatus.tag}
                  </span>
                  <span className="text-xs text-[#E8E2D2]/80 hidden sm:inline font-medium">
                    • 10 000 FCFA / Élève
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-serif font-bold text-[#FDFCF0] mb-1">
                  {currentStatus.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#E8E2D2]/80 leading-relaxed max-w-xl">
                  {currentStatus.desc}
                </p>
              </div>
            </div>

            <button
              onClick={onReserveClick}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-[#5A5A40] hover:bg-[#484833] text-white transition-all group cursor-pointer"
              id="countdown-cta-btn"
            >
              <span>Réserver dès maintenant</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick guarantees below timer */}
          <div className="mt-6 pt-6 border-t border-[#5A5A40]/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-[#E8E2D2]/80">
              <ShieldCheck className="w-4 h-4 text-[#D97757] shrink-0" />
              <span>Encadrement d'excellence garanti</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-[#E8E2D2]/80">
              <Calendar className="w-4 h-4 text-[#E8E2D2] shrink-0" />
              <span>Démarrage : {CENTER_INFO.deadlineDateFormatted}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs text-[#E8E2D2]/80">
              <AlertCircle className="w-4 h-4 text-[#D97757] shrink-0" />
              <span>Places limitées par groupe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
