import InfoContainer from "../components/infoContainer";
import MenuComponent from "../components/menu";
import NoPointsComponent from "../components/no-points";
import SortComponent, {SortType} from "../components/sort";
import DaysContainer from "../components/daysContainer";
import {render, RenderPosition} from "../utils/render";
import InfoMain from "../components/infoMain";
import InfoCost from "../components/infoCost";
import Day from "../components/day";
import {getDays, getSortedPoints} from "../utils/common";
import PointController, {EmptyPoint, Mode} from "./point";

export const INITIAL_DAYS_COUNT = 1;

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._pointControllers = [];
    this._infoContainer = new InfoContainer();
    /*this._menuComponent = new MenuComponent();*/
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._daysContainer = new DaysContainer();
    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

  }

  hide() {
    this._getTripEventContainer().hide();
  }

  show() {
    this._getTripEventContainer().show();
  }

  _getTripEventContainer() {
    return document.querySelector(`.trip-events`);
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
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, Mode.DEFAULT);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, Mode.DEFAULT);
      }
    }
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const firstDayElement = this._daysContainer.getFirstDayElement();

    const dayContainer = firstDayElement.querySelector(`.trip-events__list`);
    this._creatingPoint = new PointController(dayContainer, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, Mode.ADDING);
  }

  _renderDayComponentPoints(daysContainerElement, dayComponent, sortedPoints) {
    render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
    const dayContainer = dayComponent.getElement().querySelector(`.trip-events__list`);
    sortedPoints.forEach((point) => {
      const pointController = new PointController(dayContainer, this._onDataChange, this._onViewChange);
      this._pointControllers = this._pointControllers.concat(pointController);
      pointController.render(point, Mode.DEFAULT);
    });
  }

  _renderPoints(points) {
    const daysContainer = this._daysContainer.getElement();
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
    this._removePoints();
    this._renderPoints(this._pointsModel.getPoints());
  }

  render() {
    const points = this._pointsModel.getPoints();
    this._renderInfo(points);
    /*this._renderControls();*/
    this._renderEvents(points);
    this._renderPoints(points);
  }

  _renderInfo(points) {
    render(this._container, this._infoContainer, RenderPosition.AFTERBEGIN);
    const infoContainerElement = this._container.querySelector(`.trip-main__trip-info`);
    const infoMainComponent = new InfoMain(points);
    render(infoContainerElement, infoMainComponent, RenderPosition.BEFOREEND);
    const infoCostComponent = new InfoCost(points);
    render(infoContainerElement, infoCostComponent, RenderPosition.BEFOREEND);
  }

/*  _renderControls() {
    const controlsContainerElement = this._container.querySelector(`.trip-main__trip-controls`);
    const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
    render(controlsFirstElement, this._menuComponent, RenderPosition.AFTEREND);
  }*/

  _renderEvents(points) {
    const eventsContainerElement = document.querySelector(`.trip-events`);

    if (points.length === 0) {
      render(eventsContainerElement, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(eventsContainerElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(eventsContainerElement, this._daysContainer, RenderPosition.BEFOREEND);
  }

  _onFilterChange() {
    this._updatePoints();
    this._sortComponent.getDefaultSortTypeElement().click();
  }

}
