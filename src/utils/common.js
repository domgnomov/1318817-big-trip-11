import {TypesInPreposition} from "../const";
import moment from "moment";

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
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

export const capitalize = (text) => {
  return text[0].toUpperCase() + text.slice(1);
};
