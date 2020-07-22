import React, { useRef } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ClockForm from "../ClockForm";
import ColorClockValidator from "../ColorClockValidator";
import About from "../About";

const routes = [
  {
    name: "about",
    path: "/about",
    Component: About
  },
  {
    name: "clock",
    path: "/clocks/:clockId",
    Component: ColorClockValidator
  },
  {
    name: "form",
    path: "/",
    Component: ClockForm
  }
];

/**
 * Route component for determine what to display based on the url.
 * Routes are nested in order to separate the transition effects
 * from the default redirect behavior when the url is malformed.
 * 
 * Props - none
 * State - none
 */
function Routes() {
  routes[0].nodeRef = useRef(null);
  routes[1].nodeRef = useRef(null);
  routes[2].nodeRef = useRef(null);
  return (
    <Switch>
      <Route exact path={routes.map(route => route.path)}>
        {routes.map(({ path, Component, nodeRef, name }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match !== null}
                timeout={1000}
                classNames={name}
                unmountOnExit
                nodeRef={nodeRef}
              >
                <div ref={nodeRef}>
                  <Component />
                </div>
              </CSSTransition>
            )}
          </Route>
        ))}
      </Route>
      {/* Need to separate Redirect into an outer router,
          since transitions are not inside of a Switch. */}
      <Redirect to="/" />
    </Switch>
  );
}

export default React.memo(Routes);
