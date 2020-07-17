import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { scaleLinear } from "d3-scale";
import { faEye, faEyeSlash, faRedo } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../ProgressBar";
import Icon from "../Icon";
import {
  timeToNumber,
  getTime,
  howLongFromNow,
  middleTimeAsPercentage
} from "../../utils";
import "./ColorClock.css";

function ColorClock({
  times = ["09:00", "10:00", "11:00"],
  colors = ["#00ff00", "#ffff00", "#ff0000"]
}) {
  const history = useHistory();
  const colorScale = useCallback(
    scaleLinear().domain(times.map(timeToNumber)).range(colors).clamp(true),
    [times, colors]
  );
  const [
    { currentTimeForDisplay, currentTimeForComparison },
    setTime
  ] = useState(getTime());
  const [color, setColor] = useState(
    colorScale(timeToNumber(currentTimeForComparison))
  );
  const [showBar, setShowBar] = useState(true);

  const toggleBar = () => {
    setShowBar(barState => !barState);
  };

  const handleReset = () => {
    const msg =
      "Are you sure you want to go back? This action can't be undone.";
    if (window.confirm(msg)) {
      history.push("/", { direction: "up" });
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTime = getTime();
      setTime(newTime);
      setColor(colorScale(timeToNumber(newTime.currentTimeForComparison)));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [colorScale]);

  const startTime = times[0];
  const endTime = times[times.length - 1];

  if (currentTimeForComparison < startTime)
    return (
      <div className="ColorClock ColorClock--early">
        <p>This clock will start {howLongFromNow(startTime)}.</p>
        <p>Current time: {currentTimeForDisplay}.</p>
        <Icon onClick={handleReset} faIcon={faRedo} />
      </div>
    );

  const colorStyle = {
    backgroundColor: color,
    boxShadow: `${color} 0 -5rem 10rem 5rem`
  };

  if (currentTimeForComparison > endTime) {
    return (
      <div className="ColorClock" style={colorStyle}>
        <h1>Time's Up!</h1>
        <h4>This clock ended {howLongFromNow(endTime)}.</h4>
        <h4>Current time: {currentTimeForDisplay}.</h4>
        <Icon onClick={handleReset} faIcon={faRedo} />
      </div>
    );
  }

  return (
    <div className="ColorClock ColorClock--active" style={colorStyle}>
      <div>
        <h1>{currentTimeForDisplay}</h1>
        <div className="ColorClock--icon-wrapper">
          <Icon onClick={toggleBar} faIcon={showBar ? faEyeSlash : faEye} />
          <Icon onClick={handleReset} faIcon={faRedo} />
        </div>
      </div>
      <ProgressBar
        caretPercentage={middleTimeAsPercentage(
          startTime,
          currentTimeForComparison,
          endTime
        )}
        gradientPercentage={middleTimeAsPercentage(...times)}
        colors={colors}
        hidden={!showBar}
      />
    </div>
  );
}

export default React.memo(ColorClock);
