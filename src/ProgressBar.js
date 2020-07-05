import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./ProgressBar.css";

function ProgressBar({
  gradientPercentage,
  caretPercentage,
  color1,
  color2,
  color3
}) {
  const background = `linear-gradient(
    90deg, ${color1} 0%,${color2} ${gradientPercentage}%, ${color3} 100%
  )`;
  console.log("%%%", caretPercentage);
  return (
    <div className="ProgressBar">
      <div className="ProgressBar--bar" style={{ background }}>
        <FontAwesomeIcon
          icon={faCaretUp}
          size="2x"
          className="ProgressBar--caret"
          style={{ left: `${caretPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
