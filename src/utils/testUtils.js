import MockDate from "mockdate";

/**
 * Create a timestamp out of a 24 hour time string.
 * Used in conjunction with mocking the Date constructor via MockDate.
 *
 * @param {String} time - 24 hour time in HH:mm:ss format (e.g. 15:16:23)
 */
function makeTimeStamp(time) {
  return `Sun Jul 05 2020 ${time} GMT-0700`;
}

/**
 * Abstraction around MockDate that lets us mock dates by providing
 * only times, not dates.
 */
export const timeMock = {
  set(time) {
    MockDate.set(makeTimeStamp(time));
  },
  reset() {
    MockDate.reset();
  }
};
