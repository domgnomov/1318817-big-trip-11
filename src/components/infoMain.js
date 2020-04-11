const DELIMITER = `&mdash;`;

const getTitle = (days) => {
  const allDayItems = [].concat.apply([], Array.from(days.values()));
  const title = allDayItems.reduce(function(acc, current) {
    return `${acc} ${current.city} ${DELIMITER}`;
  }, ``);
  return title.slice(0, title.length - DELIMITER.length);
};

const getDateInterval = (days) => {
  const daysKeys = Array.from(days.keys());
  const startDate = daysKeys[0];
  const endDate = daysKeys[daysKeys.length - 1];

  const dateFormat = require('dateformat');
  const startMonthDate = String(dateFormat(startDate, `mmmm dd`)).toUpperCase();
  const endMonthDate = dateFormat(endDate, `dd`);

  return `${startMonthDate} ${DELIMITER} ${endMonthDate}`;
};

export const createInfoMainTemplate = (days) => {
  const title = getTitle(days);
  const dateInterval = getDateInterval(days);

  return (
    `<h1 class="trip-info__title">${title}</h1>
      
     <p class="trip-info__dates">${dateInterval}</p>`
  );
};

