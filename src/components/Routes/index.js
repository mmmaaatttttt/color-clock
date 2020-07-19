import React, { useRef } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ClockForm from "../ClockForm";
import ColorClockValidator from "../ColorClockValidator";
import About from "../About";

const routes = [
  {
    path: "/",
    Component: ClockForm
  },
  {
    path: "/about",
    Component: About
  },
  {
    path: "/clocks/:clockId",
    Component: ColorClockValidator
  }
];

function Routes() {
  routes[0].nodeRef = useRef(null);
  routes[1].nodeRef = useRef(null);
  routes[2].nodeRef = useRef(null);
  return (
    <Switch>
      <Route exact path={routes.map(route => route.path)}>
        {routes.map(({ path, Component, nodeRef }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                in={match !== null}
                timeout={1000}
                classNames="page"
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
