import React from "react";
import App from "./";
import { renderWithRouter, timeMock } from "../../utils/testUtils";

describe("App component", function () {
  describe("basic tests", function () {
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

    it("redirects to the form with an invalid url", function() {
      const { getByText } = renderWithRouter(<App />, {
        route: "/nope"
      });
      expect(getByText("When do you want the clock to start?")).toBeInTheDocument();
    })
  });
});
