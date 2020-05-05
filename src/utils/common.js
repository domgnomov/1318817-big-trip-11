import {TypesInPreposition} from "../const";
import moment from "moment";
import {SortType} from "../components/sort";

const HIDDEN_CLASS = `visually-hidden`;

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH:mm:ss`);
};

const compareByHoursAndMinutes = (a, b) => {
  return minutesOfDate(a) - minutesOfDate(b);
};

const minutesOfDate = (m) => {
  return m.getMinutes() + m.getHours() * 60;
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
  if (duration.days() > 0) {
    return moment.utc(duration.asMilliseconds()).format(`DD[d] HH[h] mm[m]`);
  } else if (duration.hours() > 0) {
    return moment.utc(duration.asMilliseconds()).format(`HH[h] mm[m]`);
  } else {
    return moment.utc(duration.asMilliseconds()).format(`mm[m]`);
  }
};

export const getPreposition = (type) => {
  return TypesInPreposition.includes(type) ? `in` : `to`;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedPoints = showingPoints.sort((a, b) => compareByHoursAndMinutes(a.startDate, b.startDate));
      break;
    case SortType.PRICE:
      sortedPoints = showingPoints.sort((a, b) => b.price - a.price);
      break;
    case SortType.DEFAULT:
      sortedPoints = showingPoints;
      break;
  }

  return sortedPoints.slice();
};

export const getFirstDay = (points) => {
  const firstPoint = getSortByDate(points)[0];
  const date = new Date(firstPoint.startDate.getTime());
  return date.toString();
};

const getSortByDate = (points) => {
  return points.slice().sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
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


export const hide = (element) => {
  if (element) {
    element.classList.add(HIDDEN_CLASS);
  }
};

export const show = (element) => {
  if (element) {
    element.classList.remove(HIDDEN_CLASS);
  }
};
