import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Alert,Image, TextInput,KeyboardAvoidingView} from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import {onSignIn } from "../auth";

export default class Login extends React.Component {
    static navigationOptions = {
        title:'Autenticação',
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
        };
        this.baseState = this.state;
    }
    
    clearInput(){
        this.setState(this.baseState);
    }
    _onSignIn (password){
        if(password=="silva"){
            onSignIn().then(() => this.state.password = '',this.props.navigation.navigate("SignedIn"));
        }else{
            this.clearInput();
            Alert.alert('Password errado');
            
        }
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image source={require('../img/sj.png')} style={styles.logo}/>
                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />

                <Button
                buttonStyle={{ marginTop: 5 }}
                backgroundColor="#03A9F4"
                title="Entrar"
                onPress={() => {
                    if(this.state.password!=""){
                        this._onSignIn(this.state.password);
                    }else{
                        Alert.alert('Introduza a sua password')
                    }
                }}
                />
                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Registar Password"
                    onPress={() => this.props.navigation.navigate("RegisterPwd")}
                />
                <View style={{height: 160}}/>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      margin: 10,
      padding:5,
      height: 40,
      width: 252,
      borderColor: '#000',
      borderWidth: 1
   },
   logo:{
      height:152,
      width: 152,
   },
});