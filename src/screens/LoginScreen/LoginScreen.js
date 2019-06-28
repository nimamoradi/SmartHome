// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Alert,
  Image
} from 'react-native';

import LoginActions from 'src/redux/action/login';
import Spinner from 'react-native-loading-spinner-overlay';

import LoginForm from './LoginForm';
import { vh, vw } from 'src/services/viewport';
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
let context;

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    context = this;
  }

  login = (email, password) => {
    context.props.doLogin(email, password);
    alert(JSON.stringify(context.props));
  };

  render() {
    let { hasError, isLogged, isLoading } = this.props;
    return (
      <View behavior="padding" style={styles.container}>
        <Spinner
          visible={isLoading}
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

LoginScreen.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isLogged: state.login.isLogged,
    hasError: state.login.hasError,
    isLoading: state.login.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  alert(JSON.stringify(dispatch));
  return {
    doLogin: (username, password) => dispatch(LoginActions.login(username, password))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

