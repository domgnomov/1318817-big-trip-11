import Destination from "../models/destination";
import Offer from "../models/offer";
import Point from "../models/point";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .then(Point.parsePoints);
  }

  createPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  updatePoint(id, data) {
    const check1 = data.toRAW();
    check1.id = id;
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(check1),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  deletePoint(id) {
    return this._load({url: `points/${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }


  getDestinations() {
    return this._load({url: `destinations`})
      .then((response) => response.json())
      .then(Destination.parseDestinations);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((response) => response.json())
      .then(Offer.parseOffers);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
