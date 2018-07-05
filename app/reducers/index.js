// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import authentication from './Authentication';

const rootReducer = combineReducers({
  authentication,
  router
});

export default rootReducer;
