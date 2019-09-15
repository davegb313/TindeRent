import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Redirect} from 'react-router-native';
import {LoginFB} from '../ft/network';

class LoginScreen extends React.Component {
  state = {};

  logIn = () => {
    LoginFB().then(() => this.setState({isLoggedIn: true}));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.text}>TindeRent</Text>
        </View>
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.button} onPress={this.logIn}>
            <Text>Login with Facebook</Text>
          </TouchableOpacity>
          {this.state.isLoggedIn ? <Redirect to="/rentorlook" /> : null}
        </View>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  logoContainer: {
    flex: 3,
    alignItems: 'center',
  },
  loginContainer: {
    flex: 3,
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#4059ff',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    marginTop: 150,
    fontSize: 40,
  },
});
