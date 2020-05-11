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
      .map((offer) => offer.type)
  }

  getOffersByType(type) {
    return this._offers
      .slice()
      .filter((offer) => offer.type.toLowerCase() === type)
      .map((offer) => offer.offers)
      .flat()
  }

  getOffersWithIdByType(type) {
    debugger;
    const offersByType = this.getOffersByType(type.toLowerCase()).slice();
    let id = 0;
    offersByType.forEach((offer) => {
      offer.id = type.toLowerCase().concat(id++);
    });
    return offersByType;
  }

  getPlaceOfferTypes() {
    return this._offers
      .slice()
      .filter((offer) => PlaceTypes.includes(offer.type))
      .map((offer) => offer.type)
  }
}
