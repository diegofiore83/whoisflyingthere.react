import * as types from './actionTypes';
import geoApi from '../api/geoApi';

export function loadCurrencies() {
  return function(dispatch) {
    return geoApi.getCurrencies().then(currencies => {
      dispatch(currenciesLoadedSuccess(dispatch, currencies));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadLocales() {
  return function(dispatch) {
    return geoApi.getLocales().then(locales => {
      dispatch(localesLoadedSuccess(dispatch, locales));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadMarkets(locale) {
  return function(dispatch) {
    return geoApi.getMarkets(locale).then(markets => {
      dispatch(marketsLoadedSuccess(dispatch, markets));
    }).catch(error => {
      throw(error);
    });
  };
}

export function currenciesLoadedSuccess(dispatch, currencies) {
  console.log("currencies", currencies);
  return {type: types.CURRENCIES_LOADED, currencies};
}

export function localesLoadedSuccess(dispatch, locales) {
  console.log("locales", locales);
  return {type: types.LOCALES_LOADED, locales};
}

export function marketsLoadedSuccess(dispatch, markets) {
  console.log("markets", markets);
  return {type: types.MARKETS_LOADED, markets};
}