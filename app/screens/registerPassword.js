import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Alert,Image, TextInput,KeyboardAvoidingView} from 'react-native';
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
                <Image source={require('../img/sj.png')} style={styles.logo}/>
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
                    placeholder = "Novo Password"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                />

                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Confirmar Password"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                />

                <Button buttonStyle={{ marginTop: 5 }} backgroundColor="#03A9F4"
                    title="Registar Password"
                    onPress={() => {
                        if(this.state.password!=""&this.state.confirmPassword!=""&this.state.usercode!=""){
                            this.passwordValidation(this.state.usercode,this.state.password,this.state.confirmPassword);
                        }else{
                            Alert.alert('Preenche todos os campos');
                        }
                        
                    }}
                />
                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="transparent"
                    textStyle={{ color: "#bcbec1" }}
                    title="Cancelar"
                    onPress={() => this.props.navigation.navigate("SignIn")}
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
      width: 152
   },
});