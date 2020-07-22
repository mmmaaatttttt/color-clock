import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { decodeFromUrl } from "../../utils/routes";
import ColorClock from "../ColorClock";

/**
 * Validates if the url parameter for the clock id corresponds
 * to valid data. Returns the data if the id is valid, otherwise false.
 * 
 * @param {String} clockId - id of the clock (taken from the URL)
 */
const validateId = (clockId) => {
  try {
    const { colors, times } = decodeFromUrl(clockId);
    if (colors.length !== 3 || times.length !== 3) {
      throw new Error(
        "Color clock requires three colors and three times.\n" +
          `Colors received: ${colors.length}.\n` +
          `Times received: ${times.length}.`
      );
    }
    return { colors, times };
  } catch (err) {
    console.warn(
      `Route id ${clockId} is invalid. Redirecting to '/'. Original error below:`
    );
    console.warn(err);
    return false;
  }
};

/**
 * Wrapper around the ColorClock component that performs validation
 * of the clockId from the URL. If the id is valid, we render
 * the ColorClock. Otherwise, we redirect to display ClockForm.
 * 
 * Props: none
 * State: none
 */
function ColorClockValidator() {
  const { clockId } = useParams();

  // exit without redirecting if mid transition
  if (!clockId) return null;

  let validatedObj = validateId(clockId);

  if (!validatedObj) {
    return <Redirect to="/" />;
  }

  return <ColorClock {...validatedObj} />;
}

export default ColorClockValidator;
