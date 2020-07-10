import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import ClockForm from "../ClockForm";
import ColorClock from "../ColorClock";
import About from "../About";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <ClockForm />
      </Route>
      <Route exact path="/clocks/:clockId">
        <ColorClock />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
    </Switch>
  );
}

export default Routes;
