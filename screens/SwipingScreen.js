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
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Redirect} from 'react-router-native';
import {ShowListing, MakeSwipe} from '../ft/network';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const {height, width} = Dimensions.get('window');
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

class SwipingScreen extends React.Component {
  state = {
    listings: [],
  };

  onSwipeLeft = id => {
    console.log(`left-${id}`);
    MakeSwipe({
      isLiked: false,
      listingID: id,
    }).then(
      this[`text-${id}`].setNativeProps({style: {backgroundColor: 'red'}}),
    );
  };

  onSwipeRight = id => {
    console.log(`right-${id}`);
    MakeSwipe({
      isLiked: true,
      listingID: id,
    }).then(
      this[`text-${id}`].setNativeProps({style: {backgroundColor: 'green'}}),
    );
  };

  componentDidMount() {
    ShowListing().then(listings => this.setState({listings}));
  }

  render() {
    return (
      <ScrollView>
        {this.state.listings.map(listing => (
          <View
            style={styles.container}
            key={listing.id}
            key={`text-${listing.id}`}
            ref={thisItem => this[`text-${listing.id}`] = thisItem}
          >
            <GestureRecognizer
              onSwipeLeft={() => this.onSwipeLeft(listing.id)}
              onSwipeRight={() => this.onSwipeRight(listing.id)}
              config={config}
            >
              <View style={styles.card}>
                <Text>{listing.title}</Text>
                <Button title="details" />

              </View>
            </GestureRecognizer>
          </View>
        ))}
      </ScrollView>
    );
  }
}
export default SwipingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    height: height,
  },
  card: {
    width: width - 40,
    height: height - 80,
    borderColor: 'black',
    borderWidth: 2,
  },
});
