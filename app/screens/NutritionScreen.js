import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableHighlight, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import Text from '../config/AppText';
import flatListNutrition from '../data/flatListNutrition';
import PropTypes from 'prop-types';
import Panel from '../data/Panel';

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
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    let apiRoute;
  }

  render() {
    const dayExercises = flatListNutrition.map((day, i) => { 
      return (
        <View key={i} style={styles.slide}>
        <Text style={styles.title}>Nutrição</Text>
        <Text style={styles.data}>{day.date}</Text>
        <FlatList 
              data={day.exercises}
              keyExtractor={(item, index) => 'scroll-view-${index}'}
              renderItem={ ({item}) => {
                return (
                <View style={styles.list}>
                    <Panel title = {item['name']}>
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
        >
        </FlatList>
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
  });