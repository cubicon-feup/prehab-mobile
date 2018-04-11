import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { ExerciseScreen } from '../screens/ExerciseScreen';
import { NutritionScreen } from '../screens/NutritionScreen';
import { ExerciseDescription } from '../screens/ExerciseDescription';
import { ExerciseFinal } from '../screens/ExerciseFinal';
import { AlertScreen } from '../screens/AlertScreen';
import { DrawerNavigator } from 'react-navigation';
import { HelpScreen } from '../screens/HelpScreen';
import { StyleSheet, Platform, View, Image, TouchableOpacity, YellowBox, Dimensions } from 'react-native';


import Text from '../config/AppText';

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
