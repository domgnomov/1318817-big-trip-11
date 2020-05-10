

export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDescriptionByName(name) {
    return this._destinations
      .slice()
      .filter((destination) => destination.name === name)
      .map((destination) => destination.description)
  }
}
