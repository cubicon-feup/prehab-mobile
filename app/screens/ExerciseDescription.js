import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../config/AppText';

export class ExerciseDescription extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ExerciseDescription</Text>
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