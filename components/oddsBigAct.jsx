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
        color: "#E6D0FC",
        fontSize: 14,
        fontFamily: "prompt"
      },
      oddsNum: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        fontFamily: "prompt"
      },
      oddCheck: {
        width: 149,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#8013EF",
        borderWidth: 1,
        borderColor: "#E6D0FC",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15
    
      }
  
  });

