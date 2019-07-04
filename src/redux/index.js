import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { login } from './reducer/login';
import { rooms } from './reducer/rooms';


export const store = createStore(
  combineReducers({
    login,
    rooms
  }),
  applyMiddleware(thunk, logger)
);