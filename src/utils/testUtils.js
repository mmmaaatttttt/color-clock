/**
 * Create a timestamp out of a 24 hour time string.
 * Used in conjunction with mocking the Date constructor via MockDate.
 *
 * @param {String} time - 24 hour time in HH:mm:ss format (e.g. 15:16:23)
 */
export function makeTimeStamp(time) {
  return `Sun Jul 05 2020 ${time} GMT-0700`;
}
