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
import MapView, {Marker} from 'react-native-maps';
import * as FB from 'expo-facebook';
import Carousel from '../ft/carousel';
import {ShowOneListing} from '../ft/network';
import {UpdateListing} from '../ft/network';
import Camera from '../ft/camera';

const networkBase = 'http://192.168.10.148:4000';
const {height, width} = Dimensions.get('window');
const images = [
  {
    source: {
      uri: 'https://www.supplyforce.com/ASSETS/WEB_THEMES//ECOMMERCE_STD_TEMPLATE_V2/images/NoImage.png',
    },
  },
];

class YourOneListingScreen extends React.Component {
  state = {
    images: [],
    listing: {},
  };

  cameraOn = (cameraInfo) => this.setState({ isCameraOn: cameraInfo ? false : true });
  backToListing = () => this.setState({ isBackToListing: true});

  saveChanges = () => UpdateListing(this.state.listing).then(r=> console.log(r));

  setTitle = () => this.state.isTitle ?
                   this.setState({ isTitle: false }) :
                   this.setState({ isTitle: true });
  saveTitle = title => this.setState(prevState=> ({listing: {...prevState.listing, title}}));

  setPrice = () => this.state.isPrice ?
                   this.setState({ isPrice: false }) :
                   this.setState({ isPrice: true });
  savePrice = price => this.setState(prevState=> ({listing: {...prevState.listing, price}}));

  setDesc = () => this.state.isDesc ?
                   this.setState({ isDesc: false }) :
                   this.setState({ isDesc: true });
  saveDesc = description => this.setState(prevState=> ({listing: {...prevState.listing, description}}));

  setFloor = () => this.state.isFloor ?
                   this.setState({ isFloor: false }) :
                   this.setState({ isFloor: true });
  saveFloor = floor => this.setState(prevState=> ({listing: {...prevState.listing, floor}}));

  setBFloor = () => this.state.isBFloor ?
                   this.setState({ isBFloor: false }) :
                   this.setState({ isBFloor: true });
  saveBFloor = buildingFloor => this.setState(prevState=> ({listing: {...prevState.listing, buildingFloor}}));

  setBalcony = () => this.state.isBalcony ?
                   this.setState({ isBalcony: false }) :
                   this.setState({ isBalcony: true });
  saveBalcony = balcony => this.setState(prevState=> ({listing: {...prevState.listing, balcony}}));

  componentDidMount() {
    // ShowOneListing()
    fetch(networkBase + '/yourlisting/' + this.props.match.params.id)
        .then(response => response.json())
        .then(listing => this.setState({listing}));
  }

  render() {
    if (this.state.isCameraOn) {
      return (<Camera isCameraOn={this.cameraOn} />)
    } else {
    return (
      <ScrollView>
        <Carousel images={this.state.listing.images ? this.state.listing.images : images } />
        <View style={styles.titlenprice}>
          { this.state.isTitle ? (
            <>
              <TextInput style={{width: 348}} onChangeText={this.saveTitle}/>
              <Button title="save" onPress={this.setTitle} />
            </>
          ) : (
            <>
              <Text style={{width: 353.5}}>{this.state.listing.title}</Text>
              <Button title="edit" onPress={this.setTitle} />
            </>
          )}
          { this.state.isPrice ? (
            <>
              <Button title="save" onPress={this.setPrice} />
              <TextInput style={{width: 348}} onChangeText={this.savePrice} />
            </>
          ) : (
            <>
              <Button onPress={this.setPrice} title="edit" />
              <Text style={{width: 353.5}}>Price: {this.state.listing.price} $</Text>
            </>
          )}
        </View>
        <View style={styles.titlenprice}>
        { this.state.isDesc ? (
          <>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={{width: 348}}
              onChangeText={this.saveDesc}/>
            <Button title="save" onPress={this.setDesc} />
          </>
        ) : (
          <>
            <Text style={{width: 353.5}}>{this.state.listing.description}</Text>
            <Button onPress={this.setDesc} title="edit" />
          </>
        )}
        </View>
        <View style={styles.mapView}>
          <MapView
            style={{borderRadius: 20, height: height - 250, width: width - 15}}
            ref={map => this.map = map}
            initialRegion={{
              latitude: 32.0805,
              longitude: 34.7794,
              latitudeDelta: 0.0615,
              longitudeDelta: 0.0281,
            }}
            onLongPress={this.addMarker}
          >

            {this.state.listing.location
              ? <Marker
                  coordinate={{
                    latitude: 1*this.state.listing.lat,
                    longitude: 1*this.state.listing.lon,
                  }}
                  title={this.state.listing.title}
                />
              : null}

          </MapView>
        </View>
        <View style={styles.details}>
          <Text>Details:</Text>
          { this.state.isFloor ? (
            <View style={styles.detailsField}>
              <TextInput style={{width: 348}} onChangeText={this.saveFloor}/>
              <Button title="save" onPress={this.setFloor} />
            </View>
          ) : (
            <View style={styles.detailsField}>
              <Text style={{width: 353.5}}>Floor №{this.state.listing.floor}</Text>
              <Button title="edit" onPress={this.setFloor} />
            </View>
          )}
          { this.state.isBFloor ? (
            <View style={styles.detailsField}>
              <TextInput style={{width: 348}} onChangeText={this.saveBFloor}/>
              <Button title="save" onPress={this.setBFloor} />
            </View>
          ) : (
            <View style={styles.detailsField}>
              <Text style={{width: 353.5}}>floors in building: {this.state.listing.buildingFloor}</Text>
              <Button title="edit" onPress={this.setBFloor} />
            </View>
          )}
          { this.state.isBalcony ? (
            <View style={styles.detailsField}>
              <TextInput style={{width: 348}} onChangeText={this.saveBalcony}/>
              <Button title="save" onPress={this.setBalcony} />
            </View>
          ) : (
            <View style={styles.detailsField}>
              <Text style={{width: 353.5}}>balcony: {this.state.listing.balcony}</Text>
              <Button title="edit" onPress={this.setBalcony} />
            </View>
          )}
        </View>
        <View style={styles.btns}>
          <Button title="Back" onPress={this.backToListing}/>
          <Button title="Save Changes" onPress={this.saveChanges} />
          <Button title="Swiped" onPress={()=> this.cameraOn(this.state.cameraInfo)}  />
          <Button title="Delete" />
        </View>
        {this.state.isBackToListing ? <Redirect to="/yourlisting" /> : null}
        {this.state.isLooking ? <Redirect to="/theLock" /> : null}
      </ScrollView>
    );
  }
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
  titlenprice: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,

    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mapView: {
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  details : {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  detailsField: {
    flex: 1,
    flexDirection: 'row',
  },
  btns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
