import AbstractComponent from "./abstract-component.js";
import {formatDateWithMonthName} from "../utils/common";

const DELIMITER = `&nbsp;&mdash;&nbsp;`;
const DOTS = `&nbsp;...&nbsp;`;

const getCostValue = (points) => {
  let sum = 0;
  points.forEach((point) => {
    point.offers.forEach((offer) => {
      sum += offer.price;
    });
    sum += point.price;
  });
  return sum;
};

const getTitle = (points) => {
  if (points.length > 3) {
    return points[0].name.concat(DELIMITER, DOTS, DELIMITER, points[points.length - 1].name);
  }
  const title = points.slice().reduce(function (acc, current) {
    return `${acc} ${current.name} ${DELIMITER}`;
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
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;
  }

  getTemplate() {
    return createInfoTemplate(this._pointsModel.getPoints());
  }
}
