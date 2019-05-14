// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,

} from 'react-native';

import { connectData } from 'src/redux';
import { vw } from 'src/services/viewport';
import { Strings as strings } from 'src/assets/strings';
import { Navigation } from 'react-native-navigation';

import {
  CALENDER_PAGE,
  LIGHT_SETTING_PAGE,
  SELECT_MODAL_PAGE,
  THERMO_PAGE
} from 'src/navigation/Screens';
import Thermal from '../../components/thermal';
import Camera from '../../components/Camera';
import Light from '../../components/Light';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#039893'
  },
  center: {
    flex: 1,
    margin: 4 * vw,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
let context;

class selectModal extends PureComponent {
  constructor(props) {
    super(props);
    context = this;
    this.state = {
      appliances: {
        thermal: true,
        camera: true,
        light: true,
        power: true
      }
    }
    ;
  }

  render() {
    return <View style={styles.center}>
      <Text style={{ fontSize: 6 * vw }}>{strings.appliances}</Text>

      <View style={styles.flex}>

        {this.makeCard(this.state.appliances)}
      </View>
    </View>;

  }

  makeCard(config) {
    let viewList = [];
    if (config.thermal) {
      viewList.push(<Thermal onPress={() => {

        Navigation.push(context.props.componentId, {
          component: {
            name: THERMO_PAGE,
            passProps: { outside: 32 },
          }
        });

      }}/>);
    }
    if (config.camera) {
      viewList.push(<Camera onPress={() => {
      }}/>);
    }
    if (config.light) {

      viewList.push(<Light onPress={() => {
      }}/>);
    }
    if (config.power) {
      viewList.push(<Thermal onPress={() => {
      }}/>);
    }

    return viewList;
  }
}

selectModal.propTypes = {};

export default connectData()(selectModal);