import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import FlatListItem from '../data/FlatListItem';
import PrehabApi from '../services/PrehabApi';
import TaskButtons from './TaskButtons';

import { NavigationActions } from 'react-navigation';

export class ExerciseDescription extends React.Component {

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

  constructor(props) {
    super(props);
    this.prehabApi = new PrehabApi();
  }

  resetNavigation(targetRoute, taskExecution) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }, {value: taskExecution}),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  onBack = () => {
    this.props.navigation.navigate('ExerciseScreen');
  }

  render() {

    const { params } = this.props.navigation.state;
    
    const id = params ? params.id : null;
    const view = params ? params.viewOnly : null;
    const dataReal = params ? params.data : null;
    const dataActualReal = params ? params.dataAtual : null;
    const title = params ? params.title : null;
    const description = params ? params.description : null;
    const multimediaURL = params ? params.multimediaURL : null;
    const status = params ? params.status : null;
    const taskType = params ? params.taskType : null;

    return (
      <View style={styles.containerBack}> 
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>  

            <View style={styles.multimediaContainer}>
              <Image 
                style={styles.itemIcon}
                source={{uri: multimediaURL}}
              />
            </View>

            <Text style={styles.ExerciseDescription}>
              {description}
            </Text>
        </ScrollView>

        <TaskButtons {...this.props}></TaskButtons>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    
  },
  ExerciseDescription: {
    margin: Dimensions.get('window').width * 0.045,
    fontSize: 20,
    marginTop: 20,
    color: '#4B5FE7',
    textAlign: 'center',
    alignSelf: 'center'
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
  internalView: {
    flex: 1,
    alignContent:'center',
    flexDirection:'row',          
    height: 25
  },
  opacity: {
    height: 50
  },
  externalView: {
    flex: 1,
    flexDirection:'row',
  },
  imageView: {
    width: 23, 
    height: 23, 
    margin: 5,
    alignContent:'flex-end'
  },
  flatListItem: {
    color:'#323BEA',
    padding: 1,
    fontSize: 23, 
    flexDirection:'row',  
    textAlign: 'center' 
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '300',
    marginTop:10,
    marginBottom: 20,
    color:'#323BEA'
  },
  data: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 10,
    marginBottom: 20,
    color:'#323BEA'
  },
  containerBack: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  container: {
    borderTopColor: '#BCE0FD',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerB: {
    marginTop: 5,
    flexDirection:'row',
    justifyContent: 'flex-start',
  },
  buttonContainerC: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    fontSize: 20, 
    width: 160,
    color: '#2699FB',
    backgroundColor: '#B7F8DB',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  buttonContainerF: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    fontSize: 20, 
    width: 160,
    color: '#FFFFFF',
    backgroundColor: '#FE005C',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  buttonContainerR: {
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    fontSize: 20, 
    width: 220,
    color: '#FFFFFF',
    backgroundColor: '#FE005C',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  itemIcon: {
    width: Dimensions.get('window').width * 0.9,
    height: 250,
    resizeMode: 'contain',
  },
  multimediaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});