import React from "react";
import { render } from "@testing-library/react";
import ClockForm from "./";

describe("basic ClockForm tests", function () {
  it("renders without crashing", function () {
    render(<ClockForm />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<ClockForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
