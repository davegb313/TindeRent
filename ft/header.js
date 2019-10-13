import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';

export default class Header extends React.Component {

  render(){
    return(
        <View style={{flex: 0.15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'hotpink'}}>
          <Text style={{fontSize: 20}}>TindeRent</Text>
        </View>
    )
  }
}
