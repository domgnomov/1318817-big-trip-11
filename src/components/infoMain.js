/* global require */

import {createElement} from "../utils";

const DELIMITER = `&mdash;`;

const getTitle = (days) => {
  const allDayItems = [].concat(...Array.from(days.values()));
  const title = allDayItems.reduce(function (acc, current) {
    return `${acc} ${current.city} ${DELIMITER}`;
  }, ``);
  return title.slice(0, title.length - DELIMITER.length);
};

const getDateInterval = (days) => {
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

export default class InfoMain {
  constructor(days) {
    this._days = days;

    this._element = null;
  }

  getTemplate() {
    return createInfoMainTemplate(this._days);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

