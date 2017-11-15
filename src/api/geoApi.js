import fetch from 'isomorphic-fetch';

class GeoApi {
  static getCurrencies() {
    return fetch('http://localhost:80/api/reference/currencies')
      .then(response => response.json())
      .catch(error => {
      return error;
    });
  }
  static getLocales() {
    return fetch('http://localhost:80/api/reference/locales')
      .then(response => response.json())
      .catch(error => {
      return error;
    });
  }
  static getMarkets(locale) {
    return fetch('http://localhost:80/api/reference/markets?locale=' + locale)
      .then(response => response.json())
      .catch(error => {
      return error;
    });
  }
}

export default GeoApi;