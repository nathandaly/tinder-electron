import 'whatwg-fetch';

import { USER_MATCHES_STARTED } from '../constants/ActionTypes';

/**
 * Do not use hasError callback if you are using
 * componentWillReceiveProps in component.
 * @param formValues
 * @param hasError
 * @return {function(*)}
 */
export default (id = null, hasError) => dispatch => {
  const token = localStorage.getItem('auth-token');

  if (token === null) {
    hasError(true);
    return;
  }

  dispatch({ type: USER_MATCHES_STARTED });

  let endpoint = '/updates';

  if (id !== null) {
    endpoint = `/user/matches/${id}`;
  }

  fetch(`https://api.gotinder.com${endpoint}`, {
    method: 'POST',
    body: JSON.stringify({
      last_activity_date: ''
    }),
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Tinder/9.2.0 (iPhone; iOS 11.4; Scale/3.00)',
      'X-Auth-Token': token
    },
    credentials: 'same-origin'
  })
    .then(
      response => {
        console.log(response);
        return response;
      },
      error => {
        console.log(error);
      }
    )
    .catch(error => {
      console.log(error);
    });

  // request({
  //     url: 'https://api.gotinder.com/updates',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'User-Agent': 'Tinder/9.2.0 (iPhone; iOS 11.4; Scale/3.00)',
  //       'X-Auth-Token': token
  //     },
  //     body: JSON.stringify({
  //       'last_activity_date': ''
  //     })
  //   },
  //   (error, httpResponse, body) => {
  //     console.log([error, httpResponse, body]);
  //     const bodyObject = JSON.parse(body);
  //
  //     if (error !== null || httpResponse.statusCode !== 200) {
  //       if (bodyObject.error) {
  //         dispatch({
  //           type: USER_MATCHES_FINISHED,
  //           payload: bodyObject.error,
  //           error: true
  //         });
  //       } else {
  //         dispatch({
  //           type: USER_MATCHES_FINISHED,
  //           payload: ['Failed to fetch user matches.'],
  //           error: true
  //         });
  //       }
  //
  //       hasError(true);
  //
  //       return;
  //     }
  //
  //     dispatch({
  //       type: USER_MATCHES_FINISHED,
  //       payload: bodyObject,
  //       error: false,
  //       meta: {}
  //     });
  //
  //     hasError(false);
  //   }
  // );
};
