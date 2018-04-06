import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Text from '../config/AppText';
import PropTypes from 'prop-types';
import Button from 'react-native-button'
import FlatListItem from '../data/FlatListItem'

export class ExerciseDescription extends React.Component {

  onFinalOk = () => {
    this.props.navigation.navigate('ExerciseFinal', {value: 1});
  }

  onFinalNotOk = () => {
    this.props.navigation.navigate('ExerciseFinal', {value: 0});
  }

  onBack = () => {
    this.props.navigation.navigate('ExerciseScreen');
  }

  render() {

    const { params } = this.props.navigation.state;
    const dia = params ? params.dia : null;
    const name = params ? params.name : null;
    const descricao = params ? params.descricao : null;

    return (
    <View style={styles.containerBack}>  
      <Text style={styles.title}>Exercício físico</Text>  
      <Text style={styles.data}>{dia}</Text>
        <TouchableOpacity
              key={"description"}
              onPress={() => this.onBack()}
              style={styles.opacity}
            >   
        <View style={styles.externalView}> 
          <View style={styles.internalView}>  
            <Image 
              source={require('../assets/img/arrow_left.png')}
              style={styles.imageView}
            />          
            <View style={styles.viewText}>
              <Text style={styles.flatListItem}>{name}</Text>
            </View> 
          </View>
      </View>
      </TouchableOpacity>  
      <View style={styles.container}>
        <Button
        style={styles.buttonContainerR}
        onPress={() => this.onFinalNotOk()}>
        Reportar dificuldade
        </Button>
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
  }
});