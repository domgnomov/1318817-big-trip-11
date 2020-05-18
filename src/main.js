import TripController from "./controllers/trip";
import PointsModel from "./models/points.js";
import FilterController from "./controllers/filter";
import {render, RenderPosition} from "./utils/render.js";
import SiteMenuComponent, {MenuItem} from "./components/menu.js";
import InfoController from "./controllers/info";
import StatisticsController from "./controllers/statistics";
import PointLoadingComponent from "./components/pointLoading";
import EventsComponent from "./components/events";
import DestinationsModel from "./models/destinations";
import OffersModel from "./models/offers";
import Store from "./api/store";
import Provider from "./api/provider";
import API from "./api/index";

const END_POINT = `https://11.ecmascript.pages.academy/big-trip/`;
const AUTHORIZATION = `Basic sfsdf118sd8f83ju=`;

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(window.localStorage);
const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const mainElement = document.querySelector(`.trip-main`);

const infoController = new InfoController(mainElement, pointsModel);

const eventsComponent = new EventsComponent();
const tripController = new TripController(pointsModel, eventsComponent, offersModel, destinationsModel, apiWithProvider);

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

apiWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  }).
  then(() => apiWithProvider.getOffers()).
  then((offers) => {
    offersModel.setOffers(offers);
  })
  .then(() => apiWithProvider.getPoints())
  .then((points) => {
    pointsModel.setPoints(points);
    loadingPointComponent.hide();
    infoController.render();
    tripController.render();
    filterController.render();
  });

//TODO НЕ УДАЛЯТЬ, !!! ВЕНУТЬ В КОНЦЕ ЧТОБЫ ПОКА НЕ МЕШАЛОСЬ
/*window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
    // Действие, в случае ошибки при регистрации ServiceWorker
  });
});*/

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
