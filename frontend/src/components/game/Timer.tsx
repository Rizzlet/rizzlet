import { useEffect } from "react";

interface TimerProps {
  start: boolean;
  reset: boolean;
  timeInCentiseconds: number;
  setTimeInCentiseconds: (value: number | ((val: number) => number)) => void;
}

export function Timer({ start, reset, timeInCentiseconds, setTimeInCentiseconds }: TimerProps) {
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
  }, [start, setTimeInCentiseconds]);

  useEffect(() => {
    if (reset) {
      setTimeInCentiseconds(0);
    }
  }, [reset, setTimeInCentiseconds]);

  return null;
}
