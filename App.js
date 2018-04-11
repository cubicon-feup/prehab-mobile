import React, { Component } from 'react';
import { NavigationStack } from './app/config/router';
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation'
import { HomeScreen } from './app/screens/HomeScreen';
import { ExerciseScreen } from './app/screens/ExerciseScreen';
import DrawerMenu from './app/data/DrawerMenu';

const Drawer = DrawerNavigator(
  {
    Main: { screen: NavigationStack }
  },
  {
    contentComponent: DrawerMenu,
    drawerWidth: Dimensions.get('window').width * 0.5,
    drawerPosition: 'left',
  }
);

export default Drawer;

