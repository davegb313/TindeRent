import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeRouter, Switch, Route, Link} from 'react-router-native';
import LoginScreen from './screens/LoginScreen';
import RentorlookScreen from './screens/RentorlookScreen';
import YourListingScreen from './screens/YourListingScreen';
import MakeListingScreen from './screens/MakeListingScreen';
import YourOneListingScreen from './screens/YourOneListingScreen';
import MakeUserScreen from './screens/MakeUserScreen';

class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/rentorlook' component={RentorlookScreen} />
          <Route exact path='/yourlisting' component={YourListingScreen} />
          <Route exact path='/makelisting' component={MakeListingScreen} />
          <Route exact path='/yourlisting/:id' component={YourOneListingScreen} />


          <Route exact path='/makeuser' component={MakeUserScreen} />
        </Switch>
      </NativeRouter>
    );
  }
}
export default App;
