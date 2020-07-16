import React, { Component, useRef } from 'react';
import { Button, View, Text,ImageBackground,TouchableWithoutFeedback, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage, TouchableHighlightBase } from 'react-native';
import * as Font from 'expo-font';
import * as RootNavigation from './nav';
import bet from "./img/bets.png";
import calendar from "./img/calendar.png";
import history from "./img/history.png";
import setting from "./img/setting.png";
import deposit from "./img/deposit.png";

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

class Menu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loadingFont: true
    }
  }

  UNSAFE_componentWillMount(){
    Font.loadAsync({
      'prompt': require('../assets/fonts/Prompt-Regular.ttf'),
      'prompt-bold': require("../assets/fonts/Prompt-Bold.ttf")
    })
    .then(() => {
      this.setState({
        loadingFont: false
      })
    })
  }


  render(){

    if(this.state.loadingFont){
      return  <></>
    }

    return (
      <View style={styles.container}>
          
          <View styles={styles.row2}>
              <View><Image style={styles.profileIcon} source={require("./img/profile.png")}></Image></View>
              <Text style={styles.iconText}>{this.props.name}</Text>
          </View>
          <View style={styles.row}>
              <Image source={bet} style={styles.menuIcon}></Image>
              <Text style={styles.iconText}>My bets</Text>
          </View>
          <View style={styles.row}>
              <Image source={calendar} style={styles.menuIcon}></Image>
              <Text style={styles.iconText}>Calendar</Text>
          </View>
          <View style={styles.row}>
              <Image source={history} style={styles.menuIcon}></Image>
              <Text style={styles.iconText}>Betting history</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate('Settings'); console.log("settings")}}>
              <View style={styles.row}>
              <Image source={setting} style={styles.menuIcon}></Image>
              <Text style={styles.iconText}>Settings</Text>
              </View>
          </TouchableWithoutFeedback>
          <View style={styles.row}>
              <Image source={deposit} style={styles.menuIcon}></Image>
              <Text style={styles.iconText}>Make a deposit</Text>
          </View>
       </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
        width:width,
        height: height,
      backgroundColor: "#F4F6FA",
      padding: 20,
      flexDirection: "column",
      zIndex: 0,
      position: "absolute"
    },
    row: {
        flexDirection: "row",
        paddingTop: 22,
        paddingBottom: 22,
        alignItems: "center"
    },
    iconText: {
        fontSize: 18,
        color: "#131C3E",
        fontFamily: "prompt"
    },
    profileIcon: {
      width: 44,
      height: 44
    },
    menuIcon: {
      marginRight: 30
    },
    row2: {
      flexDirection: "column",
      width: width
    }
   
    
   
  });

  export default Menu;