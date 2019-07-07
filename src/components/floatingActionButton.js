import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { vw, vh } from 'src/services/viewport';

function FloatActionButton({onPress}) {
  return (<TouchableOpacity
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 8 * vw,
      right: 8 * vw,
      backgroundColor: '#fff',
    }}
    onPress={onPress}
  >
    <Icon name="pluscircle" size={12 * vw} color="red"/>
  </TouchableOpacity>);

}

export default FloatActionButton;