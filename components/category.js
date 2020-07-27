import React, { Component, useRef } from 'react';
import { Button, View, Text,ImageBackground,TouchableWithoutFeedback, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';

import * as Font from 'expo-font';


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

class Category extends React.Component {

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
         <Text style={styles.emoji}>{this.props.emoji}</Text>
         <Text style={styles.sport}>{this.props.sport}</Text>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
        flexDirection: "column",
        justifyContent: "center",
        width: 100,
        height: 100,
        borderRadius: 15,
        backgroundColor: "#ffffff",
        marginLeft: 10
    },
    emoji: {
        fontSize: 20,
        textAlign: "center",
        paddingBottom: 5
    },
    sport: {
        fontSize: 15,
        textAlign: "center",
        fontFamily: "prompt-bold"
    }
   
   
  });

  export default Category;