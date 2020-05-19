import {render, RenderPosition, replace} from "../utils/render";
import StatisticsComponent from "../components/statistics";

export default class StatisticsController {
  constructor(container, pointsModel, offersModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._offersModel = offersModel;

    this._statisticsComponent = null;
  }

  hide() {
    this._statisticsComponent.hide();
  }

  show() {
    this._pointsModel.resetFilter();
    this._statisticsComponent.show();
  }

  isHide(){
    return this._statisticsComponent.isHide();
  }

  render() {
    const container = this._container;

    const oldComponent = this._statisticsComponent;

    this._statisticsComponent = new StatisticsComponent(this._pointsModel, this._offersModel);

    if (oldComponent) {
      replace(this._statisticsComponent, oldComponent);
    } else {
      render(container, this._statisticsComponent, RenderPosition.BEFOREEND);
    }
  }
}
