import {PlaceTypes} from "../const";
import {getSortByDate} from "./sort";

export const getPreposition = (type) => {
  return PlaceTypes.includes(type) ? `in` : `to`;
};

export const getDays = (points) => {
  const newPoints = getSortByDate(points);
  const days = new Map();
  newPoints.forEach((point) => {
    const date = new Date(point.startDate.getTime());
    date.setHours(0, 0, 0, 0);
    if (!days.has(date.toString())) {
      days.set(date.toString(), []);
    }
    days.get(date.toString()).push(point);
  });
  return days;
};

export const capitalize = (text) => {
  return text[0].toUpperCase() + text.slice(1);
};
