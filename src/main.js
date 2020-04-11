import {createInfoContainerTemplate} from "./components/infoContainer.js";
import {createInfoMainTemplate} from "./components/infoMain.js";
import {createInfoCostTemplate} from "./components/infoCost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createDaysContainerTemplate} from "./components/daysContainer.js";
import {createDayTemplate} from "./components/day.js";
import {generateDays} from "./mock/dayItem.js";

const INITIAL_DAYS_COUNT = 1;
const days = generateDays();

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.trip-main`);
render(mainElement, createInfoContainerTemplate(), `afterbegin`);

const infoContainerElement = mainElement.querySelector(`.trip-main__trip-info`);
const infoMainElement = infoContainerElement.querySelector(`.trip-info__main`);
render(infoMainElement, createInfoMainTemplate(days), `afterbegin`);


const infoCostElement = infoContainerElement.querySelector(`.trip-info__cost`);
render(infoCostElement, createInfoCostTemplate(days), `afterbegin`);

const controlsContainerElement = mainElement.querySelector(`.trip-main__trip-controls`);
const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
const controlsSecondElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(2)`);
render(controlsFirstElement, createMenuTemplate(), `afterend`);
render(controlsSecondElement, createFiltersTemplate(), `afterend`);

const eventsContainerElement = document.querySelector(`.trip-events`);
render(eventsContainerElement, createSortingTemplate(), `beforeend`);
render(eventsContainerElement, createDaysContainerTemplate(), `beforeend`);

const daysContainerElement = document.querySelector(`.trip-days`);

let dayCount = INITIAL_DAYS_COUNT;
for (const [day, dayItems] of days.entries()) {
  render(daysContainerElement, createDayTemplate(day, dayItems, dayCount++), `beforeend`);
}




