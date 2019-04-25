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
import { vw, vh } from 'src/services/viewport';

import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { LOGIN_SCREEN, pushTutorialScreen, USER_SETTINGS } from 'src/navigation';
import { connectData } from 'src/redux';
import ControlPane from './controlPane';
import { Strings as strings } from 'src/assets/strings';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
});

class SingleAppScreen extends PureComponent {

  constructor(props) {
    super(props);

    Navigation.events()
      .bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    const { data } = this.props;

    switch (buttonId) {
      case 'nav_tab_menu_btn': {
        Navigation.push(this.props.componentId, {
          component: {
            name: USER_SETTINGS,
            passProps: {
              userName: 'nima'
            },
          }
        });
        break;
      }
      default:
        break;
    }
  }

  //
  render() {
    return (
      <View>
        <View style={styles.list}>
          <ControlPane
            Color='black' button_text={strings.main_lighting} onPress={() => {
          }} Icon={() => <Entypo name="light-bulb" size={16 * vw} color="black"/>}/>
          <ControlPane
            Color='black' button_text={strings.main_cameras} onPress={() => {
          }} Icon={() => <Feather name="camera" size={16 * vw} color="black"/>}/>
          <ControlPane
            Color='black' button_text={strings.main_power} onPress={() => {
          }} Icon={() => <MaterialCommunityIcons name="power-settings" size={16 * vw}
                                                 color="black"/>}/>
          <ControlPane
            Color='black' button_text={strings.main_thermometer} onPress={() => {
          }} Icon={() => <FontAwesome name="thermometer-half" size={16 * vw} color="black"/>}/>
        </View>
      </View>
    );
  }
}

SingleAppScreen.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(SingleAppScreen);
