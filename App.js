import React, { Component } from 'react';
import { NavigationStack } from './app/config/router';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation'
import { HomeScreen } from './app/screens/HomeScreen';
import { ExerciseScreen } from './app/screens/ExerciseScreen';
import DrawerMenu from './app/data/DrawerMenu';

import { createRootNavigator } from './app/config/router';
import { isSignedIn } from "./app/config/auth";

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}