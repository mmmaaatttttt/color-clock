import React from "react";
import { render } from "@testing-library/react";
import ProgressBar from "./";

describe("basic ProgressBar tests", function () {
  it("renders without crashing", function () {
    render(<ProgressBar />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<ProgressBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
