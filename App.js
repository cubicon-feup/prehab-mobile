import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './app/config/AppText';
import { NavigationStack } from './app/config/router';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  render() {
    return <NavigationStack />

    ;
  }
}
