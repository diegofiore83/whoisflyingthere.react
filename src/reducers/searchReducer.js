import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(state = initialState.search, action) {

  switch (action.type) {
    case types.CHANGE_DEPARTURE:
      return Object.assign({}, state, { departure: action.region, fromPlace: (action.region.hasOwnProperty("PlaceId") ? action.region.PlaceId.replace("-sky","") : "") });
    case types.CHANGE_ARRIVAL:
      return Object.assign({}, state, { arrival: action.region, toPlace: (action.region.hasOwnProperty("PlaceId") ? action.region.PlaceId.replace("-sky","") : "") });
    case types.CHANGE_MAXSTOPS:
      return Object.assign({}, state, { maxStops: action.maxStops });
    case types.CHANGE_ADULTS:
      return Object.assign({}, state, { adults: action.people });
    case types.CHANGE_CHILDREN:
      return Object.assign({}, state, { children: action.people });
    case types.CHANGE_TRIPTYPE:
      return Object.assign({}, state, { oneway: action.oneway });
    case types.CHANGE_FROM_DATE:
      return Object.assign({}, state, { fromDate: action.date });
    case types.CHANGE_TO_DATE:
      return Object.assign({}, state, { toDate: action.date });
    default:
      return state;
  }
}