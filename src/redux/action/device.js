import * as ActionTypes from './ActionTypes';

export const updateDeviceProperty = (data) => ({
  type: ActionTypes.UPDATE_DEVICE_PROPERTY,
  payload: data
});

export default {
  updateDeviceProperty
};