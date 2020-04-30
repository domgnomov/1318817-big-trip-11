import {generatePoint} from "./point";
import {getDays} from "../utils/common";

const POINTS_COUNT = 20;

const generatePoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generatePoint);
};

export const generateDays = () => {
  return getDays(generatePoints(POINTS_COUNT));
};
