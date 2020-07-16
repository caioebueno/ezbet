import React, { Component, useRef } from 'react';
import { Button, View, Text,ImageBackground,TouchableWithoutFeedback, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Main from "./main";
import Axios from "axios";

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

class LiveMatch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }


  render(){
    return (
      
      // <View style={styles.container}>
         <View style={styles.matchView}>
             <View style={styles.roundView}><Image source={require("./img/juventus.png")} style={styles.teamIcon}></Image></View>
             <Text style={styles.scoreText}>2 : 1</Text>
             <View style={styles.roundView}><Image source={require("./img/milan.png")} style={styles.teamIcon}></Image></View>
         </View>
      // </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
        flexDirection: "row",
        width: width,
        justifyContent: "center"
    },
    matchView: {
        width: 300,
        height: 120,
        backgroundColor: "#ffffff",
        borderRadius: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 30
    },
    roundView: {
        borderRadius: 100,
        width: 70,
        height: 70,
        backgroundColor: "#ffffff",
        borderWidth:2,
        borderColor: "#D1C0F1",
        justifyContent: "center",
        alignItems: "center",
    },
    scoreText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4C5269"
    },
    teamIcon: {
      width:15,
      height: 30,
      resizeMode: "cover"
    }
   
  });

  export default LiveMatch;