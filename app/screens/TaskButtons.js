import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableHighlight, FlatList, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Text from '../config/AppText';
import moment from "moment";
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import PrehabApi from '../services/PrehabApi';

export default class TaskButtons extends Component {

    constructor(props) {
        super(props);
        this.prehabApi = new PrehabApi();
    }

    onFinalOk = () => {
        let { params } = this.props.navigation.state;
        let taskId = params.id;
        let dataReal = params.data;
        let dataActualReal = params.dataAtual;
        let view = params.viewOnly;

        if (dataReal === dataActualReal && view === "0") {
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
    }
    
    onFinalNotOk = () => {
        let { params } = this.props.navigation.state;

        let taskId = params.id;
        let dataReal = params.data;
        let dataActualReal = params.dataAtual;
        let view = params.viewOnly;

        if (dataReal === dataActualReal && view === "0") {
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
    }
    
    render() {
        let { params } = this.props.navigation.state;
        let dataReal = params.data;
        let dataActualReal = params.dataAtual;
        let view = params.viewOnly;
        
        if (dataReal === dataActualReal && view === "0") {
            return (
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
            );
        } else {
            return (
            <View style={styles.container}>
                <View style={styles.containerB}>
                    <Button
                    disabled="true"
                    style={styles.buttonContainerDisabled}>
                    Cumprido
                    </Button>
                    
                    <Button
                    disabled="true"
                    style={styles.buttonContainerDisabled}>
                    Não Cumprido
                    </Button>
                </View>
            </View>
            );
        }
    }
}

  const styles = StyleSheet.create({
    contentContainer: {
      
    },
    ExerciseDescription: {
      margin: Dimensions.get('window').width * 0.025,
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
    },
    buttonContainerDisabled: {
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        overflow: 'hidden',
        fontSize: 20, 
        width: 160,
        color: '#A9A9A9',
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        padding: 10,
        margin: 10,
    }
  });