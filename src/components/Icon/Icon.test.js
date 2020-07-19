import React from "react";
import { render } from "@testing-library/react";
import Icon from "./";
import { faRedo, faEye } from "@fortawesome/free-solid-svg-icons";

describe("Icon component", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      render(<Icon faIcon={faRedo} />);
    });

    it("matches snapshot", function () {
      const { asFragment } = render(<Icon faIcon={faRedo} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot with different icon", function () {
      const { asFragment } = render(<Icon faIcon={faEye} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
