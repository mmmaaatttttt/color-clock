import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Icon.css";

/**
 * Basic presentation component for displaying icons in the app.
 * 
 * Props:
 *   - onClick: Function - click event handler
 *   - faIcon: String - font awesome icon (import from fontawesome)
 */
function Icon({ onClick, faIcon }) {
  return (
    <div className="Icon" onClick={onClick} role="button" >
      <FontAwesomeIcon icon={faIcon} fixedWidth />
    </div>
  );
}

export default Icon;
