import React from "react";
import { render } from "@testing-library/react";
import ColorClock from "./";

describe("basic ColorClock tests", function () {
  it("renders without crashing", function () {
    render(<ColorClock />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<ColorClock />);
    expect(asFragment()).toMatchSnapshot();
  });
});
