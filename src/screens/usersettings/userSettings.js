// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';

import { connectData } from 'src/redux';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { vw, vh, } from 'src/services/viewport';

import OptionComponet from './optionComponet';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },

});

class userSettings extends PureComponent {

  render() {
    return (
      <View style={styles.flex}>
        <EvilIcons name="user" size={28 * vh} color="black"/>
        <OptionComponet
          initalState={false}
          onStateOff={() => {
          }}
          onStateOn={() => {
          }}
          option_text={'test'}/>

        <OptionComponet
          initalState={false}
          onStateOff={() => {
          }}
          onStateOn={() => {
          }}
          option_text={'test2'}/>


        <Button
          onPress={() => {
          }}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Button
          onPress={() => {
          }}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

userSettings.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default connectData()(userSettings);
