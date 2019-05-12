// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,

} from 'react-native';

import { connectData } from 'src/redux';
import Card from 'src/components/Card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { vw } from 'src/services/viewport';
import { Strings as strings } from 'src/assets/strings';
import { Navigation } from 'react-native-navigation';

import { CALENDER_PAGE, SELECT_MODAL_PAGE } from 'src/navigation/Screens';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#039893'
  }
});

class selectModal extends PureComponent {
  constructor(props) {
    super(props);
    alert(this.props.componentId);
  }

  render() {
    return <View style={styles.flex}>
      <Text style={{ fontSize: 6 * vw }}>{strings.appliances}</Text>


      <Card title='hi 1 '
            Icon={() => <MaterialIcons name="child-friendly" size={16 * vw} color="black"/>}
            goAppliances={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: CALENDER_PAGE,
                  passProps: {},
                }
              });
            }}/>
      <Card title='hi 2 '
            Icon={() => <MaterialIcons name="restaurant-menu" size={16 * vw} color="black"/>}
            goAppliances={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: CALENDER_PAGE,
                  passProps: {},
                }
              });
            }}/>
      <Card title='hi 2 '
            Icon={() => <MaterialIcons name="restaurant-menu" size={16 * vw} color="black"/>}
            goAppliances={() => {
              Navigation.push(this.props.componentId, {
                component: {
                  name: CALENDER_PAGE,
                  passProps: {},
                }
              });
            }}/>
    </View>;

  }
}

selectModal.propTypes = {};

export default connectData()(selectModal);