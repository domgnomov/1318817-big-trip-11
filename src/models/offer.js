import {capitalize} from "../utils/common";

export default class Offer {
  constructor(data) {
    this.type = capitalize(data[`type`]);
    this.offers = data[`offers`];
  }

  static parseOffer(data) {
    return new Offer(data);
  }

  static parseOffers(data) {
    return data.map(Offer.parseOffer);
  }
}
