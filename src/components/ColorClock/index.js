import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { scaleLinear } from "d3-scale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRedo } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../ProgressBar";
import {
  timeToNumber,
  getTime,
  howLongFromNow,
  middleTimeAsPercentage
} from "../../utils";
import { decodeFromUrl } from "../../utils/routes";
import "./ColorClock.css";

function ColorClock() {
  const { clockId } = useParams();
  const history = useHistory();
  const { colors, times } = decodeFromUrl(clockId);
  const [startTime, warningTime, endTime] = times;
  const [startColor, warningColor, endColor] = colors;
  const [
    { currentTimeForDisplay, currentTimeForComparison },
    setTime
  ] = useState(getTime());
  const [color, setColor] = useState(startColor);
  const [showBar, setShowBar] = useState(true);

  const toggleBar = () => {
    setShowBar(barState => !barState);
  };

  const handleReset = () => {
    const msg =
      "Are you sure you want to go back? This action can't be undone.";
    if (window.confirm(msg)) {
      history.push("/");
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      const timeArr = [startTime, warningTime, endTime].map(timeToNumber);
      const colorArr = [startColor, warningColor, endColor];
      const colorScale = scaleLinear().domain(timeArr).range(colorArr);

      const newTime = getTime();
      setTime(newTime);
      setColor(colorScale(timeToNumber(newTime.currentTimeForComparison)));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [startTime, startColor, warningTime, warningColor, endTime, endColor]);

  if (currentTimeForComparison < startTime)
    return (
      <div className="ColorClock ColorClock--early">
        <p>This clock will start {howLongFromNow(startTime)}.</p>
        <p>Current time: {currentTimeForDisplay}.</p>
        <div className="ColorClock--icon" onClick={handleReset}>
          <FontAwesomeIcon icon={faRedo} fixedWidth />
        </div>
      </div>
    );

  if (currentTimeForComparison > endTime) {
    return (
      <div className="ColorClock" style={{ backgroundColor: endColor }}>
        <h1>Time's Up!</h1>
        <h4>This clock ended {howLongFromNow(endTime)}.</h4>
        <h4>Current time: {currentTimeForDisplay}.</h4>
        <div className="ColorClock--icon" onClick={handleReset}>
          <FontAwesomeIcon icon={faRedo} fixedWidth />
        </div>
      </div>
    );
  }

  return (
    <div
      className="ColorClock ColorClock--active"
      style={{ backgroundColor: color }}
    >
      <div>
        <h1>{currentTimeForDisplay}</h1>
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
          currentTimeForComparison,
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
