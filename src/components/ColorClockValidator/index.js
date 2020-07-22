import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { decodeFromUrl } from "../../utils/routes";
import ColorClock from "../ColorClock";

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

function ColorClockValidator() {
  const { clockId } = useParams();

  // exit without redirecting if mid transition
  if (!clockId) return null;

  let validatedObj = validateId(clockId);

  if (!validatedObj) {
    return <Redirect to={{ pathname: "/", state: { direction: "up" } }} />;
  }

  return <ColorClock {...validatedObj} />;
}

export default ColorClockValidator;
