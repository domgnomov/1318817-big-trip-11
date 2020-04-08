let offers;

const DayItemTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeng`,
  `Restaurant`,
];

const Cities = [
  `Moscow`,
  `New-York`,
  `London`,
  `Paris`,
];

//TODO
const OfferNames = [
  `Order Uber`,
  `Rent a car`,
  `Add breakfast`,
  `Book tickets`,
  `Lunch in city`,
  `Switch to comfort`,
];

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

const generateOffers = () => {
  return new Map(DayItemTypes.map(type => [type,
    new Array(getRandomIntegerNumber(1, 5))
        .fill(``)
        .map(() => {
          const offer = {
            type: type,
            title: getRandomArrayItem(OfferNames),
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

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
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

const generateDayItem = () => {
  if (!offers) {
    offers = generateOffers();
  }
  const type = getRandomArrayItem(DayItemTypes);
  return {
    type: type,
    city: getRandomArrayItem(Cities),
    offers: offers.get(type),
    description: getDescription(Descriptions, 1, 5),
    photos: getRandomPhotos(1, 5),
  };
};

const generateDayItems = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateDayItem);
};

export {generateDayItems};
