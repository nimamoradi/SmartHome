import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableNativeFeedback,

} from 'react-native';
import { Text } from 'react-native-elements';
import { vw, vh } from 'src/services/viewport';


class SelectButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        height: 8 * vh,
        width: 40 * vw,
        borderWidth: 0.75,
        borderRadius: 8 * vh,
        elevation: vw,
        borderColor: '#038fd3',
        justifyContent: 'center',
        alignItems: 'center',
        margin: vw,
        marginTop: 2 * vh,
      }}>
        <TouchableNativeFeedback onPress={() => {
          this.props.onPress();
        }}>
          <View style={this.buttonStyle(this.props.isSelected)}>
            <Text style={this.textStyle(this.props.isSelected)}>
              {this.props.button_text}
            </Text>

          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  textStyle = function (isSelected) {
    return {
      fontFamily: 'SFProDisplay-Bold',
      fontSize: 4 * vw,
      color: 'black',
      fontWeight: (isSelected ? 'bold' : '300'),
    };
  };
  buttonStyle = function (isSelected) {
    return {
      backgroundColor: (isSelected ? '#2196f3' : '#03a9f4'),
      width: 40 * vw,
      borderRadius: 8 * vh,
      height: 8 * vh,
      borderWidth: 0.75,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    };
  };
}


SelectButton.propTypes = {
  button_text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};


export default SelectButton;
