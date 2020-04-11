import {formatTime, getPreposition} from "../utils.js";

const createOffersMarkup = (offers) => {
  return offers
    .map((offer) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
        </li>`
      );
    })
    .join(`\n`);
};

export const createDayItemTemplate = (item) => {
  const {type, city, offers, price, startDate, endDate, duration} = item;

  const hasOffers = Array.isArray(offers) && offers.length;
  const offersMarkup = hasOffers ? createOffersMarkup(offers) : [];
  const typePreposition = getPreposition(type);
  const startDateTime = startDate.toISOString().split('.')[0];
  const endDateTime = endDate.toISOString().split('.')[0];
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${typePreposition} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateTime}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${hasOffers ? `${offersMarkup}` : ``}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
