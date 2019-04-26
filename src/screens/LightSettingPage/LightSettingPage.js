// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import MySlider from './slider';

import { connectData } from 'src/redux';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});

class LightSettingPage extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={styles.flex}>
        <Image
          style={{ alignSelf: 'center' }}
          source={require('assets/images/lamp.png')}
        />
        <MySlider light={10} title='Bedroom' slider_Init={true}/>
        <MySlider light={5} title='Livingroom' slider_Init={true}/>
        <MySlider light={0} title='Kichen' slider_Init={false}/>
      </View>
    );
  }

}

LightSettingPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(LightSettingPage);
