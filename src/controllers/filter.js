import FilterComponent from "../components/filter";
import {render, RenderPosition, replace} from "../utils/render";
import {FilterType} from "../const";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._activeFilterType = FilterType.EVERYTHING;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(this._activeFilterType);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._pointsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
