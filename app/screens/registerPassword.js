import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Alert,Image, TextInput,KeyboardAvoidingView,Dimensions} from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

export default class RegisterPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usercode:'',
            password:'',
            confirmPassword:'',
        };
        this.baseState = this.state;
    }

    clearInput(){
        this.setState(this.baseState);
    }

    passwordValidation(usercode,password,confirmPassword){        
        if(password==confirmPassword){
            fetch('http://ec2-35-176-153-210.eu-west-2.compute.amazonaws.com/api/user/activate/', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activation_code: usercode.toString(),
                    password: password.toString(),
                }),
            }).then(response => {
                if(response.status === 200){
                    onSignIn().then(() => this.props.navigation.navigate("SignIn"));
                }else{
                   alert('Operação não Efetuada');                
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
                    textStyle={{ color: "#7AC4FF"}}
                    title="Registar"
                    onPress={() => {
                        if(this.state.password!=""&this.state.confirmPassword!=""&this.state.usercode!=""){
                            this.passwordValidation(this.state.usercode,this.state.password,this.state.confirmPassword);
                        }else{
                            Alert.alert('Preenche todos os campos');
                        }
                        
                    }}
                />
                <Text style={{color:'#7AC4FF',marginTop:30}}>Já se encontra registado?      <Text style={{color:'#7AC4FF',textDecorationLine: 'underline'}} onPress={() => this.props.navigation.navigate("SignIn")}>
                    Entrar
                </Text></Text>
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