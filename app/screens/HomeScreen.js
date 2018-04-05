import React from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Image } from 'react-native';
import Text from '../config/AppText';
import { Dimensions } from 'react-native';

export class HomeScreen extends React.Component {
  render() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity
                    key={"exercise"}
                    style={styles.item}
                    onPress={() => this.onExercise()}
                >
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/cardiogram.png')}
                    />
                    <Text style={styles.itemTitle}>
                        {"Exercício"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={"nutrition"}
                    style={styles.item}
                    onPress={() => this.onNutrition()}
                >
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/restaurant.png')}
                    />
                    <Text style={styles.itemTitle}>
                        {"Nutrição"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={"alerts"}
                    style={styles.item}
                    //onPress={() => this.onExercise()}
                >
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/alarm.png')}
                    />
                    <Text style={styles.itemTitle}>
                        {"Alertas"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={"help"}
                    style={styles.item}
                    //onPress={() => this.onExercise()}
                >
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/ambulance.png')}
                    />
                    <Text style={styles.itemTitle}>
                        {"Ajuda"}
                    </Text>
                </TouchableOpacity>     
            </View>
        </ScrollView>
    );
  }

  onExercise = () => {
      this.props.navigation.navigate('ExerciseScreen');
  }

  onNutrition = () => {
      this.props.navigation.navigate('NutritionScreen');
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: Dimensions.get('window').width * 0.5,
        height: 300,
        borderWidth: 1,
        borderColor: "lightgray",
        alignItems: 'center',
        justifyContent: 'center'        
    },
    itemIcon: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    itemTitle: {
        marginTop: 16,
        fontSize: 30,
    },
});