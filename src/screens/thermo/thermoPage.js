// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { connectData } from 'src/redux';
import CircleSlider from './CircleSlider';
import { vw, vh } from 'src/services/viewport';


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    margin: 4 * vw,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  value: {
    fontWeight: '500',
    fontSize: 32,
    color: '#3FE3EB'
  }
});

class thermoPage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 30
    };
  }

  render() {
    return (
      <View
        style={styles.flex}>
        <CircleSlider
          value={this.state.temperature}
          min={30}
          max={270}
          textColor='red'
        >
          <Text style={{
            backgroundColor: 'red',
            position: 'absolute',
            zIndex: 1
          }}>{this.state.temperature}</Text>
        </CircleSlider>


      </View>
    );
  }

}

thermoPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(thermoPage);
