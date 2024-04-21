import React, { useState } from "react";
import { Timer } from "./Timer";

const TimerPage = () => {
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const [timerDisplay, setTimerDisplay] = useState("00:00");

  const handleReset = () => {
    setReset(true);
    setTimerDisplay("00:00");
    setTimeout(() => setReset(false), 0);
    setStart(false);
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="w-full flex justify-end items-center pt-20">
        <div className="mr-40">
          <Timer start={start} reset={reset} onTimeUpdate={(time) => setTimerDisplay(time)} />
          <div className="text-2xl">
            Time Elapsed: {timerDisplay}
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-10 mr-40 pb-10">
        <button
          onClick={() => setStart(!start)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mx-2"
        >
          {start ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors mx-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerPage;
