import React from "react";
import "./weather-animations.css";

export default function AnimatedBackground({ type }) {
  return (
    <div className={`weather-bg-layer ${type}`}>
      {/* Rain Drops */}
      {type === "rain" &&
        [...Array(40)].map((_, i) => <div key={i} className="rain-drop" />)}

      {/* Snow */}
      {type === "snow" &&
        [...Array(35)].map((_, i) => <div key={i} className="snow-flake" />)}

      {/* Thunder Flash */}
      {type === "thunder" && <div className="thunder-flash" />}

      {/* Sunny Rays */}
      {type === "sunny" && <div className="sun-rays" />}
    </div>
  );
}
