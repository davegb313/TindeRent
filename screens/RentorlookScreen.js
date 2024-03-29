import React from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Redirect} from 'react-router-native';
import {CheckUser} from '../ft/network';

class RentorlookScreen extends React.Component {
  state = {
    user: {},
  };

  renting = () => this.setState({isRenting: true});

  looking = async () => {
    const response = await CheckUser();
      response.length ? this.setState({isExists: true}) : this.setState({isLooking: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Are you renting or looking for a rent?
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.renting}>
          <Image
            style={{width: 150, height: 150}}
            source={{
              uri: 'https://worthrealestate.com.au/wp-content/uploads/2018/07/rent.png',
            }}
          />
          <Text style={styles.btnText}>I'm renting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.looking}>
          <Image
            style={{width: 150, height: 150}}
            source={{
              uri: 'http://apartmentsindianapolis.com/wp-content/uploads/2018/01/The-Best-Time-to-Look-for-New-Apartments.jpg',
            }}
          />
          <Text style={styles.btnText}>I'm looking for a rent</Text>
        </TouchableOpacity>
        {this.state.isRenting ? <Redirect to="/yourlisting" /> : null}
        {this.state.isExists ? <Redirect to="/alllistings" /> : null}
        {this.state.isLooking ? <Redirect to="/makeuser" /> : null}
      </View>
    );
  }
}

export default RentorlookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 25,
  },
  button: {
    width: 190,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#c9f5eb',
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
    textAlign: 'center',
    fontSize: 20,
  },
});
