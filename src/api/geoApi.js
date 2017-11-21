import fetch from 'isomorphic-fetch';
import { API_ROOT } from './api-config';

class GeoApi {
  static getCurrencies() {
    return fetch(`${API_ROOT}/api/reference/currencies`)
      .then(response => response.json())
      .catch(error => {
      return error;
    });
  }
  static getLocales() {
    return fetch(`${API_ROOT}/api/reference/locales`)
      .then(response => response.json())
      .catch(error => {
      return error;
    });
  }
  static getMarkets(locale) {
    return fetch(`${API_ROOT}/api/reference/markets?locale=${locale}`)
      .then(response => response.json())
      .catch(error => {
      return error;
    });
  }
}

export default GeoApi;