import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./ProgressBar.css";
import { DEFAULT_COLORS } from "../../data/colors";

/**
 * Progress bar that displays inside of the ColorClock component.
 * Useful for seeing how much time has elapsed.
 * 
 * Props:
 *   - gradientPercentage: Number - Represents when the warning time starts
 *     as a percentage of the clock's total time.
 *   - caretPercentage: Number - Represents how far the caret should be from the start,
 *     as a percentage.
 *   - colors: String[] - Array of color strings (used to make the gradient).
 *   - hidden: Boolean - Toggles whether the bar is hidden or not.
 */
function ProgressBar({
  gradientPercentage = 50,
  caretPercentage = 50,
  colors = DEFAULT_COLORS,
  hidden = false
}) {
  const [color1, color2, color3] = colors;
  const background = `linear-gradient(
    90deg, ${color1} 0%,${color2} ${gradientPercentage}%, ${color3} 100%
  )`;
  return (
    <div
      className={`ProgressBar ${hidden ? "hidden" : ""}`}
      data-testid="ProgressBar"
    >
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
