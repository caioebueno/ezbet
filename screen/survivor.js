import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import Toggle from '../components/toggleButton.jsx';

import FilterIcon from '../components/filterIcon.jsx';
import Item from '../components/survivorLeagueItem.jsx';
import Filter from "../components/survivorFilter.jsx";
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class Survivor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        loadingFont: true,
        all: true
    }
    this.filter = React.createRef();
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

  handleToggle = () => {

    if(this.state.all){
      console.log("toggle")
      this.setState({
        all: false
      })
    }
    else{
      this.setState({
        all: true
      })
    }

  } 

 
  render(){

    const all = <><View style={styles.row}><Text style={styles.filterText}>Filter by sport</Text><TouchableWithoutFeedback onPress={() => {this.filter.current.animation()}}><FilterIcon  /></TouchableWithoutFeedback></View><Item style={styles.item} /></>;
    const my = <><View style={styles.myView}><Text>You have not joined a league yet</Text></View></>

    if(this.state.loadingFont){
        return <></>
    }

    return (
      
      <>
      <ScrollView overScrollMode="never">
      <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.headerText}>Survivor</Text>
       </View>
       <TouchableWithoutFeedback onPress={() => {this.handleToggle()}}>
       <Toggle style={styles.toggle} btn1="All tournaments" btn2="My tournaments"/>
       </TouchableWithoutFeedback>
       {this.state.all ? all : my}
      </View>
    </ScrollView>
    <Filter ref={this.filter}/>
    </>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    toggle: {
        marginTop: 50
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingRight: 30,
        paddingLeft: 30
    },
    filterText: {
        color: "#131C3E",
        opacity: 0.6,
        fontFamily: "prompt"
    },
    header: {
      height: 70,
      backgroundColor: "#131C3E",
      width: width,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      paddingLeft: 30
    },
    headerText: {
      fontFamily: "prompt-bold",
      fontSize: 24,
      color: "#fff"
    },
   
  });

