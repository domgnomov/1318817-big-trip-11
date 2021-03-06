import NoPointsComponent from "../components/no-points";
import SortComponent, {SortType} from "../components/sort";
import DaysComponent from "../components/days";
import {render, RenderPosition} from "../utils/render";
import Day from "../components/day";
import {getDays} from "../utils/common";
import PointController, {EmptyPoint, Mode} from "./point";
import PointContainer from "../components/point-container";
import {getSortedPoints} from "../utils/sort";

const INITIAL_DAYS_COUNT = 1;

export default class TripController {
  constructor(pointsModel, eventsComponent, offersModel, destinationsModel, api) {
    this._container = eventsComponent;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;

    this._pointControllers = [];
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._daysComponent = new DaysComponent();

    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

  }

  hide() {
    this._container.hide();
  }

  show() {
    this._updatePoints();
    this._container.show();
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._noPointsComponent.hide();
    this._sortComponent.show();
    this._daysComponent.show();

    this._pointsModel.setDefaultFilter();
    this._resetSort();
    this._pointsModel.resetFilter();

    const dayContainer = this._daysComponent.getFirstDayElement();
    const pointContainer = dayContainer ? dayContainer.querySelector(`.trip-events__list`) : null;
    const firstPointContainer = pointContainer ? null : this._container.getElement();
    this._creatingPoint = new PointController(pointContainer, this._onDataChange, this._onViewChange, this._offersModel, this._destinationsModel, firstPointContainer);
    this._pointControllers = this._pointControllers.concat(this._creatingPoint);
    this._creatingPoint.render(EmptyPoint, Mode.ADDING);
  }

  render() {
    const points = this._pointsModel.getPoints();
    this._renderEvents();
    this._renderPoints(points);
  }

  _afterChangeAction() {
    if (!this._pointsModel.checkActiveFilterTypePointsExists()) {
      this._pointsModel.resetFilter();
    }
    this._updatePoints();
    if (this._pointsModel.getAllPoints().length === 0) {
      render(this._container.getElement(), this._noPointsComponent, RenderPosition.BEFOREEND);
      this._noPointsComponent.show();
      this._sortComponent.hide();
      this._daysComponent.hide();
    }
  }

  _renderDayComponentPoints(daysContainerElement, dayComponent, sortedPoints) {
    render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
    const dayContainer = dayComponent.getElement().querySelector(`.trip-events__list`);
    sortedPoints.forEach((point) => {
      const pointContainer = new PointContainer();
      render(dayContainer, pointContainer, RenderPosition.BEFOREEND);
      const pointController = new PointController(pointContainer.getElement(), this._onDataChange, this._onViewChange, this._offersModel, this._destinationsModel);
      this._pointControllers = this._pointControllers.concat(pointController);
      pointController.render(point, Mode.DEFAULT);
    });
  }

  _renderPoints(points) {
    const daysContainer = this._daysComponent.getElement();
    daysContainer.innerHTML = ``;

    if (this._sortComponent.getSortType() !== SortType.DEFAULT) {
      const dayComponent = new Day();
      this._renderDayComponentPoints(daysContainer, dayComponent, points);
    } else {
      let dayCount = INITIAL_DAYS_COUNT;
      const days = getDays(points);
      for (const [day, dayPoints] of days.entries()) {
        const dayComponent = new Day(day, dayCount++);
        this._renderDayComponentPoints(daysContainer, dayComponent, dayPoints);
      }
    }
  }

  _removePoints() {
    this._pointControllers.forEach((controller) => controller.destroy());
    this._pointControllers = [];
  }

  _updatePoints() {
    this._removePoints();
    this._renderPoints(this._pointsModel.getPoints());
  }

  _renderEvents() {
    if (this._pointsModel.getAllPoints().length === 0) {
      render(this._container.getElement(), this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container.getElement(), this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container.getElement(), this._daysComponent, RenderPosition.BEFOREEND);
  }

  _resetSort() {
    this._creatingPoint = null;
    this._updatePoints();
    this._sortComponent.resetSort();
  }

  _onFilterChange() {
    this._resetSort();
  }

  _onViewChange() {
    this._creatingPoint = null;
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._creatingPoint = null;
    const sortedPoints = getSortedPoints(this._pointsModel.getPoints(), sortType);

    this._removePoints();
    this._renderPoints(sortedPoints);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._api.createPoint(newData)
          .then((point) => {
            this._pointsModel.addPoint(point);
            if (pointController.isFirstPoint()) {
              pointController.destroy();
              this.render();
            } else {
              pointController.render(point, Mode.DEFAULT);
            }
            this._updatePoints();
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._afterChangeAction();
        })
        .catch(() => {
          pointController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((point) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, point);

          if (isSuccess) {
            pointController.render(point, Mode.DEFAULT);
            this._afterChangeAction();
            this._onSortTypeChange(this._sortComponent.getSortType());
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

}

export {INITIAL_DAYS_COUNT};
