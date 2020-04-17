import {createElement} from "../utils";

const getCostValue = (days) => {
  const allDayItems = [].concat(...Array.from(days.values()));
  return allDayItems.reduce(function (sum, current) {
    return sum + current.price;
  }, 0);
};

const createInfoCostTemplate = (days) => {
  const costValue = getCostValue(days);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${costValue}</span></p>
    </p>`
  );
};

export default class InfoCost {
  constructor(days) {
    this._days = days;

    this._element = null;
  }

  getTemplate() {
    return createInfoCostTemplate(this._days);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
