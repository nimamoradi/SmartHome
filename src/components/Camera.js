import ControlPane from '../screens/SingleAppScreen/controlPane';
import { Strings as strings } from '../assets/strings';
import { vw } from '../services/viewport';
import React from 'react';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';


function Camera({ onPress }) {
  return <ControlPane
    Color='black' button_text={strings.main_cameras} onPress={onPress}
    Icon={() => <Feather name="camera" size={16 * vw} color="black"/>}/>;
}

Camera.propTypes = {
  onPress: PropTypes.func.isRequired,
};
export default Camera;
