import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import ColorClock from "./";
import { confirmMock, timeMock, renderWithRouter } from "../../utils/testUtils";

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

  describe("icon tests - active clock", function () {
    it("clicking on the eye toggles the progress bar", function () {
      timeMock.set("10:00:00");

      const { getAllByRole, getByTestId } = renderWithRouter(<ColorClock />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });

      const progressBar = getByTestId("ProgressBar");
      const eyeIcon = getAllByRole("button")[0];

      expect(eyeIcon.children[0]).toHaveClass("fa-eye-slash");
      expect(eyeIcon.children[0]).not.toHaveClass("fa-eye");
      expect(progressBar).not.toHaveClass("hidden");

      fireEvent.click(eyeIcon);

      // after clicking on the icon, the icon should change,
      // and the progress bar should be hidden
      expect(eyeIcon.children[0]).not.toHaveClass("fa-eye-slash");
      expect(eyeIcon.children[0]).toHaveClass("fa-eye");
      expect(progressBar).toHaveClass("hidden");
    });

    it("clicking on the reset arrow sends you back to the form if you confirm", async function () {
      timeMock.set("10:00:00");

      // mock clicking 'ok' when asked to confirm if you want to go back
      confirmMock.set(true);

      const { getAllByRole, queryByText } = renderWithRouter(<App />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });

      const resetIcon = getAllByRole("button")[1];

      fireEvent.click(resetIcon);

      // expect the form to appear
      expect(queryByText("10:00 AM")).not.toBeInTheDocument();
      expect(
        queryByText("When do you want the clock to start?")
      ).toBeInTheDocument();
    });

    it("clicking on the reset arrow keeps you on the clock if you don't confirm", function () {
      timeMock.set("10:00:00");

      // mock clicking 'cancel' when asked to confirm if you want to go back
      confirmMock.set(false);

      const { getAllByRole, queryByText } = renderWithRouter(<App />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });

      const resetIcon = getAllByRole("button")[1];

      fireEvent.click(resetIcon);

      // expect the clock to stay, no form to appear
      expect(queryByText("10:00 AM")).toBeInTheDocument();
      expect(
        queryByText("When do you want the clock to start?")
      ).not.toBeInTheDocument();
    });

    afterEach(function () {
      timeMock.reset();
      confirmMock.reset();
    });
  });

  describe("icon tests - too early", function () {
    it("clicking on the reset arrow sends you back to the form if you confirm", async function () {
      timeMock.set("06:00:00");

      // mock clicking 'ok' when asked to confirm if you want to go back
      confirmMock.set(true);

      const { getAllByRole, queryByText } = renderWithRouter(<App />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });

      const resetIcon = getAllByRole("button")[0];

      fireEvent.click(resetIcon);

      // expect the form to appear
      expect(queryByText("Current time: 6:00 AM")).not.toBeInTheDocument();
      expect(
        queryByText("When do you want the clock to start?")
      ).toBeInTheDocument();
    });

    it("clicking on the reset arrow keeps you on the clock if you don't confirm", function () {
      timeMock.set("06:00:00");

      // mock clicking 'cancel' when asked to confirm if you want to go back
      confirmMock.set(false);

      const { getAllByRole, queryByText } = renderWithRouter(<App />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });

      const resetIcon = getAllByRole("button")[0];

      fireEvent.click(resetIcon);

      // expect the clock to stay, no form to appear
      expect(resetIcon).toBeInTheDocument();
      expect(
        queryByText("When do you want the clock to start?")
      ).not.toBeInTheDocument();
    });

    afterEach(function () {
      timeMock.reset();
      confirmMock.reset();
    });
  });

  describe("icon tests - too late", function () {
    it("clicking on the reset arrow sends you back to the form if you confirm", async function () {
      timeMock.set("23:00:00");

      // mock clicking 'ok' when asked to confirm if you want to go back
      confirmMock.set(true);

      const { getAllByRole, queryByText } = renderWithRouter(<App />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });

      const resetIcon = getAllByRole("button")[0];

      fireEvent.click(resetIcon);

      // expect the form to appear
      expect(queryByText("Time's Up!")).not.toBeInTheDocument();
      expect(
        queryByText("When do you want the clock to start?")
      ).toBeInTheDocument();
    });

    it("clicking on the reset arrow keeps you on the clock if you don't confirm", function () {
      timeMock.set("23:00:00");

      // mock clicking 'cancel' when asked to confirm if you want to go back
      confirmMock.set(false);

      const { getAllByRole, queryByText } = renderWithRouter(<App />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });

      const resetIcon = getAllByRole("button")[0];

      fireEvent.click(resetIcon);

      // expect the clock to stay, no form to appear
      expect(queryByText("Time's Up!")).toBeInTheDocument();
      expect(
        queryByText("When do you want the clock to start?")
      ).not.toBeInTheDocument();
    });

    afterEach(function () {
      timeMock.reset();
      confirmMock.reset();
    });
  });
});
