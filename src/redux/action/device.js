import * as ActionTypes from './ActionTypes';

export const updateDeviceProperty = (data) => ({
  type: ActionTypes.UPDATE_DEVICE_PROPERTY,
  payload: data
});
export const loadDeviceProperty = (data) => ({
  type: ActionTypes.LOAD_DEVICES,
  payload: data
});
export default {
  updateDeviceProperty,
  loadDeviceProperty
};