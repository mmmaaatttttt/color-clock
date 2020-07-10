import PowerRadix from "power-radix";
import { timeToNumber } from "./";

const charSet = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ".split(
  ""
);
const hexSet = "0123456789abcdef".split("");
const hexRadix = hexSet.length;

/**
 * Convert and object containing time data (24-hour format)
 * and color data (hex codes) into a base-56 string.
 * Uses the characters in `charSet` for the encoding for URL-friendliness.
 * 
 * This function also validates that the colors are valid hex codes,
 * the times are in a valid format, the times are ascending in the array,
 * and that the number of times passed in matches the number of colors.
 * 
 * @param {Object} colorsAndTimesObj - object of color and time data
 * @param {String[]} colorsAndTimesArr.times - Array of time strings
 * @param {String[]} colorsAndTimesArr.colors - Array of color hex strings
 * @returns {String} Encoded string
 */
export function encodeToUrl(colorsAndTimesObj) {
  let colorsAndTimesArr = [];
  if (_validate(colorsAndTimesObj)) {
    for (let time of colorsAndTimesObj.times) {
      colorsAndTimesArr.push(_timeToHex(time));
    }

    for (let color of colorsAndTimesObj.colors) {
      colorsAndTimesArr.push(color.replace("#", "").toLowerCase());
    }

    return new PowerRadix(colorsAndTimesArr.join(""), hexSet).toString(charSet);
  }
}

/**
 * Inverse of encodeToUrl - takes an encoded string,
 * returns an object of color and time data.
 * 
 * As with encodeToUrl, this function will throw errors
 * if the decoded data is invalid, or if the decoding process fails.
 * 
 * @param {String} path - encoded string extracted from a URL.
 * @returns {Object} Object of colors / times data.
 */
export function decodeFromUrl(path) {
  let urlToHexStr = new PowerRadix(path, charSet).toString(hexSet);
  let charsPerTime = 3;
  let charsPerColor = 6;
  let charsPerPair = charsPerTime + charsPerColor;
  let numTimesAndColors = Math.ceil(urlToHexStr.length / charsPerPair);

  // handle case of leading zeroes
  let paddedUrlToHexStr = urlToHexStr.padStart(
    numTimesAndColors * charsPerPair,
    "0"
  );

  let times = [];
  let colors = [];

  for (let i = 0; i < numTimesAndColors; i++) {
    let timeIdx = i * charsPerTime;
    let timeHex = paddedUrlToHexStr.slice(timeIdx, timeIdx + charsPerTime);
    times.push(_hexToTime(timeHex));

    let colorIdx = numTimesAndColors * charsPerTime + i * charsPerColor;
    let colorHex = paddedUrlToHexStr.slice(colorIdx, colorIdx + charsPerColor);
    colors.push(`#${colorHex}`);
  }

  let colorsAndTimesObj = { colors, times };
  if (_validate(colorsAndTimesObj)) {
    return colorsAndTimesObj;
  }
}

/**
 * Validation helper for decodeFromUrl / encodeToUrl.
 * Ensures that all color / time data to be encoded is valid.
 * 
 * @param {Object} param0 - Object with array of times and array of colors 
 * @param {String[]} param0.times - Array of time strings
 * @param {String[]} param0.colors - Array of color hex strings
 * @returns {Boolean} true if no errors, throws if errors occur
 */
function _validate({ times, colors }) {
  if (times.length !== colors.length) {
    throw new Error(
      `Must provide same number of colors and times. ${colors.length} (colors length) !== ${times.length} (times length).`
    );
  }

  const allTimesValid = times.every(_validTime);
  const allColorsValid = colors.every(_validColor);
  const timesInOrder = times.slice(1).every((time, idx) => {
    const lastTime = times[idx];
    return lastTime < time;
  });

  if (!allTimesValid) {
    throw new Error(`Times must be in valid HH:mm format. Received ${times.join(", ")}.`);
  }

  if (!allColorsValid) {
    throw new Error(
      `Colors must be valid hex codes with a leading '#'. Received ${colors.join(", ")}.`
    );
  }

  if (!timesInOrder) {
    throw new Error(`Times must be in ascending order. Received ${times.join(", ")}.`);
  }

  return true;
}

/**
 * Regex to check whether a time matches the HH:mm pattern
 * (HH must be between 00 and 23, mm must be between 0 and 59).
 * 
 * @param {String} timeStr - time string to validate
 * @returns {Boolean} true if timeStr is a valid time, false otherwise
 */
function _validTime(timeStr) {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr);
}

/**
 * Regex to check whether a color is a valid hex code.
 * 
 * @param {String} colorStr - color string to validate
 * @returns {Boolean} true if colorStr is a valid color, false otherwise
 */
function _validColor(colorStr) {
  return /^#[0-9A-F]{6}$/i.test(colorStr);
}

/**
 * Our encoding works by first converting the times into hex codes,
 * then combining these with the color hexes to create a long base-16 string.
 * The encoding then just moves from base-16 to base-56.
 * 
 * This is a helper to conver a time string into a hexadecimal string.
 * 
 * @param {String} time - time string
 * @returns {String} hexadecimal representation of the time
 */
function _timeToHex(time) {
  const secondsPerMinute = 60;
  return (timeToNumber(time) / secondsPerMinute)
    .toString(hexRadix)
    .toLowerCase()
    .padStart(3, "0");
}

/**
 * This function is the inverse of _timeToHex, described above.
 * 
 * @param {String} hex - hexadecimal string
 * @returns {String} time string
 */
function _hexToTime(hex) {
  const minutesPerHour = 60;
  let hexAsNum = parseInt(hex, hexRadix);
  const minutes = (hexAsNum % minutesPerHour).toString().padStart(2, "0");
  const hour = Math.floor(hexAsNum / minutesPerHour)
    .toString()
    .padStart(2, "0");
  return `${hour}:${minutes}`;
}
