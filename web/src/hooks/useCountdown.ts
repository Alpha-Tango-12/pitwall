import { useState, useEffect } from "react";
import type { Countdown } from "@/types/app";

function calculateCountdown(target: Date): Countdown {
  const now = Date.now();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

export function useCountdown(targetDate: Date): Countdown {
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const next = calculateCountdown(targetDate);
      setCountdown(next);
      if (next.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
