import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';

export class PersonalProfileScreen extends React.Component {

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
    super(props)
    this.state = { user: ''}
  }  

async retrieveItem() {
    try {
      let retrievedItem =  await AsyncStorage.getItem('user');
      let item = JSON.parse(retrievedItem);
        this.setState({user:item})
    } catch (error) {
      console.log(error.message);
    }
  }

  componentWillMount(){
    this.retrieveItem();
  }  

  render() {
    return (
      <View style={styles.container}>
        <Image
        resizeMode='cover'
        style={styles.icon}
        source={require('../assets/img/person.png')}
        /> 
        <Text style={styles.titulo}>{this.state.user}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        color: '#323BEA',
        fontSize: 18,
        textAlign: 'center',
        margin: Dimensions.get('window').width * 0.05,
    },
    icon:{
        alignSelf: 'center',
        height: Dimensions.get('window').width * 0.25,
        width: Dimensions.get('window').width * 0.25,
        marginTop: Dimensions.get('window').width * 0.15,
    },
    ajuda:{
        color: '#FE005C',
        fontSize: 25,
        textAlign: 'left',
        margin: Dimensions.get('window').width * 0.025,
        marginLeft: Dimensions.get('window').width * 0.075,
    },
    texto:{
        color: '#323BEA',
        fontSize: 25,
        textAlign: 'center',
        margin: Dimensions.get('window').width * 0.025,
        marginLeft: Dimensions.get('window').width * 0.1,
        marginRight: Dimensions.get('window').width * 0.1,
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});