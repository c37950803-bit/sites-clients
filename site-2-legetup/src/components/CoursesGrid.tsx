import React from 'react';
import { COURSES_DATA, CENTER_INFO } from '../data/coursesData';
import { StudentLevel } from '../types';
import { BookOpen, CheckCircle, ArrowRight, Sparkles, Clock, Target } from 'lucide-react';

interface CoursesGridProps {
  onSelectLevel: (level: StudentLevel) => void;
}

export const CoursesGrid: React.FC<CoursesGridProps> = ({ onSelectLevel }) => {
  return (
    <section id="programmes" className="py-16 sm:py-24 bg-[#FDFCF0] border-t border-[#E8E2D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8E2D2] text-[#5A5A40] border border-[#D9D9C3] mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Programmes Conformes aux Exigences Nationales</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#2D2A26] tracking-tight mb-4">
            Nos cours de répétition & du soir par <span className="italic text-[#D97757]">Niveau Scolaire</span>
          </h2>

          <p className="text-sm sm:text-base text-[#433E37]/90 leading-relaxed font-normal">
            Chaque classe bénéficie d'un programme structuré avec exercices types, révisions approfondies, entraînement intensif et suivi continu.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-[#E8E2D2] p-6 flex flex-col justify-between hover:shadow-md hover:border-[#5A5A40]/50 transition-all group"
              id={`course-card-${course.id}`}
            >
              <div>
                {/* Header Tag & Level */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.accentBg}`}>
                    {course.id}
                  </span>
                  {course.targetExam && (
                    <span className="text-[10px] font-bold text-[#D97757] bg-[#FDF2ED] border border-[#F4D3C7] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {course.targetExam}
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-serif font-bold text-[#2D2A26] mb-2.5 leading-snug group-hover:text-[#D97757] transition-colors">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#433E37]/80 leading-relaxed mb-5">
                  {course.description}
                </p>

                {/* Key Skills List */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">
                    Au programme :
                  </div>
                  {course.keySkills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-[#433E37]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#5A5A40] shrink-0 mt-0.5" />
                      <span className="leading-tight">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Price & Select button */}
              <div className="pt-4 border-t border-[#E8E2D2] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#433E37]/70 font-medium">Tarif session :</span>
                  <span className="font-serif font-bold text-[#2D2A26] text-base">
                    {CENTER_INFO.price.toLocaleString()} {CENTER_INFO.currency}
                  </span>
                </div>

                <button
                  onClick={() => onSelectLevel(course.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold text-white bg-[#5A5A40] hover:bg-[#484833] transition-all shadow-xs cursor-pointer"
                  id={`btn-select-course-${course.id}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F4D3C7]" />
                  <span>Réserver pour la {course.id}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sub Banner */}
        <div className="mt-12 bg-[#F4EFE6] border border-[#E8E2D2] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#E8E2D2] flex items-center justify-center text-[#5A5A40] shrink-0 mx-auto sm:mx-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-serif font-bold text-[#2D2A26]">
                Horaires de cours du soir & week-ends adaptés
              </h4>
              <p className="text-xs text-[#433E37]/80">
                Séances dès 16h30 et créneaux personnalisés au sein de l'École Les Petits Anges.
              </p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-bold text-[#5A5A40] bg-white border border-[#E8E2D2] px-4 py-2 rounded-full shadow-xs">
            Rentrée : {CENTER_INFO.deadlineDateFormatted}
          </span>
        </div>
      </div>
    </section>
  );
};
