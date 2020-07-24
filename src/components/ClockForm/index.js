import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import FormContext from "../../contexts/FormContext";
import ClockFormRow from "../ClockFormRow";
import Title from "../Title";
import { encodeToUrl } from "../../utils/routes";
import { DEFAULT_COLORS } from "../../data/colors";
import "./ClockForm.css";

/**
 * Form component for creating a new color clock.
 *
 * Form validates whether the times are in strictly ascending order,
 * and all three times must be provided in order to submit.
 * Upon successful form submit, the user is redirected to the
 * show page for the newly created clock.
 *
 * Props: none
 * State:
 *   - formData: {
 *       startTime: String,
 *       warningTime: String,
 *       endTime: String,
 *       startColor: String,
 *       warningColor: String,
 *       endColor: String
 *     }
 *   - errors: {
 *       warningTime: String,
 *       endTime: String,
 *     }
 *
 */
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

  const colors = useMemo(
    () => [formData.startColor, formData.warningColor, formData.endColor],
    [formData.startColor, formData.warningColor, formData.endColor]
  );

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
        <Title colors={colors} />
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
