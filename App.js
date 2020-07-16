
import jwtDecode from "jwt-decode";
import * as React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, Button, Platform, StyleSheet, Text, View, Dimensions, StatusBar, TextInput, AsyncStorage } from "react-native";
import SignupScreen from "./components/header";
import LoginScreen from "./components/login";
import PorfileScreen from "./components/profile";
import MatchScreen from "./components/match";
import MainScreen from "./components/main";
import SettingsScreen from "./components/settings";
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from "./components/nav";

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

const Stack = createStackNavigator();

export default function App() {
  
return (
      <NavigationContainer ref={navigationRef}>
      <Stack.Navigator   screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={PorfileScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

