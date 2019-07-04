import * as ActionTypes from './ActionTypes';

export const updateRoomsData = (auth) => ({
  type: ActionTypes.UPDATE_ROOMS,
  payload: auth
});
export default {
  updateRoomsData
};