import * as types from './actionTypes';
import resultsApi from '../api/resultsApi';

export function loadSuggestions(locale, currency, market, query, typology) {
  return function(dispatch) {
    return resultsApi.getAutosuggests(locale, currency, market, query).then(suggestions => {
      
      console.log(suggestions);
      dispatch(elaborateSuggestionSuccess(suggestions.Places, typology));

    }).catch(error => {
      throw(error);
    });
  };
}

export function resetSuggestions(typology) {
  if (typology === 'departure')
    return { type: types.DEPARTURE_SUGGESTIONS_LOADED, suggestions: [] };
  return { type: types.ARRIVAL_SUGGESTIONS_LOADED, suggestions: [] };
}

export function elaborateSuggestionSuccess(suggestions, typology) {
  if (typology === 'departure')
    return { type: types.DEPARTURE_SUGGESTIONS_LOADED, suggestions };
  return { type: types.ARRIVAL_SUGGESTIONS_LOADED, suggestions };
}

export function changeRegion(type, region) {
  switch (type) {
    case "departure":
      return {type: types.CHANGE_DEPARTURE, region};
    case "arrival":
      return {type: types.CHANGE_ARRIVAL, region};
    default:
      return {type: null, region: {}};
  }
}

export function changeMaxStops(maxStops) {
  return {type: types.CHANGE_MAXSTOPS, maxStops}; 
}

export function changePeople(type, people) {
  switch (type) {
    case "adults":
      return {type: types.CHANGE_ADULTS, people};
    case "children":
      return {type: types.CHANGE_CHILDREN, people};
    default:
      return {type: null, people: 0};
  }
}

export function changeTripType(oneway) {
  return {type: types.CHANGE_TRIPTYPE, oneway}; 
}

export function changeDateValue(type, date) {
  switch (type) {
    case "depart":
      return {type: types.CHANGE_FROM_DATE, date};
    case "return":
      return {type: types.CHANGE_TO_DATE, date};
    default:
      return {type: null, date: ""};
  }
}