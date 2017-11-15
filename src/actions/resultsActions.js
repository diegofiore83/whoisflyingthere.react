import * as types from './actionTypes';
import resultsApi from '../api/resultsApi';
import * as applicationActions from './applicationActions';

export function loadResults(locale, currency, market, search) {
  return function(dispatch) {
    return resultsApi.getResults(locale, currency, market, search).then(results => {
      
      console.log(results);
      dispatch(elaborateResultSuccess(results));
      dispatch(applicationActions.stopLoading());

    }).catch(error => {
      dispatch(applicationActions.stopLoading());
      throw(error);
    });
  };
}

export function elaborateResultSuccess(results) {
  return {type: types.RESULTS_LOADED, results};
}