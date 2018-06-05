import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableHighlight, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import moment from "moment";
import Text from '../config/AppText';
import flatListNutrition from '../data/flatListNutrition';
import PropTypes from 'prop-types';
import Panel from '../data/Panel';
import PrehabApi from '../services/PrehabApi';

export class NutritionScreen extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: ( 
        <TouchableOpacity
            key={"alert"}
            onPress={() => navigation.navigate('DrawerOpen')}
        >
        <Image
        resizeMode='cover'
        style={styles.headerLeft}
        source={require('../assets/img/menu.png')}
        />
        </TouchableOpacity>
    ),
    headerTitle: (
        <Image
        resizeMode='cover'
        style={styles.headerTitle}
        source={require('../assets/img/logo_1_alt.png')}
        /> 
    ),
    headerStyle: {backgroundColor:'#F8F9FE',borderColor:'#F8F9FE'}, 
    headerTintColor: '#000000', 
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1,fontSize: 24,fontWeight: "normal",width: "35%" },
    headerRight: (
        <TouchableOpacity
            key={"alert"}
            onPress={() => navigation.navigate('AlertScreen')}
        >
        <Image
        resizeMode='cover'
        style={styles.headerRight}
        source={require('../assets/img/alarm.png')}
        /> 
        </TouchableOpacity>
    ),

})
constructor(props){
  super(props);
  this.state = { isLoading: true, initialIndex: 0}
  this.prehabApi = new PrehabApi();
  }

  componentDidMount(){
    this.prehabApi.getPrehabPlan()
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code === 200) {

        let index = 0, priorIndex = 0;

        Object.entries(responseJson.data.meal_schedule).map((exercises, i) => { 
          const unorderedSchedule = responseJson.data.meal_schedule;
          const ordered = {};
          
          Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
            ordered[key] = unorderedSchedule[key];
          });
    
          let date = Object.keys(ordered)[i];

          if (moment(date).isSame(moment(), 'day')) {
            index = i;
          } else if (moment().diff(moment(date)) > 0) {
            priorIndex = i;
          }

        });

        if (index === 0) {
          index = priorIndex;
        }

        this.setState({
          isLoading: false,
          mealSchedule: responseJson.data.meal_schedule,
          initialIndex: index,
        }, function(){
        });

      } else {          
      }
    }).catch(error => {
        console.error(error);
    });
  }

  sortDate(a, b) {
    return new Date(a).getTime() - new Date(b).getTime();
  }

  render() {

    if (this.state.isLoading) {
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" style={styles.activityIndicator} color="#FE005C"/>
        </View>
      )
    }

    const dayExercises = Object.entries(this.state.mealSchedule).map((exercises, i) => { 

      const orderedSchedule = {};
      const unorderedSchedule = this.state.mealSchedule;
      Object.keys(unorderedSchedule).sort(this.sortDate).forEach(function(key) {
        orderedSchedule[key] = unorderedSchedule[key];
      });

      let date = Object.keys(orderedSchedule)[i];
      let meals = orderedSchedule[date];
      
      //let sortedMeals = {};
      meals.sort(function(a, b) { 
        return a.id - b.id;
      });

      return (
        <View key={i} style={styles.slide}>
        <Text style={styles.title}>Nutrição</Text>
        <Text style={styles.data}>{date}</Text>
        <FlatList 
              style = {{marginBottom: Dimensions.get('window').width * 0.30}}
              data={meals}
              keyExtractor={(item, index) => 'scroll-view-${index}'}
              renderItem={ ({item}) => {
                return (
                <View style={styles.list}>
                    <Panel title = {item['meal_order']}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: .5, flexDirection: 'column'}} >
                          <Text style={styles.list_sub_header}> Alimentos: </Text>
                          <Text style={styles.list_item}> {item['description']}</Text>
                        </View>
                      </View>
                    </Panel>
                </View>
                );
        }}    
        />
        </View>
      );
    });

    return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper}
              showsButtons
              showsPagination={false}
              loop={false}
              nextButton={<Text style={styles.buttonText}>›</Text>}
              prevButton={<Text style={styles.buttonText}>‹</Text>}
              index={this.state.initialIndex}
      >
        {dayExercises}
      </Swiper>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    list_item: {
      fontSize: 16,
      color: '#4B5FE7',
      marginLeft: 20,
      marginBottom: 20,
    },
    list_sub_header: {
      fontSize: 17,
      fontWeight :'bold',
      color: '#4B5FE7',
      marginLeft: 20,
    },
    buttonText: {
        color: '#FE005C',
        fontSize: 50,
    },
    headerLeft: {
      margin: 10,
      width: 24,
      height: 24,
      resizeMode: 'contain',
      alignSelf: 'center'
    },
    headerTitle: {
        flex:1,
        fontWeight: 'normal',
        width: 85,
        height: Dimensions.get('window').width * 0.09,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerRight: {
        margin: 8,
        width: 24,
        height: 24,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    item: {
      width: Dimensions.get('window').width * 0.8,
      borderWidth: 2,
      borderColor: '#BCE0FD',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:50,
      overflow: 'hidden',
      margin: 2,
    },
    list: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: '#FFFFFF',
    },
    title: {
      textAlign: 'center',
      fontSize: 32,
      fontWeight: '300',
      marginTop:10,
      marginBottom: 5,
      color:'#323BEA'
    },
    data: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '300',
      marginTop:5,
      marginBottom: 20,
      color:'#323BEA'
    },
    wrapper: {  
    },
    slide: {
    },
    activityIndicatorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
    }
  });