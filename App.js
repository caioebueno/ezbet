
import jwtDecode from "jwt-decode";
import * as React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, Button, Platform, StyleSheet, Text, View, Dimensions, StatusBar, TextInput, AsyncStorage } from "react-native";
import SignupScreen from "./components/header";
import LoginScreen from "./components/login";
import PorfileScreen from "./components/profile";
import MatchScreen from "./components/match";
import DepositScreen from "./screen/deposit";
import MainScreen from "./screen/main.js";
import PersonalScreen from "./screen/personal";
import ChangePassScreen from "./screen/changePass";
import SettingsScreen from "./components/settings";
import SurvivorScreen from "./screen/survivor.js";
import SurvivorActScreen from './screen/survivorAct.js';
import MyBets from "./screen/myBets.js";
import Support from "./screen/support.js";
import Terms from "./screen/terms.js";
import SurviveAdvance from "./screen/surviveAdvance.js";
import PaymentHistory from "./screen/paymentHistory";
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from "./components/nav";
import { ThemeColors } from "react-navigation";

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
        <Stack.Screen name="Survivor" component={SurvivorScreen} />
        <Stack.Screen name="SurvivorAct" component={SurvivorActScreen} />
        <Stack.Screen name="Deposit" component={DepositScreen} />
        <Stack.Screen name="Personal" component={PersonalScreen} />
        <Stack.Screen name="ChangePass" component={ChangePassScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Profile" component={PorfileScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="MyBets" component={MyBets} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
        <Stack.Screen name="SurviveAdvance" component={SurviveAdvance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

