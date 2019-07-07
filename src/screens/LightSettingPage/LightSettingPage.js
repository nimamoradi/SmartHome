// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  Image,
  FlatList
} from 'react-native';

import MySlider from './slider';
import DeviceActions from 'src/redux/action/device';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});

class LightSettingPage extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.flex}>
        <Image
          style={{ alignSelf: 'center' }}
          source={require('assets/images/lamp.png')}
        />
        <FlatList
          keyExtractor={(item)=>item.id}
          data={this.props.devices}
          renderItem={({ item }) => <MySlider title={item.name}
                                              slider_Init={(item.properties.find((element) => {
                                                return element.type === 'toggle';
                                              }))}
                                              color={(item.properties.find((element) => {
                                                return element.type === 'name';
                                              }))}
                                              light={(item.properties.find((element) => {
                                                return element.type === 'degree';
                                              }))}

          />}
        />


      </ScrollView>
    );
  }

}

LightSettingPage.propTypes = {
  data: PropTypes.shape({}).isRequired
};
const mapStateToProps = (state) => {
  return {
    devices: state.device.devices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDeviceProperty: (data) => dispatch(DeviceActions.updateDeviceProperty(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LightSettingPage);
