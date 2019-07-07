// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button, AsyncStorage, Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { fetch } from 'fetch-awesome';
import Config from 'react-native-config';
import Spinner from 'react-native-loading-spinner-overlay';

import { vh, vw } from 'src/services/viewport';
import { connect } from 'react-redux';
import { Strings } from 'src/assets/strings';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import RoomActions from 'src/redux/action/room';
import * as Navigation from 'react-native-navigation';


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

class AddRoomScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      roomName: '',
      roomLocation: null
    };
    context = this;
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.form}>
          <FontAwesome5
            style={{ width: 16 * vw }}
            name="warehouse" size={16 * vw} color="black"/>
          <TextInput
            onChangeText={(text) => {
              this.setState({ roomName: text });
            }}
            placeholder={Strings.rname}
            style={styles.text}>{this.state.roomName}</TextInput>
        </View>
        <View style={styles.form}>
          <Entypo
            style={{ width: 16 * vw }}
            name="location" size={16 * vw} color="black"/>
          <TextInput
            keyboardType='numeric'
            onChangeText={(text) => {
              this.setState({ roomName: text });
            }}
            placeholder={Strings.rlocation}
            style={styles.text}>{this.state.roomLocation}</TextInput>
        </View>


        <Button title={Strings.save} onPress={this.addRoom} color='green'/>
      </View>
    )
      ;
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
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.login.isLogged,
    hasError: state.login.hasError,
    isLoading: state.login.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRoom: (room) => dispatch(RoomActions.addRoom(room))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddRoomScreen);