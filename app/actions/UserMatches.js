import baseRequest from '../utils/RequestInstance';
import { configureStore } from '../store/configureStore';

import {
  USER_MATCHES_STARTED,
  USER_MATCHES_FINISHED
} from '../constants/ActionTypes';

/**
 * Do not use hasError callback if you are using
 * componentWillReceiveProps in component.
 * @param formValues
 * @param hasError
 * @return {function(*)}
 */
export default (id = null, hasError) => dispatch => {
  const store = configureStore();
  console.log('authentication', store.getState().authentication);
  dispatch({ type: USER_MATCHES_STARTED });

  let endpoint = '/user/matches';

  if (id !== null) {
    endpoint = `${endpoint}/${id}`;
  }

  baseRequest.get(
    {
      url: endpoint,
      headers: {
        'X-Auth-Token': store.getState().payload.token
      }
    },
    (error, httpResponse, body) => {
      console.log([error, httpResponse, body]);
      const bodyObject = JSON.parse(body);

      if (error !== null || httpResponse.statusCode !== 200) {
        if (bodyObject.error) {
          dispatch({
            type: USER_MATCHES_FINISHED,
            payload: bodyObject.error,
            error: true
          });
        } else {
          dispatch({
            type: USER_MATCHES_FINISHED,
            payload: ['Failed to fetch user matches.'],
            error: true
          });
        }

        hasError(true);

        return;
      }

      dispatch({
        type: USER_MATCHES_FINISHED,
        payload: bodyObject,
        error: false,
        meta: {}
      });

      hasError(false);
    }
  );
};
