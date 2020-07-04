import React, { useState, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { timeToNumber } from "./utils";
import "./ColorClock.css";

function ColorClock({
  startTime,
  warningTime,
  endTime,
  startColor,
  warningColor,
  endColor
}) {
  const [time, setTime] = useState(new Date());
  const [color, setColor] = useState(startColor);
  const timeStrDisplay = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const timeStrInternal = time.toLocaleTimeString("en-US", { hour12: false });

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTime = new Date();
      const newTimeStr = newTime.toLocaleTimeString("en-US", { hour12: false });
      const timeArr = [startTime, warningTime, endTime].map(timeToNumber);
      const colorArr = [startColor, warningColor, endColor];
      const colorScale = scaleLinear().domain(timeArr).range(colorArr);
      setTime(new Date());
      setColor(colorScale(timeToNumber(newTimeStr)));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [startTime, startColor, warningTime, warningColor, endTime, endColor]);

  if (timeStrInternal < startTime)
    return (
      <div>
        <p>This clock will start at {startTime}.</p>
        <p>Current time: {timeStrDisplay}.</p>
      </div>
    );

  if (timeStrInternal > endTime) {
    return (
      <div className="ColorClock" style={{ backgroundColor: endColor }}>
        <p>Time's up! This clock ended at {endTime}.</p>
        <p>Current time: {timeStrDisplay}.</p>
      </div>
    );
  }

  return (
    <div className="ColorClock" style={{ backgroundColor: color }}>
      <h1>{timeStrDisplay}</h1>
    </div>
  );
}

export default ColorClock;
