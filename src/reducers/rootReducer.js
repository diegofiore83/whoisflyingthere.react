import { combineReducers } from 'redux';

import application from './applicationReducer';
import results from './resultsReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  application: application,
  results: results,
  search: search
});

export default rootReducer;