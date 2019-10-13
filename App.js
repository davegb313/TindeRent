import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {NativeRouter, Switch, Route, Link} from 'react-router-native';
import LoginScreen from './screens/LoginScreen';
import RentorlookScreen from './screens/RentorlookScreen';
import YourListingScreen from './screens/YourListingScreen';
import MakeListingScreen from './screens/MakeListingScreen';
import YourOneListingScreen from './screens/YourOneListingScreen';
import MakeUserScreen from './screens/MakeUserScreen';
import SwipingScreen from './screens/SwipingScreen';
import Header from './ft/header';

const {height, width} = Dimensions.get('window');


class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/rentorlook' component={RentorlookScreen} />
          <Route exact path='/yourlisting' component={YourListingScreen} />
          <Route exact path='/makelisting' component={MakeListingScreen} />
          <Route exact path='/yourlisting/:id' component={YourOneListingScreen} />


          <Route exact path='/makeuser' component={MakeUserScreen} />
          <Route exact path='/alllistings' component={SwipingScreen} />
        </Switch>
      </NativeRouter>
    );
  }
}
export default App;
