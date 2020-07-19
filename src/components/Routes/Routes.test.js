import React from "react";
import Routes from ".";
import { renderWithRouter } from "../../utils/testUtils";

describe("Routes", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      renderWithRouter(<Routes />);
    });
  });
});
