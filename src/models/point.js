import {capitalize, getMillisecondsByInterval} from "../utils/common";

export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = capitalize(data[`type`]);
    this.isFavorite = data[`is_favorite`];
    this.price = data[`base_price`];
    this.offers = data[`offers`];
    this.startDate = new Date(data[`date_from`]);
    this.endDate = new Date(data[`date_to`]);
    this.city = data[`destination`].name;
    this.pictures = data[`destination`].pictures;
    this.description = data[`destination`].description;
    this.getInterval = function () {
      return getMillisecondsByInterval(this.startDate, this.endDate);
    };

    this.getInterval = this.getInterval.bind(this);
  }

  toRAW() {
    const destination = {
      name: this.city,
      pictures: this.pictures,
      description: this.description,
    };
    return {
      "id": this.id,
      "type": this.type.toLowerCase(),
      "is_favorite": this.isFavorite,
      "base_price": this.price,
      "offers": this.offers,
      "date_from": this.startDate.toISOString(),
      "date_to": this.endDate.toISOString(),
      "destination": destination,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }

  static clone(data) {
    return new Point(data.toRAW());
  }
}
