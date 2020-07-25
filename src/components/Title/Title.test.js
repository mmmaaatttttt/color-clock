import React from "react";
import { renderWithRouter } from "../../utils/testUtils";
import Title from "./";

describe("Title component", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      renderWithRouter(<Title />);
    });

    it("matches snapshot", function () {
      const { asFragment } = renderWithRouter(<Title />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
