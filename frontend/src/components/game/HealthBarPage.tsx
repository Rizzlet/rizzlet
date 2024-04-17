import React, { useState } from "react";
import HealthBar from "./HealthBar";

const HealthBarPage = () => {
  const [playerHealth, setPlayerHealth] = useState(100);

  const decreaseHealth = () => {
    setPlayerHealth((prevHealth) => Math.max(0, prevHealth - 10));
  };

  return (
    <div>
      <h1>Health Bar Page</h1>
      <button onClick={decreaseHealth}>Decrease Health</button>
      <HealthBar health={playerHealth} />
    </div>
  );
};

export default HealthBarPage;