// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Slider,
  Switch,
  Modal,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { vw, vh } from 'src/services/viewport';
import { SFProDisplayRegular } from 'src/fonts';
import { TriangleColorPicker } from 'react-native-color-picker';

class slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider_active: props.slider_Init,
      shouldShowModal: false
    };
  }


  render() {
    return (
      <View style={styles.col}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {
            this.setState({ shouldShowModal: !this.state.shouldShowModal });
          }}>
            <Ionicons name='ios-color-palette' size={vw * 8}/>
          </TouchableOpacity>
          <SFProDisplayRegular style={{ fontSize: 5 * vw }}>
            {this.props.title}
          </SFProDisplayRegular>
          <Switch
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            onValueChange={(val) => {
              this.setState({ slider_active: val });
            }}
            value={this.state.slider_active}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.shouldShowModal}
            onRequestClose={() => {

            }}>
            <TriangleColorPicker
              onColorSelected={color => {
                alert(`Color selected: ${color}`);
                this.setState({ shouldShowModal: false });
              }}
              style={{ flex: 1 }}
            />
          </Modal>
        </View>
        <View style={styles.flex}>
          <Icon name='md-moon' size={vw * 8} color='#e1ee15'/>

          <Slider
            minimumTrackTintColor='#2196f3'
            maximumTrackTintColor='#8bc34a'
            thumbTintColor='#2196f3'
            style={{
              width: 70 * vw,
              height: 10 * vh,
            }}
            step={1}
            minimumValue={0}
            maximumValue={10}
            value={this.props.light}
            onValueChange={val => {
            }}
            onSlidingComplete={val => {
            }}
          />
          <MaterialCommunityIcons name='white-balance-sunny' size={vw * 8} color='#f07f00'/>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  col: {
    margin: 4 * vw,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  row: {
    width: '80%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    height: vh * 30,
    width: 100 * vw,
    resizeMode: 'stretch'
  },

});

slider.propTypes = {
  light: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  newValueSave: PropTypes.func.isRequired,
  slider_Init: PropTypes.bool.isRequired,
};
export default slider;
