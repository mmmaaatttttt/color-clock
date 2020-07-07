import MockDate from "mockdate";
import {
  capitalize,
  timeToNumber,
  getTime,
  howLongFromNow,
  middleTimeAsPercentage
} from ".";
import { makeTimeStamp } from "./testUtils";

describe("utility functions", function () {
  describe("#capitalize", function () {
    it("capitalizes the first letter of a string", function () {
      expect(capitalize("hello")).toEqual("Hello");
      expect(capitalize("two words")).toEqual("Two words");
      expect(capitalize("a")).toEqual("A");
    });

    it("works with edge cases", function () {
      expect(capitalize("123")).toEqual("123");
      expect(capitalize("!!?")).toEqual("!!?");
      expect(capitalize("")).toEqual("");
    });
  });

  describe("#timeToNumber", function () {
    it("works with times that have no seconds", function () {
      expect(timeToNumber("00:00")).toEqual(0);
      expect(timeToNumber("23:59")).toEqual(86340);
      expect(timeToNumber("07:13")).toEqual(25980);
      expect(timeToNumber("11:01")).toEqual(39660);
      expect(timeToNumber("16:37")).toEqual(59820);
    });

    it("works with times that have seconds", function () {
      expect(timeToNumber("00:00:12")).toEqual(12);
      expect(timeToNumber("01:00:15")).toEqual(3615);
      expect(timeToNumber("10:10:19")).toEqual(36619);
      expect(timeToNumber("21:42:59")).toEqual(78179);
    });
  });

  describe("#middleTimeAsPercentage", function () {
    it("calculates the correct percentage (simple cases)", function () {
      expect(middleTimeAsPercentage("00:01", "00:02", "00:03")).toEqual(50);
      expect(
        middleTimeAsPercentage("00:00:01", "00:00:02", "00:00:03")
      ).toEqual(50);
      expect(middleTimeAsPercentage("12:00", "13:00", "16:00")).toEqual(25);
      expect(middleTimeAsPercentage("12:00", "12:06", "13:00")).toEqual(10);
    });

    it("calculates the correct percentage (complex cases)", function () {
      expect(middleTimeAsPercentage("07:15", "08:45", "09:00")).toEqual(
        (90 / 105) * 100
      );
      expect(
        middleTimeAsPercentage("09:30:35", "12:30:47", "14:00:20")
      ).toEqual((10812 / 16185) * 100);
    });

    it("throws appropriate errors when the inputs are invalid", function () {
      expect(() => {
        middleTimeAsPercentage("02:00", "01:00", "03:00");
      }).toThrow(
        "Times must be provided in increasing order! Received 02:00, 01:00, 03:00."
      );
      expect(() => {
        middleTimeAsPercentage("03:00", "04:00", "02:00");
      }).toThrow(
        "Times must be provided in increasing order! Received 03:00, 04:00, 02:00."
      );
    });
  });

  describe("#getTime", function () {
    it("correctly generates morning times", function () {
      MockDate.set(makeTimeStamp("04:12:19"));
      expect(getTime()).toEqual({
        timeForDisplay: "4:12 AM",
        timeForComparison: "04:12:19"
      });
      MockDate.set(makeTimeStamp("11:30:00"));
      expect(getTime()).toEqual({
        timeForDisplay: "11:30 AM",
        timeForComparison: "11:30:00"
      });
    });

    it("correctly generates afternoon times", function() {
      MockDate.set(makeTimeStamp("13:59:07"));
      expect(getTime()).toEqual({
        timeForDisplay: "1:59 PM",
        timeForComparison: "13:59:07"
      });
      MockDate.set(makeTimeStamp("22:23:11"));
      expect(getTime()).toEqual({
        timeForDisplay: "10:23 PM",
        timeForComparison: "22:23:11"
      });
    });

    afterEach(function () {
      MockDate.reset();
    });
  });

  describe("#howLongFromNow", function () {
    it("correctly describes times in the future", function() {
      MockDate.set(makeTimeStamp("12:00:00"));
      expect(howLongFromNow("12:03:00")).toEqual("in 3 minutes");
      expect(howLongFromNow("14:00:00")).toEqual("in 2 hours");
      expect(howLongFromNow("23:00:00")).toEqual("in 11 hours");
    });

    it("correctly describes times in the past", function() {
      MockDate.set(makeTimeStamp("09:30:00"));
      expect(howLongFromNow("09:29")).toEqual("a minute ago");
      expect(howLongFromNow("09:00")).toEqual("30 minutes ago");
      expect(howLongFromNow("06:15")).toEqual("3 hours ago");
    });

    afterEach(function () {
      MockDate.reset();
    });
  });
});
