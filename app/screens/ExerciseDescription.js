import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import Button from 'react-native-button'
import FlatListItem from '../data/FlatListItem'

export class ExerciseDescription extends React.Component {

  _handlePress() {
    console.log('Pressed!');
  }

  render() {
    return (
    <View style={styles.containerBack}>  
      <Text style={styles.title}>Exercício físico</Text>
        <View style={styles.externalView}>      
          <View style={styles.internalView}>  
            <Image 
              source={require('../assets/img/arrow_left.png')}
              style={styles.imageView}
            />          
            <View style={styles.viewText}>
              <Text style={styles.flatListItem}>Nome do Exercício</Text>
            </View>  
        </View>
      </View>
      <View style={styles.container}>
        <Button
        style={styles.buttonContainerR}
        onPress={() => this._handlePress()}>
        Reportar dificuldade
        </Button>
        <View style={styles.containerB}>
        <Button
        style={styles.buttonContainerC}
        onPress={() => this._handlePress()}>
        Cumprido
        </Button>
        <Button
        style={styles.buttonContainerF}
        onPress={() => this._handlePress()}>
        Não Cumprido
        </Button>
        </View>
      </View>
    </View>  
    );
  }
}

const styles = StyleSheet.create({
  internalView: {
    flex: 1,
    flexDirection:'row',            
    backgroundColor: '#F8F9FE',
    height: 42
  },
  externalView: {
    flex: 1,
    flexDirection:'row',
    margin: 8
  },
  imageView: {
    width: 32, 
    height: 32, 
    margin: 5,
    alignContent:'flex-end'
  },
  flatListItem: {
    color:'#323BEA',
    padding: 10,
    fontSize: 23, 
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
    margin: 10
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
  }
});