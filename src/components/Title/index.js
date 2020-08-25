import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { DEFAULT_COLORS } from "../../data/colors";
import "./Title.css";

/**
 * Title of the app, which displays inside of ColorForm.
 * The title icon uses a dynamic gradient which changes
 * based on the colors in the form.
 * 
 * Props:
 *   - colors: String[] - array of three hex codes
 * State: none
 */
function Title({ colors = DEFAULT_COLORS }) {
  return (
    <div>
      <svg width="0" height="0">
        <linearGradient id="clockgrad" x1="0%" y1="0%" x2="100%" y2="100%">
          {colors.map((color, i) => (
            <stop
              key={i}
              offset={`${(i / (colors.length - 1)) * 100}%`}
              style={{ stopColor: color, stopOpacity: 1 }}
            />
          ))}
        </linearGradient>
      </svg>
      <h1 className="Title--heading">
        Color
        <FontAwesomeIcon icon={faClock} className="Title--icon" size="2x" />
        Clock
      </h1>
      <Link to="/about" className="Title--question">
        <Icon faIcon={faQuestion} />
      </Link>
    </div>
  );
}

export default React.memo(Title);
