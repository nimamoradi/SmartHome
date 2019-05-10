// @flow

import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import { vw, vh } from 'src/services/viewport';

function Card({ title, Icon, goAppliances }) {
  return (
    <TouchableNativeFeedback onPress={() => goAppliances()}>
      <View style={styles.flex}>
        <Text allowFontScaling={true} style={styles.text}>{title}</Text>

        {Icon()}
      </View>
    </TouchableNativeFeedback>);

}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 4 * vw,
    backgroundColor: '#f2f2f2',
    padding: 4 * vw,
    borderRadius: vw,
    borderWidth: 1,
    borderColor: 'grey',
    width: '90%',

  },
  text: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 6 * vw
  }


});

Card.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  goAppliances: PropTypes.func.isRequired,
};
export default Card;
