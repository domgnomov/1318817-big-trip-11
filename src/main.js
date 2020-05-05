import {generatePoints} from "./mock/point.js";
import {hide, show} from "./utils/common.js";
import TripController from "./controllers/trip";
import PointsModel from "./models/points.js";
import FilterController from "./controllers/filter";
import StatisticsComponent from "./components/statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";

const allPoints = generatePoints();
const pointsModel = new PointsModel();
pointsModel.setPoints(allPoints);

const mainElement = document.querySelector(`.trip-main`);
const tripController = new TripController(mainElement, pointsModel);
tripController.render();

const siteMenuComponent = new SiteMenuComponent();
const controlsContainerElement = mainElement.querySelector(`.trip-main__trip-controls`);
const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
render(controlsFirstElement, siteMenuComponent, RenderPosition.AFTEREND);

const filterContainer = mainElement.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(filterContainer, pointsModel);
filterController.render();

const addButton = mainElement.querySelector(`.trip-main__event-add-btn`);
addButton.addEventListener(`click`, () => {
  tripController.createPoint();
});

const statisticsComponent = new StatisticsComponent();
render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
hide(statisticsComponent.getElement());

const eventsContainerElement = document.querySelector(`.trip-events`);

siteMenuComponent.setOnChange((menuItem) => {
  debugger;
  switch (menuItem) {
    case MenuItem.STATS:
      hide(eventsContainerElement);
      show(statisticsComponent.getElement());
      break;
    case MenuItem.TABLE:
      hide(statisticsComponent.getElement());
      show(eventsContainerElement);
      break;
  }
});
