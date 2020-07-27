import React, { Component, useRef } from 'react';
import {  View, Text,TouchableWithoutFeedback, Image, StyleSheet,  Dimensions } from 'react-native';
import * as Font from 'expo-font';
import * as RootNavigation from './nav';

import HomeIcon from "./homeIcon.jsx";
import BetsIcon from './betsIcon.jsx';
import HistoryIcon from './historyIcon.jsx';
import CardIcon from './cardIcon.jsx';
import SettingsIcon from './settingsIcon.jsx';
import ExitIcon from "./exitIcon.jsx";
import SurvivorIcon from "./survivorIcon.jsx";

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
          <View>
          <View style={styles.row}>
              <Image style={styles.profileIcon} source={require('./img/profile.png')}/>
              <View style={styles.col}>
              <Text style={styles.iconText}>{this.props.name}</Text>
              <Text style={styles.balanceText}>${this.props.balance}</Text>
              </View>
          </View>
          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate("Main"); this.props.menuHandler;}}>
          <View style={styles.row}>
              <HomeIcon style={styles.menuIcon}/>
              <Text style={styles.iconText}>Home</Text>
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate("MyBets"); this.props.menuHandler;}}>
          <View style={styles.row}>
              <BetsIcon style={styles.menuIcon}/>
              <Text style={styles.iconText}>My bets</Text>
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate("Survivor"); this.props.menuHandler;}}>
          <View style={styles.row}>
              <SurvivorIcon style={styles.menuIcon}/>
              <Text style={styles.iconText}>Survivor games</Text>
          </View>
          </TouchableWithoutFeedback>
          <View style={styles.row}>
              <HistoryIcon style={styles.menuIcon} />
              <Text style={styles.iconText}>Betting history</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate('Settings'); this.props.menuHandler;}}>
              <View style={styles.row}>
              <SettingsIcon style={styles.menuIcon} />
              <Text style={styles.iconText}>Settings</Text>
              </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate("Deposit"); this.props.menuHandler;}}>
          <View style={styles.row}>
              <CardIcon style={styles.menuIcon} />
              <Text style={styles.iconText}>Make a deposit</Text>
          </View>
          </TouchableWithoutFeedback>
          </View>

          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate("Deposit"); this.props.menuHandler;}}>
          <View style={styles.row}>
              <ExitIcon style={styles.menuIcon} />
              <Text style={styles.iconText}>Log out</Text>
          </View>
          </TouchableWithoutFeedback>
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
      position: "absolute",
      justifyContent: "space-between"
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
    },
    col: {
      marginLeft: 16
    },
    balanceText: {
      color: "#131C3E",
      opacity: 0.4,
      fontFamily: "prompt",
      fontSize: 14
    }
   
    
   
  });

  export default Menu;