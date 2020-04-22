import {TypesInPreposition} from "../const";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getPreposition = (type) => {
  return TypesInPreposition.includes(type) ? `in` : `to`;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getAllPoints = (days) => {
  return [].concat(...Array.from(days.values()));
};
