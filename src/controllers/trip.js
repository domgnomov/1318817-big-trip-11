import NoPointsComponent from "../components/no-points";
import SortComponent, {SortType} from "../components/sort";
import DaysComponent from "../components/days";
import {render, RenderPosition} from "../utils/render";
import Day from "../components/day";
import {getDays, getSortedPoints} from "../utils/common";
import PointController, {EmptyPoint, Mode} from "./point";
import PointContainer from "../components/pointContainer";

export const INITIAL_DAYS_COUNT = 1;

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
    this._container.show();
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedPoints = getSortedPoints(this._pointsModel.getPoints(), sortType);

    this._removePoints();
    this._renderPoints(sortedPoints);
  }

  _onDataChange(pointController, oldData, newData) {
    debugger;
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._api.createPoint(newData)
          .then((point) => {
            this._pointsModel.addPoint(point);
            if (pointController.ifFirstPoint()) {
              debugger;
              pointController.destroy();
              this.render();
            } else {
              debugger;
              pointController.render(point, Mode.DEFAULT);            }
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updatePoints();
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
            this._updatePoints();
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const firstDayElement = this._daysComponent.getFirstDayElement();
    debugger;
    const firstPointContainer = firstDayElement ? firstDayElement.querySelector(`.trip-events__list`) : this._container.getElement();
    this._creatingPoint = new PointController(firstDayElement, this._onDataChange, this._onViewChange, this._offersModel, this._destinationsModel, firstPointContainer);
    this._creatingPoint.render(EmptyPoint, Mode.ADDING);
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
      let days = getDays(points);
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
    debugger;
    this._removePoints();
    this._renderPoints(this._pointsModel.getPoints());
  }

  render() {
    const points = this._pointsModel.getPoints();
    this._renderEvents(points);
    this._renderPoints(points);
  }

  _renderEvents(points) {
    if (points.length === 0) {
      render(this._container.getElement(), this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container.getElement(), this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container.getElement(), this._daysComponent, RenderPosition.BEFOREEND);
  }

  _onFilterChange() {
    this._updatePoints();
    this._sortComponent.getDefaultSortTypeElement().click();
  }

}
