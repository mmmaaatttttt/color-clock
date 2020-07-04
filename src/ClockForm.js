import React, { useState } from "react";
import ClockFormRow from "./ClockFormRow";
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
    startTime: "",
    warningTime: "",
    endTime: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(oldData => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // check that starTime < endTime
    if (formData.endTime <= formData.startTime) {
      setErrors(oldErrors => ({
        ...oldErrors,
        endTime: "End Time must come after Start Time."
      }));
    } else {
      addData(formData);
    }
  };

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
        <input type="submit" className="ClockForm--button button" value="Create clock!" />
      </form>
    </div>
  );
}

export default ClockForm;
