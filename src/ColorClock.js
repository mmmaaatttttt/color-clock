import React from "react";

function ColorClock({clockData}) {
  return (
    <div>
      <h4>ColorClock</h4>
      <pre>{JSON.stringify(clockData, null, 2)}</pre>
    </div>
  )
}

export default ColorClock;