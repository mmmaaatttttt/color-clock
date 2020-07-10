import PowerRadix from "power-radix";
import { timeToNumber } from "./";

const charSet = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ".split(
  ""
);
const hexSet = "0123456789abcdef".split("");
const hexRadix = hexSet.length;

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

function _validTime(timeStr) {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr);
}

function _validColor(colorStr) {
  return /^#[0-9A-F]{6}$/i.test(colorStr);
}

function _timeToHex(time) {
  const secondsPerMinute = 60;
  return (timeToNumber(time) / secondsPerMinute)
    .toString(hexRadix)
    .toLowerCase()
    .padStart(3, "0");
}

function _hexToTime(hex) {
  const minutesPerHour = 60;
  let hexAsNum = parseInt(hex, hexRadix);
  const minutes = (hexAsNum % minutesPerHour).toString().padStart(2, "0");
  const hour = Math.floor(hexAsNum / minutesPerHour)
    .toString()
    .padStart(2, "0");
  return `${hour}:${minutes}`;
}
