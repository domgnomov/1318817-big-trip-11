import AbstractComponent from "./abstract-component";
import {getAllPoints} from "../utils/common";

const getCostValue = (days) => {
  return getAllPoints(days).reduce(function (sum, current) {
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

export default class InfoCost extends AbstractComponent {
  constructor(days) {
    super();

    this._days = days;
  }

  getTemplate() {
    return createInfoCostTemplate(this._days);
  }
}
