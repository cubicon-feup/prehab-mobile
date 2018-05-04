import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';

export class HelpScreen extends React.Component {

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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Ajuda</Text>
        <Text style={styles.ajuda}>Precisa de ajuda?</Text>
        <Text style={styles.texto}>Não se preocupe pode contactar directamente o hostital ou o seu médico.</Text>
        <Text style={styles.texto}>+351 22x xxx xxx</Text>
        <Text style={styles.texto}>+351 22x xxx xxx</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    titulo:{
        color: '#323BEA',
        fontSize: 32,
        textAlign: 'center',
        margin: Dimensions.get('window').width * 0.025,
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