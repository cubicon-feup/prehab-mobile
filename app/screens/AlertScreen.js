import React from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Image, Icon, Dimensions, TouchableHighlight} from 'react-native';
import Text from '../config/AppText';
import PercentageCircle from 'react-native-percentage-circle';
import PropTypes from 'prop-types';

export class AlertScreen extends React.Component {

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
  });

  render() {
    return (
    <View style={styles.containerGeneral}>
        <Text style={styles.titulo}>Alertas</Text>
        <Text style={styles.data}>27/02/18</Text>
        <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <View style={styles.externalView}>            
                        <View style={styles.internalView}>  
                            <View style={styles.viewText}>
                                <Text style={styles.header}>Caminhar 10 min</Text>
                            </View>
                         </View>
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        //onPress={this.toggle.bind(this)}
                        >
                        <Image
                            style={styles.buttonImage}
                            source={require('../assets/img/tick.png')}>
                        </Image>
                    </TouchableHighlight>
                </View>
        </View>
        <View style={styles.graphBox}>
              <Text style={styles.texto}>Tarefas realizadas hoje:</Text>  
                <View style={styles.graph}>
                  <PercentageCircle radius={42} percent={50} color={"#FE005C"} borderWidth={8} textStyle={{fontSize: 24, color: '#323BEA'}}></PercentageCircle>
                </View>
              <Text style={styles.texto}>Continue com o bom trabalho!</Text>
        </View>    
    </View>
    );
  }
}

const styles = StyleSheet.create({
    externalView: {
        flex: 1,
        flexDirection:'row',
        margin: 8
    },
    internalView: {
        flex: 1,
        flexDirection:'row',            
    },
    header: {
      color:'#323BEA',
      padding: 4,
      marginBottom: 20,
      marginLeft:8,
      fontSize: 20, 
      flexDirection: 'row',
    },
    viewText: {
        flex: 1,
        flexDirection:'column',   
        height: 42
      },
    container   : {
        width: Dimensions.get('window').width * 0.80,
        marginLeft: Dimensions.get('window').width * 0.1,
        margin:2,
        borderRadius:50,
        borderWidth: 2,
        backgroundColor: '#F8F9FE',
        borderColor: '#BCE0FD',
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row',
        textAlign: 'center'  
    },
    title : {
        flex    : 1,
        padding : 10,
        color   :'#323BEA',
    },
    buttonImage : {
        width: 32, 
        height: 32, 
        margin: 12,
        alignContent:'flex-end'
    },
    body: {
        width: Dimensions.get('window').width * 1.5,
    },
    graphBox: {
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: Dimensions.get('window').width * 0.65,
    },
    data: {
        color: '#7AC4FF',
        fontSize: 14,
        margin: Dimensions.get('window').width * 0.018,
        marginLeft: Dimensions.get('window').width * 0.1,
    },
    alertaBoxCheck: {
        margin: Dimensions.get('window').width * 0.04,
        width: 18,
        height: 18,
        justifyContent: 'flex-end',
    },
    alertaBoxText:{
        color: '#FE005C',
        fontSize: 18,
        margin: Dimensions.get('window').width * 0.04,
    },
    alertaBox:{
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth: 1,
        backgroundColor: '#F8F9FE',
        borderColor: '#323BEA',
        borderRadius:50,
        overflow: 'hidden',
        width: Dimensions.get('window').width * 0.8,
    },
    graph:{
        alignSelf: 'center'
    },
    titulo:{
        color: '#323BEA',
        fontSize: 32,
        textAlign: 'center',
        margin: Dimensions.get('window').width * 0.025,
    },
    texto:{
        color: '#7AC4FF',
        fontSize: 12,
        textAlign: 'center',
        margin: Dimensions.get('window').width * 0.025,
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
    containerGeneral: {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height,
    },
});