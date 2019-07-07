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
      slider_active: props.slider_Init.value,
      shouldShowModal: false,
      light: this.props.light.value,
      color: this.props.color
    };
  }


  render() {
    return (
      <View style={styles.col}>
        <View style={styles.row}>
          {this.props.color ?
            <TouchableOpacity onPress={() => {
              this.setState({ shouldShowModal: !this.state.shouldShowModal });
            }}>
              <Ionicons name='ios-color-palette' size={vw * 8}/>
            </TouchableOpacity> : null}
          <SFProDisplayRegular style={{ fontSize: 5 * vw }}>
            {this.props.title}
          </SFProDisplayRegular>
          {this.props.slider_Init ? <Switch
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            onValueChange={(val) => {
              this.setState({ slider_active: val });
              this.props.updateLight(this.props.device_id, this.state.light,
                val, this.state.color);
            }}
            value={this.state.slider_active}
          /> : null}
          {this.props.color ?
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.shouldShowModal}
              onRequestClose={() => {

              }}>
              <TriangleColorPicker
                defaultColor={this.state.color}
                oldColor={this.state.color}
                onColorSelected={color => {
                  alert(`Color selected: ${color}`);
                  this.setState({
                    shouldShowModal: false,
                    color: color
                  });
                  this.props.updateLight(this.props.device_id, this.state.light,
                    this.state.slider_active, color);
                }}
                style={{ flex: 1 }}
              />
            </Modal>
            : null}
        </View>
        {this.props.light ?
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
              value={this.state.light}
              onValueChange={val => {
                this.setState({ light: val });
              }}
              onSlidingComplete={val => {
                this.props.updateLight(this.props.device_id, this.state.light,
                  this.state.slider_active, this.state.color);
              }}
            />
            <MaterialCommunityIcons name='white-balance-sunny' size={vw * 8} color='#f07f00'/>
          </View> : null}
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
  device_id:PropTypes.isRequired,
  light: PropTypes.isRequired,
  title: PropTypes.isRequired,
  color: PropTypes.isRequired,
  updateLight: PropTypes.func.isRequired,
  slider_Init: PropTypes.isRequired,
};
export default slider;
