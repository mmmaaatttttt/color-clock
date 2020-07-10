import React from "react";
import { capitalize } from "../../utils";
import "./ClockFormRow.css";

function ClockFormRow({
  prefix = "start",
  values = ["00:00", "#000000"],
  handleChange = () => {},
  title = "ClockFormRow",
  error = null
}) {
  return (
    <div>
      <h4 className="ClockFormRow--heading">{title}</h4>
      <div className={`ClockFormRow row ${error ? "error" : ""}`}>
        <div className="column time">
          <label htmlFor={`${prefix}Time`}>{capitalize(prefix)} Time</label>
          <input
            type="time"
            id={`${prefix}Time`}
            name={`${prefix}Time`}
            value={values[0]}
            onChange={handleChange}
          />
          {error && <span className="error-text">{error}</span>}
        </div>
        <div className="column">
          <label htmlFor={`${prefix}Color`}>{capitalize(prefix)} Color</label>
          <input
            type="color"
            id={`${prefix}Color`}
            name={`${prefix}Color`}
            value={values[1]}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ClockFormRow;
