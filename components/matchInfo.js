import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class MatchInfo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        loadingFont: true
    }
  }

 
  UNSAFE_componentWillMount(){
    Font.loadAsync({
      'prompt': require('../assets/fonts/Prompt-Regular.ttf'),
      'prompt-bold': require("../assets/fonts/Prompt-Bold.ttf"),
      'prompt-semiBold': require("../assets/fonts/Prompt-SemiBold.ttf")
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
        <View style={styles.row}>
            <View style={styles.teamView}></View>
            <Text style={styles.teamText}>{this.props.team1}</Text>
          </View>
          <View style={styles.row}>
          <Text style={styles.text}>{this.props.date}</Text>
          <Text style={styles.notShow}>{this.props.team1}</Text>
          </View>
          <View style={styles.row}>
              <View style={styles.teamView}></View>
              <Text style={styles.teamText}>{this.props.team2}</Text>
          </View>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingLeft: 50,
        paddingRight: 50

    },
    row: {
        width: 100,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around"
    },
    teamView: {
        height: 80,
        width: 80,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "#E6D0FC"
    },
    text: {
        fontSize: 14,
        fontFamily: "prompt",
        color: "rgba(19,28,62, 0.6)"
    },
    teamText: {
        color: "#131C3E",
        fontSize: 16,
        fontFamily: "prompt-semiBold",
        textAlign: "center",
        paddingTop: 10
    },
    notShow: {
      // visibility: "hidden"
    }
  
  });

