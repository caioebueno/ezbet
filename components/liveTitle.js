import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




class LiveTitle extends React.Component {

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
          <Text style={styles.liveText}>Live Matches</Text><Text style={styles.moreText}>more</Text>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
     width: width,
     flexDirection: "row",
     justifyContent: "space-between",
     paddingTop: 50,
     paddingLeft: 40,
     paddingRight: 40,
     paddingBottom: 30
    },
    liveText: {
        fontSize: 20,
        fontFamily: "prompt",
        color: "#4C5269"
    },
    moreText: {
        fontSize: 20,
        color: "#A7A8AB",
        fontFamily: "prompt",
        textDecorationLine: "underline"
    }
   
  });

  export default LiveTitle;