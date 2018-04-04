import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, FlatList, Image, TouchableOpacity } from 'react-native';

import flatListData from '../data/flatListData';

class FlatListItem extends Component {
  render() {          
      return (        
          <View style={styles.externalView}>            
              <View style={styles.internalView}>            
                  <View style={styles.viewText}>            
                          <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                  </View>  
                  <Image 
                      //source={{uri: this.props.item.imageUrl}}
                      source={require('../assets/img/move.png')}
                      style={styles.imageView}
                  />
              </View>
              <View style={styles.whiteView}>
              </View>
        </View>
      );
  }
}

export class ExerciseScreen extends Component {

  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercício físico</Text>
      <FlatList 
      data={flatListData}
      renderItem={({item, index})=>{
          return (
            <TouchableOpacity
                    key={"description"}
                    onPress={() => this.onDescription()}
            >
          <FlatListItem item={item} index={index}>

          </FlatListItem>
          </TouchableOpacity>);
      }}
      >
      </FlatList>
    </View>
    );
  }

  onDescription = () => {
    this.props.navigation.navigate('ExerciseDescription');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '300',
    marginTop:10,
    marginBottom: 20,
    color:'#323BEA'
  },
  flatListItem: {
    color:'#323BEA',
    padding: 10,
    fontSize: 16, 
    textAlign: 'center' 
  },
  externalView: {
    flex: 1,
    flexDirection:'row'
  },
  internalView: {
    flex: 1,
    flexDirection:'row',            
    backgroundColor: '#F8F9FE'
  },
  viewText: {
    flex: 1,
    flexDirection:'column',   
    height: 42
  },
  imageView: {
    width: 32, 
    height: 32, 
    margin: 5,
    alignContent:'flex-end'
  },
  whiteView: {
    height: 1,
    backgroundColor:'white'                            
  }
});
