import {POINTS_STORE_NAME} from "./keys";

export default class Store {
  constructor(storage) {
    this._storage = storage;
  }

  getItems(storeKey) {
    try {
      return JSON.parse(this._storage.getItem(storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items, storeKey) {
    this._storage.setItem(
      storeKey,
      JSON.stringify(items)
    );
  }

  setItem(key, value, storeKey = POINTS_STORE_NAME) {
    const store = this.getItems(storeKey);

    this._storage.setItem(
      storeKey,
      JSON.stringify(
        Object.assign({}, store, {
          [key]: value
        })
      )
    );
  }

  removeItem(key, storeKey = POINTS_STORE_NAME) {
    const store = this.getItems(storeKey);

    delete store[key];

    this._storage.setItem(
      storeKey,
      JSON.stringify(store)
    );
  }
}
