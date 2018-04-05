import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableHighlight, FlatList, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Text from '../config/AppText';
import flatListData from '../data/flatListData';
import PropTypes from 'prop-types';
import FlatListItem from '../data/FlatListItem';
import { Dimensions } from 'react-native';

export class ExerciseScreen extends Component {

  render() {

    const dayExercises = flatListData.map((day, i) => { 
      return (
        <View key={i} style={styles.slide}>
          <Text style={styles.title}>Exercício físico</Text>
          <Text style={styles.title}>{day.date}</Text>
          
          <View style={styles.list}>
            <FlatList 
              data={day.exercises}
              keyExtractor={(item, index) => 'list-item-${index}'}
              renderItem={ ({item}) => {
                return (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      key={"exerciseDescription"}
                      onPress={() => this.onDescription()}
                      style={styles.item}
                    >
                      <FlatListItem item={item}></FlatListItem>
                    </TouchableOpacity>
                  </View>
                );
              }}
            >
            </FlatList>
          </View>
          
        </View>
      );
    });

    return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons showsPagination={false}>
        {dayExercises}
      </Swiper>
    </View>
    );
  }

  onDescription = () => {
    this.props.navigation.navigate('ExerciseDescription');
  }

}

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width * 0.6,
    borderWidth: 1,
    borderColor: "lightgray",
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '300',
    marginTop:10,
    marginBottom: 20,
    color:'#323BEA'
  },
  flatListItem: {
    color:'#323BEA',
    padding: 10,
    fontSize: 23, 
    textAlign: 'center' 
  },
  externalView: {
    flex: 1,
    flexDirection:'row',
    margin: 8
  },
  internalView: {
    flex: 1,
    flexDirection:'row',            
    backgroundColor: '#F8F9FE'
  },
  viewText: {
    flex: 1,
    flexDirection:'column',   
    height: 42
  },
  imageView: {
    width: 32, 
    height: 32, 
    margin: 5,
    alignContent:'flex-end'
  },
  wrapper: {
  },
  slide: {
  },
});
