import Point from "../models/point";
import {nanoid} from "nanoid";
import {DESTINATIONS_STORE_NAME, OFFERS_STORE_NAME, POINTS_STORE_NAME} from "./keys";
import Offer from "../models/offer";
import Destination from "../models/destination";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedPoints = (items) => {
  debugger;
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = createStoreStructure(offers.map((offer) => offer.toRAW()));

          this._store.setItems(items, OFFERS_STORE_NAME);

          return offers;
        });
    }

    const storeOffers= Object.values(this._store.getItems(OFFERS_STORE_NAME));

    return Promise.resolve(Offer.parseOffers(storeOffers));
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          const items = createStoreStructure(destinations.map((destination) => destination.toRAW()));

          this._store.setItems(items, DESTINATIONS_STORE_NAME);

          return destinations;
        });
    }

    const storeDestinations = Object.values(this._store.getItems(DESTINATIONS_STORE_NAME));

    return Promise.resolve(Destination.parseDestinations(storeDestinations));
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          debugger;
          const items = createStoreStructure(points.map((point) => point.toRAW()));

          this._store.setItems(items, POINTS_STORE_NAME);

          return points;
        });
    }

    const storePoints = Object.values(this._store.getItems(POINTS_STORE_NAME));

    return Promise.resolve(Point.parsePoints(storePoints));
  }

  createPoint(point) {
    if (isOnline()) {
      return this._api.createPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, newPoint.toRAW());

          return newPoint;
        });
    }

    // На случай локального создания данных мы должны сами создать `id`.
    // Иначе наша модель будет не полной и это может привнести баги.
    const localNewPointId = nanoid();
    const localNewPoint = Point.clone(Object.assign(point, {id: localNewPointId}));

    this._store.setItem(localNewPoint.id, localNewPoint.toRAW());

    return Promise.resolve(localNewPoint);
  }

  updatePoint(id, point) {
    if (isOnline()) {
      return this._api.updatePoint(id, point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, newPoint.toRAW());

          return newPoint;
        });
    }

    const localPoint = Point.clone(Object.assign(point, {id}));

    this._store.setItem(id, localPoint.toRAW());

    return Promise.resolve(localPoint);
  }

  deletePoint(id) {
    if (isOnline()) {
      return this._api.deletePoint(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      debugger;
      const storePoints = Object.values(this._store.getItems(POINTS_STORE_NAME));

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items, POINTS_STORE_NAME);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
