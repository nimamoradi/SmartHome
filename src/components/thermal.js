import ControlPane from '../screens/SingleAppScreen/controlPane';
import { Strings as strings } from '../assets/strings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { vw } from '../services/viewport';
import React from 'react';
import PropTypes from 'prop-types';

function Thermal({ onPress }) {
  return <ControlPane
    Color='black' button_text={strings.main_thermometer} onPress={onPress}
    Icon={() => <FontAwesome name="thermometer-half" size={16 * vw} color="black"/>}/>;
}

Thermal.propTypes = {
  onPress: PropTypes.func.isRequired,
};
export default Thermal;
