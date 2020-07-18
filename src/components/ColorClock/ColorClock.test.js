import React from "react";
import { render } from "@testing-library/react";
import ColorClock from "./";
import { timeMock } from "../../utils/testUtils";

describe("ColorClock component", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      render(<ColorClock />);
    });

    it("matches snapshot before the clock is active", function () {
      timeMock.set("08:00:00");
      const { asFragment } = render(<ColorClock />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot while the clock is active", function () {
      timeMock.set("10:00:00");
      const { asFragment } = render(<ColorClock />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot after the clock is active", function () {
      timeMock.set("14:00:00");
      const { asFragment } = render(<ColorClock />);
      expect(asFragment()).toMatchSnapshot();
    });

    afterEach(function () {
      timeMock.reset();
    });
  });
});
