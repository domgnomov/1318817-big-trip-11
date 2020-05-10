import {getPreposition, capitalize} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const createOffersMarkup = (offers) => {
  return offers
    .map((offer) => {
      const title = offer.title.toLowerCase();
      return (
        `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" checked>
            <label class="event__offer-label" for="event-offer-${title}-1">
              <span class="event__offer-title">${offer.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`
      );
    })
    .join(`\n`);
};

const createEditPointTemplate = (point, options = {}) => {
  const {price, isFavorite} = point;
  const {city, type, offers} = options;

  const typePreposition = getPreposition(type);
  const hasOffers = Array.isArray(offers) && offers.length;
  const offersMarkup = hasOffers ? createOffersMarkup(offers) : [];

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type} ${typePreposition}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Moscow"></option>
              <option value="New-York"></option>
              <option value="London"></option>
              <option value="Paris"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers"> 
              ${hasOffers ? `${offersMarkup}` : ``}
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

const parseFormData = (formData) => {
  return {
    id: null,
    type: formData.get(`event-type`),
    city: formData.get(`event-destination`),
    offers: null,
    price: formData.get(`event-price`),
    startDate: formData.get(`event-start-time`),
    endDate: formData.get(`event-end-time`),
    duration: 0,
    description: null,
    photos: null,
    isFavorite: formData.get(`event-favorite`),
  };
};

export default class EditPoint extends AbstractSmartComponent {
  constructor(point, offersModel, destinationsModel) {
    super();

    this._point = point;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._editedCity = point.city;
    this._editedType = point.type;
    this._editedOffers = point.offers;
    this._editedDescription = point.description;
    this._startDateFlatpickr = null;
    this._endDateFlatpickr = null;
    this._submitHandler = null;
    this._setFavoritesHandler = null;
    this._deleteButtonClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditPointTemplate(this._point, {
      city: this._editedCity,
      type: this._editedType,
      offers: this._editedOffers,
      description: this._editedDescription
    });
  }

  rerender() {
    super.rerender();
    this._recoveryFlatpickr();
  }

  reset() {
    const point = this._point;

    this._editedCity = point.city;
    this._editedType = point.type;
    this._editedOffers = point.offers;
    this._editedDescription = point.description;

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);

    this._setFavoritesHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setFavoritesButtonClickHandler(this._setFavoritesHandler);
    this._subscribeOnEvents();
  }

  removeElement() {
    this._destroyFlatpickr(this._startDateFlatpickr);
    this._destroyFlatpickr(this._endDateFlatpickr);

    super.removeElement();
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  _recoveryFlatpickr() {
    this._applyFlatpickr();
  }

  _destroyFlatpickr(fpickr) {
    if (fpickr) {
      fpickr.destroy();
      fpickr = null;
    }
  }

  _flatpickr(element, date) {
    return flatpickr(element, {
      altInput: true,
      altFormat: `d/m/y h:m`,
      allowInput: true,
      enableTime: true,
      defaultDate: date || `today`,
    });
  }

  _applyFlatpickr() {
    this._destroyFlatpickr(this._startDateFlatpickr);
    const startDateElement = this.getElement().querySelector(`#event-start-time-1`);
    this._startDateFlatpickr = this._flatpickr(startDateElement, this._point.startDate);

    this._destroyFlatpickr(this._endDateFlatpickr);
    const endDateElement = this.getElement().querySelector(`#event-end-time-1`);
    this._endDateFlatpickr = this._flatpickr(endDateElement, this._point.endDate);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-list input`).forEach((el) => {
      el.addEventListener(`click`, (evt) => {
        this._editedType = capitalize(evt.target.value);
        this._editedOffers = this._offersModel.getOffersByType(this._editedType);
        this.rerender();
      });
    });

    element.querySelector(`.event__input--destination `)
      .addEventListener(`change`, (evt) => {
        this._editedCity = capitalize(evt.target.value);
        this._editedDescription = this._destinationsModel.getDescriptionByName(this._editedCity);
        this.rerender();
      });
  }
}

