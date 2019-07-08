import * as ActionTypes from '../action/ActionTypes';

const initialState = {

  'devices': [
    {
      'id': 1,
      'name': 'room1',
      'catogoryName': 'ligthing',
      'room_id': 5,
      'properties': [
        {
          'type': 'degree',
          'value': 2,
          'updated_at': '2019-07-07 05:04:21'
        },
        {
          'type': 'toggle',
          'value': true,
          'updated_at': '2019-07-07 05:04:21'
        },
      ]
    },
    {
      'id': 2,
      'name': 'room2',
      'catogoryName': 'ligthing',
      'room_id': 5,
      'properties': [
        {
          'type': 'toggle',
          'value': true,
          'updated_at': '2019-07-07 05:04:21'
        },
        {
          'type': 'degree',
          'value': 2,
          'updated_at': '2019-07-07 05:04:21'
        },
      ]
    },
    {
      'id': 3,
      'name': 'room3',
      'catogoryName': 'ligthing',
      'room_id': 5,
      'properties': [
        {
          'type': 'degree',
          'value': 5,
          'updated_at': '2019-07-07 05:04:21'
        },
        {
          'type': 'toggle',
          'value': true,
          'updated_at': '2019-07-07 05:04:21'
        },
        {
          'type': 'name',
          'value': '#ff00ab',
          'updated_at': '2019-07-07 05:04:21'
        },
      ]
    },
    {
      'id': 4,
      'name': 'temperature child room',
      'catogoryName': 'cooling',
      'room_id': 5,
      'properties': [
        {
          'type': 'degree',
          'value': 12,
          'updated_at': '2019-07-07 05:04:21'
        },
        {
          'type': 'toggle',
          'value': true,
          'updated_at': '2019-07-07 05:04:21'
        },
      ]
    },
    {
      'id': 5,
      'name': 'temperature main room',
      'catogoryName': 'cooling',
      'room_id': 5,
      'properties': [
        {
          'type': 'degree',
          'value': 20,
          'updated_at': '2019-07-07 05:04:21'
        },
        {
          'type': 'toggle',
          'value': false,
          'updated_at': '2019-07-07 05:04:21'
        },
      ]
    },
  ],
  'categories': [
    {
      'id': 1,
      'title': 'lighting',
      'description': null,
      'created_at': '2019-07-06 18:50:49',
      'updated_at': '2019-07-06 18:50:49'
    },
    {
      'id': 3,
      'title': 'security',
      'description': null,
      'created_at': '2019-07-06 18:50:49',
      'updated_at': '2019-07-06 18:50:49'
    },
    {
      'id': 4,
      'title': 'cooling',
      'description': null,
      'created_at': '2019-07-06 18:50:49',
      'updated_at': '2019-07-06 18:50:49'
    }
  ]

};
export const devices = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOAD_DEVICES:
      return Object.assign({}, state, {
        devices: payload.map((item) => {
          item.room_id = item.room.id;
          return item;
        }),

      });

    case ActionTypes.UPDATE_DEVICE_PROPERTY:
      return {
        ...state,
        devices: state.devices.map(
          (content) => content.id === payload.device_id ? {
              ...content,
              properties: content.properties.map((item) => {
                switch (item.type) {
                  case 'degree':
                    return {
                      ...item,
                      value: payload.degree
                    };
                  case 'toggle':
                    return {
                      ...item,
                      value: payload.degree
                    };
                  case 'name':
                    return {
                      ...item,
                      value: payload.name.value
                    };
                  default:
                    return item;
                }


              })
            }
            : content
        )
      };

    default:
      return state;
  }
};