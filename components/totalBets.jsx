import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class TotalBets extends React.Component {

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
      'prompr-medium': require("../assets/fonts/Prompt-Medium.ttf"),
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
           <Text style={styles.smallText}>Total odds</Text><Text style={styles.smallText}>Possible winnings</Text>
       </View>
       <View style={styles.row}>
            <Text style={styles.oddsText}>{this.props.odds}</Text><Text style={styles.winText}>{this.props.win}</Text>
       </View>
       <TextInput style={styles.input} onChangeText={(text) => {this.props.changeText(text)}} value={this.props.state}></TextInput>
    </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: {
        width: 350,
        flexDirection: "column",
        borderTopColor:"#E6D0FC",
        borderTopWidth: 1,
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 0,
        paddingRight: 0,
      },
      row: {
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 5
      },
      smallText: {
        fontSize: 12,
        fontFamily: "prompt",
        color: "#fff"
      },
      oddsText: {
          fontSize: 18,
          fontFamily: "prompt",
          color: "#fff"
      },
      winText: {
          fontSize: 18,
          fontFamily: "prompt-semiBold",
          color: "#fff"
      },
      input: {
          height: 48,
          width: 94,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#fff",
          color: "#fff",
          textAlign: "center",
          fontFamily: "prompt-medium",
          fontSize: 14,
          marginTop: 15
      }
      
  });

