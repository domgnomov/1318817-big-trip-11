/* global require */

import AbstractComponent from "./abstract-component";

const DELIMITER = `&mdash;`;

const getTitle = (days) => {
  const allPoints = [].concat(...Array.from(days.values()));
  const title = allPoints.reduce(function (acc, current) {
    return `${acc} ${current.city} ${DELIMITER}`;
  }, ``);
  return title.slice(0, title.length - DELIMITER.length);
};

const getDateInterval = (days) => {
  if (days.length === 0) {
    return ``;
  }
  const daysKeys = Array.from(days.keys());
  const startDate = daysKeys[0];
  const endDate = daysKeys[daysKeys.length - 1];

  const dateFormat = require(`dateformat`);
  const formattedStartDateWithMonthName = String(dateFormat(startDate, `mmmm dd`)).toUpperCase();
  const formattedEndDate = dateFormat(endDate, `dd`);

  return `${formattedStartDateWithMonthName} ${DELIMITER} ${formattedEndDate}`;
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
