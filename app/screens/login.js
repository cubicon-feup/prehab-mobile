import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Alert, Image, TextInput, KeyboardAvoidingView, Dimensions, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../config/auth";
import PrehabApi from "../services/PrehabApi";

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
        this.prehabApi = new PrehabApi();
    }
    
    clearInput(){
        this.setState(this.baseState);
    }

    _onSignIn(username, password) {
        this.prehabApi.signIn(username, password)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.code === 200) {
                let apiToken = responseJson.data.jwt;
                let prehabId = '' + responseJson.data.prehab_id;
                AsyncStorage.setItem('user', JSON.stringify(username));
                onSignIn(apiToken, prehabId).then(() => this.props.navigation.navigate("SignedIn"));
            } else {
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
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Palavra-passe"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />

                <Button 
                    buttonStyle={styles.button}
                    containerViewStyle={{width: '100%',paddingLeft:13,paddingRight:13,alignItems: "center"}}
                    backgroundColor="#B7F8DB"
                    textStyle={{ color: "#7AC4FF", fontSize: 20}}
                    title="Entrar"
                    onPress={() => {
                        if(this.state.password!=""){
                            this._onSignIn(this.state.username,this.state.password)
                        }else{
                            Alert.alert('Introduza a sua password')
                        }
                    }}
                />

                <Text style={{color:'#7AC4FF', marginTop: 35, marginBottom:10, fontSize: 20}}>Não tens conta?</Text>
                <Button
                    buttonStyle={styles.button}
                    containerViewStyle={{width: '100%',paddingLeft:13,paddingRight:13,alignItems: "center"}}
                    backgroundColor="#B7F8DB"
                    textStyle={{ color: "#7AC4FF", fontSize: 20}}
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
      fontSize: 17,
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
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.5,
    padding:5,
    marginTop:20,
    marginBottom: 25
   },
});