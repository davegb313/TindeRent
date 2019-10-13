import React from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Redirect} from 'react-router-native';

import {ShowListing} from '../ft/network';

class SwipingScreen extends React.Component {
  state = {
    listings: [],
  };

  componentDidMount() {
    ShowListing().then(listings => this.setState({listings}));
  }

  render() {
    return (
      <View>
        {this.state.listings[0].title}
      </View>
    );
  }
}
export default SwipingScreen;
