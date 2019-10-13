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
import {CreateAcc} from '../ft/network';
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

  setName = name => this.setState({name});
  setDescription = description => this.setState({description});
  setEmail = email => this.setState({email});
  setPhone = phone => this.setState({phone});
  move2two = () => this.scroll.scrollTo({x: width, duration: 1000});
  move2three = () => this.scroll.scrollTo({x: width * 2, duration: 1000});
  move2four = () => this.scroll.scrollTo({x: width * 3, duration: 1000});

  createAcc = () => CreateAcc(this.state).then(r=> console.log(r)).then(()=>this.setState({isCreated: true}))

  render() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={node => this.scroll = node}
      >
        <View style={styles.container}>
          <Text style={this.state.fontLoaded ? styles.title : null}>
            Your name
          </Text>
          <TextInput
            value={this.state.name}
            placeholder="name"
            onChangeText={this.setName}
            placeholderTextColor="#227"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.move2two}
            disabled={this.state.name ? false : true}
          >
            <Text style={{fontSize: 25}}>&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={this.state.fontLoaded ? styles.title : null}>
            Tell us smth about yourself
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
            onPress={this.move2three}
            disabled={this.state.description ? false : true}
          >
            <Text style={{fontSize: 25}}>&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={this.state.fontLoaded ? styles.title : null}>
            Your email
          </Text>
          <TextInput
            value={this.state.email}
            placeholder="email"
            multiline={true}
            numberOfLines={10}
            onChangeText={this.setEmail}
            placeholderTextColor="#227"
            style={styles.descriptionInput}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.move2four}
            disabled={this.state.email ? false : true}
          >
            <Text style={{fontSize: 25}}>&gt;&gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={this.state.fontLoaded ? styles.title : null}>
            Your phone
          </Text>
          <TextInput
            value={this.state.phone}
            placeholder="phone"
            multiline={true}
            numberOfLines={10}
            onChangeText={this.setPhone}
            placeholderTextColor="#227"
            style={styles.descriptionInput}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.createAcc}
            disabled={this.state.phone ? false : true}
          >
            <Text
              style={
                this.state.fontLoaded
                  ? {fontSize: 25, fontFamily: 'GrandHotel-Regular'}
                  : null
              }
            >
              Create account
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.isCreated ? <Redirect to="/alllistings" /> : null}
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
