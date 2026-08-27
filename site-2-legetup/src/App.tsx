/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OfficialFlyerSection } from './components/OfficialFlyerSection';
import { CountdownSection } from './components/CountdownSection';
import { CoursesGrid } from './components/CoursesGrid';
import { PricingCard } from './components/PricingCard';
import { BookingSection } from './components/BookingSection';
import { Methodology } from './components/Methodology';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { StudentLevel } from './types';

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel>('3ème');

  const handleSelectLevel = (level: StudentLevel) => {
    setSelectedLevel(level);
    const bookingEl = document.getElementById('reserver');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToBooking = (level?: string) => {
    if (level && ['4ème', '3ème', '1ère', 'Terminale'].includes(level)) {
      setSelectedLevel(level as StudentLevel);
    }
    const bookingEl = document.getElementById('reserver');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCourses = () => {
    const coursesEl = document.getElementById('programmes');
    if (coursesEl) {
      coursesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF0] text-[#433E37] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Header */}
      <Navbar onNavigateToBooking={handleNavigateToBooking} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookClick={() => handleNavigateToBooking()}
          onExploreCourses={handleExploreCourses}
        />

        {/* Official Flyer & 2026 Examination Results Section */}
        <OfficialFlyerSection />

        {/* Countdown Timer (Target: 14 Septembre 2026 à 16h30) */}
        <CountdownSection onReserveClick={() => handleNavigateToBooking()} />

        {/* Detailed Courses & Levels (4ème, 3ème, 1ère, Tle) */}
        <CoursesGrid onSelectLevel={handleSelectLevel} />

        {/* Pricing Transparency (10 000 FCFA) */}
        <PricingCard onReserveClick={() => handleNavigateToBooking()} />

        {/* Online Reservation System with Integrated Flyer & Direct WhatsApp Validation */}
        <BookingSection initialLevel={selectedLevel} />

        {/* Pedagogical Methodology & Interactive Spanish Level Quiz */}
        <Methodology />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Direct WhatsApp Action */}
      <FloatingWhatsApp />
    </div>
  );
}
