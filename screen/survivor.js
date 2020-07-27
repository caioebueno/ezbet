import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import Toggle from '../components/toggleButton.jsx';

import FilterIcon from '../components/filterIcon.jsx';
import Item from '../components/survivorLeagueItem.jsx';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class Survivor extends React.Component {

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
      
      <ScrollView overScrollMode="never">
    <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.headerText}>Survivor</Text>
       </View>
       <Toggle style={styles.toggle} btn1="My tournament" btn2="Past tournament"/>
       <View style={styles.row}>
           <Text style={styles.filterText}>Filter by sport</Text> 
           <FilterIcon  />
        </View>
        <Item style={styles.item} />
        <Item style={styles.item} />
        <Item style={styles.item} />
        <Item style={styles.item} />
    </View>
    </ScrollView>
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
    }
  });

