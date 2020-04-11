import {createDayItemTemplate} from "./dayItem";
import {createEditDayItemTemplate} from "./editDayItem";

let isEditDayItemCreated = false;

const createDayItemsMarkup = (dayItems) => {
  return dayItems
    .map((dayItem) => {
      if (isEditDayItemCreated) {
        return createDayItemTemplate(dayItem);
      } else {
        isEditDayItemCreated = true;
        return createEditDayItemTemplate(dayItem);
      }
    })
    .join(`\n`);
};

export const createDayTemplate = (day, dayItems, dayCount) => {
  const dayItemsMarkup = createDayItemsMarkup(dayItems);

  const date = new Date(day);
  const dateFormat = require('dateformat');
  const dateTime = dateFormat(date, `yyyy-mm-dd`);
  const monthDate = String(dateFormat(date, `mmmm dd`)).toUpperCase();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${dateTime}">${monthDate}</time>
      </div>

      <ul class="trip-events__list">
        ${dayItemsMarkup}
      </ul>
    </li>`
  );
};
