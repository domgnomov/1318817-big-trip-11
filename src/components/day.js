import AbstractComponent from "./abstract-component";
import {formatDateWithMonthName, formatDate} from "../utils/date.js";

const createDayTemplate = (day, dayCount) => {
  const date = day ? new Date(day) : null;
  const formattedDate = date ? formatDate(date) : ``;
  const dateWithMonthName = date ? formatDateWithMonthName(date) : ``;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day ? dayCount : ``}</span>
        <time class="day__date" datetime="${formattedDate}">${day ? dateWithMonthName : ``}</time>
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
