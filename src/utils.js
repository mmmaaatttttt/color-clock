/**
 * Capitalizes the first letter in a string.
 *
 * @param {String} str - String to be capitalized.
 * @returns {String} Returns the capitalized string.
 */
export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts a time of the form "HH:MM" or "HH:MM:SS"
 * to a number in seconds.
 *
 * @param {String} time - Time in one of the above formats.
 * @returns {Number} Returns a number in seconds.
 */
export function timeToNumber(time) {
  const secondsPerHour = 3600;
  const secondsPerMinute = secondsPerHour / 60;
  let timeArr = time.split(":").map(Number);

  // if no seconds provided, default to 0 seconds
  if (timeArr.length === 2) timeArr.push(0);

  return (
    timeArr[0] * secondsPerHour + timeArr[1] * secondsPerMinute + timeArr[2]
  );
}
