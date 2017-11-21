import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function applicationReducer(state = initialState.application, action) {
  switch (action.type) {
    case types.CHANGE_DEVICE:
      return Object.assign({}, state, { device: action.device });
    case types.IS_LOADING:
      return Object.assign({}, state, { loading: action.loading });
    case types.CURRENCIES_LOADED:
      return Object.assign({}, state, { currencies: action.currencies });
    case types.SET_CURRENCY:
      return Object.assign({}, state, { currency: action.currency });
    case types.LOCALES_LOADED:
      return Object.assign({}, state, { locales: action.locales });
    case types.SET_LOCALE:
      return Object.assign({}, state, { locale: action.locale });
    case types.MARKETS_LOADED:
      return Object.assign({}, state, { markets: action.markets });
    case types.SET_MARKET:
      return Object.assign({}, state, { market: action.market });
    case types.SET_LOCATION_SUCCESS:
      return Object.assign({}, state, { location: action.location });
    case types.DEPARTURE_SUGGESTIONS_LOADED:
      return Object.assign({}, state, { departureSuggestions: action.suggestions });
    case types.ARRIVAL_SUGGESTIONS_LOADED:
      return Object.assign({}, state, { arrivalSuggestions: action.suggestions });
    default:
      return state;
  }
}