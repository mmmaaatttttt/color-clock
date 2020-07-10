import React from "react";
import { render } from "@testing-library/react";
import MockDate from "mockdate";
import ColorClock from "./";
import { makeTimeStamp } from "../../utils/testUtils";

describe("basic ColorClock tests", function () {
  it("renders without crashing", function () {
    render(<ColorClock />);
  });

  it("matches snapshot before the clock is active", function () {
    MockDate.set(makeTimeStamp("08:00:00"));
    const { asFragment } = render(<ColorClock />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot while the clock is active", function () {
    MockDate.set(makeTimeStamp("10:00:00"));
    const { asFragment } = render(<ColorClock />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot after the clock is active", function () {
    MockDate.set(makeTimeStamp("14:00:00"));
    const { asFragment } = render(<ColorClock />);
    expect(asFragment()).toMatchSnapshot();
  });

  afterEach(function() {
    MockDate.reset()
  });
});
