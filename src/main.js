import {generateDays} from "./mock/day.js";
import {RenderPosition, render} from "./utils.js";
import InfoCost from "./components/infoCost";
import InfoMain from "./components/infoMain";
import InfoContainer from "./components/infoContainer";
import Menu from "./components/menu";
import Filters from "./components/filters";
import Sorting from "./components/sorting";
import DaysContainer from "./components/daysContainer";
import Day from "./components/day";
import DayItem from "./components/dayItem";
import EditDayItem from "./components/editDayItem";
import NoItemsComponent from "./components/no-items.js";

const INITIAL_DAYS_COUNT = 1;
const days = generateDays();

const renderDayItem = (dayItem, dayComponent) => {
  const dayItemListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

  const replaceItemToEdit = () => {
    dayItemListElement.replaceChild(editDayItemComponent.getElement(), dayItemComponent.getElement());
  };

  const replaceEditToItem = () => {
    dayItemListElement.replaceChild(dayItemComponent.getElement(), editDayItemComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const dayItemComponent = new DayItem(dayItem);
  const editButton = dayItemComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceItemToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editDayItemComponent = new EditDayItem(dayItem);
  const editForm = editDayItemComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(dayItemListElement, dayItemComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderPage = () => {
  const mainElement = document.querySelector(`.trip-main`);

  const infoContainerComponent = new InfoContainer();
  render(mainElement, infoContainerComponent.getElement(), RenderPosition.AFTERBEGIN);
  const infoContainerElement = mainElement.querySelector(`.trip-main__trip-info`);
  const infoMainComponent = new InfoMain(days);
  render(infoContainerElement, infoMainComponent.getElement(), RenderPosition.BEFOREEND);
  const infoCostComponent = new InfoCost(days);
  render(infoContainerElement, infoCostComponent.getElement(), RenderPosition.BEFOREEND);

  const controlsContainerElement = mainElement.querySelector(`.trip-main__trip-controls`);

  const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
  const controlsSecondElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(2)`);
  const menuComponent = new Menu();
  render(controlsFirstElement, menuComponent.getElement(), RenderPosition.AFTEREND);
  const filtersComponent = new Filters();
  render(controlsSecondElement, filtersComponent.getElement(), RenderPosition.AFTEREND);

  const eventsContainerElement = document.querySelector(`.trip-events`);

  if (days.length === 0) {
    render(eventsContainerElement, new NoItemsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const sortingComponent = new Sorting();
  render(eventsContainerElement, sortingComponent.getElement(), RenderPosition.BEFOREEND);

  const daysContainerComponent = new DaysContainer();
  render(eventsContainerElement, daysContainerComponent.getElement(), RenderPosition.BEFOREEND);

  const daysContainerElement = document.querySelector(`.trip-days`);
  let dayCount = INITIAL_DAYS_COUNT;
  for (const [day, dayItems] of days.entries()) {
    const dayComponent = new Day(day, dayCount++);
    render(daysContainerElement, dayComponent.getElement(), RenderPosition.BEFOREEND);
    dayItems.forEach((dayItem) => renderDayItem(dayItem, dayComponent));
  }
};

renderPage();

