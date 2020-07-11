import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { decodeFromUrl } from "../../utils/routes";
import ColorClock from "../ColorClock";

function ColorClockValidator() {
  const { clockId } = useParams();

  const validateId = () => {
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

  let validatedObj = validateId();

  if (!validatedObj) {
    return <Redirect to="/" />;
  }

  return <ColorClock {...validatedObj} />;
}

export default ColorClockValidator;
