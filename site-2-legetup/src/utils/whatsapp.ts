import { CENTER_INFO } from '../data/coursesData';
import { ReservationData } from '../types';

export function buildWhatsAppReservationMessage(data: ReservationData): string {
  const totalAmount = data.numberOfStudents * CENTER_INFO.price;

  let msg = `🇪🇸 *RÉSERVATION COURS D'ESPAGNOL - LA GRÂCE CENTER OF RÉPÉTITION* 🇪🇸\n\n`;
  msg += `Bonjour M./Mme le Responsable,\nJe souhaite réserver une place pour les cours de répétition d'Espagnol.\n\n`;
  msg += `📋 *DÉTAILS DE L'INSCRIPTION :*\n`;
  msg += `• *Nom de l'élève* : ${data.studentName.trim()}\n`;
  if (data.parentName && data.parentName.trim()) {
    msg += `• *Nom du Parent / Tuteur* : ${data.parentName.trim()}\n`;
  }
  msg += `• *Classe / Niveau* : ${data.level}\n`;
  if (data.school && data.school.trim()) {
    msg += `• *Établissement scolaire* : ${data.school.trim()}\n`;
  }
  if (data.cityOrQuarter && data.cityOrQuarter.trim()) {
    msg += `• *Quartier / Ville* : ${data.cityOrQuarter.trim()}\n`;
  }
  msg += `• *Téléphone / Contact* : ${data.phone.trim()}\n`;
  msg += `• *Mode de cours* : ${data.sessionType}\n`;
  msg += `• *Objectif principal* : ${data.goal}\n`;
  msg += `• *Nombre d'élève(s)* : ${data.numberOfStudents} (${totalAmount.toLocaleString()} FCFA)\n`;

  if (data.specialNote && data.specialNote.trim()) {
    msg += `• *Remarque / Besoin particulier* : ${data.specialNote.trim()}\n`;
  }

  msg += `\n🎯 *Date de rentrée souhaitée* : ${CENTER_INFO.deadlineDateFormatted}\n`;
  msg += `💰 *Montant prévu* : ${totalAmount.toLocaleString()} ${CENTER_INFO.currency}\n\n`;
  msg += `Merci de me confirmer la disponibilité et les modalités de paiement. ¡Muchas gracias!`;

  return msg;
}

export function generateWhatsAppUrl(message: string): string {
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/237${CENTER_INFO.phoneRaw}?text=${encodedText}`;
}

export function buildQuickInquiryMessage(subject: string = 'Renseignements généraux'): string {
  const msg = `Bonjour La Grâce Center of Répétition,\n\nJe vous contacte concernant les cours de répétition d'Espagnol (10 000 FCFA pour 4ème, 3ème, 1ère, Tle). Rentrée du ${CENTER_INFO.deadlineDateFormatted}.\nSujet : ${subject}.\n\nPouvez-vous me donner plus d'informations svp ?`;
  return generateWhatsAppUrl(msg);
}
