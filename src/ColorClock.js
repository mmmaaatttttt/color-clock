import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRedo } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar";
import {
  timeToNumber,
  getTime,
  howLongAgo,
  middleTimeAsPercentage
} from "./utils";
import "./ColorClock.css";

function ColorClock({
  startTime,
  warningTime,
  endTime,
  startColor,
  warningColor,
  endColor
}) {
  const [{ timeForDisplay, timeForComparison }, setTime] = useState(getTime());
  const [color, setColor] = useState(startColor);

  useEffect(() => {
    const timerId = setInterval(() => {
      const timeArr = [startTime, warningTime, endTime].map(timeToNumber);
      const colorArr = [startColor, warningColor, endColor];
      const colorScale = scaleLinear().domain(timeArr).range(colorArr);

      const newTime = getTime();
      setTime(newTime);
      setColor(colorScale(timeToNumber(newTime.timeForComparison)));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [startTime, startColor, warningTime, warningColor, endTime, endColor]);

  if (timeForComparison < startTime)
    return (
      <div>
        <p>This clock will start at {startTime}.</p>
        <p>Current time: {timeForDisplay}.</p>
      </div>
    );

  if (timeForComparison > endTime) {
    return (
      <div className="ColorClock" style={{ backgroundColor: endColor }}>
        <h1>Time's Up!</h1>
        <h4>This clock ended {howLongAgo(endTime)}.</h4>
        <h4>Current time: {timeForDisplay}.</h4>
      </div>
    );
  }

  return (
    <div
      className="ColorClock ColorClock--active"
      style={{ backgroundColor: color }}
    >
      <div>
        <h1>{timeForDisplay}</h1>
        <div className="ColorClock--icon-wrapper">
          <div className="ColorClock--icon">
            <FontAwesomeIcon icon={faEyeSlash} size="2x" />
          </div>
          <div className="ColorClock--icon">
            <FontAwesomeIcon icon={faRedo} size="2x" />
          </div>
        </div>
      </div>
      <ProgressBar
        caretPercentage={middleTimeAsPercentage(
          startTime,
          timeForComparison,
          endTime
        )}
        gradientPercentage={middleTimeAsPercentage(
          startTime,
          warningTime,
          endTime
        )}
        color1={startColor}
        color2={warningColor}
        color3={endColor}
      />
    </div>
  );
}

export default React.memo(ColorClock);
