import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import FormContext from "../../contexts/FormContext";
import ClockFormRow from "../ClockFormRow";
import Icon from "../Icon";
import { encodeToUrl } from "../../utils/routes";
import { DEFAULT_COLORS } from "../../data/colors";
import "./ClockForm.css";

function ClockForm() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    startTime: "",
    warningTime: "",
    endTime: "",
    startColor: DEFAULT_COLORS[0],
    warningColor: DEFAULT_COLORS[1],
    endColor: DEFAULT_COLORS[2]
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
      const colors = [
        formData.startColor,
        formData.warningColor,
        formData.endColor
      ];
      const times = [
        formData.startTime,
        formData.warningTime,
        formData.endTime
      ];
      const clockId = encodeToUrl({ colors, times });
      history.push(`/clocks/${clockId}`);
    }
  };

  const timesFilledOut =
    formData.startTime && formData.warningTime && formData.endTime;

  return (
    <FormContext.Provider value={{ handleChange, formData, errors }}>
      <div className="ClockForm">
        <Link to="/about">
          <Icon faIcon={faQuestion} />
        </Link>
        <form onSubmit={handleSubmit} className="ClockForm--form">
          <ClockFormRow
            prefix="start"
            title="When do you want the clock to start?"
          />
          <ClockFormRow prefix="warning" title="When do you want to warn?" />
          <ClockFormRow prefix="end" title="When is time up?" />
          <input
            type="submit"
            className={`ClockForm--button button ${
              timesFilledOut ? "" : "hidden"
            }`}
            value="Create clock!"
          />
        </form>
      </div>
    </FormContext.Provider>
  );
}

export default React.memo(ClockForm);
