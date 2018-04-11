import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';

export class AlertScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Alert Screen!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});