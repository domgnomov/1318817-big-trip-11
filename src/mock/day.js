import {generateDayItem} from "./dayItem";

const ITEMS_COUNT = 20;

const generateDayItems = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateDayItem);
};

export const generateDays = () => {
  const dayItems = generateDayItems(ITEMS_COUNT);
  dayItems.sort(function (a, b) {
    return a.startDate.getTime() - b.startDate.getTime();
  });
  const days = new Map();
  dayItems.forEach((dayItem) => {
    const date = dayItem.startDate;
    date.setHours(0, 0, 0, 0);
    if (!days.has(date.toString())) {
      days.set(date.toString(), []);
    }
    days.get(date.toString()).push(dayItem);
  });
  return days;
};
