import * as ActionTypes from './ActionTypes';

export const updateRoomsData = (auth) => ({
  type: ActionTypes.UPDATE_ROOMS,
  payload: auth
});
export const addRoom = (room) => ({
  type: ActionTypes.ADD_ROOMS,
  payload: room
});
export default {
  updateRoomsData,
  addRoom
};