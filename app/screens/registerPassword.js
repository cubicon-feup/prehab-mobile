import React from 'react';
import { StyleSheet, Text,Button, View } from 'react-native';
import { Image,TextInput,KeyboardAvoidingView} from 'react-native';

export default class RegisterPassword extends React.Component {
    static navigationOptions = {
        title:'Registar Password',
    }; 
    constructor(props) {
        super(props);
        this.state = {
            usercode: '',
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
            return this.savePassword(usercode,password);
        }
        
        return false;
    }

    savePassword(usercode,password){
        return true;
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
                    onChange={(usercode)=>{this.setState({usercode})}}
                />
                    
                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Novo Password"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChange={(password)=>{this.setState({password})}}
                />

                <TextInput style = {styles.input}
                    secureTextEntry={true}
                    underlineColorAndroid = "transparent"
                    placeholder = "Confirmar Password"
                    placeholderTextColor = "#ccc"
                    autoCapitalize = "none"
                    value={this.state.confirmPassword}
                    onChange={(confirmPassword)=>{this.setState({confirmPassword})}}
                />

                <Button
                buttonStyle={{ marginTop: 5 }}
                backgroundColor="#03A9F4"
                title="Registar"
                onPress={() => {
                    if(this.state.password!=""&this.state.confirmPassword!=""&this.state.usercode!=""){
                        if(this.passwordValidation(this.state.usercode,this.state.password,this.state.confirmPassword)){
                            this.props.navigation.navigate("SignIn");
                        }else{
                            this.clearInput();
                            alert('Palavra passe introduzidas não são iguais');
                        }
                    }else{
                        alert('Preenche todos os campos');
                    }
                    
                }}
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