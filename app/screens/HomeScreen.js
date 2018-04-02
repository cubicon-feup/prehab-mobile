import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export class HomeScreen extends React.Component {
  render() {
    return (
      /*
      <View style={styles.container}>
        <Text>This is the Home screen!</Text>
      </View>*/

      
      <View style={styles.container}>
        <Button
            key={"exercise"}
            title="Exercício"
            color="#841584"
            onPress={() => this.onExercise()}
        />

        <Button
            key={"nutrition"}
            title="Nutrição"
            color="#35CC13"
            onPress={() => this.onNutrition()}
        />
      </View>
    );
  }

  onExercise = () => {
      this.props.navigation.navigate('ExerciseScreen');
  }

  onNutrition = () => {
      this.props.navigation.navigate('NutritionScreen');
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