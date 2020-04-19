import InfoContainer from "../components/infoContainer";
import MenuComponent from "../components/menu";
import FilterComponent from "../components/filter";
import NoItemsComponent from "../components/no-items";
import SortComponent, {SortType} from "../components/sort";
import DaysContainer from "../components/daysContainer";
import DayItem from "../components/dayItem";
import EditDayItem from "../components/editDayItem";
import {render, RenderPosition} from "../utils/render";
import InfoMain from "../components/infoMain";
import InfoCost from "../components/infoCost";
import Day from "../components/day";

export const INITIAL_DAYS_COUNT = 1;

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
  dayItemComponent.setEditButtonClickHandler(() => {
    replaceItemToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editDayItemComponent = new EditDayItem(dayItem);
  editDayItemComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(dayItemListElement, dayItemComponent, RenderPosition.BEFOREEND);
};

const renderDayItems = (days, daysContainerElement) => {
  daysContainerElement.innerHTML = ``;
  let dayCount = INITIAL_DAYS_COUNT;
  for (const [day, dayItems] of days.entries()) {
    const dayComponent = new Day(day, dayCount++);
    render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
    dayItems.forEach((dayItem) => renderDayItem(dayItem, dayComponent));
  }
};

const getSortedItems = (items, sortType) => {
  let sortedItems = [];
  const showingItems = items.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedItems = showingItems.sort((a, b) => a.startDate - b.startDate);
      break;
    case SortType.PRICE:
      sortedItems = showingItems.sort((a, b) => b.price - a.price);
      break;
    case SortType.DEFAULT:
      sortedItems = showingItems;
      break;
  }

  return sortedItems.slice();
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._infoContainer = new InfoContainer();
    this._menuComponent = new MenuComponent();
    this._filterComponent = new FilterComponent();
    this._noItemsComponent = new NoItemsComponent();
    this._sortComponent = new SortComponent();
    this._daysContainer = new DaysContainer();

  }

  render(days) {
    render(this._container, this._infoContainer, RenderPosition.AFTERBEGIN);
    const infoContainerElement = this._container.querySelector(`.trip-main__trip-info`);
    const infoMainComponent = new InfoMain(days);
    render(infoContainerElement, infoMainComponent, RenderPosition.BEFOREEND);
    const infoCostComponent = new InfoCost(days);
    render(infoContainerElement, infoCostComponent, RenderPosition.BEFOREEND);

    const controlsContainerElement = this._container.querySelector(`.trip-main__trip-controls`);

    const controlsFirstElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(1)`);
    const controlsSecondElement = controlsContainerElement.querySelector(`.visually-hidden:nth-child(2)`);
    render(controlsFirstElement, this._menuComponent, RenderPosition.AFTEREND);
    render(controlsSecondElement, this._filterComponent, RenderPosition.AFTEREND);

    const eventsContainerElement = document.querySelector(`.trip-events`);

    if (days.length === 0) {
      render(eventsContainerElement, this._noItemsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(eventsContainerElement, this._sortComponent, RenderPosition.BEFOREEND);

    render(eventsContainerElement, this._daysContainer, RenderPosition.BEFOREEND);

    const daysContainerElement = document.querySelector(`.trip-days`);

    renderDayItems(days, daysContainerElement);


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      if (sortType === SortType.DEFAULT) {
        renderDayItems(days, daysContainerElement);
        return;
      }

      const dayItems = [].concat(...Array.from(days.values()));

      const sortedItems = getSortedItems(dayItems, sortType);

      daysContainerElement.innerHTML = ``;

      const dayComponent = new Day();
      render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
      sortedItems.forEach((dayItem) => renderDayItem(dayItem, dayComponent));
    });
  }
}
