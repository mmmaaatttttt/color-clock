import React from "react";
import { render } from "@testing-library/react";
import ColorClockContainer from "./";

describe("basic ColorClockContainer tests", function () {
  it("renders without crashing", function () {
    render(<ColorClockContainer />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<ColorClockContainer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
