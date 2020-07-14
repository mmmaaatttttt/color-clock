import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Icon.css";

function Icon({ onClick, faIcon }) {
  return (
    <div className="Icon" onClick={onClick}>
      <FontAwesomeIcon icon={faIcon} fixedWidth />
    </div>
  );
}

export default Icon;
