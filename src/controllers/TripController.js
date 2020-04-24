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
import PointController from "./PointController";
import {getAllPoints} from "../utils/common";

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
  constructor(container) {
    this._container = container;

    this._days = [];
    this._pointControllers = [];
    this._infoContainer = new InfoContainer();
    this._menuComponent = new MenuComponent();
    this._filterComponent = new FilterComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._daysContainer = new DaysContainer();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(pointController, oldData, newData) {
    for (const [key, value] of this._days.entries()) {
      const index = value.findIndex((it) => it === oldData);
      if (index === -1) {
        continue;
      }

      const newValue = [].concat(value.slice(0, index), newData, value.slice(index + 1));
      this._days.set(key, newValue);

      pointController.render(newValue[index]);
      return;
    }
  }

  _renderPoints (days, daysContainerElement, onDataChange) {
    daysContainerElement.innerHTML = ``;
    let dayCount = INITIAL_DAYS_COUNT;
    for (const [day, points] of days.entries()) {
      const dayComponent = new Day(day, dayCount++);
      render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
      const container = dayComponent.getElement().querySelector(`.trip-events__list`);
      points.forEach((point) => {
        const pointController = new PointController(container, onDataChange, this._onViewChange);
        this._pointControllers = this._pointControllers.concat(pointController);
        pointController.render(point);
      });
    }
  };

  render(days) {
    this._days = days;
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

    this._renderPoints(days, daysContainerElement, this._onDataChange);


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      if (sortType === SortType.DEFAULT) {
        this._renderPoints(days, daysContainerElement, this._onDataChange);
        return;
      }
      const sortedPoints = getSortedPoints(getAllPoints(this._days), sortType);

      daysContainerElement.innerHTML = ``;

      const dayComponent = new Day();
      render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
      const container = dayComponent.getElement().querySelector(`.trip-events__list`);
      this._pointControllers = null;
      sortedPoints.forEach((point) => {
        const pointController = new PointController(container, this._onDataChange, this._onViewChange);
        this._pointControllers = this._pointControllers.concat(pointController);
        pointController.render(point);
      });
    });
  }


}
