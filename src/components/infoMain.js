import AbstractComponent from "./abstract-component";
import {getAllPoints, getDateWithMonthName} from "../utils/common";


const DELIMITER = `&mdash;`;

const getTitle = (days) => {
  const title = getAllPoints(days).reduce(function (acc, current) {
    return `${acc} ${current.city} ${DELIMITER}`;
  }, ``);
  return title.slice(0, title.length - DELIMITER.length);
};

const getDateInterval = (days) => {
  if (days.length === 0) {
    return ``;
  }
  const daysKeys = Array.from(days.keys());
  const startDate = new Date(daysKeys[0]);
  const endDate = new Date(daysKeys[daysKeys.length - 1]);

  const startDateWithMonthName = getDateWithMonthName(startDate);
  const endDateWithMonthName = getDateWithMonthName(endDate, startDate);

  return `${startDateWithMonthName} ${DELIMITER} ${endDateWithMonthName}`;
};

const createInfoMainTemplate = (days) => {
  const title = getTitle(days);
  const dateInterval = getDateInterval(days);

  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>
        
        <p class="trip-info__dates">${dateInterval}</p>
     </div>`
  );
};

export default class InfoMain extends AbstractComponent {
  constructor(days) {
    super();

    this._days = days;
  }

  getTemplate() {
    return createInfoMainTemplate(this._days);
  }
}
