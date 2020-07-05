import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRedo } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar";
import {
  timeToNumber,
  getTime,
  howLongFromNow,
  middleTimeAsPercentage
} from "./utils";
import "./ColorClock.css";

function ColorClock({
  startTime,
  warningTime,
  endTime,
  startColor,
  warningColor,
  endColor,
  reset
}) {
  const [{ timeForDisplay, timeForComparison }, setTime] = useState(getTime());
  const [color, setColor] = useState(startColor);
  const [showBar, setShowBar] = useState(true);

  const toggleBar = () => {
    setShowBar(barState => !barState);
  };

  const handleReset = () => {
    const msg =
      "Are you sure you want to go back? This action can't be undone.";
    if (window.confirm(msg)) {
      reset();
    }
  };

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
      <div className="ColorClock ColorClock--early">
        <p>This clock will start {howLongFromNow(startTime)}.</p>
        <p>Current time: {timeForDisplay}.</p>
        <div className="ColorClock--icon" onClick={handleReset}>
          <FontAwesomeIcon icon={faRedo} fixedWidth />
        </div>
      </div>
    );

  if (timeForComparison > endTime) {
    return (
      <div className="ColorClock" style={{ backgroundColor: endColor }}>
        <h1>Time's Up!</h1>
        <h4>This clock ended {howLongFromNow(endTime)}.</h4>
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
          <div className="ColorClock--icon" onClick={toggleBar}>
            <FontAwesomeIcon icon={showBar ? faEyeSlash : faEye} fixedWidth />
          </div>
          <div className="ColorClock--icon" onClick={handleReset}>
            <FontAwesomeIcon icon={faRedo} fixedWidth />
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
        hidden={!showBar}
      />
    </div>
  );
}

export default React.memo(ColorClock);
