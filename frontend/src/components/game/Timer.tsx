import React, { useState, useEffect } from "react";

interface TimerProps {
  start: boolean;
  reset: boolean;
  onTimeUpdate: (time: string) => void;
}

export function Timer({ start, reset, onTimeUpdate }: TimerProps) {
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);

  useEffect(() => {
    let interval: number | null = null; // Change the type here to number

    if (start) {
      interval = window.setInterval(() => { // Use window.setInterval to ensure the correct type
        setTimeInCentiseconds((time) => time + 1);
      }, 10);
    } else {
      if (interval !== null) clearInterval(interval); // Only clear if interval is not null
    }

    // Clean up function
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [start]);

  useEffect(() => {
    if (reset) {
      setTimeInCentiseconds(0);
    }
  }, [reset]);

  useEffect(() => {
    onTimeUpdate(formatTime(timeInCentiseconds));
  }, [timeInCentiseconds, onTimeUpdate]);

  const formatTime = (totalCentiseconds: number): string => {
    const seconds = Math.floor(totalCentiseconds / 100).toString().padStart(2, '0');
    const centiseconds = (totalCentiseconds % 100).toString().padStart(2, '0');
    return `${seconds}:${centiseconds}`;
  };

  return null;
}
