import {createDayItemTemplate} from "./dayItem";

const createDayItemsMarkup = (dayItems) => {
  return dayItems
    .map((dayItem) => {
      return createDayItemTemplate(dayItem);
    })
    .join(`\n`);
};

export const createDayTemplate = (day, dayItems, dayCount) => {
  const dayItemsMarkup = createDayItemsMarkup(dayItems);

  const date = new Date(day);
  const dateFormat = require('dateformat');
  const dateTime = dateFormat(date, `yyyy-mm-dd`);
  const monthDate = new String(dateFormat(date, `mmmm dd`)).toUpperCase();

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
