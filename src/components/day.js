/* global require */

import AbstractComponent from "./abstract-component";

const createDayTemplate = (day, dayCount) => {
  let date, formattedDate, formattedDateWithMonthName;
  if (day) {
    const dateFormat = require(`dateformat`);
    date = new Date(day);
    formattedDate = dateFormat(date, `yyyy-mm-dd`);
    formattedDateWithMonthName = String(dateFormat(date, `mmmm dd`)).toUpperCase();
  }

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day ? dayCount : ``}</span>
        <time class="day__date" datetime="${formattedDate}">${day ? formattedDateWithMonthName : ``}</time>
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
