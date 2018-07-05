// import axiosInstance from '../../../utils/AxiosInstance';
//
// import {
//   SIGN_UP_STARTED,
//   SIGN_UP_FINISHED
// } from '../../../constants/ActionTypes';
//
// /**
//  * Do not use hasError callback if you are using
//  * componentWillReceiveProps in component.
//  * @param formValues
//  * @param hasError
//  * @return {function(*)}
//  */
// export const UserRecords = (formValues, hasError) => {
//   return dispatch => {
//     dispatch({type: SIGN_UP_STARTED});
//
//     axiosInstance.put('/user', formValues)
//       .then((response) => {
//         dispatch({
//           type: SIGN_UP_FINISHED,
//           payload: response.data,
//           error: false,
//           meta: response.meta
//         });
//         hasError(false);
//       })
//       .catch((error) => {
//         if (error.response) {
//           dispatch({type: SIGN_UP_FINISHED,
//             payload: error.response.data.errors,
//             error: true
//           });
//         } else {
//           dispatch({
//             type: SIGN_UP_FINISHED, payload: ['Failed to sign up.'],
//             error: true
//           });
//         }
//
//         hasError(true);
//       });
//   };
// };
