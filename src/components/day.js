/* global require */

import AbstractComponent from "./abstract-component";

const createDayTemplate = (day, dayCount) => {

  const date = new Date(day);
  const dateFormat = require(`dateformat`);
  const formattedDate = dateFormat(date, `yyyy-mm-dd`);
  const formattedDateWithMonthName = String(dateFormat(date, `mmmm dd`)).toUpperCase();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${formattedDate}">${formattedDateWithMonthName}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(day, dayCount) {
    super();

    this._day = day;
    this._dayCount = dayCount;
  }

  getTemplate() {
    return createDayTemplate(this._day, this._dayCount);
  }
}
