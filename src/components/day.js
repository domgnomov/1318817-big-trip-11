/* global require */

import {createDayItemTemplate} from "./dayItem";
import {createEditDayItemTemplate} from "./editDayItem";

let isEditDayItemAlreadyCreated = false;

const createDayItemsMarkup = (dayItems) => {
  return dayItems
    .map((dayItem) => {
      if (isEditDayItemAlreadyCreated) {
        return createDayItemTemplate(dayItem);
      } else {
        isEditDayItemAlreadyCreated = true;
        return createEditDayItemTemplate(dayItem);
      }
    })
    .join(`\n`);
};

export const createDayTemplate = (day, dayItems, dayCount) => {
  const dayItemsMarkup = createDayItemsMarkup(dayItems);

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

      <ul class="trip-events__list">
        ${dayItemsMarkup}
      </ul>
    </li>`
  );
};
