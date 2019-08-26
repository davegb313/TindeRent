import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Switch, Route, Link} from 'react-router-native';
import LoginScreen from './screens/LoginScreen';
import RentorlookScreen from './screens/RentorlookScreen';

class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/rentorlook' component={RentorlookScreen} />
        </Switch>
      </NativeRouter>
    );
  }
}
export default App;
