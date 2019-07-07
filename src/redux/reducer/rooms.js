import * as ActionTypes from '../action/ActionTypes';

const initialState = {
  rooms: [
    {
      'id': 2,
      'name': 'kitchen',
      'location': 8,
      'created_at': '2019-06-30 23:18:56',
      'updated_at': '2019-06-30 23:18:56'
    },
    {
      'id': 3,
      'name': 'bath',
      'location': 1,
      'created_at': '2019-06-30 23:18:56',
      'updated_at': '2019-06-30 23:18:56'
    },
    {
      'id': 4,
      'name': 'dining',
      'location': 5,
      'created_at': '2019-06-30 23:18:56',
      'updated_at': '2019-06-30 23:18:56'
    },
    {
      'id': 5,
      'name': 'jon bedroom',
      'location': 4,
      'created_at': '2019-06-30 23:18:56',
      'updated_at': '2019-06-30 23:18:56'
    },
    {
      'id': 6,
      'name': 'ketty bedroom',
      'location': 3,
      'created_at': '2019-06-30 23:18:56',
      'updated_at': '2019-06-30 23:18:56'
    },
    {
      'id': 7,
      'name': 'pool',
      'location': 7,
      'created_at': '2019-06-30 23:18:56',
      'updated_at': '2019-06-30 23:18:56'
    }
  ]
};
export const rooms = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.UPDATE_ROOMS:
      return Object.assign({}, state, {
        roomsData: payload,
      });
    case ActionTypes.ADD_ROOMS:
      return {
        ...state,
        roomsData: [...state.roomsData, payload]
      };
    default:
      return state;
  }
};