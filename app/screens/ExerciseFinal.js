import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity,Dimensions} from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import Button from 'react-native-button'
import FlatListItem from '../data/FlatListItem'

import { NavigationActions } from 'react-navigation';

export class ExerciseFinal extends React.Component {

    onBack = () => {
        this.props.navigation.navigate('ExerciseScreen');
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerLeft: ( 
            <TouchableOpacity
                key={"alert"}
                onPress={() => navigation.navigate('ExerciseScreen')}
            >
            <Image
            resizeMode='cover'
            style={styles.headerLeft}
            source={require('../assets/img/arrow_left.png')}
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
    
    render() {
        const { params } = this.props.navigation.state;
        const value = params ? params.value : null;

        var myShowsDone = ['Boa!', 'Continue assim!', 'Assim mesmo!', 'É este o caminho!','Parabéns!', 'Muito bem!', 'Estás a ficar um atleta!', 'Já falta pouco, boa!','És um guerreiro!'];
        var showDone = myShowsDone[Math.floor(Math.random() * myShowsDone.length)];
        var myShowsNotDone = ['Então?', 'Oh, então?', 'Não desistas!', 'Amanhã será melhor!','Já falta pouco, força!', 'Tu consegues!', 'És o melhor, força!'];
        var showNotDone = myShowsNotDone[Math.floor(Math.random() * myShowsNotDone.length)];

        if (value == 1) {
            return (
                <View style={styles.container}>
                <TouchableOpacity
                    key={"exercise"}
                    style={styles.item}
                    onPress={() => this.onBack()}
                >
                <Text style={styles.text}>{showDone}</Text>   
                <Image
                    style={styles.itemIcon}
                    source={require('../assets/img/accomplished.png')}
                />
                </TouchableOpacity>
                </View>  
            );
        } else {
            return (
                <View style={styles.container}>
                <TouchableOpacity
                    key={"exercise"}
                    style={styles.item}
                    onPress={() => this.onBack()}
                >
                <Text style={styles.text}>{showNotDone}</Text>   
                <Image
                    style={styles.itemIcon}
                    source={require('../assets/img/notAccomplished.png')}
                />
                </TouchableOpacity>
                </View>  
            );
        }

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
    container: {
        flex: 1,
        fontSize:32,
        backgroundColor: '#fff',
        alignItems: 'center',
        color: '#FE005C',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize:32,
        color: '#FE005C',
    },
    imageView: {
        width: 32, 
        height: 32, 
        margin: 5,
        alignContent:'flex-end'
      },

});
