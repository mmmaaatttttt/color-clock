import React, { useContext } from "react";
import { capitalize } from "../../utils";
import "./ClockFormRow.css";
import FormContext from "../../contexts/FormContext";

function ClockFormRow({
  prefix = "start",
  title = "ClockFormRow",
}) {
  const { handleChange, formData, errors } = useContext(FormContext);
  const error = errors[`${prefix}Time`];
  const timeVal = formData[`${prefix}Time`];
  const colorVal = formData[`${prefix}Color`];
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
            value={timeVal}
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
            value={colorVal}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ClockFormRow;
