import React from "react";
import App from "./";
import { renderWithRouter } from "../../utils/testUtils";

describe("basic App tests", function () {
  it("renders without crashing", function () {
    renderWithRouter(<App />);
  });

  it("matches snapshot", function () {
    const { asFragment } = renderWithRouter(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
