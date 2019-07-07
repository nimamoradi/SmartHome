// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Picker,
  Switch, AsyncStorage, Alert,
} from 'react-native';

import CircleSlider from './CircleSlider';
import { vw, vh } from 'src/services/viewport';
import { Strings } from 'src/assets/strings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeviceActions from 'src/redux/action/device';
import { connect } from 'react-redux';
import { fetch } from 'fetch-awesome';
import Config from 'react-native-config';


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  value: {
    fontWeight: '500',
    fontSize: 32,
    color: '#3FE3EB'
  },
  textStyle: {
    color: '#03a9f4',
    fontSize: 4 * vw,
    margin: 2 * vw
  }
});
let context;

class thermoPage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.devices[0].properties.find(o => o.type === 'degree').value * 5,
      inside: 23,
      select_id: 0,
      isDeviceOn: true
    };
    context = this;
  }

  updateTermal(device_id) {
    fetch(Config.API_URL + 'device/', {
      method: 'PUT',
      timeout: 1000,
      headers: {
        'Authorization': '{$api_code}',
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

  render() {
    return (
      <View
        style={styles.flex}>
        <View
          style={{
            width: 100 * vw,
            justifyContent: 'flex-end'
          }}>
          <Switch
            style={{ margin: 4 * vw, }}
            onValueChange={(val) => {
              this.setState({ isDeviceOn: val })
                .then(() => context.updateTermal(context.props.devices[itemIndex].id));
            }}
            value={this.state.isDeviceOn}
          />
        </View>
        <View style={{
          position: 'absolute',
          top: 18 * vh,
        }}>
          <Text style={{
            color: 'orange',
            fontSize: 20 * vw
          }}>{Math.round(context.state.temperature / 5) + ' c'}</Text>
        </View>
        <CircleSlider
          onValueChange={(x) =>
            this.setState({ temperature: x })
              .then(() => context.updateTermal(context.props.devices[itemIndex].id))
          }
          value={this.state.temperature}
          min={30}
          max={270}
          textColor='red'
        />
        <Picker
          selectedValue={this.state.select_id}
          style={{
            height: 16 * vw,
            width: 80 * vw
          }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({
              temperature: this.props.devices[itemIndex].properties.find(o => o.type === 'degree').value * 5,
              select_id: itemValue,
              isDeviceOn: this.props.devices[itemIndex].properties.find(o => o.type === 'toggle').value,
            });

          }
          }>
          {context.props.devices.map((item) =>
            <Picker.Item label={item.name} value={item.id}/>
          )}

        </Picker>
        <View
          style={{
            marginTop: 8 * vh,
            flexDirection: 'row-reverse',
            margin: vw
          }}
        >
          <Image source={require('src/assets/images/sun.jpg')}/>
          <View
            style={{
              flex: 1,
              margin: 4 * vw,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}
          >
            <View style={{ margin: vw }}>
              <Text
                style={styles.textStyle}>{Strings.thermo_Inside + '   ' + context.state.inside + ' C'}</Text>

              <Text
                style={styles.textStyle}>{Strings.thermo_Outside + '    ' + context.props.outside + ' C'}</Text>
            </View>
            <FontAwesome name={'thermometer-' + Math.round(this.props.outside / 15) % 5}
                         size={16 * vw}
                         color="black"/>
          </View>
        </View>
      </View>
    );
  }

}

thermoPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
  outside: PropTypes.number.isRequired
};
const mapStateToProps = (state) => {
  return {
    devices: state.device.devices.filter((item) =>
      item.catogoryName === 'cooling'
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDeviceProperty: (data) => dispatch(DeviceActions.updateDeviceProperty(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(thermoPage);

