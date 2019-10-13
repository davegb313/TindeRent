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
import * as FB from 'expo-facebook';
import {ShowListing} from '../ft/network';




class YourListingScreen extends React.Component {
  state = {
    listings: [],
  };

  addListing = () => this.setState({isAdding: true});
  toDetails = listingID => this.setState({toDetails: listingID});

  componentDidMount() {
    ShowListing().then(listings => this.setState({listings}));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this.addListing}>
            <Image
              style={{width: 100, height: 100, margin: 10}}
              source={{
                uri: 'https://image.flaticon.com/icons/png/512/35/35569.png',
              }}
            />
          </TouchableOpacity>
        </View>
        {this.state.listings.map(listing => (
          <View key={listing.id} style={styles.listing}>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: 'https://www.supplyforce.com/ASSETS/WEB_THEMES//ECOMMERCE_STD_TEMPLATE_V2/images/NoImage.png',
              }}
            />
            <View style={styles.listingBody}>
              <Text style={styles.btnText}>{listing.title} {listing.id}</Text>
              <Button title="Swiped" />
              <Button title="Details" onPress={()=> this.toDetails(listing.id)} />
            </View>
          </View>
        ))}
        {this.state.toDetails ? <Redirect to={`/yourlisting/${this.state.toDetails}`} /> : null}
        {this.state.isAdding ? <Redirect to='/makelisting' /> : null}
      </ScrollView>
    );
  }
}
export default YourListingScreen;

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
