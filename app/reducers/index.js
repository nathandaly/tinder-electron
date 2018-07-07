// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import authentication from './Authentication';
import matches from './UserMatches';

const rootReducer = combineReducers({
  authentication,
  matches,
  router
});

export default rootReducer;
