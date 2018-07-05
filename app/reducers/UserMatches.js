import {
  USER_MATCHES_STARTED,
  USER_MATCHES_FINISHED
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  payload: null,
  error: false,
  meta: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_MATCHES_STARTED:
      return {
        ...state,
        loading: true
      };
    case USER_MATCHES_FINISHED:
      return {
        ...state,
        loading: false,
        payload: action.payload,
        error: action.error,
        meta: action.meta || initialState.meta
      };
    default:
      return state;
  }
};
