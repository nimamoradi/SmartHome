// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,

} from 'react-native';

import { connectData } from 'src/redux';

import { vw, vh } from 'src/services/viewport';
import { Calendar } from 'react-native-calendars';


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

class calenderPage extends PureComponent {

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
        <Calendar
          markedDates={{
            '2019-5-25': {
              selected: true,
              selectedColor: 'red'
            },
            '2019-6-26': {
              disabled: true
            },
          }}
          markingType={'multi-dot'}
        />

      </View>
    );
  }

}

calenderPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(calenderPage);
