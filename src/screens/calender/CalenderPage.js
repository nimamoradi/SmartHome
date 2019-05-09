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
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 50 * vh,
            width: 90 * vw,
            borderRadius: 10 * vw,
            elevation: 2 * vw
          }}
          theme={{
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'green',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: '#000',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textMonthFontWeight: '400',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
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
