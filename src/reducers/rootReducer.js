import { combineReducers } from 'redux';

import application from './applicationReducer';
import results from './resultsReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  application,
  results,
  search
});

export default rootReducer;