import {getDays} from "../utils/common";
import {FilterType} from "../const";
import {getPointsByFilter} from "../utils/filter";

export default class Points {
  constructor() {
    this._points = [];

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterChangeHandlers = [];
  }

  getAllPoints() {
    return this._points;
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilterType);
  }

  setPoints(points) {
    this._points = Array.from(points);
    //TODO
    //this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    //TODO
    //this._callHandlers(this._dataChangeHandlers);
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    //TODO
    //this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

}
