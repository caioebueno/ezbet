import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Axios from "axios";
import * as RootNavigation from './nav';
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
import HeaderBtns from "./headerBtns";


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class mediumHeader extends React.Component {

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
          <HeaderBtns />
            <Text style={styles.title} >{this.props.title}</Text>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
      width: width,
      flexDirection: "column",
      height: 158,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      backgroundColor: "#131C3E",
     
    
      
    },
    title: {
        fontSize: 24,
        color: "#fff",
        paddingLeft: 25,
        fontFamily: "prompt-bold"
    }
  
  });

