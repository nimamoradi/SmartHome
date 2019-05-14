import { Strings as strings } from '../assets/strings';

import { vw } from '../services/viewport';
import ControlPane from '../screens/SingleAppScreen/controlPane';
import React from 'react';

import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function PowerSetting({ onPress }) {
  return <ControlPane
    Color='black' button_text={strings.main_power} onPress={onPress}
    Icon={() => <MaterialCommunityIcons name="power-settings" size={16 * vw}
                                        color="black"/>}/>
    ;
}

PowerSetting.propTypes = {
  onPress: PropTypes.func.isRequired,
};
export default PowerSetting;
