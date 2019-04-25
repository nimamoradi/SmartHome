import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { vw, vh } from '../../services/viewport';


class buttonShape extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isToggled: props.initalState };
    this.onControlChange = this.onControlChange.bind(this);

  }

  onControlChange(value) {
    this.props.onPress();
  }

  render() {
    return (
      <View style={{
        height: 8 * vh,
        backgroundColor: '#fafafa',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity onPress={() => {
          this.props.onPress();
        }}>
          <View style={this.buttonStyle()}>
            <Icon name={this.props.Icon} size={vw * 5} color={this.props.Color}/>
            <Text style={this.textStyle()}>
              {this.props.button_text}
            </Text>

          </View>
        </TouchableOpacity>
      </View>
    );
  }

  textStyle = function () {
    return {
      fontFamily: 'SFProDisplay-Bold',
      fontSize: 4 * vw,
      color: this.props.Color,
    };
  };
  buttonStyle = function () {
    return {
      width: 45 * vw,
      height: 8 * vh,
      flexDirection: 'row',
      borderWidth: 0.5,
      borderRadius: 10,
      borderColor: this.props.Color,
      justifyContent: 'center',
      alignItems: 'center',
    };
  };
}


buttonShape.propTypes = {
  button_text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  Icon: PropTypes.string.isRequired,
  Color: PropTypes.string.isRequired,
};


export default buttonShape;
