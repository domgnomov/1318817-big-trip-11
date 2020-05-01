import {generateDays} from "./mock/day.js";
import TripController from "./controllers/trip";
import PointsModel from "./models/points.js";
import {getAllPoints} from "./utils/common";
import FilterController from "./controllers/filter";

const days = generateDays();
const allPoints = getAllPoints(days);

const pointsModel = new PointsModel();
pointsModel.setPoints(allPoints);

const mainElement = document.querySelector(`.trip-main`);
const tripController = new TripController(mainElement, pointsModel);
tripController.render();

const filterContainer = mainElement.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(filterContainer, pointsModel);
filterController.render();
