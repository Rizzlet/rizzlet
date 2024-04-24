import React, { useState, useEffect } from "react";

interface TimerProps {
  start: boolean;
  reset: boolean;
  onTimeUpdate: (centiseconds: number) => void;
}

export function Timer({ start, reset, onTimeUpdate }: TimerProps) {
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);

  useEffect(() => {
    let interval: number | null = null;

    if (start) {
      interval = window.setInterval(() => {
        setTimeInCentiseconds(time => time + 1);
      }, 10);
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
    onTimeUpdate(timeInCentiseconds);
  }, [timeInCentiseconds, onTimeUpdate]);

  return null;
}
