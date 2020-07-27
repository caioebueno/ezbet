import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import Tag from "./tag.jsx";
import * as RootNavigation from './nav';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class SurvivorLeagueItem extends React.Component {

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
      'prompt-medium': require("../assets/fonts/Prompt-Medium.ttf")
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
           <Text style={styles.endText}>End: 17/08 12:00H</Text>
           <Tag backgroundColor="rgba(222, 44, 0, 0.1)" text="Eliminated" color="rgba(222,44,0, 0.6)"/>
       </View>
       <View style={styles.rowStart}>
            <View style={styles.leagueIcon}>
            </View>
            <View>
                 <Text style={styles.leagueTitleText}>Survive e Advance</Text>
                 <Text style={styles.moneyText}>Streakin’ 2/10.000</Text>
            </View>
        </View>
        <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate("SurvivorAct")}}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>Details</Text>
        </View>
        </TouchableWithoutFeedback>
    </View>
        
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        width: 350,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 315
    },
    rowStart: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: "center",
        width: 315
    },
    endText: {
        color: "#131C3E",
        opacity: 0.6,
        fontFamily: "prompt",

    },
    leagueIcon: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: "#E6D0FC",
        marginRight: 8
    },
    leagueTitleText: {
        fontSize: 18,
        color: "#131C3E",
        fontFamily: "prompt"
    },
    moneyText: {
        fontFamily: 12,
        color: "#131C3E",
        fontFamily: "prompt"
    },
    button: {
        marginTop: 8,
        width: 283,
        height: 48,
        borderWidth: 1,
        borderColor: "#E6D0FC",
        borderRadius: 16,
        backgroundColor: "rgba(128, 19, 239, 0.05)",
        justifyContent: "center",
        alignItems: "center"
    }, 
    buttonText: {
        color: "#8013EF",
        fontFamily: "prompt-medium",
        fontSize: 14
    },
 
   
   
  });

