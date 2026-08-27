import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import flyerImage from '../assets/images/getup_official_flyer_1787631482647.jpg';
import { CENTER_INFO } from '../data/coursesData';
import { ReservationData, StudentLevel } from '../types';
import { buildWhatsAppReservationMessage, generateWhatsAppUrl } from '../utils/whatsapp';
import {
  Calendar,
  Send,
  Phone,
  User,
  School,
  MapPin,
  MessageCircle,
  Clock,
  Award,
  ZoomIn,
  X,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

interface BookingSectionProps {
  initialLevel?: StudentLevel;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ initialLevel = '3ème' }) => {
  const [formData, setFormData] = useState<ReservationData>({
    studentName: '',
    parentName: '',
    phone: '',
    level: initialLevel,
    school: '',
    cityOrQuarter: '',
    sessionType: 'Présentiel',
    goal: 'Préparation Examen (BEPC/Probatoire/BAC)',
    specialNote: '',
    numberOfStudents: 1,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationRef, setReservationRef] = useState<string>('');
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (initialLevel) {
      setFormData((prev) => ({ ...prev, level: initialLevel }));
    }
  }, [initialLevel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfStudents' ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  const calculatedTotal = formData.numberOfStudents * CENTER_INFO.price;
  const whatsappUrl = generateWhatsAppUrl(buildWhatsAppReservationMessage(formData));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentName.trim() || !formData.phone.trim()) {
      alert('Veuillez renseigner au moins le nom de l\'élève et le numéro de téléphone.');
      return;
    }

    const randomCode = 'GETUP-' + Math.floor(1000 + Math.random() * 9000);
    setReservationRef(randomCode);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5A5A40', '#D97757', '#E8E2D2', '#2D2A26'],
      });
    } catch {
      // Confetti fallback
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="reserver" className="py-16 sm:py-24 bg-[#FDFCF0] border-t border-[#E8E2D2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#E8E2D2] text-[#5A5A40] border border-[#D9D9C3] mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Formulaire d'Inscription Directe</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#2D2A26] tracking-tight mb-4">
            Réserver votre place chez <span className="italic text-[#D97757]">{CENTER_INFO.name}</span>
          </h2>

          <p className="text-sm sm:text-base text-[#433E37]/90 leading-relaxed font-normal">
            Remplissez les informations ci-dessous pour enregistrer votre pré-inscription et valider votre place directement auprès du secrétariat au <strong>{CENTER_INFO.phoneDisplay}</strong>.
          </p>
        </div>

        {/* Success Banner if submitted */}
        {isSubmitted && (
          <div className="mb-10 bg-[#EFEFE4] border border-[#5A5A40] rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D9D9C3] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#5A5A40] text-[#FDFCF0] flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#2D2A26]">
                    Pré-réservation validée avec succès !
                  </h3>
                  <p className="text-xs text-[#5A5A40]">
                    Référence dossier : <span className="font-bold font-mono text-[#2D2A26]">{reservationRef}</span> • Montant : {calculatedTotal.toLocaleString()} FCFA
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-[#5A5A40] hover:bg-[#484833] shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#F4D3C7]" />
                <span>Ouvrir WhatsApp pour confirmer</span>
              </a>
            </div>

            <div className="text-xs text-[#433E37] leading-relaxed">
              Votre demande pour <strong>{formData.studentName}</strong> ({formData.level}) a bien été transmise. Vous pouvez joindre directement le secrétariat au <strong>{CENTER_INFO.phoneDisplay}</strong> pour finaliser l'emploi du temps.
            </div>
          </div>
        )}

        {/* Main Grid: Form (Left) & Flyer Image Showcase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border border-[#E8E2D2] rounded-3xl p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-5" id="reservation-form">
              <div className="border-b border-[#E8E2D2] pb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
                  1. Informations de l'élève
                </span>
                <span className="text-xs text-[#D97757] font-semibold">* Champs obligatoires</span>
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="studentName">
                  Nom et Prénom de l'élève <span className="text-[#D97757]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A5A40]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    required
                    placeholder="Ex: Jean Paul Kamga"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm text-[#2D2A26] placeholder:text-[#433E37]/50 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Class Level & Number of students */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="level">
                    Classe / Niveau souhaité <span className="text-[#D97757]">*</span>
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm font-semibold text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                  >
                    <option value="4ème">4ème (Bases & Renforcement)</option>
                    <option value="3ème">3ème (Objectif BEPC - 100% de réussite)</option>
                    <option value="1ère">1ère (Objectif Probatoire ESG A, C, D)</option>
                    <option value="Terminale">Terminale (Objectif Baccalauréat A4, C, D)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="numberOfStudents">
                    Nombre d'inscrits (Élèves)
                  </label>
                  <input
                    type="number"
                    id="numberOfStudents"
                    name="numberOfStudents"
                    min="1"
                    max="10"
                    value={formData.numberOfStudents}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm text-[#2D2A26] font-semibold focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="phone">
                    Téléphone / WhatsApp <span className="text-[#D97757]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A5A40]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Ex: 692816463"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm text-[#2D2A26] placeholder:text-[#433E37]/50 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="parentName">
                    Nom du Parent / Tuteur (facultatif)
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    placeholder="Ex: M. / Mme Kamga"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm text-[#2D2A26] placeholder:text-[#433E37]/50 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                  />
                </div>
              </div>

              {/* School & Quarter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="school">
                    Établissement Fréquenté
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A5A40]">
                      <School className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      placeholder="Ex: Lycée / Collège..."
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm text-[#2D2A26] placeholder:text-[#433E37]/50 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="cityOrQuarter">
                    Quartier / Ville
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A5A40]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="cityOrQuarter"
                      name="cityOrQuarter"
                      placeholder="Ex: Yaoundé / Douala..."
                      value={formData.cityOrQuarter}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm text-[#2D2A26] placeholder:text-[#433E37]/50 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Mode & Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="sessionType">
                    Mode de cours
                  </label>
                  <select
                    id="sessionType"
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm font-medium text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                  >
                    <option value="Présentiel">Présentiel à l'École Les Petits Anges</option>
                    <option value="Cours du Soir">Cours du Soir (16h30)</option>
                    <option value="Hybride / En ligne">Formule Hybride</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="goal">
                    Objectif principal
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm font-medium text-[#2D2A26] focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent"
                  >
                    <option value="Préparation Examen (BEPC/Probatoire/BAC)">Préparation Examen Officiel</option>
                    <option value="Excellence & Mention">Viser la Mention & l'Excellence</option>
                    <option value="Remise à niveau">Remise à niveau & rattrapage</option>
                    <option value="Suivi personnalisé">Suivi continu et devoirs</option>
                  </select>
                </div>
              </div>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-bold text-[#2D2A26] mb-1.5" htmlFor="specialNote">
                  Besoins ou remarques particulières (facultatif)
                </label>
                <textarea
                  id="specialNote"
                  name="specialNote"
                  rows={2}
                  placeholder="Ex: Renforcement en séries scientifiques ou littéraires..."
                  value={formData.specialNote}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-[#FDFCF0] border border-[#E8E2D2] rounded-2xl text-sm text-[#2D2A26] placeholder:text-[#433E37]/50 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent resize-none"
                />
              </div>

              {/* Price summary box */}
              <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E8E2D2] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#5A5A40] block font-bold">Total de la réservation :</span>
                  <span className="text-xs text-[#433E37]/80">{formData.numberOfStudents} élève(s) × {CENTER_INFO.price.toLocaleString()} FCFA</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-[#D97757]">
                    {calculatedTotal.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-[#433E37] ml-1">{CENTER_INFO.currency}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full text-base font-semibold text-white bg-[#5A5A40] hover:bg-[#484833] shadow-md transition-all cursor-pointer"
                id="submit-booking-btn"
              >
                <Send className="w-5 h-5 text-[#F4D3C7]" />
                <span>Valider l'Inscription via WhatsApp ({CENTER_INFO.phoneDisplay})</span>
              </button>

              <div className="text-center text-xs text-[#433E37]/80 flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>Rentrée officielle : {CENTER_INFO.deadlineDateFormatted}</span>
              </div>
            </form>
          </div>

          {/* Right Column: Integrated Official Flyer Card & Center Hub */}
          <div className="lg:col-span-5 space-y-5">
            {/* Integrated Flyer Visual Card with Zoom */}
            <div className="bg-white rounded-3xl p-5 border border-[#E8E2D2] shadow-sm relative group overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#E8E2D2] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D97757]" />
                  <span className="font-serif italic font-bold text-sm text-[#2D2A26]">
                    Affiche Officielle
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8E2D2] text-[#5A5A40]">
                  Session 2026
                </span>
              </div>

              {/* Image with zoom overlay */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#FDFCF0] border border-[#E8E2D2]"
                onClick={() => setIsZoomed(true)}
              >
                <img
                  src={flyerImage}
                  alt="Affiche Officielle LE GETUP"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#2D2A26]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#2D2A26] flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold bg-[#2D2A26] px-2.5 py-1 rounded-full">
                    Agrandir l'image
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => setIsZoomed(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97757] hover:underline cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Cliquer pour voir l'affiche en grand</span>
                </button>
              </div>
            </div>

            {/* Location & Quick Contact Card */}
            <div className="bg-[#2D2A26] text-[#FDFCF0] rounded-3xl p-6 border border-[#5A5A40]/60 shadow-md space-y-4">
              <div className="flex items-center gap-3 border-b border-[#5A5A40]/50 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] flex items-center justify-center text-[#FDFCF0] font-serif italic font-bold text-lg">
                  G
                </div>
                <div>
                  <h4 className="font-serif italic font-bold text-base text-[#FDFCF0]">{CENTER_INFO.fullName}</h4>
                  <span className="text-[11px] text-[#F4D3C7]">L'excellence, notre engagement !</span>
                </div>
              </div>

              {/* Quick Key Points */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5 text-[#E8E2D2]">
                  <Calendar className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                  <span>Rentrée : <strong className="text-white">{CENTER_INFO.deadlineDateFormatted}</strong></span>
                </div>

                <div className="flex items-start gap-2.5 text-[#E8E2D2]">
                  <MapPin className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
                  <span className="leading-snug">{CENTER_INFO.location}</span>
                </div>

                <div className="flex items-start gap-2.5 text-[#E8E2D2]">
                  <Trophy className="w-4 h-4 text-[#F4D3C7] shrink-0 mt-0.5" />
                  <span>Résultats 2026 : Jusqu'à 100% de réussite aux examens officiels</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href={`tel:${CENTER_INFO.phoneInternational}`}
                  className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-full text-xs font-semibold text-[#2D2A26] bg-[#FDFCF0] hover:bg-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>{CENTER_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={CENTER_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-1/2 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-full text-xs font-semibold text-white bg-[#5A5A40] hover:bg-[#484833] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#F4D3C7]" />
                  <span>WhatsApp Direct</span>
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
            className="relative max-w-2xl max-h-[90vh] bg-white rounded-3xl p-3 sm:p-5 shadow-2xl overflow-auto"
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
              alt="Affiche Officielle LE GETUP Agrandie"
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
