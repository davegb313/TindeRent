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
} from 'react-native';
import {Redirect} from 'react-router-native';
import * as FB from 'expo-facebook';
import Carousel from '../ft/carousel';
import ShowOneListing from '../ft/network'

const images = [
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
    },
  },
];

class YourOneListingScreen extends React.Component {
  state = {
    images: [],
    listing: [],
  };

  addListing = () => this.setState({isAdding: true});

  // componentDidMount() {
  //   ShowOneListing(this.props.match.params.id).then(listing => this.setState({listing}));
  // }

  render() {
    return (
      <ScrollView>
        <Carousel images={images} />

        <View style={styles.listingBody}>
          <Text style={styles.btnText}>{this.state.listing.title}</Text>
          <Button title="Swiped" />
          <Button title="Details" />
        </View>
        {this.state.isAdding ? <Redirect to="/makelisting" /> : null}
        {this.state.isLooking ? <Redirect to="/theLock" /> : null}
      </ScrollView>
    );
  }
}
export default YourOneListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 25,
  },
  button: {
    height: 150,
    width: 150,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    backgroundColor: 'lightgray',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    marginRight: 15,
    marginLeft: 15,
    textAlign: 'center',
    fontSize: 30,
  },
  btnText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
  },
  listing: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  listingBody: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
