import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import { vw, vh } from '../../services/viewport';


class buttonShape extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isToggled: props.initalState };
    this.onControlChange = this.onControlChange.bind(this);
    const Icon = this.props.Icon;
  }

  onControlChange(value) {
    this.props.onPress();
  }

  render() {
    return (
      <View style={{
        width: '100%',
        padding: 4 * vw,
        backgroundColor: '#eff0f4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4 * vh
      }}>
        <TouchableOpacity style={styles.optionTitle}>
          <Icon/>
          <Text>
            {this.props.button_text}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }


}


buttonShape.propTypes = {
  button_text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  Icon: PropTypes.isRequired
};
const styles = StyleSheet.create({
  optionTitle: {
    fontSize: 4 * vw,
    flex: 1,
    fontWeight: '400'
  }
});


export default buttonShape;
