import { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

// Target date: September 14, 2026 16:30:00 (Rentrée officielle Le GETUP)
export const TARGET_DATE = new Date('2026-09-14T16:30:00');

export function useCountdown(targetDate: Date = TARGET_DATE) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        totalHours: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    const totalHours = Math.floor(difference / (1000 * 60 * 60));

    return {
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
      totalHours,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
