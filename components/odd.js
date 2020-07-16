import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class Odds extends React.Component {

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
      
    <View style={styles.oddCheck}>
        <Text style={styles.sideNum}>{this.props.position}</Text>
        <Text style={styles.oddsNum}>{this.props.odds}</Text>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    sideNum: {
        color: "#131C3E",
        fontSize: 14,
        fontFamily: "prompt"
      },
      oddsNum: {
        color: "#8013EF",
        fontWeight: "bold",
        fontSize: 14,
        fontFamily: "prompt"
      },
      oddCheck: {
        width: 94,
        height: 48,
        borderRadius: 16,
        backgroundColor: "rgba(128, 19, 239, 0.05)",
        borderWidth: 1,
        borderColor: "#E6D0FC",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15
    
      }
  
  });

