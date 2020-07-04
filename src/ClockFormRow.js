import React from "react";
import { capitalize } from "./utils";
import "./ClockFormRow.css"

function ClockFormRow({ prefix, values, handleChange, error = null }) {
  return (
    <div className={`ClockFormRow ${error ? "error" : ""}`}>
      <label htmlFor={`${prefix}Time`}>{capitalize(prefix)} Time</label>
      <input
        type="time"
        id={`${prefix}Time`}
        name={`${prefix}Time`}
        value={values[0]}
        onChange={handleChange}
        className="ClockFormRow--time"
      />
      <label htmlFor={`${prefix}Color`}>{capitalize(prefix)} Color</label>
      <input
        type="color"
        id={`${prefix}Color`}
        name={`${prefix}Color`}
        value={values[1]}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default ClockFormRow;
