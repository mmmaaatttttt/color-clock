import { decodeFromUrl, encodeToUrl } from "./routes";

describe("routing helpers", function () {
  describe("#encodeToUrl", function () {
    it("encodes valid data", function () {
      expect(encodeToUrl({ colors: ["#00ff88"], times: ["09:30"] })).toEqual(
        "jnqv5A"
      );
      expect(
        encodeToUrl({
          colors: ["#abc123", "#09a83a"],
          times: ["12:15", "23:45"]
        })
      ).toEqual("TVd3QiWWb85k");
      expect(
        encodeToUrl({
          colors: ["#99aa33", "#ffff22", "#ff0005"],
          times: ["02:00", "07:00", "13:13"]
        })
      ).toEqual("kbftfH92sr6zLBnSYX");
    });

    it("throws when colors and times have different lengths", function () {
      expect(() => {
        encodeToUrl({ colors: ["#abc123"], times: [] });
      }).toThrow(
        "Must provide same number of colors and times. " +
          "1 (colors length) !== 0 (times length)."
      );
    });

    it("throws when colors are invalid", function () {
      expect(() => {
        encodeToUrl({ colors: ["not-a-color"], times: ["09:30"] });
      }).toThrow(
        "Colors must be valid hex codes with a leading '#'. Received not-a-color"
      );
    });

    it("throws when times are invalid", function () {
      expect(() => {
        encodeToUrl({ colors: ["#abcdef"], times: ["not-a-time"] });
      }).toThrow("Times must be in valid HH:mm format. Received not-a-time.");
    });

    it("throws when times are not strictly ascending", function () {
      expect(() => {
        encodeToUrl({
          colors: ["#ff0000", "#00ff00", "#0000ff"],
          times: ["12:00", "10:00", "13:00"]
        });
      }).toThrow(
        "Times must be in ascending order. Received 12:00, 10:00, 13:00."
      );
    });
  });

  describe("#decodeFromUrl", function () {
    it("decodes valid data", function () {
      expect(decodeFromUrl("jnqv5A")).toEqual({
        colors: ["#00ff88"],
        times: ["09:30"]
      });
      expect(decodeFromUrl("TVd3QiWWb85k")).toEqual({
        colors: ["#abc123", "#09a83a"],
        times: ["12:15", "23:45"]
      });
      expect(decodeFromUrl("kbftfH92sr6zLBnSYX")).toEqual({
        colors: ["#99aa33", "#ffff22", "#ff0005"],
        times: ["02:00", "07:00", "13:13"]
      });
    });

    it("throws if given invalid characters", function () {
      expect(() => {
        decodeFromUrl("ooOOO");
      }).toThrow("invalid target: o not found in target encoding");
    });

    it("throws if decoded data is invalid", function () {
      expect(() => {
        decodeFromUrl("ftfH92sr6zLBnSYXTV2");
      }).toThrow(
        "Times must be in ascending order. Received 00:00, 00:00, 00:01, 14:44."
      );
    });
  });
});
