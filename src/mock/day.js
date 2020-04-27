import {generatePoint} from "./point";
import {getRandomIntegerNumber} from "../utils/common";

const POINTS_COUNT = 20;

const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

export const generateDays = () => {
  const points = generatePoints(POINTS_COUNT);
  points.sort(function (a, b) {
    return a.startDate.getTime() - b.startDate.getTime();
  });
  const days = new Map();
  points.forEach((point) => {
    const date = point.startDate;
    date.setHours(getRandomIntegerNumber(0, 10), 0, 0, 0);
    if (!days.has(date.toString())) {
      days.set(date.toString(), []);
    }
    days.get(date.toString()).push(point);
  });
  return days;
};
