import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Axios from "axios";
import * as RootNavigation from './nav';
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
import HeaderBtns from "./headerBtns";

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class RedItem extends React.Component {

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
        return <></>
    }

    return (
      
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
        <Image style={styles.icon} source={require("./img/arrow.png")}></Image>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 45,
      width: 350,
      flexDirection: "row",
      height: 62,
      backgroundColor: "#F4F6FA",
      borderBottomWidth: 1,
      borderBottomColor: "#E6D0FC"   
    },
    text: {
        marginTop: 20,
        marginBottom: 20,
        color: "#EB2F51",
        fontSize: 18,
        fontFamily: "prompt"
    },
    icon: {
        
    }
  
  });

