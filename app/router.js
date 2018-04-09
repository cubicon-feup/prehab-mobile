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

export const SignedOut = StackNavigator(
  {
    SignIn: {
      screen: SignIn
    },
    RegisterPwd:{
      screen:RegisterPassword,
    }
  },
    {
      headerMode: 'none'
    },
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
          backgroundColor:'#fff',
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
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};