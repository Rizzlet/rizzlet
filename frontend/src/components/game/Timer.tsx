import { useEffect } from "react";

interface TimerProps {
  start: boolean;
  timeInCentiseconds: number;
  setTimeInCentiseconds: (value: number | ((val: number) => number)) => void;
}

export function Timer({ start, setTimeInCentiseconds }: TimerProps) {
  useEffect(() => {
    let interval: number | null = null;

    if (start) {
      interval = window.setInterval(() => {
        setTimeInCentiseconds((time) => time + 1);
      }, 10);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [start, setTimeInCentiseconds]);

  return null;
}
