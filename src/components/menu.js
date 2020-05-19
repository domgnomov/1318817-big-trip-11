import AbstractComponent from "./abstract-component";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.innerText;

      this._changeActive(evt.target);

      handler(menuItem);
    });
  }

  _changeActive(newActiveElement) {
    const currentActiveElement = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
    currentActiveElement.classList.remove(ACTIVE_CLASS);
    newActiveElement.classList.add(ACTIVE_CLASS);
  }
}
