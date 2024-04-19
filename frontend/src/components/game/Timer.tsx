import React, { useState, useEffect } from "react";

interface TimerProps {
  start: boolean;
  onTimeUpdate: (time: string) => void;
}

export function Timer({ start, onTimeUpdate }: TimerProps) {
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (start) {
      interval = setInterval(() => {
        setTimeInCentiseconds((time) => time + 1);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [start]);

  useEffect(() => {
    onTimeUpdate(formatTime(timeInCentiseconds));
  }, [timeInCentiseconds, onTimeUpdate]);

  const formatTime = (totalCentiseconds: number): string => {
    const seconds = Math.floor(totalCentiseconds / 100).toString().padStart(2, '0');
    const centiseconds = (totalCentiseconds % 100).toString().padStart(2, '0');
    return `${seconds}:${centiseconds}`;
  };

  // No direct rendering of the time here
  return null;
}
