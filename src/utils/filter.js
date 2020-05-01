import {FilterType} from "../const";

export const getPointsByFilter = (points, filterType) => {
  //TODO сделать фильтрацию
  switch (filterType) {
    case FilterType.FUTURE :
      return points.slice().filter((point) => point.city === `Moscow`);
    case FilterType.PAST :
      return points.slice().filter((point) => point.city === `London`);
    case FilterType.EVERYTHING :
      return points;
  }
};
