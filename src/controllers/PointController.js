import PointComponent from "../components/point";
import PointEditComponent from "../components/editPoint";
import {replace, render, RenderPosition} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {
    const oldPointComponent = this._pointComponent;
    const oldPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointComponent(point);
    this._pointEditComponent = new PointEditComponent(point);

    this._pointComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToPoint();
      //TODO НЕ надо разве?
      //document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._pointEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });

    if (oldPointEditComponent && oldPointComponent) {
      replace(this._pointComponent, oldPointComponent);
      replace(this._pointEditComponent, oldPointEditComponent);
    } else {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
    }
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    //TODO
    //this._pointEditComponent.reset();
    replace(this._pointComponent, this._pointEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    //TODO
    //this._onViewChange();
    replace(this._pointEditComponent, this._pointComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}