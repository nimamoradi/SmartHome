// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  BackHandler,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { vw, vh } from 'src/services/viewport';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  CALENDER_PAGE,
  CAMERA_PAGE,
  LIGHT_SETTING_PAGE,
  THERMO_PAGE,
  USER_SETTINGS,
  SELECT_MODAL_PAGE, pushSingleScreenApp,
} from 'src/navigation';
import ControlPane from './controlPane';
import { Strings as strings } from 'src/assets/strings';

import SelectButton from './SelectButton';
import Thermal from 'src/components/thermal';
import Camera from 'src/components/Camera';
import Light from 'src/components/Light';
import PowerSetting from 'src/components/PowerSetting';
import Spinner from 'src/components/Spinner';
import { fetch } from 'fetch-awesome';
import Config from 'react-native-config';
import RoomActions from 'src/redux/action/room';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
let context;

class SingleAppScreen extends PureComponent {

  constructor(props) {
    super(props);
    context = this;
    this.state = {
      pageSelect: true,
      shouldNavigate: true,
      loading: true,
      rooms: [],
      dataReady: false
    };
    Navigation.events()
      .bindComponent(this);
    this.firstPage = this.firstPage.bind(this);
    this.secondPage = this.secondPage.bind(this);

    this.loadRooms();
  }

  firstPage() {
    if (this.state.pageSelect === false) {
      this.setState({ pageSelect: true });
    }
  }

  secondPage() {
    if (this.state.pageSelect === true) {
      this.setState({ pageSelect: false });
    }
  }

  navigationButtonPressed({ buttonId }) {
    const { data } = this.props;

    switch (buttonId) {
      case 'nav_tab_menu_btn': {
        Navigation.push(this.props.componentId, {
          component: {
            name: USER_SETTINGS,
          }
        });
        break;
      }
      default:
        break;
    }
  }

  loadRooms() {
    return;
    context.setState({ loading: true });
    fetch(Config.API_URL + 'homes/rooms', {
      method: 'GET',
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': '',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          context.setState({
            dataReady: true,
          });
          return response.json();
        } else {
          context.setState({
            loading: true,
          });
          Alert.alert(
            'error',
            'unknown error',
            [
              {
                text: 'Exit',
                onPress: () => BackHandler.exitApp()
              },
              {
                text: 'retry',
                onPress: () => context.loadRooms()
              },
            ],
            { cancelable: false },
          );
        }
      })
      .then(function (res) {
        connect.props.updateRoomsList(res.data);
        context.setState({
          loading: false,
        });
      })

      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          'error',
          'network error',
          [
            {
              text: 'Exit',
              onPress: () => BackHandler.exitApp()
            },
            {
              text: 'retry',
              onPress: () => context.loadRooms()
            },
          ],
          { cancelable: false },
        );
      });
  }

  //
  render() {
    if (this.state.dataReady) {
      return <View style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
        <Spinner
          loading={this.state.loading}
          textLabel={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
      </View>;
    } else {
      return (
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%'
          }}>

            <SelectButton isSelected={this.state.pageSelect === true} onPress={this.firstPage}
                          button_text={strings.main_select_1}/>
            <SelectButton isSelected={this.state.pageSelect === false} onPress={this.secondPage}
                          button_text={strings.main_select_2}/>

          </View>
          {this.state.pageSelect ?
            <View style={styles.list}>
              <Light onPress={this.ControlPaneToPage}/>
              <Camera onPress={this.toCameraPage}/>
              <PowerSetting onPress={this.toDate}/>
              <Thermal onPress={this.toThermal}/>
            </View>
            :

            <FlatList
              horizontal={false}
              style={{
                marginLeft: 8 * vw,
                flexDirection: 'column',
              }}
              numColumns={2}
              data={this.props.RoomsData}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}/>

          }
        </View>
      );
    }
  }

  _keyExtractor(item) {
    return item.id;
  }

  _renderItem({ item }) {
    return <ControlPane
      Color='black' button_text={item.name}
      onPress={() => {
      }}
      Icon={() => <MaterialCommunityIcons name="sofa" size={16 * vw} color="black"/>}/>;
  }

  ControlPaneToPage() {
    if (context.state.shouldNavigate) {
      Navigation.push(context.props.componentId, {
        component: {
          name: LIGHT_SETTING_PAGE,
          passProps: {},
        }
      })
        .then(() => context.setState({ shouldNavigate: true }));
      context.setState({ shouldNavigate: false });
    }
  }

  toThermal() {
    if (context.state.shouldNavigate) {
      Navigation.push(context.props.componentId, {
        component: {
          name: THERMO_PAGE,
          passProps: { outside: 32 },
        }
      })
        .then(() => context.setState({ shouldNavigate: true }));
      context.setState({ shouldNavigate: false });
    }
  }

  toCardSelect() {
    if (context.state.shouldNavigate) {
      Navigation.push(this.props.componentId, {
        component: {
          name: SELECT_MODAL_PAGE,
          passProps: {},
        }
      })
        .then(() => context.setState({ shouldNavigate: true }));
      context.setState({ shouldNavigate: false });
    }
  }

  toDate() {
    if (context.state.shouldNavigate) {
      Navigation.push(context.props.componentId, {
        component: {
          name: CALENDER_PAGE,
          passProps: {},
        }
      })
        .then(() => context.setState({ shouldNavigate: true }));
      context.setState({ shouldNavigate: false });
    }
  }

  toCameraPage() {
    if (context.state.shouldNavigate) {
      Navigation.push(context.props.componentId, {
        component: {
          name: CAMERA_PAGE,
          passProps: {},
        }
      })
        .then(() => context.setState({ shouldNavigate: true }));
      context.setState({ shouldNavigate: false });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    UserAuthData: state.login.UserAuthData,
    RoomsData: state.rooms.rooms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRoomsList: (data) => dispatch(RoomActions.updateRoomsData(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleAppScreen);

