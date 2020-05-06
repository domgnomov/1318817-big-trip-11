import {generatePoints} from "./mock/point.js";
import TripController from "./controllers/trip";
import PointsModel from "./models/points.js";
import FilterController from "./controllers/filter";
import StatisticsComponent from "./components/statistics.js";
import {render, RenderPosition} from "./utils/render.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";
import InfoController from "./controllers/info";

const allPoints = generatePoints();
const pointsModel = new PointsModel();
pointsModel.setPoints(allPoints);

const mainElement = document.querySelector(`.trip-main`);

const infoController = new InfoController(mainElement, pointsModel);
infoController.render();

const tripController = new TripController(pointsModel);
tripController.render();

const siteMenuContainer = mainElement.querySelector(`.trip-main__trip-controls .visually-hidden:nth-child(1)`);
const siteMenuComponent = new SiteMenuComponent();
render(siteMenuContainer, siteMenuComponent, RenderPosition.AFTEREND);

const filterContainer = mainElement.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(filterContainer, pointsModel);
filterController.render();

const addButton = mainElement.querySelector(`.trip-main__event-add-btn`);
addButton.addEventListener(`click`, () => {
  tripController.createPoint();
});

const statisticsComponent = new StatisticsComponent();
render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      tripController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TABLE:
      tripController.show();
      statisticsComponent.hide();
      break;
  }
});
