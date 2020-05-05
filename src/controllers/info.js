import {render, RenderPosition, replace} from "../utils/render";
import InfoComponent from "../components/infoContainer";

export default class InfoController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._infoComponent = null;
    //TODO ?
    this._onDataChange = this._onDataChange.bind(this);
    //TODO ?
    this._pointsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const oldComponent = this._infoComponent;

    this._infoComponent = new InfoComponent(this._pointsModel.getPoints());

    if (oldComponent) {
      replace(this._infoComponent, oldComponent);
    } else {
      render(container, this._infoComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onDataChange() {
    this.render();
  }
}
