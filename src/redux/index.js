import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { login } from './reducer/login';


export const store = createStore(
  combineReducers({
    login,
  }),
  applyMiddleware(thunk, logger)
);