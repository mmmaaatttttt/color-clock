import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./";

describe("basic App tests", function () {
  it("renders without crashing", function () {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
