import {createInfoContainerTemplate} from "./components/infoContainer.js";
import {createInfoMainTemplate} from "./components/infoMain.js";
import {createInfoCostTemplate} from "./components/infoCost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFiltersTemplate} from "./components/filters.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createDaysContainerTemplate} from "./components/daysContainer.js";
import {createDayTemplate} from "./components/day.js";
import {createDayItemTemplate} from "./components/dayItem.js";
import {createEditDayItemTemplate} from "./components/editDayItem.js";
import {generateDayItems} from "./mock/dayItem.js";

const ITEMS_COUNT = 20;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.trip-main`);
render(mainElement, createInfoContainerTemplate(), `afterbegin`);

const infoContainerElement = mainElement.querySelector(`.trip-main__trip-info`);
const infoMainElement = infoContainerElement.querySelector(`.trip-info__main`);
render(infoMainElement, createInfoMainTemplate(), `afterbegin`);

const infoCostElement = infoContainerElement.querySelector(`.trip-info__cost`);
render(infoCostElement, createInfoCostTemplate(), `afterbegin`);

const controlsContainerElement = mainElement.querySelector(`.trip-main__trip-controls`);
const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
const controlsSecondElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(2)`);
render(controlsFirstElement, createMenuTemplate(), `afterend`);
render(controlsSecondElement, createFiltersTemplate(), `afterend`);

const eventsContainerElement = document.querySelector(`.trip-events`);
const eventsContainerFirstElement = eventsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
render(eventsContainerFirstElement, createSortingTemplate(), `afterend`);

const sortingElement = document.querySelector(`.trip-events__trip-sort`);
render(sortingElement, createDaysContainerTemplate(), `afterend`);

const daysContainerElement = document.querySelector(`.trip-days`);
render(daysContainerElement, createDayTemplate(), `afterbegin`);

const dayItemList = daysContainerElement.querySelector(`.trip-events__list`);
render(dayItemList, createEditDayItemTemplate(), `beforeend`);

const dayItems = generateDayItems(ITEMS_COUNT);
dayItems.slice(1, ITEMS_COUNT)
  .forEach((item) => render(dayItemList, createDayItemTemplate(item), `beforeend`));


