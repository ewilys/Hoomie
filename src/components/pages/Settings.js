import React, { Component } from 'react';
import {screenStyle} from "../../utils/constants";
import {ScrollView,Text} from "react-native";

class SettingsScreen extends Component {
  render() {
    return (
      <ScrollView style={screenStyle}>
        <Text style={{flex:1,textAlign:'center'}}> In progress </Text>
      </ScrollView>
    );
  }
}

export default SettingsScreen;
