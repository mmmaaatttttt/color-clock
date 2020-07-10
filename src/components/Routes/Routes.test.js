import React from "react";
import { render } from "@testing-library/react";
import Routes from ".";

describe("basic Routes tests", function () {
  it("renders without crashing", function () {
    render(<Routes />);
  });

  it("matches snapshot", function () {
    const { asFragment } = render(<Routes />);
    expect(asFragment()).toMatchSnapshot();
  });
});
