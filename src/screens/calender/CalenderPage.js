// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  LineChart,
  BarChart,

} from 'react-native-chart-kit';
import { connectData } from 'src/redux';

import { vw, vh } from 'src/services/viewport';
import { Calendar } from 'react-native-calendars';


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
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
      temperature: 30,
      date: null,
      line_chart_data: {
        datasets: [{
          data: [35, 55, 70, 92, 108],
          color: (opacity = 1) => `rgba(20, 250, 30, ${opacity})`,
          strokeWidth: 2 // optional
        }]
      },
      bar_chart_data: {
        labels: ['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [{
          data: [35, 20, 25, 45, 22, 16, 10]
        }]
      }
    };
    this.stateTransition = this.stateTransition.bind(this);
  }

  stateTransition(chart_data) {
    this.setState({
      bar_chart_data: {
        labels: chart_data.bar_chart_data.labels,
        datasets: [{
          data: chart_data.bar_chart_data.data,
        }]
      },
      line_chart_data: {
        datasets: [{
          data: chart_data.line_chart_data.data,
          color: (opacity = 1) => `rgba(20, 250, 30, ${opacity})`,
          strokeWidth: 2 // optional
        }]
      },
    });

  }

  render() {
    return (
      <View
        style={styles.flex}>
        <Calendar
          onDayPress={(day) => {
            this.setState({ date: day });
            alert(JSON.stringify(day));
          }}
          hideExtraDays={true}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 35 * vh,
            width: 90 * vw,
            borderRadius: 10 * vw,
            elevation: 2 * vw
          }}
          theme={{
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#27ff18',
            todayTextColor: 'green',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#27ff18',
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
        {this.state.date !== null ?
          <View style={{
            justifyContent: 'space-between'
          }}>
            <BarChart
              data={this.state.bar_chart_data}
              width={95 * vw}
              height={25 * vh}
              yAxisLabel={'$'}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
            <LineChart
              data={this.state.line_chart_data}
              width={95 * vw}
              height={15 * vh}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
            />
          </View>
          : null}
      </View>
    );
  }

}

calenderPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(calenderPage);
