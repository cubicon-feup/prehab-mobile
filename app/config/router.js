import React, { Component } from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ExerciseScreen } from '../screens/ExerciseScreen';
import { NutritionScreen } from '../screens/NutritionScreen';
import { ExerciseDescription } from '../screens/ExerciseDescription';
import { ExerciseFinal } from '../screens/ExerciseFinal';
import { AlertScreen } from '../screens/AlertScreen';
import { DrawerNavigator } from 'react-navigation';
import { HelpScreen } from '../screens/HelpScreen';
import { StyleSheet, Platform, View, Image, TouchableOpacity, YellowBox, Dimensions, StatusBar } from 'react-native';
import { FontAwesome } from "react-native-vector-icons";

import RegisterPassword from "../screens/registerPassword";
import SignIn from "../screens/login";

import Text from '../config/AppText';

import DrawerMenu from '../data/DrawerMenu';

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const NavigationStack = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
        },
    },
    ExerciseScreen: {
        screen: ExerciseScreen,
        navigationOptions: {
        },
    },
    NutritionScreen: {
        screen: NutritionScreen,
        navigationOptions: {
        },
    },
    ExerciseDescription: {
        screen: ExerciseDescription,
        navigationOptions: {
        },
    },
    ExerciseFinal: {
        screen: ExerciseFinal,
        navigationOptions: {
        },
    },
    AlertScreen: {
        screen: AlertScreen,
        navigationOptions: {
        },
    },
    HelpScreen: {
        screen: HelpScreen,
        navigationOptions: {
        },
    },
});

export const Register = StackNavigator(
    {
      RegisterPwd:{
        screen: RegisterPassword,
      }
    },
    {
      headerMode: 'none'
    },
);
export const SignedOut = StackNavigator(
    {
        SignIn: {
            screen: SignIn
        }
    },
    {
      headerMode: 'none'
    },
);

export const SignedIn = DrawerNavigator(
    {
      Main: { screen: NavigationStack }
    },
    {
      contentComponent: DrawerMenu,
      drawerWidth: Dimensions.get('window').width * 0.5,
      drawerPosition: 'left',
    }
);

export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            },
            RegisterPss:{
                screen: Register
            },
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};
