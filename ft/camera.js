import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo';
import {Redirect} from 'react-router-native';

const {height, width} = Dimensions.get('window');

export default class CameraExample extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    cameraOff: true,
  };

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  turnCamera = () =>
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });

  backToDetails = () =>
    this.props.isCameraOn(this.state.cameraOff)

  render() {
    console.log(this.state);
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{ height: 150, width: width, backgroundColor: 'black'}} />
          <Camera style={{flex: 1, height: height-200, width: width}} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={this.turnCamera}
              >
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  Flip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.takePhoto}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  borderWidth: 3,
                  borderColor: 'white',
                  marginRight: 50,
                  marginLeft: 50,

                  flex: 0.2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
              <Text style={{
                height: 40,
                width: 40,
                backgroundColor: 'white',
                textAlign: 'center',
                borderRadius: 20,
              }}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.backToDetails}
              >
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
            <View style={{ height: 150, width: width, backgroundColor: 'black'}} />
        </View>
      );
    }
  }
}
