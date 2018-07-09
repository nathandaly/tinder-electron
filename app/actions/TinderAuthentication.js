import axios from '../utils/axiosInstance';

import {
  AUTHENTICATION_STARTED,
  AUTHENTICATION_FINISHED
} from '../constants/ActionTypes';

/**
 * Do not use hasError callback if you are using
 * componentWillReceiveProps in component.
 * @param formValues
 * @param hasError
 * @return {function(*)}
 */
export default (tokenData, hasError) => dispatch => {
  console.log('tinder action', tokenData);
  dispatch({ type: AUTHENTICATION_STARTED });

  axios
    .post('/auth', tokenData)
    .then(response => {
      localStorage.setItem('auth-token', response.data.token);

      dispatch({
        type: AUTHENTICATION_FINISHED,
        payload: response.data,
        error: false,
        meta: response.meta
      });

      hasError(false);

      return response;
    })
    .catch(error => {
      console.log(error.response);
      if (error.response) {
        dispatch({
          type: AUTHENTICATION_FINISHED,
          payload: error.response.data.errors,
          error: true
        });
      } else {
        dispatch({
          type: AUTHENTICATION_FINISHED,
          payload: ['Failed to authenticate.'],
          error: true
        });
      }

      hasError(true);
    });
};
