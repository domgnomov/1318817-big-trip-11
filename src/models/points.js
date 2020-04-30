import {getDays} from "../utils/common";

export default class Points {
  constructor() {
    this._points = [];
  }

  getAllPoints() {
    return this._points;
  }

  getDays() {
    return getDays(this._points);
  }

  setPoints(points) {
    this._points = Array.from(points);
    //this._callHandlers(this._dataChangeHandlers);
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    //this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    //this._callHandlers(this._dataChangeHandlers);

    return true;
  }

}
