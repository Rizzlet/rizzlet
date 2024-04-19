import React, { useState } from "react";
import { Timer } from "./Timer";

const TimerPage = () => {
  const [start, setStart] = useState(false);
  const [timerDisplay, setTimerDisplay] = useState("00:00");

  const handleReset = () => {
    setTimerDisplay("00:00");
    setStart(false);
  };

  return (
    <div>
      <Timer start={start} onTimeUpdate={(time) => setTimerDisplay(time)} />
      <button onClick={() => setStart(!start)}>{start ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
      <div>
        Time Elapsed: {timerDisplay}
      </div>
    </div>
  );
};

export default TimerPage;
