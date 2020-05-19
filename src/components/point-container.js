import AbstractComponent from "./abstract-component";

const createPointContainerTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class PointContainer extends AbstractComponent {
  getTemplate() {
    return createPointContainerTemplate();
  }
}
