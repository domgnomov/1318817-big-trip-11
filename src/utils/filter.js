import {FilterType} from "../const";

export const getPointsByFilter = (points, filterType) => {
  const currentDate = new Date();
  switch (filterType) {
    case FilterType.FUTURE :
      return points.slice().filter((point) => point.startDate > currentDate);
    case FilterType.PAST :
      return points.slice().filter((point) => point.startDate <= currentDate);
    case FilterType.EVERYTHING :
      return points;
  }

  return points;
};
