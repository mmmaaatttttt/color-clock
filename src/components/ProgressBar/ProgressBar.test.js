import React from "react";
import { render } from "@testing-library/react";
import ProgressBar from "./";

describe("ProgressBar", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      render(<ProgressBar />);
    });

    it("matches snapshot", function () {
      const { asFragment } = render(<ProgressBar />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot with different props", function () {
      const { asFragment } = render(
        <ProgressBar hidden colors={["#fff0f0", "#ff0f0f", "#ff00ff"]} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
