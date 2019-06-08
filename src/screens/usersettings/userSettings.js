// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import ButtonShape from './buttonShape';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { vw, vh, } from 'src/services/viewport';

import OptionComponet from './optionComponet';
import { SFProDisplayMedium } from '../../fonts';
import { Strings as strings } from '../../assets/strings';

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

        <SFProDisplayMedium style={{
          fontSize: 6 * vw,
          marginBottom: 10 * vh
        }}>
          {this.props.userName}
        </SFProDisplayMedium>
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

        <View style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
          marginTop: 10 * vh,
          justifyContent: 'space-evenly'
        }}>
          <ButtonShape
            Color={'green'}
            button_text={strings.save}
            Icon='content-save'
            onPress={() => {
            }}/>
          <ButtonShape
            Color={'red'}
            button_text={strings.logout}
            Icon='logout'
            onPress={() => {
            }}/>


        </View>
      </View>
    );
  }
}

userSettings.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default userSettings;
