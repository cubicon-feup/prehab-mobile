import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import Button from 'react-native-button'
import FlatListItem from '../data/FlatListItem'

export class ExerciseFinal extends React.Component {

    onBack = () => {
        this.props.navigation.navigate('ExerciseScreen');
    }

    render() {

        const { params } = this.props.navigation.state;
        const value = params ? params.value : null;

        if(value==1){
            return (
                <View style={styles.container}>
                <TouchableOpacity
                    key={"exercise"}
                    style={styles.item}
                    onPress={() => this.onBack()}
                >
                <Text style={styles.text}>Boa!</Text>   
                <Image
                        style={styles.itemIcon}
                        source={require('../assets/img/accomplished.png')}
                />
                </TouchableOpacity>
                </View>  
            );
        }
        else{
            return (
                <View style={styles.container}>
                <TouchableOpacity
                    key={"exercise"}
                    style={styles.item}
                    onPress={() => this.onBack()}
                >
                <Text style={styles.text}>Então?</Text>   
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
