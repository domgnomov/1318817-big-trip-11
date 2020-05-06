import AbstractComponent from "./abstract-component";

const createDaysContainerTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class Days extends AbstractComponent {
  getTemplate() {
    return createDaysContainerTemplate();
  }

  getFirstDayElement() {
    return this.getElement().querySelector(`ul > li`);
  }
}
