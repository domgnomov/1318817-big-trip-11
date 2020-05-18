import AbstractComponent from "./abstract-component";
import {FilterType} from "../const";

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterTemplate = (checkedFilterType) => {
  return (
    `<form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${checkedFilterType === `everything` ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${checkedFilterType === `future` ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${checkedFilterType === `past` ? `checked` : ``}>
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(checkedFilterType) {
    super();

    this._checkedFilterType = checkedFilterType ? checkedFilterType : FilterType.EVERYTHING;
  }

  getTemplate() {
    return createFilterTemplate(this._checkedFilterType);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }

  disable(type) {
    this._toggle(true, type);
  }

  enable(type) {
    this._toggle(false, type);
  }

  _toggle(isDisable, type) {
    const typeElements = this.getElement().getElementsByTagName(`input`);
    for (const element of typeElements) {
      if (element.value === type) {
        element.disabled = isDisable;
      }
    }
  }
}
