import * as types from './actionTypes';
import locationApi from '../api/locationApi';

export function setGeoLocation() {
  return function(dispatch) {
    return locationApi.getGeoLocation().then(location => {
      dispatch(setGeoLocationSuccess(location));

      const locale = navigator.language.length === 2 ? navigator.language + '-' + navigator.language.toUpperCase() : navigator.language;
      dispatch(setLocale(locale));

      const market = navigator.language.toUpperCase();
      dispatch(setMarket(market));

    }).catch(error => {
      throw(error);
    });
  };
}

export function setCurrency(currency) {
  return {type: types.SET_CURRENCY, currency};
}

export function setLocale(locale) {
  return {type: types.SET_LOCALE, locale};
}

export function setMarket(market) {
  return {type: types.SET_MARKET, market};
}

export function setGeoLocationSuccess(location) {
  location.language = navigator.language;
  return {type: types.SET_LOCATION_SUCCESS, location};
}

export function startLoading() {
  return {type: types.IS_LOADING, loading: true};
}

export function stopLoading() {
  return {type: types.IS_LOADING, loading: false};
}

export function changeDevice(width) {
  if (width <= 769) {
    return {type: types.CHANGE_DEVICE, device: "mobile"};
  }
  
  if (width <= 1024) {
    return {type: types.CHANGE_DEVICE, device: "tablet"};
  }
    
  return {type: types.CHANGE_DEVICE, device: "desktop"};
}