import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Switch
} from 'react-native';

import { SFProDisplayRegular } from '../../fonts';
import { vw, vh } from '../../services/viewport';


class optionComponet extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isToggled: props.initalState };
    this.onControlChange = this.onControlChange.bind(this);
  }

  onControlChange(value) {
    if (value) {
      this.props.onStateOn();
    } else {
      this.props.onStateOff();
    }
    return this.setState({
      isToggled: !this.state.isToggled
    });
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
        <SFProDisplayRegular style={styles.optionTitle}>
          {this.props.option_text}
        </SFProDisplayRegular>
        <Switch
          onValueChange={this.onControlChange}
          value={this.state.isToggled}
        />

      </View>
    );
  }


}


optionComponet.propTypes = {
  option_text: PropTypes.string.isRequired,
  onStateOn: PropTypes.func.isRequired,
  onStateOff: PropTypes.func.isRequired,
  initalState: PropTypes.bool.isRequired,
};
const styles = StyleSheet.create({
  optionTitle: {
    fontSize: 4 * vw,
    flex: 1,
    fontWeight: '400'
  }
});


export default optionComponet;
