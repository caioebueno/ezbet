import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class SingleBet extends React.Component {

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
        <Text style={styles.matchText}>{this.props.type}</Text>
        <View style={styles.row}>
            <Text style={styles.teamText}>{this.props.team}</Text><Text style={styles.oddsText}>{this.props.odds}</Text>
        </View>
            <Text style={styles.matchUpText}>{this.props.team1} - {this.props.team2}</Text>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: {
        width: 350,
        
        borderBottomColor:"rgba(230,208,252,0.2)",
        borderBottomWidth: 1,
        flexDirection: "column",
       paddingBottom: 20,
       paddingTop: 20
      },
      row: {
          flexDirection: "row",
          justifyContent:"space-between"
      },
      matchText: {
          color: "rgba(255, 255, 255, 0.4)",
          fontSize: 12,
          fontFamily: "prompt",
          paddingBottom: 5
      },
      teamText: {
          color:"#fff",
          fontSize: 18,
          fontFamily: "prompt",
          paddingBottom: 5
      },
      oddsText: {
          color: "#fff",
          fontFamily: "prompt-medium",
          fontSize: 18
      },
      matchUpText: {
          color: "#fff",
          fontFamily: "prompt",
          fontSize: 12
      }
  });

