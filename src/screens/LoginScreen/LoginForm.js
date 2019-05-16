import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { vw, vh, } from 'src/services/viewport';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextInput style={styles.input}
                   autoCapitalize="none"
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='email-address'
                   returnKeyType="next"
                   placeholder='Email or Mobile Num'
                   onChangeText={(text) => {
                     this.setState({ email: text });
                   }}
                   placeholderTextColor='rgba(225,225,225,0.7)'>
          {this.state.email}
        </TextInput>

        <TextInput style={styles.input}
                   returnKeyType="go"
                   ref={(input) => this.passwordInput = input}
                   placeholder='Password'
                   placeholderTextColor='rgba(225,225,225,0.7)'
                   secureTextEntry
                   onChangeText={(text) => {
                     this.setState({ password: text });
                   }}>
          {this.state.password}
        </TextInput>
        <TouchableOpacity style={styles.buttonContainer}
                          onPress={() => this.props.onButtonPress(this.state.email, this.state.password)}>
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
    width: 70 * vw,
    borderRadius: 2 * vw,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    borderRadius: 2 * vw,
    width: 35 * vw,
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});
