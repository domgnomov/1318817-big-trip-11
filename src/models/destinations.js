

export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDescriptionByName(name) {
    if (name) {
      const destinations = this._destinations
        .slice()
        .filter((destination) => destination.name === name);
      return destinations[0].description;
    } else {
      return ``;
    }
  }
}
