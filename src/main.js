import {generatePoints} from "./mock/point.js";
import TripController from "./controllers/trip";
import PointsModel from "./models/points.js";
import FilterController from "./controllers/filter";
import {render, RenderPosition} from "./utils/render.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";
import InfoController from "./controllers/info";
import StatisticsController from "./controllers/statistics";
import API from "./api";

const AUTHORIZATION = `Basic sfsdf78sd8f83ju=`;

const api = new API(AUTHORIZATION);

const allPoints = generatePoints();
const pointsModel = new PointsModel();
pointsModel.setPoints(allPoints);

const mainElement = document.querySelector(`.trip-main`);

const infoController = new InfoController(mainElement, pointsModel);

const tripController = new TripController(pointsModel);

const siteMenuContainer = mainElement.querySelector(`.trip-main__trip-controls .visually-hidden:nth-child(1)`);
const siteMenuComponent = new SiteMenuComponent();
render(siteMenuContainer, siteMenuComponent, RenderPosition.AFTEREND);

const filterContainer = mainElement.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(filterContainer, pointsModel);

const addButton = mainElement.querySelector(`.trip-main__event-add-btn`);
addButton.addEventListener(`click`, () => {
  tripController.createPoint();
});

const statisticsContainer = document.querySelector(`.page-body__page-main .page-body__container`);
const statisticsController = new StatisticsController(statisticsContainer, pointsModel);
statisticsController.render();
statisticsController.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.STATS:
      tripController.hide();
      statisticsController.show();
      break;
    case MenuItem.TABLE:
      tripController.show();
      statisticsController.hide();
      break;
  }
});

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(points);
    infoController.render();
    tripController.render();
    filterController.render();
  });

