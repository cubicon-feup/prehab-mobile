import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableHighlight, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import Text from '../config/AppText';
import flatListData from '../data/flatListData';
import PropTypes from 'prop-types';
import FlatListItem from '../data/FlatListItem';
import { Dimensions } from 'react-native';
import PrehabApi from "../services/PrehabApi";

export class ExerciseScreen extends Component {

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
        source={require('../assets/img/logo_1.png')}
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
    this.state = { isLoading: true}
    this.prehabApi = new PrehabApi();
  }

  componentDidMount(){
    
    this.prehabApi.getPrehabPlan()
    .then((response) => response.json())
    .then((responseJson) => {
        if (responseJson.code === 200) {
          this.setState({
            isLoading: false,
            taskSchedule: responseJson.data.task_schedule,
          }, function(){
          });

        } else {          
        }
    }).catch(error => {
        console.error(error);
    });
  }

  render() {

    if (this.state.isLoading) {
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size = "large" style = {styles.activityIndicator}/>
        </View>
      )
    }

    const dayExercises = Object.entries(this.state.taskSchedule).map((exercises, i) => { 
      let date = Object.keys(this.state.taskSchedule)[i];
      let tasks = this.state.taskSchedule[date];

      return (
        <View key={i} style={styles.slide}>
          <Text style={styles.title}>Exercício físico</Text>
          <Text style={styles.data}>{date}</Text>
          <View style={styles.list}>
            <FlatList 
              data={tasks}
              keyExtractor={(item, index) => 'list-item-${index}'}
              renderItem={ ({item}) => {
                return (
                  <View style={styles.itemContainer}>
                    <TouchableOpacity
                      key={"exerciseDescription"}
                      onPress={() => this.props.navigation.navigate('ExerciseDescription',{
                        id: item['id'],
                        title: item['title'],
                        description: item['description'],
                        multimediaURL: item['multimedia_link'],
                        status: item['status'],
                        taskType: item['task_type']
                      })}
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

  onDescription = () => {
    this.props.navigation.navigate('ExerciseDescription',{dia:day.date});
    
  }
}

const styles = StyleSheet.create({
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
      fontWeight: 'normal',
      width: 85,
      height: 85,
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
  flatListItem: {
    color:'#323BEA',
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
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});
