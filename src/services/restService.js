// @flow

import { API } from '../redux/action/ActionTypes';

export default function apiAction({
                     url = '',
                     method = 'GET',
                     data = null,
                     onSuccess = () => {
                     },
                     onFailure = () => {
                     },
                     label = ''
                   }) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label
    }
  };
}