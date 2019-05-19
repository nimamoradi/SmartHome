// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Alert,
  Image
} from 'react-native';
import { pushSingleScreenApp } from 'src/navigation';
import { fetch } from 'fetch-awesome';
import Config from 'react-native-config';
import { connectData } from 'src/redux';

import LoginForm from './LoginForm';
import { vh, vw } from 'src/services/viewport';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: 'center',
    flexGrow: 2,
    justifyContent: 'center'
  },
  logo: {
    width: 45 * vw,
    height: 32 * vh,
    resizeMode: 'contain'
  }
});

class LoginScreen extends PureComponent {

  login = (email, password) => {
    if (email === '' || password === '') {
      Alert.alert(
        'missing param',
        'password and username are required',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          },
        ],
        { cancelable: true },
      );
      return;
    }
    fetch(Config.API_URL + 'auth/login', {
      method: 'POST',
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'password': password,
        'username': email,
      })
    })
      .then((response) => {
          alert(JSON.stringify(response));
          if (response.ok) {
            pushSingleScreenApp();
          } else if (response.status === 401) {
            Alert.alert(
              'error',
              'wrong password or username',
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
        alert(error);
      });

  };

  render() {
    return (
      <View behavior="padding" style={styles.container}>

        <View style={styles.formContainer}>
          <Image resizeMode="contain" style={styles.logo}
                 source={require('src/assets/images/welcome-logo.jpg')}/>

        </View>
        <View style={styles.formContainer}>
          <LoginForm onButtonPress={this.login}/>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  getFacebookUserData: PropTypes.func.isRequired,
  screenType: PropTypes.oneOf(['Single', 'Tab']).isRequired
};

export default connectData()(LoginScreen);
