import React from "react";
import { fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import App from "../App";
import About from "./";
import { renderWithRouter } from "../../utils/testUtils";

describe("About", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      renderWithRouter(<About />);
    });

    it("matches snapshot", function () {
      const { asFragment } = renderWithRouter(<About />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("navigation", function () {
    it("goes back to the form when clicking the link", async function () {
      const { getByText } = renderWithRouter(<App />, {
        route: "/about"
      });

      const startText = "When do you want the clock to start?";
      const linkText = "Go back";

      const backLink = getByText(linkText);
      fireEvent.click(backLink);

      await waitForElementToBeRemoved(() => getByText(linkText));

      expect(getByText(startText)).toBeInTheDocument();
    });
  });
});
