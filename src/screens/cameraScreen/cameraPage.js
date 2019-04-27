// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { vw, vh } from 'src/services/viewport';

import { connectData } from 'src/redux';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center'
  },
});

class cameraPage extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={styles.flex}>
        <View style={{
          width: 100 * vw,
          height: 60 * vh
        }}>
          <WebView
            javaScriptEnabled={true}

            originWhitelist={['*']}
            source={{ html: '<body> <iframe src="https://www.youtube.com/embed/pIEUiJaMPQ4?controls=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></body>' }}
          />
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon name='keyboard-voice' size={25 * vw} color='black'/>
          </View>
        </View>
      </View>
    );
  }

}

cameraPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};

export default connectData()(cameraPage);
