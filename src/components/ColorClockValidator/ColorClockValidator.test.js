import React from "react";
import App from "../App";
import ColorClockValidator from "./";
import { renderWithRouter } from "../../utils/testUtils";

describe("ColorClockValidator component", function () {
  describe("basic tests", function () {
    it("renders without crashing", function () {
      renderWithRouter(<ColorClockValidator />);
    });
  });

  describe("validation", function () {
    let warnSpy;

    beforeEach(function () {
      warnSpy = jest.spyOn(console, "warn");
      warnSpy.mockImplementation(errOrMsg => errOrMsg.message || errOrMsg);
    });

    it("shows no warnings if there is no clock id", function () {
      renderWithRouter(<App />);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it("shows no warnings if the clock id is valid", function () {
      renderWithRouter(<App />, {
        route: "/clocks/3tH42XskKAkY7NYHrms"
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it("logs the appropriate warning if the clock id is has invalid characters invalid", function () {
      renderWithRouter(<App />, {
        route: "/clocks/o"
      });
      expect(warnSpy).toHaveNthReturnedWith(
        1,
        "Route id o is invalid. Redirecting to '/'. Original error below:"
      );
      expect(warnSpy).toHaveNthReturnedWith(
        2,
        "invalid target: o not found in target encoding"
      );
    });

    it("logs the appropriate warning if the clock id corresponds to invalid times", function () {
      renderWithRouter(<App />, {
        route: "/clocks/ftfH92sr6zLBnSYXTV2"
      });
      expect(warnSpy).toHaveNthReturnedWith(
        1,
        "Route id ftfH92sr6zLBnSYXTV2 is invalid. Redirecting to '/'. Original error below:"
      );
      expect(warnSpy).toHaveNthReturnedWith(
        2,
        "Times must be in ascending order. Received 00:00, 00:00, 00:01, 14:44."
      );
    });

    it("logs the appropriate warning if the clock id corresponds to invalid amount of data", function () {
      renderWithRouter(<App />, {
        route: "/clocks/abcdef"
      });
      expect(warnSpy).toHaveNthReturnedWith(
        1,
        "Route id abcdef is invalid. Redirecting to '/'. Original error below:"
      );
      expect(warnSpy).toHaveNthReturnedWith(
        2,
        "Color clock requires three colors and three times.\nColors received: 1.\nTimes received: 1."
      );
    });

    afterEach(function () {
      warnSpy.mockRestore();
    });
  });
});
