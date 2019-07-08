// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Button, Alert, View, TouchableOpacity, Switch, Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetch } from 'fetch-awesome';
import Config from 'react-native-config';


import { vh, vw } from 'src/services/viewport';
import { connect } from 'react-redux';

import RoomActions from 'src/redux/action/room';
import * as Navigation from 'react-native-navigation';
import MySlider from '../LightSettingPage/slider';
import CircleSlider from '../thermo/CircleSlider';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    alignItems: 'center',

    flexDirection: 'row',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  text: {
    fontSize: 4 * vw,
    margin: 4 * vw,
    borderRadius: 4 * vw,
    borderWidth: 1,
    borderColor: '#8ecdf5',
    backgroundColor: '#b3d9f5',
    padding: 4 * vw,
    flex: 1,

  }
});
let context;

class showRoom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      roomLocation: 2,
      isDeviceOn: this.props.thermal.properties.find(o => o.type === 'toggle').value,
      temperature: this.props.thermal.properties.find(o => o.type === 'degree').value * 5,
    };
    context = this;
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flex}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.props.LightDevices}
          renderItem={({ item }) => <MySlider
            device_id={item.id}
            title={item.name}
            slider_Init={(item.properties.find((element) => {
              return element.type === 'toggle';
            }))}
            color={(item.properties.find((element) => {
              return element.type === 'name';
            }))}
            light={(item.properties.find((element) => {
              return element.type === 'degree';
            }))}

            updateLight={this.updateLight}/>}
          disableVirtualization/>
        <View
          style={{
            width: 100 * vw,
            justifyContent: 'flex-end'
          }}>
          <TouchableOpacity
            onPress={() => context.updateTermal(context.state.select_id)}
            style={{
              position: 'absolute',
              top: vh,
              margin: 4 * vw,
            }}>
            <MaterialIcons name='done'
                           size={12 * vw}
                           color="green"/>
          </TouchableOpacity>
          <Switch
            style={{ margin: 4 * vw, }}
            onValueChange={(val) => {
              this.setState({ isDeviceOn: val });
            }}
            value={this.state.isDeviceOn}
          />
        </View>
        <View style={{
          position: 'absolute',
          top: 80 * vh,
          right: 45 * vw
        }}>
          <Text style={{
            color: 'orange',
            fontSize: 20 * vw
          }}>{Math.round(context.state.temperature / 5) + ' c'}</Text>
        </View>
        <CircleSlider
          onValueChange={(x) =>
            context.setState({ temperature: x })

          }
          value={this.state.temperature}
          min={30}
          max={270}
          textColor='red'
        />
      </ScrollView>
    )
      ;
  }

  updateLight(device_id, degree, toggle, name) {
    context.props.updateDeviceProperty({
      device_id: device_id,
      degree: degree,
      toggle: toggle,
      name: name
    });
    return;
    fetch(Config.API_URL + `device/${device_id}`, {
      method: 'PUT',
      timeout: 1000,
      headers: {
        'Authorization': api_code,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'properties': [{
          'type': 'degree',
          'value': degree,
        },
          {
            'type': 'toggle',
            'value': toggle,
          }, {
            'type': 'name',
            'value': name,
          }]
      })
    })
      .catch((error) => {
        this.setState({ spinner: false });
        Alert.alert(
          'error',
          'network error',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            },
          ],
          { cancelable: true },
        );
      });
  }

  addRoom() {
    this.setState({ spinner: true });
    fetch(Config.API_URL + 'api/room', {
      method: 'POST',
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'location': context.state.roomLocation,
        'name': context.state.roomName
      })
    })
      .then((response) => {
          this.setState({ spinner: false });
          if (response.ok) {
            response.json();
          } else {
            Alert.alert(
              'error',
              'unknown error',
              [
                {
                  text: 'OK',
                  onPress: () => console.log('OK Pressed')
                },
              ],
              { cancelable: true },
            );
          }
        }
      )
      .then((js) => {
          connect.props.addRoom(js.data);
          Navigation.pop(connect.props.componentId);
        }
      )
      .catch((error) => {
        this.setState({ spinner: false });
        Alert.alert(
          'error',
          'network error',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            },
          ],
          { cancelable: true },
        );
      });
  }

  updateTermal(device_id) {
    context.props.updateDeviceProperty({
      device_id: context.props.room_id,
      degree: context.state.temperature / 5,
      toggle: context.state.isDeviceOn,
    });
    return;
    fetch(Config.API_URL + `device/${device_id}`, {
      method: 'PUT',
      timeout: 1000,
      headers: {
        'Authorization': api_code,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'type': 9,
        'room': 2,
        'name': 'cum',
        device_id: device_id,
        'properties': [{
          'type': 'degree',
          'value': context.state.temperature,
        },
          {
            'type': 'toggle',
            'value': context.state.isDeviceOn,
          },]
      })
    })
      .catch((error) => {
        this.setState({ spinner: false });
        Alert.alert(
          'error',
          'network error',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed')
            },
          ],
          { cancelable: true },
        );
      });
  }

}

function mapStateToProps (state,ownProps){

  return {
    LightDevices: state.device.devices.findAll((item) => item.id === 1).properties.filter((item) =>
      item.catogoryName === 'ligthing'
    ),
    thermal: state.device.devices.find((item) => item.id === 1),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRoom: (room) => dispatch(RoomActions.addRoom(room)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(showRoom);