import {ActionCreator} from 'redux'
import {ThunkMiddleware} from 'redux-thunk'
import {logger} from 'redux-logger'


export function LoginAction(){
  return{
    type: "Login"
  };
}
