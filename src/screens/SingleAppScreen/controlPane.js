import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import { vw, vh } from 'src/services/viewport';


class controlPane extends React.Component {

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
        height: 20 * vh,
        width: 40 * vw,
        borderWidth: 0.75,
        borderRadius: 10,
        elevation: vw,
        borderColor: '#038fd3',
        backgroundColor: '#03a9f4a0',
        justifyContent: 'center',
        alignItems: 'center',
        margin: vw,
        marginTop: 2 * vh,
      }}>
        <TouchableOpacity onPress={() => {
          this.props.onPress();
        }}>
          <View style={this.buttonStyle()}>
            {this.props.Icon()}
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
      height: 20 * vh,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    };
  };
}


controlPane.propTypes = {
  button_text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  Icon: PropTypes.func.isRequired,
  Color: PropTypes.string.isRequired,
};


export default controlPane;
