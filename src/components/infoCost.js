import AbstractComponent from "./abstract-component";

const getCostValue = (points) => {
  return points.reduce(function (sum, current) {
    return sum + current.price;
  }, 0);
};

const createInfoCostTemplate = (points) => {
  const costValue = getCostValue(points);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${costValue}</span></p>
    </p>`
  );
};

export default class InfoCost extends AbstractComponent {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createInfoCostTemplate(this._points);
  }
}
