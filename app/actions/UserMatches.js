import {
  USER_MATCHES_STARTED,
  USER_MATCHES_FINISHED
} from '../constants/ActionTypes';
import axios from '../utils/axiosInstance';

/**
 * Do not use hasError callback if you are using
 * componentWillReceiveProps in component.
 * @param formValues
 * @param hasError
 * @return {function(*)}
 */
export default (id = null, hasError) => dispatch => {
  axios.defaults.headers.common['X-Auth-Token'] = localStorage.getItem(
    'auth-token'
  );
  dispatch({ type: USER_MATCHES_STARTED });

  let endpoint = '/updates';

  if (id !== null) {
    endpoint = `/user/matches/${id}`;
  }

  axios
    .post(endpoint, {
      last_activity_date: ''
    })
    .then(response => {
      dispatch({
        type: USER_MATCHES_FINISHED,
        payload: response.data,
        error: false,
        meta: response.meta
      });

      hasError(false);

      return response;
    })
    .catch(error => {
      if (error.response) {
        dispatch({
          type: USER_MATCHES_FINISHED,
          payload: error.response.data.errors,
          error: true
        });
      } else {
        dispatch({
          type: USER_MATCHES_FINISHED,
          payload: ['Failed to authenticate.'],
          error: true
        });
      }

      hasError(true);
    });
};
