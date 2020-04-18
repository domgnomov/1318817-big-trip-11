import {generateDays} from "./mock/day.js";
import TripController from "./controllers/TripController";

const days = generateDays();

const mainElement = document.querySelector(`.trip-main`);
const tripController = new TripController(mainElement);
tripController.render(days);
