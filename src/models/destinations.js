

export default class Destinations {
  constructor() {
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }

  getDestinations() {
    return this._destinations;
  }

  getDestinationNames() {
    return this._destinations
      .slice()
      .map((d) => d.name);
  }

  getDestinationByName(name) {
    if (name) {
      const destinations = this._destinations
        .slice()
        .filter((destination) => destination.name === name);
      return destinations[0];
    }
    return null;
  }

  getDescriptionByName(name) {
    if (name) {
      const destinations = this._destinations
        .slice()
        .filter((destination) => destination.name === name);
      return destinations && destinations.length > 0 ? destinations[0].description : ``;
    }

    return ``;
  }

  getPicturesByName(name) {
    if (name) {
      const destinations = this._destinations
        .slice()
        .filter((destination) => destination.name === name);
      return destinations && destinations.length > 0 ? destinations[0].pictures : [];
    }

    return [];
  }
}
