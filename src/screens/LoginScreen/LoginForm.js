import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { vw, vh, } from 'src/services/viewport';

export default class LoginForm extends Component {
  render() {
    return (
      <View>
        <TextInput style={styles.input}
                   autoCapitalize="none"
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='email-address'
                   returnKeyType="next"
                   placeholder='Email or Mobile Num'
                   placeholderTextColor='rgba(225,225,225,0.7)'/>

        <TextInput style={styles.input}
                   returnKeyType="go"
                   ref={(input) => this.passwordInput = input}
                   placeholder='Password'
                   placeholderTextColor='rgba(225,225,225,0.7)'
                   secureTextEntry/>

        <TouchableOpacity style={styles.buttonContainer}
                          onPress={this.props.onButtonPress}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: '#2980b680',
    marginBottom: 10,
    padding: 10,
    borderRadius: 2 * vw,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    borderRadius: 2 * vw,

    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});
