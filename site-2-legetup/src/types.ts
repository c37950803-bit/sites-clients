export type StudentLevel = '4ème' | '3ème' | '1ère' | 'Terminale';

export interface CourseDetail {
  id: StudentLevel;
  title: string;
  badge: string;
  targetExam?: string;
  description: string;
  keySkills: string[];
  schedule: string;
  color: string;
  accentBg: string;
}

export interface ReservationData {
  studentName: string;
  parentName?: string;
  phone: string;
  level: StudentLevel;
  school: string;
  cityOrQuarter: string;
  sessionType: 'Présentiel' | 'En ligne (WhatsApp/Zoom)' | 'Hybride';
  goal: 'Remise à niveau' | 'Excellence & Mention' | 'Préparation Examen (BEPC/Probatoire/BAC)' | 'Expression & Grammaire';
  specialNote?: string;
  numberOfStudents: number;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalHours: number;
}
