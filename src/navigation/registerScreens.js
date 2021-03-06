// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import {
  WelcomeScreen,
  LoginScreen,
  SingleAppScreen,
  Tab1Screen,
  Tab2Screen,
  UserSettings,
  LightSettingPage,
  CameraPage,
  CalenderPage,
  ThermoPage,
  SelectModal,
  AddRoomScreen,
  showRoom
} from 'src/screens';


import {
  WELCOME_SCREEN,
  LOGIN_SCREEN,
  SINGLE_APP_SCREEN,
  TAB1_SCREEN,
  TAB2_SCREEN,
  USER_SETTINGS,
  LIGHT_SETTING_PAGE,
  CAMERA_PAGE,
  THERMO_PAGE,
  CALENDER_PAGE,
  SELECT_MODAL_PAGE,
  ADD_ROOM_PAGE,
  SHOW_ROOM
} from './Screens';
import { store } from '../redux';


function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Component
        {...props}
      />
    );

    return <EnhancedComponent/>;
  };
}

export default function () {
  Navigation.registerComponent(WELCOME_SCREEN, () => WrappedComponent(WelcomeScreen));
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => WrappedComponent(LoginScreen), Provider, store);
  Navigation.registerComponentWithRedux(SINGLE_APP_SCREEN, () => WrappedComponent(SingleAppScreen), Provider, store);
  Navigation.registerComponent(TAB1_SCREEN, () => WrappedComponent(Tab1Screen));
  Navigation.registerComponent(TAB2_SCREEN, () => WrappedComponent(Tab2Screen));
  Navigation.registerComponentWithRedux(USER_SETTINGS, () => WrappedComponent(UserSettings), Provider, store);
  Navigation.registerComponentWithRedux(LIGHT_SETTING_PAGE, () => WrappedComponent(LightSettingPage), Provider, store);
  Navigation.registerComponent(CAMERA_PAGE, () => WrappedComponent(CameraPage));
  Navigation.registerComponentWithRedux(THERMO_PAGE, () => WrappedComponent(ThermoPage), Provider, store);
  Navigation.registerComponent(CALENDER_PAGE, () => WrappedComponent(CalenderPage));
  Navigation.registerComponent(SELECT_MODAL_PAGE, () => WrappedComponent(SelectModal));
  Navigation.registerComponentWithRedux(ADD_ROOM_PAGE, () => WrappedComponent(AddRoomScreen), Provider, store);
  Navigation.registerComponentWithRedux(SHOW_ROOM, () => WrappedComponent(showRoom), Provider, store);
  console.info('All screens have been registered...');
}
