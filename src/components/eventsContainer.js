import AbstractComponent from "./abstract-component";

export default class EventsContainer extends AbstractComponent {
  getElement() {
    if (!this._element) {
      this._element = document.querySelector(`.trip-events`);
    }
    return this._element;
  }
}
