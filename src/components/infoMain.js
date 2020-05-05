import AbstractComponent from "./abstract-component";
import {formatDateWithMonthName} from "../utils/common";


const DELIMITER = `&mdash;`;

const getTitle = (points) => {
  const title = points.reduce(function (acc, current) {
    return `${acc} ${current.city} ${DELIMITER}`;
  }, ``);
  return title.slice(0, title.length - DELIMITER.length);
};

const getDateInterval = (points) => {
  if (points.length === 0) {
    return ``;
  }
  const startDate = new Date(points[0].startDate);
  const endDate = new Date(points[points.length - 1].endDate);

  const startDateWithMonthName = formatDateWithMonthName(startDate);
  const endDateWithMonthName = formatDateWithMonthName(endDate, startDate);

  return `${startDateWithMonthName} ${DELIMITER} ${endDateWithMonthName}`;
};

const createInfoMainTemplate = (points) => {
  const title = getTitle(points);
  const dateInterval = getDateInterval(points);

  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        
        <p class="trip-info__dates">${dateInterval}</p>
     </div>`
  );
};

export default class InfoMain extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createInfoMainTemplate(this._points);
  }
}
