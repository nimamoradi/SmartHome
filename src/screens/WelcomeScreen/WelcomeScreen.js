// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Image, AsyncStorage,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Strings } from 'src/assets/strings';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

import { LOGIN_SCREEN, pushSingleScreenApp } from 'src/navigation';
import { SFProDisplayMedium } from 'src/fonts';
import {
  IndicatorViewPager,
  PagerDotIndicator
} from 'rn-viewpager';
import { vw, vh, } from 'src/services/viewport';
import Config from 'react-native-config';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = StyleSheet.create({
  flex: {
    color: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dotSelected: {
    height: 20,
    width: 20,
    borderRadius: 20 >> 1,
    margin: 20 >> 1,
    backgroundColor: '#000000',
    opacity: 0.5
  },
  button: {
    backgroundColor: '#039893',
    width: 230,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 25
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  logo: {
    width: 45 * vw,
    height: 32 * vh,
    resizeMode: 'contain'
  },
  logoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  }
});

class WelcomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { waiting: true };
    AsyncStorage.getItem(Config.isLogin)
      .then(value => {
        if (value !== null && value === Config.true_boolean) {
          pushSingleScreenApp();
        }
        this.setState({ waiting: false });
      });
  }

  handleGetStartAction = (screenType) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: LOGIN_SCREEN,
        passProps: {
          screenType
        },
        options: {
          topBar: {
            title: {
              text: 'LOGIN'
            }
          }
        }
      }
    });
  };

  render() {
    if (this.state.waiting) {
      return <View style={styles.flex}><Spinner
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      /></View>;
    } else {
      return (
        <View style={styles.flex}>

          <IndicatorViewPager
            style={{
              flex: 1,
              backgroundColor: 'white',

            }}
            indicator={this._renderDotIndicator()}
          >
            <View style={styles.center}>
              <Image
                style={styles.logo}
                source={require('assets/images/welcome-logo.jpg')}
              />

              <SFProDisplayMedium style={styles.logoTitle}>
                {Strings.welcome_tab1}
              </SFProDisplayMedium>
            </View>
            <View style={styles.center}>
              <SimpleLineIcons name="camera" size={32 * vh} color="cyan"/>
              <SFProDisplayMedium style={styles.logoTitle}>
                {Strings.welcome_tab2}
              </SFProDisplayMedium>
            </View>
            <View style={styles.center}>
              <SimpleLineIcons name="energy" size={32 * vh} color="orange"/>
              <SFProDisplayMedium style={styles.logoTitle}>
                {Strings.welcome_tab3}
              </SFProDisplayMedium>
            </View>
          </IndicatorViewPager>

          <Button
            onPress={() => this.handleGetStartAction('Tab')}
            title={'start'}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>
      );
    }
  }

  _renderDotIndicator() {
    return <PagerDotIndicator
      selectedDotStyle={styles.dotSelected}
      pageCount={3}/>;
  }
}

export default WelcomeScreen;
