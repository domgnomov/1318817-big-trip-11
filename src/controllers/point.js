import PointComponent from "../components/point";
import PointEditComponent from "../components/editPoint";
import {replace, remove, render, RenderPosition} from "../utils/render.js";
import PointModel from "../models/point";

const SHAKE_ANIMATION_TIMEOUT = 600;

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const EmptyPoint = {
  type: null,
  name: null,
  offers: null,
  price: 0,
  startDate: null,
  endDate: null,
  duration: 0,
  description: ``,
  photos: null,
  isFavorite: false,
};

const parseFormData = (formData, destinationModel, offersModel) => {
  const name = formData.get(`event-destination`);
  const type = formData.get(`event-type`).toLowerCase();
  const description = destinationModel.getDescriptionByName(name);
  debugger;
  const pictures = destinationModel.getPicturesByName(name);
  const offers = offersModel.getOffersWithIdByType(type);

  const destination = {name, description, pictures};
  return new PointModel({
    "type": type,
    "is_favorite": !!formData.get(`event-favorite`),
    "base_price": Number.parseInt(formData.get(`event-price`), 10),
    "date_from": formData.get(`event-start-time`),
    "date_to": formData.get(`event-end-time`),
    "destination": destination,
    "offers": getSelectedOffers(formData, offers),
  });
};

const getSelectedOffers = (formData, offers) => {
  const selectedOffers = [];
  offers.forEach((offer) => {
    const checked = !!formData.get(`event-offer-${offer.id}`);
    if (checked) {
      delete offer.id;
      selectedOffers.push(offer);
    }
  });
  return selectedOffers;
};

export default class PointController {
  constructor(container, onDataChange, onViewChange, offersModel, destinationsModel, firstPointContainer) {
    this._container = container;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this.firstPointContainer = firstPointContainer;

    this._onViewChange = onViewChange;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new PointEditComponent(point, this._offersModel, this._destinationsModel);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._pointEditComponent.getData();

      const data = parseFormData(formData, this._destinationsModel, this._offersModel);

      this._pointEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      this._onDataChange(this, point, data);
    });

    this._pointEditComponent.setDeleteButtonClickHandler(() => {
      this._pointEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, point, null);
    });

    this._pointEditComponent.setFavoritesButtonClickHandler(() => {
      const newPoint = PointModel.clone(point);
      newPoint.isFavorite = !newPoint.isFavorite;

      this._onDataChange(this, point, newPoint);
    });
    debugger;
    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointEditComponent && oldPointComponent) {
          replace(this._pointComponent, oldPointComponent);
          replace(this._pointEditComponent, oldPointEditComponent);
          this._replaceEditToPoint();
        } else {
          render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointEditComponent && oldPointComponent) {
          remove(oldPointComponent);
          remove(oldPointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        if (this.firstPointContainer) {
          render(this.firstPointContainer, this._pointEditComponent, RenderPosition.BEFOREEND);
        } else {
          debugger;
          render(this._container, this._pointEditComponent, RenderPosition.AFTERBEGIN);
        }
        break;
    }
  }

  ifFirstPoint() {
    return !!this.firstPointContainer;
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointEditComponent.reset();
    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    this._onViewChange();
    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._pointEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._pointComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._pointEditComponent.getElement().style.animation = ``;
      this._pointComponent.getElement().style.animation = ``;

      this._pointEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
