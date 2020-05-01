import {getRandomIntegerNumber} from "../utils/common";

let id = 1;

const POINTS_COUNT = 20;

const PointTypes = [
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

const getRandomArrayPoint = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomArrayPoints = (array, min, max) => {
  const randomIndex = getRandomIntegerNumber(min, max);

  return array.slice(min, randomIndex);
};

const getDescription = (array, min, max) => {
  return getRandomArrayPoints(array, min, max).join(` `);
};

const generateRandomOffers = () => {
  return new Map(PointTypes.map((type) => [type,
    new Array(getRandomIntegerNumber(1, 6))
        .fill(``)
        .map(() => {
          const offer = {
            type,
            title: getRandomArrayPoint(Array.from(Object.values(Offers))).title,
            cost: Math.floor(Math.random() * 10),
          };
          return offer;
        })
  ]));
};

const generateDescriptions = () => {
  return new Map(Cities.map((city) => [city,
    new Array(getDescription(Descriptions, 1, 6))]));
};

export const generatePoints = () => {
  return new Array(POINTS_COUNT)
    .fill(``)
    .map(generatePoint);
};

export const randomOffers = generateRandomOffers();
export const randomDescriptions = generateDescriptions();

const getRandomPhotos = (min, max) => {
  const randomIndex = getRandomIntegerNumber(min, max);
  return Array(randomIndex)
    .fill(``)
    .map(() => `http://picsum.photos/248/152?r=${Math.random()}`);
};

const getRandomBoolean = () => {
  const randomInteger = getRandomIntegerNumber(0, 2);

  return randomInteger === 1;
};

export const generatePoint = () => {
  const type = getRandomArrayPoint(PointTypes);
  const duration = getRandomIntegerNumber(1, 31);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + getRandomIntegerNumber(0, 5));
  startDate.setHours(getRandomIntegerNumber(8, 23), 0, 0, 0);
  const endDate = new Date(startDate.getTime() + duration * 200000);
  const city = getRandomArrayPoint(Cities);

  return {
    id: id++,
    type,
    city,
    offers: randomOffers.get(type),
    price: getRandomIntegerNumber(1, 100),
    startDate,
    endDate,
    duration,
    description: randomDescriptions.get(city),
    photos: getRandomPhotos(1, 6),
    isFavorite: getRandomBoolean(),
  };
};
