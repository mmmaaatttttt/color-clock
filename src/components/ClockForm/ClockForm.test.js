import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ClockForm from "./";
import App from "../App";
import { timeMock } from "../../utils/testUtils";

describe("ClockForm component", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      render(
        <MemoryRouter>
          <ClockForm />
        </MemoryRouter>
      );
    });

    it("matches snapshot", function () {
      const { asFragment } = render(
        <MemoryRouter>
          <ClockForm />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("ClockForm state changes", function () {
    it("only shows the button when all times are provided", function () {
      const { getByLabelText, getByDisplayValue } = render(
        <MemoryRouter>
          <ClockForm />
        </MemoryRouter>
      );

      const time1Input = getByLabelText("Start Time");
      const time2Input = getByLabelText("Warning Time");
      const time3Input = getByLabelText("End Time");
      const submitButton = getByDisplayValue("Create clock!");

      expect(submitButton).toHaveClass("hidden");

      fireEvent.input(time1Input, {
        target: { value: "09:00" }
      });

      expect(submitButton).toHaveClass("hidden");

      fireEvent.input(time2Input, {
        target: { value: "10:00" }
      });

      expect(submitButton).toHaveClass("hidden");

      fireEvent.input(time3Input, {
        target: { value: "11:00" }
      });

      expect(submitButton).not.toHaveClass("hidden");
    });

    it("shows errors if the times are invalid", function () {
      const { getByLabelText, queryByText } = render(
        <MemoryRouter>
          <ClockForm />
        </MemoryRouter>
      );

      const warnErrorMsg = "Warning time must be between start and end time.";
      const endErrorMsg = "End time must come after start time.";
      const time1Input = getByLabelText("Start Time");
      const time2Input = getByLabelText("Warning Time");
      const time3Input = getByLabelText("End Time");

      fireEvent.input(time1Input, { target: { value: "09:00" } });

      expect(queryByText(warnErrorMsg)).not.toBeInTheDocument();
      expect(queryByText(endErrorMsg)).not.toBeInTheDocument();

      // warning time shouldn't be before start time, display an error if so.
      fireEvent.input(time2Input, { target: { value: "08:00" } });
      expect(queryByText(warnErrorMsg)).toBeInTheDocument();
      expect(queryByText(endErrorMsg)).not.toBeInTheDocument();

      // fix the error
      fireEvent.input(time2Input, { target: { value: "10:00" } });
      expect(queryByText(warnErrorMsg)).not.toBeInTheDocument();
      expect(queryByText(endErrorMsg)).not.toBeInTheDocument();

      // if the end time is before the start, show both errors
      fireEvent.input(time3Input, { target: { value: "08:00" } });
      expect(queryByText(warnErrorMsg)).toBeInTheDocument();
      expect(queryByText(endErrorMsg)).toBeInTheDocument();

      // if the end time is after the start but before the warn, show the warn error
      fireEvent.input(time3Input, { target: { value: "09:30" } });
      expect(queryByText(warnErrorMsg)).toBeInTheDocument();
      expect(queryByText(endErrorMsg)).not.toBeInTheDocument();

      // if the times are correctly ordered, no errors should appear
      fireEvent.input(time3Input, { target: { value: "11:00" } });
      expect(queryByText(warnErrorMsg)).not.toBeInTheDocument();
      expect(queryByText(endErrorMsg)).not.toBeInTheDocument();
    });
  });

  describe("Routing from ClockForm", function () {
    it("should go to the about page when clicking on '?'", async function () {
      const { getAllByRole, getByText, queryByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      const icon = getAllByRole("button")[0];

      fireEvent.click(icon);

      await waitForElementToBeRemoved(() => getAllByRole("button"));

      // expect to see text from the About page
      expect(getByText("Make time visible.")).toBeInTheDocument();

      // expect not to see text from the index (ClockForm) page
      expect(
        queryByText("When do you want the clock to start?")
      ).not.toBeInTheDocument();
    });

    it("should go to a clock page after successful form submit", async function () {
      timeMock.set("13:30");

      const { getByLabelText, getByDisplayValue, queryByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      const time1Input = getByLabelText("Start Time");
      const time2Input = getByLabelText("Warning Time");
      const time3Input = getByLabelText("End Time");
      const submitButton = getByDisplayValue("Create clock!");

      fireEvent.input(time1Input, { target: { value: "13:00" } });
      fireEvent.input(time2Input, { target: { value: "14:00" } });
      fireEvent.input(time3Input, { target: { value: "15:00" } });

      // clock isn't on the page yet
      expect(queryByText("1:30 PM")).not.toBeInTheDocument();

      fireEvent.click(submitButton);

      await waitForElementToBeRemoved(() => getByLabelText("Start Time"));

      // after submitting, the clock shows up
      expect(queryByText("1:30 PM")).toBeInTheDocument();
    });

    it("should stay on the form after trying to submit if there are errors", function () {
      timeMock.set("13:30");

      const { getByLabelText, getByDisplayValue, queryByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      const time1Input = getByLabelText("Start Time");
      const time2Input = getByLabelText("Warning Time");
      const time3Input = getByLabelText("End Time");
      const submitButton = getByDisplayValue("Create clock!");

      // input invalid times
      fireEvent.input(time1Input, { target: { value: "13:00" } });
      fireEvent.input(time2Input, { target: { value: "12:00" } });
      fireEvent.input(time3Input, { target: { value: "15:00" } });

      // clock isn't on the page yet
      expect(queryByText("1:30 PM")).not.toBeInTheDocument();

      fireEvent.click(submitButton);

      // clock doesn't get mounted into the DOM
      expect(queryByText("1:30 PM")).not.toBeInTheDocument();
    });

    afterEach(function () {
      timeMock.reset();
    });
  });
});
