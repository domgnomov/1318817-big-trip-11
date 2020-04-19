import InfoContainer from "../components/infoContainer";
import Menu from "../components/menu";
import Filter from "../components/filter";
import NoItemsComponent from "../components/no-items";
import Sort from "../components/sort";
import DaysContainer from "../components/daysContainer";
import DayItem from "../components/dayItem";
import EditDayItem from "../components/editDayItem";
import {render, RenderPosition} from "../utils/render";
import InfoMain from "../components/infoMain";
import InfoCost from "../components/infoCost";
import Day from "../components/day";

const INITIAL_DAYS_COUNT = 1;

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

export default class TripController {
  constructor(container) {
    this._container = container;

    this._infoContainer = new InfoContainer();
    this._menu = new Menu();
    this._filter = new Filter();
    this._noItemsComponent = new NoItemsComponent();
    this._sort = new Sort();
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
    render(controlsFirstElement, this._menu, RenderPosition.AFTEREND);
    render(controlsSecondElement, this._filter, RenderPosition.AFTEREND);

    const eventsContainerElement = document.querySelector(`.trip-events`);

    if (days.length === 0) {
      render(eventsContainerElement, this._noItemsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(eventsContainerElement, this._sort, RenderPosition.BEFOREEND);

    render(eventsContainerElement, this._daysContainer, RenderPosition.BEFOREEND);

    const daysContainerElement = document.querySelector(`.trip-days`);
    let dayCount = INITIAL_DAYS_COUNT;
    for (const [day, dayItems] of days.entries()) {
      const dayComponent = new Day(day, dayCount++);
      render(daysContainerElement, dayComponent, RenderPosition.BEFOREEND);
      dayItems.forEach((dayItem) => renderDayItem(dayItem, dayComponent));
    }
  }
}
