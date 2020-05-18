import {SortType} from "../components/sort";
import {compareByHoursAndMinutes} from "./date";

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

export const getSortByDate = (points) => {
  return points.slice().sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};
