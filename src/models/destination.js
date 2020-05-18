import {nanoid} from "nanoid";

export default class Destination {
  constructor(data) {
    this.description = data[`description`];
    this.name = data[`name`];
    this.pictures = data[`pictures`];
  }

  toRAW() {
    return {
      "description": this.description,
      "name": this.name,
      "pictures": this.pictures,
      "id": nanoid(),
    };
  }

  static parseDestination(data) {
    return new Destination(data);
  }

  static parseDestinations(data) {
    return data.map(Destination.parseDestination);
  }
}
