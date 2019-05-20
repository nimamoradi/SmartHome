import ControlPane from '../screens/SingleAppScreen/controlPane';
import { Strings as strings } from '../assets/strings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { vw, vh } from '../services/viewport';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0 * vw,
    right: 0,
    top: 0 * vh,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    overlayColor: 'rgba(0, 0, 0, 0.25)',
    backgroundColor: 'transparent'
  }
});

function Spinner({ loading, textLabel }) {
  if (loading) {
    return <View style={styles.loading}>
      <ActivityIndicator color="#0000ff" size='large'/>
      <Text style={{
        fontSize: 5 * vw,
        padding: 2 * vw,
        color: 'black'
      }}>{textLabel}</Text>
    </View>;
  } else {
    return null;
  }
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};
export default Spinner;
