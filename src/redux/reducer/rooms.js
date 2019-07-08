import * as ActionTypes from '../action/ActionTypes';

const initialState = {
  rooms: [

  ]
};
export const rooms = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.UPDATE_ROOMS:
      return {
        ...state,
        rooms: payload,
      };
    case ActionTypes.ADD_ROOMS:
      return {
        ...state,
        rooms: [...state.rooms, payload]
      };
    default:
      return state;
  }
};