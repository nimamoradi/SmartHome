// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View
} from 'react-native';

import { connectData } from 'src/redux';
import { Card } from 'react-native-elements';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '45%'
  },
  button: {
    backgroundColor: '#039893'
  }
});

class selectModal extends PureComponent {
  render() {
    return <View style={styles.flex}>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </View>;

  }
}

selectModal.propTypes = {

};

export default connectData()(selectModal);