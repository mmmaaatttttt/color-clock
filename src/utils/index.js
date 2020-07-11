import moment from "moment";

/**
 * Capitalizes the first letter in a string.
 *
 * @param {String} str - String to be capitalized.
 * @returns {String} Returns the capitalized string.
 */
export function capitalize(str) {
  if (!str) return "";
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

/**
 * Gets the current time; returns an object with the time in two formats.
 *
 * @returns {Object} an object with two formats for the time:
 *  timeForDisplay: h:mm A (e.g. 3:16 PM)
 *  timeForColor: H:mm:ss (e.g. 15:16:23)
 *
 * The first formatting is for the view,
 * the second is for determining the background color and general comparison
 * (since start and end times are in 24 hour formatting).
 */
export function getTime() {
  const newMoment = moment();

  return {
    currentTimeForDisplay: newMoment.format("LT"),
    currentTimeForComparison: newMoment.format("HH:mm:ss")
  };
}

/**
 * Generate a human readable description of how long ago the input time was
 * (for times within the same day).
 *
 * @param {String} time - 24 hour time as a string, e.g. "15:16"
 * @returns {String} English description of how long ago the time was.
 */
export function howLongFromNow(time) {
  const [hour, minutes] = time.split(":").map(Number);
  return moment()
    .startOf("day")
    .add(hour, "hours")
    .add(minutes, "minutes")
    .fromNow();
}

/**
 * Calculate time2 as a percentage of the duration between time1 and time3.
 *
 * @param {String} time1 - String representation of start time, e.g. "08:00"
 * @param {String} time2 - String representation of start time, e.g. "08:30"
 * @param {String} time3 - String representation of start time, e.g. "08:45"
 * @returns {Number} time2's percentage
 */
export function middleTimeAsPercentage(time1, time2, time3) {
  if (time1 >= time2 || time2 >= time3) {
    throw new Error(
      `Times must be provided in increasing order! Received ${time1}, ${time2}, ${time3}.`
    );
  }

  const [time1Num, time2Num, time3Num] = [time1, time2, time3].map(
    timeToNumber
  );

  return ((time2Num - time1Num) * 100) / (time3Num - time1Num);
}
