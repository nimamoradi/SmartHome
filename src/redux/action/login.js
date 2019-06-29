import * as ActionTypes from './ActionTypes';
import { fetch } from 'fetch-awesome';

import { error_missing_field } from '../../Constants';



// export const fetchLogin = (username, password) => (dispatch) => {
//
//   return dispatch(loginApp({}));
//   // fetch(Config.API_URL + 'auth/login', {
//   //   method: 'POST',
//   //   timeout: 10000,
//   //   headers: {
//   //     'Accept': 'application/json',
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({
//   //     'password': password,
//   //     'username': email,
//   //   })
//   // })
//   //   .then((response) => {
//   //       // this.setState({ spinner: false });
//   //       if (response.ok) {
//   //         loginApp();
//   //         AsyncStorage.setItem(Config.isLogin, Config.true_boolean);
//   //         pushSingleScreenApp();
//   //       } else if (response.status === 401) {
//   //         Alert.alert(
//   //           'error',
//   //           'wrong password or username',
//   //           [
//   //             {
//   //               text: 'OK',
//   //               onPress: () => console.log('OK Pressed')
//   //             },
//   //           ],
//   //           { cancelable: true },
//   //         );
//   //       } else {
//   //         loginFailed();
//   //         Alert.alert(
//   //           'error',
//   //           'unknown error',
//   //           [
//   //             {
//   //               text: 'OK',
//   //               onPress: () => console.log('OK Pressed')
//   //             },
//   //           ],
//   //           { cancelable: true },
//   //         );
//   //       }
//   //     }
//   //   )
//   //   .catch((error) => {
//   //     // this.setState({ spinner: false });
//   //     Alert.alert(
//   //       'error',
//   //       'network error',
//   //       [
//   //         {
//   //           text: 'OK',
//   //           onPress: () => console.log('OK Pressed')
//   //         },
//   //       ],
//   //       { cancelable: true },
//   //     );
//   //   })
//   //
//   //   .then(comments => dispatch(loginApp(comments)))
//
// };
const loginHasError = (bool) => {
  return {
    type: ActionTypes.LOGIN_HAS_ERROR,
    hasError: bool
  };
};
export const loginFailed = (errmess) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errmess
});
const loginIsLoading = (bool) => {
  return {
    type: ActionTypes.LOGIN_IS_LOADING,
    isLoading: bool
  };
};
const login = (username, password, missingParam, networkError, successFetch) => {
  return (dispatch) => {
    dispatch(loginIsLoading(true));

    if (!username || !password) {
      dispatch(loginHasError(error_missing_field));
      dispatch(loginIsLoading(false));
      missingParam();
      return;
    }

    let url = 'https://api.myjson.com/bins/19dtxc';
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(loginIsLoading(false));
        if (json.success) {
          dispatch(loginApp(true));
          successFetch(json);
        } else {
          dispatch(receivePostsFail(reddit, json));
          errorCallback();
        }
      });
  };
};


export const loginApp = (user_data) => ({
  type: ActionTypes.LOGIN_APP,
  payload: user_data
});
export default {
  loginHasError,
  loginIsLoading,
  login,
  loginFailed,
  loginApp
};