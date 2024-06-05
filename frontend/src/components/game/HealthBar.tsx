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
    backgroundColor: health > 70 ? "rgb(0,180,130)" : health > 30 ? "gold" : "red",
    height: "20px",
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div>
      <div
        style={{
          border: "2.5px solid white",
          width: "300px",
          height: "20px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div style={healthBarStyle}></div>
      </div >
      <p className="text-white font-semibold">Health: {health}</p>
    </div>
  );
};

export default HealthBar;
