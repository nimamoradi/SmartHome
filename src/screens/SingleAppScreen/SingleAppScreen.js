// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { vw, vh } from 'src/services/viewport';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  CALENDER_PAGE,
  CAMERA_PAGE,
  LIGHT_SETTING_PAGE,
  THERMO_PAGE,
  USER_SETTINGS,
  SELECT_MODAL_PAGE,
} from 'src/navigation';
import { connectData } from 'src/redux';
import ControlPane from './controlPane';
import { Strings as strings } from 'src/assets/strings';

import SelectButton from './SelectButton';
import Thermal from 'src/components/thermal';
import Camera from 'src/components/Camera';

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
let context;

class SingleAppScreen extends PureComponent {

  constructor(props) {
    super(props);
    context = this;
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

          <SelectButton isSelected={this.state.pageSelect === true} onPress={this.firstPage}
                        button_text={strings.main_select_1}/>
          <SelectButton isSelected={this.state.pageSelect === false} onPress={this.secondPage}
                        button_text={strings.main_select_2}/>

        </View>
        {this.state.pageSelect ?
          <View style={styles.list}>
            <ControlPane
              Color='black' button_text={strings.main_lighting}
              onPress={() => this.ControlPaneToPage()}
              Icon={() => <Entypo name="light-bulb" size={16 * vw} color="black"/>}/>
            <Camera onPress={this.toCameraPage}/>
            <ControlPane
              Color='black' button_text={strings.main_power} onPress={() => this.toDate()}
              Icon={() => <MaterialCommunityIcons name="power-settings" size={16 * vw}
                                                  color="black"/>}/>
            <Thermal onPress={this.toThermal}/>
          </View>
          :
          <View style={styles.list}>
            <ControlPane
              Color='black' button_text={strings.main_child} onPress={() => {
              this.toCardSelect();
            }} Icon={() => <MaterialIcons name="child-friendly" size={16 * vw} color="black"/>}/>
            <ControlPane
              Color='black' button_text={strings.main_living} onPress={() => {
            }} Icon={() => <MaterialCommunityIcons name="sofa" size={16 * vw}
                                                   color="black"/>}/>
            <ControlPane
              Color='black' button_text={strings.main_master} onPress={() => {
            }} Icon={() => <FontAwesome name="bed" size={16 * vw} color="black"/>}/>
            <ControlPane
              Color='black' button_text={strings.main_kitchen} onPress={() => {
            }} Icon={() => <MaterialIcons name="restaurant-menu" size={16 * vw} color="black"/>}/>

          </View>}
      </View>
    );
  }

  ControlPaneToPage() {
    Navigation.push(this.props.componentId, {
      component: {
        name: LIGHT_SETTING_PAGE,
        passProps: {},
      }
    });
  }

  toThermal() {
    Navigation.push(context.props.componentId, {
      component: {
        name: THERMO_PAGE,
        passProps: { outside: 32 },
      }
    });
  }

  toCardSelect() {
    Navigation.push(this.props.componentId, {
      component: {
        name: SELECT_MODAL_PAGE,
        passProps: {},
      }
    });
  }

  toDate() {
    Navigation.push(this.props.componentId, {
      component: {
        name: CALENDER_PAGE,
        passProps: {},
      }
    });
  }

  toCameraPage() {
    Navigation.push(context.props.componentId, {
      component: {
        name: CAMERA_PAGE,
        passProps: {},
      }
    });
  }
}

SingleAppScreen.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(SingleAppScreen);
