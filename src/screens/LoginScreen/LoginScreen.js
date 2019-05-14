// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connectData } from 'src/redux';
import { pushSingleScreenApp, pushTabBasedApp } from 'src/navigation';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#039893'
  }
});

class LoginScreen extends PureComponent {

  login = () => {
    pushSingleScreenApp();
  };

  render() {
    return (
      <View style={styles.flex}>
        <FontAwesome5.Button
          solid
          name={'facebook'}
          style={styles.button}
          onPress={this.login}
        >
          Login with Facebook
        </FontAwesome5.Button>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  getFacebookUserData: PropTypes.func.isRequired,
  screenType: PropTypes.oneOf(['Single', 'Tab']).isRequired
};

export default connectData()(LoginScreen);
