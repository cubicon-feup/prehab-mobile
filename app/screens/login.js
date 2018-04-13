import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Alert,Image, TextInput,KeyboardAvoidingView,Dimensions} from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import {onSignIn} from "../config/auth";

export default class Login extends React.Component {
    static navigationOptions = {
        title:'Autenticação',
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            isLoading: true,
        };
        this.baseState = this.state;
    }
    
    clearInput(){
        this.setState(this.baseState);
    }

    _onSignIn (username,password){
        fetch('http://ec2-35-176-153-210.eu-west-2.compute.amazonaws.com/api/login/', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: username,
            password: password,
            }),
        }).then(response => {
            if(response.status === 200){
                onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
            }else{
                this.clearInput();
                Alert.alert('Utilizador ou Password errado');                
            }
        }).catch(error => {
            console.error(error);
        });
        
    };

    render() {
        return (
            <View style={styles.container} >
                <Image source={require('../assets/img/sj.png')} style={styles.logo}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Utilizador"
                    placeholderTextColor = "#7AC4FF"
                    autoCapitalize = "none"
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Palavra-passe"
                    placeholderTextColor = "#7AC4FF"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />

                <Button 
                    buttonStyle={styles.button}
                    containerViewStyle={{width: '100%',paddingLeft:13,paddingRight:13,alignItems: "center"}}
                    backgroundColor="#B7F8DB"
                    textStyle={{ color: "#7AC4FF"}}
                    title="Entrar"
                    onPress={() => {
                        if(this.state.password!=""){
                            this._onSignIn(this.state.username,this.state.password);
                        }else{
                            Alert.alert('Introduza a sua password')
                        }
                    }}
                />
                <Text style={{color:'#7AC4FF',textDecorationLine: 'underline',marginTop:10,marginBottom:15}}>
                    Esqueci-me da palavra-passe
                </Text>
                <Text style={{color:'#7AC4FF',marginTop:15,marginBottom:10,}}>Não tens conta?</Text>
                <Button
                    buttonStyle={styles.button}
                    containerViewStyle={{width: '100%',paddingLeft:13,paddingRight:13,alignItems: "center"}}
                    backgroundColor="#B7F8DB"
                    textStyle={{ color: "#7AC4FF"}}
                    title="Registar"
                    onPress={() => this.props.navigation.navigate("RegisterPwd")}
                />
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      padding:36
    },
    input: {
      margin: 10,
      padding:15,
      alignSelf: 'stretch',
      height: 48,
      borderColor: '#BCE0FD',
      borderWidth: 2,
      borderRadius:100,
      textAlign: 'center'
   },
   button:{
    width: Dimensions.get('window').width * 0.4,
    minWidth:93,
    height:40,
    borderRadius:100,
   },
   fullWidthButton: {
    flexDirection: 'row',
    height:40,
    borderRadius:100,
   },
   logo:{
      height:135,
      width:135,
      padding:5,
      marginTop:25,
      marginBottom:60
   },
});