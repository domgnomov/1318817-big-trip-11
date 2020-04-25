import {formatTime, formatDateTime, getDuration, getPreposition} from "../utils/common.js";
import AbstractComponent from "./abstract-component";

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

const createPointTemplate = (point) => {
  const {type, city, offers, price, startDate, endDate} = point;

  const hasOffers = Array.isArray(offers) && offers.length;
  const offersMarkup = hasOffers ? createOffersMarkup(offers) : [];
  const typePreposition = getPreposition(type);

  const startDateTime = formatDateTime(startDate);
  const endDateTime = formatDateTime(endDate);
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  const duration = getDuration(startDate, endDate);

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
          <p class="event__duration">${duration}</p>
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

export default class Point extends AbstractComponent {
  constructor(point) {
    super();

    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
