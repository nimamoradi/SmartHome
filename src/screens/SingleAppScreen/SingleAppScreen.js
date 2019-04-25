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

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { LOGIN_SCREEN, pushTutorialScreen, USER_SETTINGS } from 'src/navigation';
import { connectData } from 'src/redux';
import ControlPane from './controlPane';
import { Strings as strings } from 'src/assets/strings';
import { Button } from 'react-native-elements';
import SelectButton  from './SelectButton';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'column',
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
    this.state = { pageSelect: true };
    Navigation.events()
      .bindComponent(this);
    this.firstPage = this.firstPage.bind(this);
    this.secondPage = this.secondPage.bind(this);
  }

  firstPage() {
    if (this.state.pageSelect === false) {
      this.setState({ pageSelect: true });
    }
  }

  secondPage() {
    if (this.state.pageSelect === true) {
      this.setState({ pageSelect: false });
    }
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%'
        }}>

          <SelectButton isSelected={this.state.pageSelect === true} onPress={this.firstPage} button_text='first'/>
          <SelectButton isSelected={this.state.pageSelect === false} onPress={this.secondPage} button_text='second'/>

        </View>
        {this.state.pageSelect ?
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
          :
          <View style={styles.list}>
            <ControlPane
              Color='black' button_text={strings.main_cameras} onPress={() => {
            }} Icon={() => <MaterialIcons name="child-friendly" size={16 * vw} color="black"/>}/>
            <ControlPane
              Color='black' button_text={strings.main_power} onPress={() => {
            }} Icon={() => <MaterialCommunityIcons name="sofa" size={16 * vw}
                                                   color="black"/>}/>
            <ControlPane
              Color='black' button_text={strings.main_thermometer} onPress={() => {
            }} Icon={() => <FontAwesome name="bed" size={16 * vw} color="black"/>}/>
            <ControlPane
              Color='black' button_text={strings.main_thermometer} onPress={() => {
            }} Icon={() => <MaterialIcons name="restaurant-menu" size={16 * vw} color="black"/>}/>

          </View>}
      </View>
    );
  }
}

SingleAppScreen.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(SingleAppScreen);
