import * as ActionTypes from '../action/ActionTypes';

const initialState = {
  UserAuthData: {
    auth_token: 'hello',
    username: 'nina',
    name: 'simone'
  }
};
export const login = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.UPDATE_AUTH:
      return Object.assign({}, state, {
        UserAuthData: action.payload,
      });
    case ActionTypes.IS_LOGGED:
      return Object.assign({}, state, {
        isLogged: action.isLogged,
      });
    case ActionTypes.LOGIN_HAS_ERROR:
      // return action.loginHasError;
      // console.log('haserror', action);

      return Object.assign({}, state, {
        hasError: action.hasError,
      });
    case ActionTypes.LOGIN_IS_LOADING:
      // return action.loginIsLoading;
      // console.log('isloading', action);

      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case ActionTypes.loginApp:
      return Object.assign({}, state, {
        isLogged: false,
        name: payload.name,
        username: payload.username,
        password: payload.password
      });

    default:
      return state;
  }
};