import InfoContainer from "../components/infoContainer";
import MenuComponent from "../components/menu";
import FilterComponent from "../components/filter";
import NoPointsComponent from "../components/no-points";
import SortComponent, {SortType} from "../components/sort";
import DaysContainer from "../components/daysContainer";
import {render, RenderPosition} from "../utils/render";
import InfoMain from "../components/infoMain";
import InfoCost from "../components/infoCost";
import Day from "../components/day";
import PointController from "./point";
import {getDays} from "../utils/common";

export const INITIAL_DAYS_COUNT = 1;


const getSortedPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedPoints = showingPoints.sort((a, b) => a.startDate - b.startDate);
      break;
    case SortType.PRICE:
      sortedPoints = showingPoints.sort((a, b) => b.price - a.price);
      break;
    case SortType.DEFAULT:
      sortedPoints = showingPoints;
      break;
  }

  return sortedPoints.slice();
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._pointControllers = [];
    this._infoContainer = new InfoContainer();
    this._menuComponent = new MenuComponent();
    this._filterComponent = new FilterComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._daysContainer = new DaysContainer();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(pointController, oldData, newData) {
    const value = this._pointsModel.getAllPoints().slice();
    const index = value.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    const newValue = [].concat(value.slice(0, index), newData, value.slice(index + 1));
    this._pointsModel.setPoints(newValue);
    pointController.render(newValue[index]);
  }

  _renderPoints(points) {
    const daysContainerElement = document.querySelector(`.trip-days`);
    daysContainerElement.innerHTML = ``;
    let dayCount = INITIAL_DAYS_COUNT;
    let days = getDays(points);
    for (const [day, points] of days.entries()) {
      const dayComponent = new Day(day, dayCount++);
      render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
      const container = dayComponent.getElement().querySelector(`.trip-events__list`);
      points.forEach((point) => {
        const pointController = new PointController(container, this._onDataChange, this._onViewChange);
        this._pointControllers = this._pointControllers.concat(pointController);
        pointController.render(point);
      });
    }
  }

  _removePoints() {
    this._pointControllers.forEach((controller) => controller.destroy());
    this._pointControllers = [];
  }

  _updatePoints() {
    this._removePoints();
    this._renderPoints(this._pointsModel.getAllPoints())
  }

  render() {
    const days = getDays(this._pointsModel.getAllPoints());
    render(this._container, this._infoContainer, RenderPosition.AFTERBEGIN);
    const infoContainerElement = this._container.querySelector(`.trip-main__trip-info`);
    const infoMainComponent = new InfoMain(days);
    render(infoContainerElement, infoMainComponent, RenderPosition.BEFOREEND);
    const infoCostComponent = new InfoCost(days);
    render(infoContainerElement, infoCostComponent, RenderPosition.BEFOREEND);

    const controlsContainerElement = this._container.querySelector(`.trip-main__trip-controls`);

    const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
    const controlsSecondElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(2)`);
    render(controlsFirstElement, this._menuComponent, RenderPosition.AFTEREND);
    render(controlsSecondElement, this._filterComponent, RenderPosition.AFTEREND);

    const eventsContainerElement = document.querySelector(`.trip-events`);

    if (days.length === 0) {
      render(eventsContainerElement, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(eventsContainerElement, this._sortComponent, RenderPosition.BEFOREEND);

    render(eventsContainerElement, this._daysContainer, RenderPosition.BEFOREEND);

    const daysContainerElement = document.querySelector(`.trip-days`);

    this._renderPoints(this._pointsModel.getAllPoints());


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      if (sortType === SortType.DEFAULT) {
        this._renderPoints(this._pointsModel.getAllPoints());
        return;
      }
      const sortedPoints = getSortedPoints(this._pointsModel.getAllPoints(), sortType);

      daysContainerElement.innerHTML = ``;

      const dayComponent = new Day();
      render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
      const container = dayComponent.getElement().querySelector(`.trip-events__list`);
      this._pointControllers = [];
      sortedPoints.forEach((point) => {
        const pointController = new PointController(container, this._onDataChange, this._onViewChange);
        this._pointControllers = this._pointControllers.concat(pointController);
        pointController.render(point);
      });
    });
  }

  _onFilterChange() {
    this._updatePoints();
  }

}
