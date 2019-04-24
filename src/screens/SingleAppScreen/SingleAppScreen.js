// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { get } from 'lodash';
import Config from 'react-native-config';

import { LOGIN_SCREEN, pushTutorialScreen, USER_SETTINGS } from 'src/navigation';
import { connectData } from 'src/redux';
import { pushUserSettingScreen } from '../../navigation/Navigation';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class SingleAppScreen extends PureComponent {

  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    const { data } = this.props;

    switch (buttonId) {
      case 'nav_tab_menu_btn': {
        Navigation.push(this.props.componentId, {
          component: {
            name: USER_SETTINGS,
            passProps: {
              userName:'nima'
            },
          }
        });
        break;
      }
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {Config.API_URL}
        </Text>
      </View>
    );
  }
}

SingleAppScreen.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(SingleAppScreen);
