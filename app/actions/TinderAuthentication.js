import baseRequest from '../utils/RequestInstance';

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

  baseRequest.post(
    {
      url: '/auth',
      body: JSON.stringify(tokenData)
    },
    (error, httpResponse, body) => {
      const bodyObject = JSON.parse(body);

      if (error !== null || httpResponse.statusCode !== 200) {
        if (bodyObject.error) {
          dispatch({
            type: AUTHENTICATION_FINISHED,
            payload: bodyObject.error,
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

        return;
      }

      localStorage.setItem('auth-token', bodyObject.token);

      dispatch({
        type: AUTHENTICATION_FINISHED,
        payload: bodyObject,
        error: false,
        meta: {}
      });

      hasError(false);
    }
  );
};
