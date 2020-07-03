import React, { useState } from "react";

function ClockForm({ addData }) {
  const [formData, setFormData] = useState({
    startTime: "",
    warnTime: "",
    endTime: "",
    startColor: "#00ff00",
    warnColor: "#ffff00",
    endColor: "#ff0000"
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addData(formData);
  }

  return (
    <div>
      <h2>ClockForm</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
          <label htmlFor="startColor">Start Color</label>
          <input
            type="color"
            id="startColor"
            name="startColor"
            value={formData.startColor}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="warnTime">Warning Time</label>
          <input
            type="time"
            id="warnTime"
            name="warnTime"
            value={formData.warnTime}
            onChange={handleChange}
          />
          <label htmlFor="warnColor">Warning Color</label>
          <input
            type="color"
            id="warnColor"
            name="warnColor"
            value={formData.warnColor}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
          <label htmlFor="endColor">End Color</label>
          <input
            type="color"
            id="endColor"
            name="endColor"
            value={formData.endColor}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Create clock!" />
      </form>
    </div>
  );
}

export default ClockForm;
