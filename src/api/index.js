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
    const t = `[{"id":"19","type":"taxi","date_from":"2020-05-21T14:15:51.256Z","date_to":"2020-05-22T09:20:19.264Z","destination":{"name":"Berlin","pictures":[{"src":"http://picsum.photos/300/200?r=0.040286200544709105","description":"Berlin biggest supermarket"},{"src":"http://picsum.photos/300/200?r=0.03353477357102408","description":"Berlin park"},{"src":"http://picsum.photos/300/200?r=0.2236749251879535","description":"Berlin parliament building"},{"src":"http://picsum.photos/300/200?r=0.9448811687918204","description":"Berlin street market"},{"src":"http://picsum.photos/300/200?r=0.7144463135807073","description":"Berlin zoo"},{"src":"http://picsum.photos/300/200?r=0.6137874088920714","description":"Berlin park"}],"description":"Berlin, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family."},"base_price":700,"is_favorite":true,"offers":[{"title":"Upgrade to a business class","price":190},{"title":"Choose the radio station","price":30},{"title":"Choose temperature","price":170},{"title":"Drive quickly, I'm in a hurry","price":100}]}]`;
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
