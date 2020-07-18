import React from "react";
import MockDate from "mockdate";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

/**
 * Create a timestamp out of a 24 hour time string.
 * Used in conjunction with mocking the Date constructor via MockDate.
 *
 * @param {String} time - 24 hour time in HH:mm:ss format (e.g. 15:16:23)
 */
function makeTimeStamp(time) {
  return `Sun Jul 05 2020 ${time} GMT-0700`;
}

/**
 * Abstraction around MockDate that lets us mock dates by providing
 * only times, not dates.
 */
export const timeMock = {
  set(time) {
    MockDate.set(makeTimeStamp(time));
  },
  reset() {
    MockDate.reset();
  }
};

/**
 * Abstraction to allow us to mock calls to the window confirm
 * function. Returns a setter and a getter. Set to true to accept
 * the confirm step, set to false to cancel it.
 */
export const confirmMock = {
  set(bool) {
    this._spy = jest.spyOn(window, "confirm");
    this._spy.mockImplementation(jest.fn(() => bool));
  },
  reset() {
    this._spy && this._spy.mockRestore();
  },
  _spy: null
};

/**
 * Helper function to modify the render function in React Testing Library
 * by wrapping rendered components inside of a router.
 *
 * Taken from https://testing-library.com/docs/example-react-router
 *
 * @param {Component} component - React component we want to render
 * @param {Object} param1 - object with route and history keys
 */
export function renderWithRouter(
  component,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(component, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}
