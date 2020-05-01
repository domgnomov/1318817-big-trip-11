import {TypesInPreposition} from "../const";
import moment from "moment";
import {SortType} from "../components/sort";

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
}

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

export const getDays = (points) => {
  const newPoints = points.slice();
  newPoints.sort(function (a, b) {
    return a.startDate.getTime() - b.startDate.getTime();
  });
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
