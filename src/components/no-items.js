import AbstractComponent from "./abstract-component";

const createNoItemsTemplate = () => {
  return (
    `<p class="trip-events__msg">
        Click New Event to create your first point
    </p>`
  );
};

export default class NoItems extends AbstractComponent {
  getTemplate() {
    return createNoItemsTemplate();
  }
}
