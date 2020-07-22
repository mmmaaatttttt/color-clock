import React from "react";
import Routes from "../Routes";
import "./App.css";

/** 
 * Root of our react application. Related stylesheet includes
 * all keyframes for page transitions.
 * 
 * Props: none
 * State: none
 */
function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default React.memo(App);
