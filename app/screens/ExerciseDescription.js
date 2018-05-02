import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Alert} from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import Button from 'react-native-button'
import FlatListItem from '../data/FlatListItem'
import PrehabApi from '../services/PrehabApi';

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

  onFinalOk = () => {
    let { params } = this.props.navigation.state;
    let taskId = params.id;

    Alert.alert(
      'Confirmação',
      'Pretende confirmar que executou esta tarefa?',
      [
        {text: 'Não', onPress: () => {}, style: 'cancel'},
        {text: 'Sim', onPress: () => {
          
          Alert.alert(
            'Dificuldades',
            'Teve alguma dificuldade em executar esta tarefa?',
            [
              { text: 'Não', onPress: () => {
                console.log("CLICKED");
                this.prehabApi.executeTaskWithoutDifficulties(taskId, true)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code === 200) {
                      this.props.navigation.navigate('ExerciseFinal', {value: 1});
                    } else {          
                    }
                }).catch(error => {
                    console.error(error);
                });

              }, style: 'cancel'},

              { text: 'Sim', onPress: () => {
                this.prehabApi.executeTaskWithDifficulties(taskId, true, "")
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code === 200) {
                      this.props.navigation.navigate('ExerciseFinal', {value: 1});
                    } else {          
                    }
                }).catch(error => {
                    console.error(error);
                });
              }},
            ],
            { cancelable: false }
          )
        }},
      ],
      { cancelable: false }
    )
  }

  onFinalNotOk = () => {
    let { params } = this.props.navigation.state;
    let taskId = params.id;

    Alert.alert(
      'Confirmação',
      'Pretende confirmar que não executou esta tarefa?',
      [
        {text: 'Não', onPress: () => {}, style: 'cancel'},
        {text: 'Sim', onPress: () => {
            
          Alert.alert(
            'Dificuldades',
            'Não executou esta tarefa porque teve alguma dificuldade?',
            [
              {text: 'Não', onPress: () => {

                this.prehabApi.executeTaskWithoutDifficulties(taskId, false)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code === 200) {
                      this.props.navigation.navigate('ExerciseFinal', {value: -1});
                    } else {          
                    }
                }).catch(error => {
                    console.error(error);
                });

              }, style: 'cancel'},
              { text: 'Sim', onPress: () => {

                this.prehabApi.executeTaskWithDifficulties(taskId, false, "")
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.code === 200) {
                      this.props.navigation.navigate('ExerciseFinal', {value: -1});
                    } else {          
                    }
                }).catch(error => {
                    console.error(error);
                });
              }},
            ],
            { cancelable: false }
          )
        }},
      ],
      { cancelable: false }
    )
  }

  onBack = () => {
    this.props.navigation.navigate('ExerciseScreen');
  }

  render() {

    const { params } = this.props.navigation.state;
    
    const id = params ? params.id : null;
    const title = params ? params.title : null;
    const description = params ? params.description : null;
    const multimediaURL = params ? params.multimediaURL : null;
    const status = params ? params.status : null;
    const taskType = params ? params.taskType : null;

    return (
    <View style={styles.containerBack}>  
      <Text style={styles.title}>{title}</Text>  

      <Text style={{padding: 10, fontSize: 25}}>
        {description}
      </Text>
      
      <View style={styles.multimediaContainer}>
        <Image 
          style={styles.itemIcon}
          source={{uri: multimediaURL}}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.containerB}>
          <Button
          style={styles.buttonContainerC}
          onPress={() => this.onFinalOk()}>
            Cumprido
          </Button>
          
          <Button
          style={styles.buttonContainerF}
          onPress={() => this.onFinalNotOk()}>
            Não Cumprido
          </Button>
        </View>
      </View>
    </View>  
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop:10,
    marginBottom: 20,
    color:'#323BEA'
  },
  containerBack: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerB: {
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
    width: Dimensions.get('window').width * 0.6,
    height: 250,
    resizeMode: 'contain',
  },
  multimediaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});