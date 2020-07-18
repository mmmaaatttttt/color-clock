import React from "react";
import { render } from "@testing-library/react";
import ClockFormRow from "./";
import FormContext from "../../contexts/FormContext";

describe("ClockFormRow component", function () {
  describe("basic tests", function () {
    const contextValue = {
      formData: { startTime: "", startColor: "#ff0000" },
      errors: {},
      handleChange: () => {}
    };

    it("renders without crashing", function () {
      render(
        <FormContext.Provider value={contextValue}>
          <ClockFormRow />
        </FormContext.Provider>
      );
    });

    it("matches snapshot", function () {
      const { asFragment } = render(
        <FormContext.Provider value={contextValue}>
          <ClockFormRow />
        </FormContext.Provider>
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("matches snapshot with errors", function () {
      const { asFragment } = render(
        <FormContext.Provider
          value={{
            ...contextValue,
            errors: { startTime: "This is an error." }
          }}
        >
          <ClockFormRow />
        </FormContext.Provider>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
