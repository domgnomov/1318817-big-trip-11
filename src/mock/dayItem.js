import {getRandomIntegerNumber} from "../utils/common";

const DayItemTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
];

const Cities = [
  `Moscow`,
  `New-York`,
  `London`,
  `Paris`,
];

const Offers = {
  luggage: {
    name: `luggage`,
    title: `Add luggage`,
    price: 30
  },
  comfort: {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  },
  meal: {
    name: `meal`,
    title: `Add luggage`,
    price: 15
  },
  seats: {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  },
  train: {
    name: `train`,
    title: `Travel by train`,
    price: 40
  },
};

const Descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

let randomOffers;

const generateRandomOffers = () => {
  return new Map(DayItemTypes.map((type) => [type,
    new Array(getRandomIntegerNumber(1, 6))
        .fill(``)
        .map(() => {
          const offer = {
            type,
            title: getRandomArrayItem(Array.from(Object.values(Offers))).title,
            cost: Math.floor(Math.random() * 10),
          };
          return offer;
        })
  ]));
};

const getRandomPhotos = (min, max) => {
  const randomIndex = getRandomIntegerNumber(min, max);
  return Array(randomIndex)
    .fill(``)
    .map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomArrayItems = (array, min, max) => {
  const randomIndex = getRandomIntegerNumber(min, max);

  return array.slice(min, randomIndex);
};

const getDescription = (array, min, max) => {
  return getRandomArrayItems(array, min, max).join(` `);
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getRandomBoolean = () => {
  const randomInteger = getRandomIntegerNumber(0, 2);

  return randomInteger === 1;
};

export const generateDayItem = () => {
  if (!randomOffers) {
    randomOffers = generateRandomOffers();
  }
  const type = getRandomArrayItem(DayItemTypes);
  const duration = getRandomIntegerNumber(1, 31);
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + duration * 60000);

  return {
    type,
    city: getRandomArrayItem(Cities),
    offers: randomOffers.get(type),
    price: getRandomIntegerNumber(1, 100),
    startDate: startTime,
    endDate: endTime,
    duration,
    description: getDescription(Descriptions, 1, 6),
    photos: getRandomPhotos(1, 6),
    isFavorite: getRandomBoolean(),
  };
};
