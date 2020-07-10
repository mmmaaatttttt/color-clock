import React from "react";
import { render } from "@testing-library/react";
import App from "./";

describe("basic App tests", function () {
  it("renders without crashing", function () {
    render(<App />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
