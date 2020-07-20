import React, { Component, useRef } from 'react';
import { Button,TouchableWithoutFeedback, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Main from "./main";
import Axios from "axios";
import { withNavigation } from 'react-navigation';
import * as RootNavigation from './nav';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class HeaderBtns extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      name: "",
      email: "",
      password: "",
      createStatus: null,
      props: this.props
    }
  }

 


  

  render(){
    return (
      
      <View style={styles.container}>

          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate('Main')}}><View><Image style={styles.icon} source={require("./img/menu.png")}></Image></View></TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate('Profile')}}><View><Image style={styles.icon} source={require("./img/profile.png")}></Image></View></TouchableWithoutFeedback>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
      width: width,
      paddingTop: 25,
      paddingLeft: 25,
      paddingRight: 25,
      paddingBottom: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    icon:{
        width:44,
        height: 44
    }
   
  });

