import React from 'react';
import { StackNavigator } from 'react-navigation';

import { HomeScreen } from '../screens/HomeScreen';
import { ExerciseScreen } from '../screens/ExerciseScreen';
import { NutritionScreen } from '../screens/NutritionScreen';
import { ExerciseDescription } from '../screens/ExerciseDescription';
import { ExerciseFinal } from '../screens/ExerciseFinal';
import Text from '../config/AppText';

export const NavigationStack = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Prehab',
        },
    },
    ExerciseScreen: {
        screen: ExerciseScreen,
        navigationOptions: {
            title: 'Exercício',
        },
    },
    NutritionScreen: {
        screen: NutritionScreen,
        navigationOptions: {
            title: 'Nutrição',
        },
    },
    ExerciseDescription: {
        screen: ExerciseDescription,
        navigationOptions: {
            title: 'Exercício',
        },
    },
    ExerciseFinal: {
        screen: ExerciseFinal,
        navigationOptions: {
            title: 'Exercício',
        },
    },
});