import React,{Component} from 'react';
import {StyleSheet,View,Image,TouchableHighlight,Animated,Dimensions} from 'react-native';
import Text from '../config/AppText';
import PrehabApi from '../services/PrehabApi';

class Panel extends Component{
    constructor(props){
        super(props);

        this.icons = {
            'up'    : require('../assets/img/arrow_up.png'),
            'down'  : require('../assets/img/arrow_down.png')
        };

        this.state = {
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value()
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event) {
       if (!this.state.maxHeight) {
         this.setState({
           maxHeight: event.nativeEvent.layout.height,
         });
       }
     }

     _setMinHeight(event) {
       if (!this.state.minHeight) {
         this.setState({
           minHeight: event.nativeEvent.layout.height,
           animation: new Animated.Value(event.nativeEvent.layout.height),
         });
       }
     }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
            <Animated.View
                style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <View style={styles.externalView}>            
                        <View style={styles.internalView}>  
                            <View style={styles.viewText}>
                                <Text style={styles.header}>{this.state.title}</Text>
                            </View>
                         </View>
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}>
                        </Image>
                    </TouchableHighlight>
                </View>
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>
            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
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
        margin:2,
        borderRadius:50,
        borderWidth: 2,
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
    }
});

export default Panel;