import React, { useState } from 'react';
import { ADVANTAGES, CENTER_INFO } from '../data/coursesData';
import { GraduationCap, Tag, Users, MessageCircle, CheckCircle, RefreshCw } from 'lucide-react';

const MINI_QUIZ = [
  {
    level: '4ème',
    question: 'Comment dit-on "Bonjour, comment vas-tu ?" en Espagnol ?',
    options: ['¡Hola, ¿cómo estás?!', '¡Adiós, hasta luego!', '¡Buenos días, gracias!'],
    correct: 0,
    explanation: '"¡Hola, ¿cómo estás?!" est la salutation informelle standard en Espagnol.',
  },
  {
    level: '3ème (BEPC)',
    question: 'Quel est le subjonctif présent du verbe "TENER" à la 1ère personne du singulier ?',
    options: ['Tenga', 'Tienes', 'Tuve'],
    correct: 0,
    explanation: 'Le radical "teng-" donne "yo tenga" au subjonctif présent.',
  },
  {
    level: '1ère / Tle',
    question: 'Quelle préposition utilise-t-on pour exprimer la cause / la raison ?',
    options: ['Por', 'Para', 'Hacia'],
    correct: 0,
    explanation: '"Por" exprime la cause (ex: por culpa de), tandis que "para" exprime le but ou la destination.',
  },
];

export const Methodology: React.FC = () => {
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#5A5A40]" />;
      case 'Tag':
        return <Tag className="w-5 h-5 text-[#D97757]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#5A5A40]" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-[#D97757]" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#5A5A40]" />;
    }
  };

  const currentQuestion = MINI_QUIZ[activeQuizIndex];

  const handleSelectAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setActiveQuizIndex((prev) => (prev + 1) % MINI_QUIZ.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCF0] border-t border-[#E8E2D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-serif text-[#2D2A26] tracking-tight mb-4">
            Pourquoi choisir <span className="italic text-[#5A5A40]">{CENTER_INFO.name}</span> ?
          </h2>
          <p className="text-sm sm:text-base text-[#433E37]/90 leading-relaxed font-normal">
            Notre démarche pédagogique garantit un apprentissage rigoureux de l'Espagnol avec une préparation ciblée pour chaque examen national.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#E8E2D2] shadow-xs hover:border-[#5A5A40]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] border border-[#E8E2D2] flex items-center justify-center mb-4">
                {getIcon(adv.icon)}
              </div>
              <h3 className="text-base font-serif font-bold text-[#2D2A26] mb-2">
                {adv.title}
              </h3>
              <p className="text-xs text-[#433E37]/80 leading-relaxed">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Mini Spanish Level Test Helper */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E8E2D2] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8E2D2] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97757]" />
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#2D2A26]">
                Mini test rapide d'Espagnol ({currentQuestion.level})
              </h3>
            </div>
            <span className="text-xs text-[#433E37]/70 font-medium">
              Question {activeQuizIndex + 1} / {MINI_QUIZ.length}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm sm:text-base font-medium text-[#2D2A26]">
              {currentQuestion.question}
            </p>

            <div className="grid gap-2.5">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === oIdx;
                const isCorrect = oIdx === currentQuestion.correct;
                let btnStyle = 'bg-[#FDFCF0] hover:bg-[#F4EFE6] text-[#433E37] border-[#E8E2D2]';

                if (showResult) {
                  if (isCorrect) {
                    btnStyle = 'bg-[#EFEFE4] text-[#5A5A40] border-[#5A5A40] font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-[#FDF2ED] text-[#D97757] border-[#F4D3C7] line-through';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => !showResult && handleSelectAnswer(oIdx)}
                    disabled={showResult}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showResult && isCorrect && (
                      <span className="text-[#5A5A40] font-bold text-xs">✓ Correct</span>
                    )}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="mt-4 p-4 rounded-2xl bg-[#F4EFE6] border border-[#E8E2D2] text-xs text-[#433E37] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <strong className="text-[#5A5A40]">Explication :</strong> {currentQuestion.explanation}
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white font-semibold text-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Question suivante</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
