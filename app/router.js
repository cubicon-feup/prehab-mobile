import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import RegisterPassword from "./screens/registerPassword";
import SignIn from "./screens/login";
import Home from "./screens/home";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const Register = StackNavigator(
  {
    RegisterPwd:{
      screen:RegisterPassword,
    }
  },
  {
    navigationOptions:{
        headerStyle:{
          backgroundColor:'#58678B',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
          fontWeight:'bold',
        },
      },
  }
);
export const SignedOut = StackNavigator(
  {
    SignIn: {
      screen: SignIn
    }
  },
  {
    navigationOptions:{
        headerStyle:{
          backgroundColor:'#58678B',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
          fontWeight:'bold',
        },
      },
  }
);

export const SignedIn = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions :{
        title:'Prehab',
      }
    },
  },
  {
    navigationOptions:{
        headerStyle:{
          backgroundColor:'#58678B',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
          fontWeight:'bold',
        },
      },
  }
);

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      },
      RegisterPss:{
        screen: Register
      },
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};