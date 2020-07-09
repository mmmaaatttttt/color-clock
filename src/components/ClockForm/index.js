import React, { useState, useEffect } from "react";
import ClockFormRow from "../ClockFormRow";
import "./ClockForm.css";

function ClockForm({ addData }) {
  const [formData, setFormData] = useState({
    startTime: "",
    warningTime: "",
    endTime: "",
    startColor: "#00ff00",
    warningColor: "#ffff00",
    endColor: "#ff0000"
  });

  const [errors, setErrors] = useState({
    warningTime: "",
    endTime: ""
  });

  useEffect(() => {
    const { startTime, warningTime, endTime } = formData;
    const isBefore = (time1, time2) => time1 && time2 && time1 <= time2;

    let warningError = "";
    let endError = "";
    if (isBefore(endTime, startTime)) {
      endError = "End time must come after start time.";
    }
    if (isBefore(warningTime, startTime) || isBefore(endTime, warningTime)) {
      warningError = "Warning time must be between start and end time.";
    }
    setErrors({ warningTime: warningError, endTime: endError });
  }, [formData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(oldData => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const noErrors = Object.values(errors).every(err => err === "");
    if (noErrors) {
      addData(formData);
    }
  };

  const timesFilledOut =
    formData.startTime && formData.warningTime && formData.endTime;

  return (
    <div className="ClockForm">
      <form onSubmit={handleSubmit} className="ClockForm--form">
        <ClockFormRow
          prefix="start"
          values={[formData.startTime, formData.startColor]}
          handleChange={handleChange}
          error={errors.startTime}
          title="When do you want the clock to start?"
        />
        <ClockFormRow
          prefix="warning"
          values={[formData.warningTime, formData.warningColor]}
          handleChange={handleChange}
          error={errors.warningTime}
          title="When do you want to warn?"
        />
        <ClockFormRow
          prefix="end"
          values={[formData.endTime, formData.endColor]}
          handleChange={handleChange}
          error={errors.endTime}
          title="When is time up?"
        />
        <input
          type="submit"
          className={`ClockForm--button button ${
            timesFilledOut ? "" : "hidden"
          }`}
          value="Create clock!"
        />
      </form>
    </div>
  );
}

export default ClockForm;
