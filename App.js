import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './app/config/AppText';
import { NavigationStack } from './app/config/router';


export default class App extends React.Component {
  render() {
    return <NavigationStack />;
  }
}
