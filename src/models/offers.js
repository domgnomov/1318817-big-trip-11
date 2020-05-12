import {PlaceTypes} from "../const";

export default class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getTransportOfferTypes() {
    return this._offers
      .slice()
      .filter((offer) => !PlaceTypes.includes(offer.type))
      .map((offer) => offer.type);
  }

  getOffersByType(type) {
    return this._offers
      .slice()
      .filter((offer) => offer.type === type)
      .map((offer) => offer.offers)
      .flat();
  }

  getOffersWithIdByType(type) {
    const offersByType = this.getOffersByType(type).slice();
    let id = 0;
    offersByType.forEach((offer) => {
      offer.id = type.concat(id++);
    });
    return offersByType;
  }
}
