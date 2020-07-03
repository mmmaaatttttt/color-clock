import React, { useState } from "react";
import ClockForm from "./ClockForm";
import ColorClock from "./ColorClock";

function ColorClockContainer() {
  const [clockData, setClockData] = useState(null);

  const addData = formData => {
    setClockData(formData);
  };

  return (
    <div>
      <h1>ColorClockContainer</h1>
      {clockData ? (
        <ColorClock clockData={clockData} />
      ) : (
        <ClockForm addData={addData} />
      )}
    </div>
  );
}

export default ColorClockContainer;
