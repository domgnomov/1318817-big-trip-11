import AbstractComponent from "./abstract-component.js";
import {formatDateWithMonthName} from "../utils/common";

const DELIMITER = `&mdash;`;

const getCostValue = (points) => {
  return points.reduce(function (sum, current) {
    return sum + current.price;
  }, 0);
};

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

const createInfoTemplate = (points) => {
  const title = getTitle(points);
  const dateInterval = getDateInterval(points);
  const costValue = getCostValue(points);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        
        <p class="trip-info__dates">${dateInterval}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${costValue}</span>
      </p>
    </section>`
  );
};

export default class Info extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}
