// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image
} from 'react-native';

import { connectData } from 'src/redux';
import { pushSingleScreenApp, pushTabBasedApp } from 'src/navigation';
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

  login = () => {
    pushSingleScreenApp();
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
