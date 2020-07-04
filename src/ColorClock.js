import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { timeToNumber, getTime, howLongAgo } from "./utils";
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
    <div className="ColorClock" style={{ backgroundColor: color }}>
      <h1>{timeForDisplay}</h1>
    </div>
  );
}

export default ColorClock;
