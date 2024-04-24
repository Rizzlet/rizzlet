import React, { useState } from "react";
import { Timer } from "./Timer";

const TimerPage = () => {
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [timeInCentiseconds, setTimeInCentiseconds] = useState(0);

  const handleReset = () => {
    setReset(true); // Signal a rest
    setTimeout(() => {
      setReset(false); // Reset the signal
      setTimeInCentiseconds(0); // Update the display only after the state has been cleared
    }, 10);
    setStart(false); // Stop the timer
  };

  const formatTime = (totalCentiseconds: number): string => {
    const minutes = Math.floor(totalCentiseconds / 6000).toString().padStart(2, '0');
    const seconds = Math.floor((totalCentiseconds % 6000) / 100).toString().padStart(2, '0');
    const centiseconds = (totalCentiseconds % 100).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="w-full flex justify-end items-center pt-20">
        <div className="mr-40">
          <Timer
            start={start}
            reset={reset}
            timeInCentiseconds={timeInCentiseconds}
            setTimeInCentiseconds={setTimeInCentiseconds}
          />
          <div className="text-2xl">
            Time Elapsed: {formatTime(timeInCentiseconds)}
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-10 mr-40 pb-10">
        <button
          onClick={() => setStart(!start)}
          className={`py-2 px-4 rounded transition-colors mx-2 ${start ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {start ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors mx-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerPage;
