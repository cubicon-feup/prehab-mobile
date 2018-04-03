import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import { HomeScreen } from './app/screens/HomeScreen';
//import { StackNavigator } from 'react-navigation';
import { NavigationStack } from './app/config/router';


export default class App extends React.Component {
  render() {
    return <NavigationStack />;
  }
}
