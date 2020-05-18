import {formatTime, formatDateTime} from "../utils/date.js";
import {getPreposition, capitalize} from "../utils/common.js";
import AbstractComponent from "./abstract-component";
import {getFormattedMilliseconds} from "../utils/date";

const createOffersMarkup = (offers) => {
  const displayedOffers = offers.length > 3 ? offers.slice(0, 3) : offers.slice();
  return displayedOffers
    .map((offer) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`
      );
    })
    .join(`\n`);
};

const createPointTemplate = (point) => {
  const {type, name, offers, price, startDate, endDate, getInterval} = point;

  const hasOffers = Array.isArray(offers) && offers.length;
  const offersMarkup = hasOffers ? createOffersMarkup(offers) : [];
  const typePreposition = getPreposition(type);

  const startDateTime = formatDateTime(startDate);
  const endDateTime = formatDateTime(endDate);
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  const interval = getInterval ? getFormattedMilliseconds(getInterval()) : ``;

  return (
    `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="${type ? `img/icons/${type}.png` : ``}" alt="${type ? `Event type icon` : ``}">
        </div>
        <h3 class="event__title">${type ? capitalize(type) : ``} ${typePreposition} ${name ? name : ``}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDateTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDateTime}">${endTime}</time>
          </p>
          <p class="event__duration">${interval}</p>
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
      </div>`
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
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
