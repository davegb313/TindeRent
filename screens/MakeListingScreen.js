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
import {CreateListing} from '../ft/network';
import * as Font from 'expo-font';
import MapView, {Marker} from 'react-native-maps';
import Geohash from 'latlon-geohash';

const {height, width} = Dimensions.get('window');

class MakeListingScreen extends React.Component {
  state = {};

  async componentDidMount() {
    await Font.loadAsync({
      'GrandHotel-Regular': require('../assets/fonts/GrandHotel-Regular.ttf'),
    });

    this.setState({fontLoaded: true});
  }

  addMarker = event => {
    let geohash = Geohash.encode(
      event.nativeEvent.coordinate.latitude,
      event.nativeEvent.coordinate.longitude,
      6,
    );
    console.log(event.nativeEvent.coordinate, geohash);
    this.setState({
      geohash,
      marker: event.nativeEvent.coordinate,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  setTitle = title => this.setState({title});
  setDescription = description => this.setState({description});
  move2 = () => this.scroll.scrollTo({x: width, duration: 1000});
  move3 = () => this.scroll.scrollTo({x: width * 2, duration: 1000});

  createListing = () => CreateListing(this.state).then(r=> console.log(r)).then(()=>this.setState({isRenting: true}))

  render() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={node => this.scroll = node}
      >
        <View style={styles.container}>
          <Text style={this.state.fontLoaded ? styles.title : null}>
            Type here a title of your posting
          </Text>
          <TextInput
            value={this.state.title}
            placeholder="title"
            onChangeText={this.setTitle}
            placeholderTextColor="#227"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.move2}
            disabled={this.state.title ? false : true}
          >
            <Text style={{fontSize: 25}}>&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={this.state.fontLoaded ? styles.title : null}>
            Type here a description of your posting
          </Text>
          <TextInput
            value={this.state.description}
            placeholder="description"
            multiline={true}
            numberOfLines={10}
            onChangeText={this.setDescription}
            placeholderTextColor="#227"
            style={styles.descriptionInput}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.move3}
            disabled={this.state.description ? false : true}
          >
            <Text style={{fontSize: 25}}>&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={this.state.fontLoaded ? styles.title : null}>
            Where is your place located?
          </Text>
          <MapView
            style={{borderRadius: 20, height: height - 250, width}}
            ref={map => this.map = map}
            initialRegion={{
              latitude: 32.0805,
              longitude: 34.7794,
              latitudeDelta: 0.0615,
              longitudeDelta: 0.0281,
            }}
            onLongPress={this.addMarker}
          >

            {this.state.geohash
              ? <Marker
                  coordinate={this.state.marker}
                  title={this.state.title}
                />
              : null}

          </MapView>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.createListing}
            disabled={this.state.geohash ? false : true}
          >
            <Text
              style={
                this.state.fontLoaded
                  ? {fontSize: 25, fontFamily: 'GrandHotel-Regular'}
                  : null
              }
            >
              Create posting
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.isRenting ? <Redirect to="/yourlisting" /> : null}
      </ScrollView>
    );
  }
}
export default MakeListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 25,
    width: 412,
  },
  button: {
    height: 60,
    width: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#c9f5f5',
    alignItems: 'center',
    borderRadius: 30,
  },
  title: {
    fontFamily: 'GrandHotel-Regular',
    textAlign: 'center',
    fontSize: 40,
  },
  input: {
    width: 300,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  descriptionInput: {
    width: 300,
    height: 150,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  submitButton: {
    height: 60,
    width: 260,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#c9f5f5',
    alignItems: 'center',
    borderRadius: 30,
  },
});
