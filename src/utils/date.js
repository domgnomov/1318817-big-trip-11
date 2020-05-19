import moment from "moment";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DDTHH:mm`);
};

export const compareByHoursAndMinutes = (a, b) => {
  return getMinutesOfDate(a) - getMinutesOfDate(b);
};

const getMinutesOfDate = (m) => {
  return m.getMinutes() + m.getHours() * 60;
};

export const formatDateWithMonthName = (date, previousDate) => {
  if (previousDate && date.getMonth() === previousDate.getMonth()) {
    return moment(date).format(`DD`);
  }
  return moment(date).format(`MMMM DD`);
};

export const getFormattedMilliseconds = (ms) => {
  if (ms / DAY > 1 || (ms % DAY === 0 && ms !== 0)) {
    return moment.utc(ms - DAY).format(`DD[d] HH[h] mm[m]`);
  } else if (ms / HOUR > 1 || (ms % HOUR === 0 && ms !== 0)) {
    return moment.utc(ms).format(`HH[h] mm[m]`);
  }

  return moment.utc(ms).format(`mm[m]`);
};

export const compareByDate = (startDate, endDate) => {
  const from = startDate.getTime();
  const to = endDate.getTime();
  if (from === to) {
    return 0;
  } else if (from < to) {
    return 1;
  }

  return -1;
};

export const getMillisecondsByInterval = (startDate, endDate) => {
  const diff = moment(endDate).diff(moment(startDate));
  return moment.duration(diff).asMilliseconds();
};
