// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Alert,
  Image, AsyncStorage
} from 'react-native';
import { pushSingleScreenApp } from 'src/navigation';
import { fetch } from 'fetch-awesome';
import Config from 'react-native-config';

import Spinner from 'react-native-loading-spinner-overlay';

import LoginForm from './LoginForm';
import { vh, vw } from 'src/services/viewport';
import LoginActions from 'src/redux/action/login';
import { connect } from 'react-redux';

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
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { spinner: false };
  }

  login = (email, password) => {
    this.props.doLogin({
      auth_token: 'hello',
      username: 'nina',
      name: 'simone'
    });
    pushSingleScreenApp();
    return;
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
    this.setState({ spinner: true });
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
          this.setState({ spinner: false });
          if (response.ok) {
            AsyncStorage.setItem(Config.isLogin, Config.true_boolean);
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

  };

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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

const mapStateToProps = (state) => {
  return {
    isLogged: state.login.isLogged,
    hasError: state.login.hasError,
    isLoading: state.login.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (auth) => dispatch(LoginActions.updateAuthData(auth))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);