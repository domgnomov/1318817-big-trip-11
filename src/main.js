import {createSortingTemplate} from "./components/sorting.js";
import {createDaysContainerTemplate} from "./components/daysContainer.js";
import {createDayTemplate} from "./components/day.js";
import {generateDays} from "./mock/day.js";
import {RenderPosition, renderAnotherWay} from "./utils.js";
import InfoCost from "./components/infoCost";
import InfoMain from "./components/infoMain";
import InfoContainer from "./components/infoContainer";
import Menu from "./components/menu";
import Filters from "./components/filters";

const INITIAL_DAYS_COUNT = 1;
const days = generateDays();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.trip-main`);

const infoContainerComponent = new InfoContainer();
renderAnotherWay(mainElement, infoContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
const infoContainerElement = mainElement.querySelector(`.trip-main__trip-info`);
const infoMainComponent = new InfoMain(days);
renderAnotherWay(infoContainerElement, infoMainComponent.getElement(), RenderPosition.BEFOREEND);
const infoCostComponent = new InfoCost(days);
renderAnotherWay(infoContainerElement, infoCostComponent.getElement(), RenderPosition.BEFOREEND);

const controlsContainerElement = mainElement.querySelector(`.trip-main__trip-controls`);
const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
const menuComponent = new Menu();
renderAnotherWay(controlsFirstElement, menuComponent.getElement(), RenderPosition.AFTEREND);
const controlsSecondElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(2)`);
const filtersComponent = new Filters();
renderAnotherWay(controlsSecondElement, filtersComponent.getElement(), RenderPosition.AFTEREND);

const eventsContainerElement = document.querySelector(`.trip-events`);
render(eventsContainerElement, createSortingTemplate(), `beforeend`);
render(eventsContainerElement, createDaysContainerTemplate(), `beforeend`);

const daysContainerElement = document.querySelector(`.trip-days`);

let dayCount = INITIAL_DAYS_COUNT;
for (const [day, dayItems] of days.entries()) {
  render(daysContainerElement, createDayTemplate(day, dayItems, dayCount++), `beforeend`);
}

