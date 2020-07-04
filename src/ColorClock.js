import React, { useState, useEffect } from "react";

function ColorClock({ clockData }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearTimeout(timerId);
  })

  return (
    <div>
      <h4>ColorClock</h4>
      <pre>{JSON.stringify(clockData, null, 2)}</pre>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
}

export default ColorClock;
