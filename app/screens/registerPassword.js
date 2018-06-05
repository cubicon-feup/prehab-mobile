import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Alert, Image, TextInput, KeyboardAvoidingView, Dimensions} from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onRegisterPassword } from "../config/auth";
import PrehabApi from '../services/PrehabApi';

export default class RegisterPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usercode:'',
            password:'',
            confirmPassword:'',
        };
        this.baseState = this.state;
        this.prehabApi = new PrehabApi();
    }

    clearInput(){
        this.setState(this.baseState);
    }

    passwordValidation(usercode, password, confirmPassword){        
        if(password == confirmPassword){
            this.prehabApi.registerPassword(usercode, password)
            .then(response => {
                if (response.status === 200){
                    onRegisterPassword().then(() => {
                        Alert.alert(
                            'Ativação bem sucedida',
                            'A tua conta foi ativada com sucesso. Já podes entrar com a tua nova palavra-passe.',
                            [
                                {text: 'OK', onPress: () => this.props.navigation.navigate("SignIn")},
                            ],
                            { cancelable: false }
                        )
                    });
                } else {
                   alert('Operação não efetuada');                
                }
            }).catch(error => {
                console.error(error);
            });
        }else{
            alert('Password não são iguais');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image source={require('../assets/img/sj.png')} style={styles.logo}/>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Código de Acesso"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.usercode}
                    onChangeText={(usercode) => this.setState({usercode})}
                />
                    
                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Nova palavra-passe"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />

                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Confirmar palavra-passe"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                />

                <Button 
                    buttonStyle={styles.button}
                    containerViewStyle={{width: '100%',paddingLeft:13,paddingRight:13,alignItems:"center"}}
                    backgroundColor="#B7F8DB"
                    textStyle={{ color: "#7AC4FF", fontSize: 20}}
                    title="Registar"
                    onPress={() => {
                        if(this.state.password!=""&this.state.confirmPassword!=""&this.state.usercode!=""){
                            this.passwordValidation(this.state.usercode,this.state.password,this.state.confirmPassword);
                        }else{
                            Alert.alert('Preenche todos os campos');
                        }
                        
                    }}
                />

                <Text style={{color:'#7AC4FF',marginTop: 25, marginBottom:10, fontSize: 20}}>Já estás registado?
                </Text>
                <Button 
                    buttonStyle={styles.button}
                    containerViewStyle={{width: '100%',paddingLeft:13,paddingRight:13,alignItems: "center"}}
                    backgroundColor="#B7F8DB"
                    textStyle={{ color: "#7AC4FF", fontSize: 20}}
                    title="Entrar"
                    onPress={() => this.props.navigation.navigate("SignIn")}
                />
            </KeyboardAvoidingView>
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