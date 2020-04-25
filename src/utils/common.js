import {TypesInPreposition} from "../const";
import moment from "moment";

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH:mm:ss`);
};

export const formatDateWithMonthName = (date, previousDate) => {
  if (previousDate && date.getMonth() === previousDate.getMonth()) {
    return moment(date).format(`DD`);
  }
  return moment(date).format(`MMMM DD`);
};

export const getDuration = (startDate, endDate) => {
  const diff = moment(endDate).diff(moment(startDate));
  const duration = moment.duration(diff);
  return moment.utc(duration.asMilliseconds()).format(`DD[d] HH[h] MM[m]`);
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
