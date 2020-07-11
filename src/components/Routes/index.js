import React from "react";
import { Switch, Route } from "react-router-dom";
import ClockForm from "../ClockForm";
import ColorClockValidator from "../ColorClockValidator";
import About from "../About";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <ClockForm />
      </Route>
      <Route exact path="/clocks/:clockId">
        <ColorClockValidator />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
    </Switch>
  );
}

export default Routes;
