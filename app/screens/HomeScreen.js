import React from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity, Image, Icon} from 'react-native';
import Text from '../config/AppText';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export class HomeScreen extends React.Component {

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
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity
                    key={"exercise"}
                    style={styles.item}
                    onPress={() => this.onExercise()}
                >   
                    <View style={styles.circle}>
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/exercicio.png')}
                    />
                    </View>
                    <Text style={styles.itemTitle}>
                        {"Exercício"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={"nutrition"}
                    style={styles.item}
                    onPress={() => this.onNutrition()}
                >   
                    <View style={styles.circle}>
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/nutricao.png')}
                    />
                    </View>
                    <Text style={styles.itemTitle}>
                        {"Nutrição"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={"alerts"}
                    style={styles.item}
                    onPress={() => this.onAlert()}
                >
                    <View style={styles.circle}>
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/agenda.png')}
                    />
                    </View>
                    <Text style={styles.itemTitle}>
                        {"Alertas"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    key={"help"}
                    style={styles.item}
                    onPress={() => this.onHelp()}
                >
                    <View style={styles.circle}>
                    <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/ajuda.png')}
                    />
                    </View>
                    <Text style={styles.itemTitle}>
                        {"Ajuda"}
                    </Text>
                </TouchableOpacity>     
            </View>
        </ScrollView>
    );
  }

    onExercise = () => {
        this.props.navigation.navigate('ExerciseScreen');
    }

    onNutrition = () => {
        this.props.navigation.navigate('NutritionScreen');
    }

    onAlert = () => {
        this.props.navigation.navigate('AlertScreen');
    }

    onHelp = () => {
        this.props.navigation.navigate('HelpScreen');
    }
}

var styles = StyleSheet.create({
    circle: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.45,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:100,
        margin: 2,
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
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        width: Dimensions.get('window').width * 0.5,
        height: 300,
        borderWidth: 1,
        backgroundColor: "#F8F9FE",
        borderColor: "#F8F9FE",
        alignItems: 'center',
        justifyContent: 'center'        
    },
    itemIcon: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    itemTitle: {
        color: '#323BEA',
        fontWeight: 'normal',
        marginTop: 16,
        fontSize: 30,
    },
});