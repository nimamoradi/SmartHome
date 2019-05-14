import { Strings as strings } from '../assets/strings';
import Entypo from 'react-native-vector-icons/Entypo';
import { vw } from '../services/viewport';
import ControlPane from '../screens/SingleAppScreen/controlPane';
import React from 'react';

import PropTypes from 'prop-types';

function Light({ onPress }) {
  return <ControlPane
    Color='black' button_text={strings.main_lighting}
    onPress={onPress}
    Icon={() => <Entypo name="light-bulb" size={16 * vw} color="black"/>}/>
    ;
}

Light.propTypes = {
  onPress: PropTypes.func.isRequired,
};
export default Light;
