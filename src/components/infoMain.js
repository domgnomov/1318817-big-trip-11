/* global require */

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

export const createInfoMainTemplate = (days) => {
  const title = getTitle(days);
  const dateInterval = getDateInterval(days);

  return (
    `<h1 class="trip-info__title">${title}</h1>
      
     <p class="trip-info__dates">${dateInterval}</p>`
  );
};

