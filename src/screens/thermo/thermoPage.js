// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import { connectData } from 'src/redux';
import CircleSlider from './CircleSlider';
import { vw, vh } from 'src/services/viewport';
import { Strings } from 'src/assets/strings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
  value: {
    fontWeight: '500',
    fontSize: 32,
    color: '#3FE3EB'
  },
  textStyle: {
    color: '#03a9f4',
    fontSize: 4 * vw,
    margin: 2 * vw
  }
});

class thermoPage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 35,
      inside: 23
    };
  }

  render() {
    return (
      <View
        style={styles.flex}>
        <View style={{
          position: 'absolute',
          top: 25 * vh,
        }}>
          <Text style={{
            color: 'orange',
            fontSize: 20 * vw
          }}>{Math.round(this.state.temperature / 5) + ' c'}</Text>
        </View>
        <CircleSlider
          onValueChange={(x) =>
            this.setState({ temperature: x })
          }
          value={this.state.temperature}
          min={30}
          max={270}
          textColor='red'
        />
        <View
          style={{
            marginTop: 8 * vh,
            flexDirection: 'row-reverse',
            margin: vw
          }}
        >
          <Image source={require('src/assets/images/sun.jpg')}/>
          <View
            style={{
              flex: 1,
              margin: 4 * vw,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}
          >
            <View style={{ margin: vw }}>
              <Text
                style={styles.textStyle}>{Strings.thermo_Inside + '   ' + this.state.inside + ' C'}</Text>

              <Text
                style={styles.textStyle}>{Strings.thermo_Outside + '    ' + this.props.outside + ' C'}</Text>
            </View>
            <FontAwesome name={'thermometer-' + Math.round(this.props.outside / 15) % 5}
                         size={16 * vw}
                         color="black"/>
          </View>
        </View>
      </View>
    );
  }

}

thermoPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
  outside: PropTypes.number.isRequired
};

export default connectData()(thermoPage);
