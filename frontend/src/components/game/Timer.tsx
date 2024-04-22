import React, { useState, useEffect } from "react";

interface TimerProps {
  start: boolean;
  reset: boolean;
  onTimeUpdate: (time: string) => void;
}

export function Timer({ start, reset, onTimeUpdate }: TimerProps) {
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);

  useEffect(() => {
    let interval: number | null = null;

    if (start) {
      interval = window.setInterval(() => {
        setTimeInCentiseconds(time => time + 1);
      }, 10);
    } else if (interval !== null) {
      clearInterval(interval);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [start]);

  useEffect(() => {
    if (reset) {
      setTimeInCentiseconds(0); // Set time to zero then emit the update
    }
  }, [reset]);

  useEffect(() => {
    onTimeUpdate(formatTime(timeInCentiseconds));
  }, [timeInCentiseconds, onTimeUpdate]);

  const formatTime = (totalCentiseconds: number): string => {
    const minutes = Math.floor(totalCentiseconds / 6000).toString().padStart(2, '0');
    const seconds = Math.floor((totalCentiseconds % 6000) / 100).toString().padStart(2, '0');
    const centiseconds = (totalCentiseconds % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return null;
}
