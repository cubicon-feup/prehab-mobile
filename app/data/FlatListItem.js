import React, { Component } from 'react';
import { StyleSheet, View, ListView, TouchableHighlight, FlatList, Image, TouchableOpacity } from 'react-native';
import Text from '../config/AppText';
import moment from "moment";
import PropTypes from 'prop-types';
import PrehabApi from "../services/PrehabApi";

export default class FlatListItem extends Component {

    render() {
      if (this.props.item.status === "Pending" && this.props.data < this.props.dataAtual) {
        return (        
          <View style={styles.externalView}>            
              <View style={styles.internalView}>            
                  <View style={styles.viewText}>
                    <Text style={styles.flatListItem}>
                      {this.props.item.title}
                    </Text>
                  </View>  
                  <Image 
                      source={require('../assets/img/warning.png')}
                      style={styles.imageView}
                  />
              </View>
          </View>
        );
      } else if (this.props.item.status === "Pending") {
        return (        
          <View style={styles.externalView}>            
              <View style={styles.internalView}>            
                  <View style={styles.viewText}>
                    <Text style={styles.flatListItem}>
                      {this.props.item.title}
                    </Text>
                  </View>  
                  <Image 
                      source={require('../assets/img/arrow_right.png')}
                      style={styles.imageView}
                  />
              </View>
          </View>
        );
      } else if (this.props.item.status === "Completed") {
        return (        
          <View style={styles.externalView}>            
              <View style={styles.internalView}>            
                  <View style={styles.viewText}>
                    <Text style={styles.flatListItem}>
                      {this.props.item.title}
                    </Text>
                  </View>  
                  <Image 
                      source={require('../assets/img/checked.png')}
                      style={styles.imageView}
                  />
              </View>
          </View>
        );
      } else {
        return (        
          <View style={styles.externalView}>            
              <View style={styles.internalView}>            
                  <View style={styles.viewText}>
                    <Text style={styles.flatListItem}>
                      {this.props.item.title}
                    </Text>
                  </View>  
                  <Image 
                      source={require('../assets/img/unchecked.png')}
                      style={styles.imageView}
                  />
              </View>
          </View>
        );
      }
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
      marginBottom: 10,
      color:'#323BEA'
    },
    flatListItem: {
      color:'#323BEA',
      padding: 10,
      marginBottom: 5,
      fontSize: 20, 
      flexDirection: 'row',
    },
    externalView: {
      flex: 1,
      flexDirection:'row',
      margin: 8
    },
    internalView: {
      flex: 1,
      flexDirection:'row',            
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
  });