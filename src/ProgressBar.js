import React from "react";
import "./ProgressBar.css";

function ProgressBar({ gradientPercentage, color1, color2, color3 }) {
  const background = `linear-gradient(
    90deg, ${color1} 0%,${color2} ${gradientPercentage}%, ${color3} 100%
  )`;
  return (
    <div className="ProgressBar">
      <div className="ProgressBar--bar" style={{ background }}></div>
    </div>
  );
}

export default ProgressBar;
