import React from "react";
import { render } from "@testing-library/react";
import ClockFormRow from "./";

describe("basic ClockFormRow tests", function () {
  it("renders without crashing", function () {
    render(<ClockFormRow />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<ClockFormRow />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with errors", function () {
    const { asFragment } = render(<ClockFormRow error="this is an error." />);
    expect(asFragment()).toMatchSnapshot();
  });
});
