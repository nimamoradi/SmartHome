// @flow

import { Navigation } from 'react-native-navigation';

import {
  WELCOME_SCREEN,
  SINGLE_APP_SCREEN,
  TAB1_SCREEN,
  TAB2_SCREEN, LOGIN_SCREEN,USER_SETTINGS
} from './Screens';
import registerScreens from './registerScreens';

// Register all screens on launch
registerScreens();

export function pushTutorialScreen() {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#eff0f4'
      },
      title: {
        color: 'black',
      },
      backButton: {
        title: '', // Remove previous screen name from back button
        color: 'black'
      },
      buttonColor: 'black',
    },
    statusBar: {
      style: 'light'
    },
    layout: {
      orientation: ['portrait']
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow'
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: WELCOME_SCREEN,
            options: {
              topBar: {
                visible: false,
              },
              statusBar: {
                style: 'dark'
              }
            }
          }
        }]
      }
    }
  });
}
export function pushUserSettingScreen(userName) {
  Navigation.push(USER_SETTINGS, {
    component: {
      name: USER_SETTINGS,
      passProps: {
        userName:userName
      },
    }
  });
}

export function pushSingleScreenApp() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: SINGLE_APP_SCREEN,
            options: {
              topBar: {
                background: {
                  color: '#eff0f4'
                },
                rightButtons: [
                  {
                    id: 'nav_tab_menu_btn',
                    icon: require('assets/icons/ic_tab_menu.png'),
                    color: 'black',
                  }
                ]
              }
            }
          }
        }]
      }
    }
  });
}

export function pushTabBasedApp() {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [{
          stack: {
            children: [{
              component: {
                name: TAB1_SCREEN,
                options: {
                  topBar: {
                    title: {
                      text: 'TAB 1'
                    },
                    leftButtons: [
                      {
                        id: 'nav_user_btn',
                        icon: require('assets/icons/ic_nav_user.png'),
                        color: 'white'
                      }
                    ],
                    rightButtons: [
                      {
                        id: 'nav_logout_btn',
                        icon: require('assets/icons/ic_nav_logout.png'),
                        color: 'white'
                      }
                    ]
                  }
                }
              }
            }],
            options: {
              bottomTab: {
                icon: require('assets/icons/ic_tab_home.png'),
                testID: 'FIRST_TAB_BAR_BUTTON',
                text: 'Tab1',
              }
            }
          }
        },
          {
            stack: {
              children: [{
                component: {
                  name: TAB2_SCREEN,
                  options: {
                    topBar: {
                      title: {
                        text: 'TAB 2'
                      },
                      leftButtons: [
                        {
                          id: 'nav_user_btn',
                          icon: require('assets/icons/ic_nav_user.png'),
                          color: 'white',
                          fontSize: 23
                        }
                      ],
                      rightButtons: [
                        {
                          id: 'nav_logout_btn',
                          icon: require('assets/icons/ic_nav_logout.png'),
                          color: 'white'
                        }
                      ]
                    }
                  }
                }
              }],
              options: {
                bottomTab: {
                  icon: require('assets/icons/ic_tab_menu.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON',
                  text: 'Tab2',
                }
              }
            }
          }]
      }
    }
  });
}
