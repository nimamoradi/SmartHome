// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { vw, vh } from 'src/services/viewport';

import { Strings as strings } from 'src/assets/strings';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'column',
  },
});

class lightSettingPage extends PureComponent {

  constructor(props) {
    super(props);
  }


  //
  render() {
    return (
      <View
        style={styles.flex}></View>
    );
  }

}

lightSettingPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default lightSettingPage;
