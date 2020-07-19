import React from "react";
import App from "./";
import { renderWithRouter, timeMock } from "../../utils/testUtils";

describe("basic App tests", function () {
  it("renders without crashing", function () {
    renderWithRouter(<App />);
  });

  it("matches snapshot for the form", function () {
    const { asFragment } = renderWithRouter(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for about", function () {
    const { asFragment } = renderWithRouter(<App />, { route: "/about" });
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot for a valid clock", function () {
    timeMock.set("10:00");
    const { asFragment } = renderWithRouter(<App />, {
      route: "/clocks/3tH42XskKAkY7NYHrms"
    });
    expect(asFragment()).toMatchSnapshot();
    timeMock.reset();
  });
});
