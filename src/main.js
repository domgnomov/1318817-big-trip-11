import {generatePoints} from "./mock/point.js";
import TripController from "./controllers/trip";
import PointsModel from "./models/points.js";
import FilterController from "./controllers/filter";

const allPoints = generatePoints();
const pointsModel = new PointsModel();
pointsModel.setPoints(allPoints);

const mainElement = document.querySelector(`.trip-main`);
const tripController = new TripController(mainElement, pointsModel);
tripController.render();

const filterContainer = mainElement.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(filterContainer, pointsModel);
filterController.render();
