import React from "react";

interface HealthBarProps {
  health: number; // Health value from 0 to 100
}

const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
  // Calculate width of the health bar based on the health value
  const healthBarWidth = `${health}%`;

  // Define styles for the health bar
  const healthBarStyle: React.CSSProperties = {
    width: healthBarWidth,
    backgroundColor: health > 70 ? "green" : health > 30 ? "yellow" : "red",
    height: "20px",
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div>
      <h2>Health Bar</h2>
      <div
        style={{
          border: "1px solid black",
          width: "300px",
          height: "20px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div style={healthBarStyle}></div>
      </div>
      <p>Health: {health}</p>
    </div>
  );
};

export default HealthBar;

