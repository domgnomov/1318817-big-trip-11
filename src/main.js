import TripController from "./controllers/trip";
import PointsModel from "./models/points.js";
import FilterController from "./controllers/filter";
import {render, RenderPosition} from "./utils/render.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";
import InfoController from "./controllers/info";
import StatisticsController from "./controllers/statistics";
import API from "./api";
import PointLoadingComponent from "./components/pointLoading";
import EventsComponent from "./components/events";
import DestinationsModel from "./models/destinations";
import OffersModel from "./models/offers";

const END_POINT = `https://11.ecmascript.pages.academy/big-trip/`;
const AUTHORIZATION = `Basic sfsdf78sd8f83ju=`;

const api = new API(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const mainElement = document.querySelector(`.trip-main`);

const infoController = new InfoController(mainElement, pointsModel);

const eventsComponent = new EventsComponent();
const tripController = new TripController(pointsModel, eventsComponent, offersModel, destinationsModel, api);

const loadingPointComponent = new PointLoadingComponent();
render(eventsComponent.getElement(), loadingPointComponent, RenderPosition.BEFOREEND);

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
const statisticsController = new StatisticsController(statisticsContainer, pointsModel, offersModel);
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

api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  }).
  then(() => api.getOffers()).
  then((offers) => {
    offersModel.setOffers(offers);
  })
  .then(() => api.getPoints())
  .then((points) => {
    pointsModel.setPoints(points);
    loadingPointComponent.hide();
    infoController.render();
    tripController.render();
    filterController.render();
  });
