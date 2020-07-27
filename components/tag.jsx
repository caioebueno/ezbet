import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';



var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class Tag extends React.Component {

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
      
    <View style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        <Text style={[styles.tagText, {color: this.props.color}]}>{this.props.text}</Text>
    </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: {
        width: "auto",
        borderRadius: 8,
        paddingRight: 4,
        paddingLeft: 4,
        paddingTop: 6,
        paddingBottom: 6
    },
   
  });

