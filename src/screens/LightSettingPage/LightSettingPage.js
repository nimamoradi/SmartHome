// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  Image,
  FlatList, AsyncStorage, Alert
} from 'react-native';

import MySlider from './slider';
import DeviceActions from 'src/redux/action/device';
import { connect } from 'react-redux';

import Config from 'react-native-config';
import { pushSingleScreenApp } from '../../navigation';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});
let context;

class LightSettingPage extends PureComponent {

  constructor(props) {
    super(props);
    this.loadFunction();
    context = this;
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

  loadFunction() {
    return;
    this.setState({ spinner: true });
    fetch(Config.API_URL + 'device', {
      method: 'GET',
      timeout: 1000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

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

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flex}>
        <Image
          style={{ alignSelf: 'center' }}
          source={require('assets/images/lamp.png')}
        />
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.props.devices}
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


      </ScrollView>
    );
  }

}

LightSettingPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};
const mapStateToProps = (state) => {
  return {
    devices: state.device.devices.filter((item) =>
      item.catogoryName === 'ligthing'
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDeviceProperty: (data) => dispatch(DeviceActions.updateDeviceProperty(data)),
    loadDeviceProperty: (data) => dispatch(DeviceActions.loadDeviceProperty(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LightSettingPage);
