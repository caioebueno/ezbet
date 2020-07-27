import React, { Component, useRef } from 'react';
import {StyleSheet,View,  Dimensions, TouchableWithoutFeedback} from 'react-native';
import * as Font from 'expo-font';
import * as Animatable from 'react-native-animatable';

import MenuIcon from './menuIcon.jsx';
import SmallToggle from './smallToggle.jsx';


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class SmallTopBar extends React.Component {

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
        <TouchableWithoutFeedback onPress={() => {this.props.menuHandler()}}>
            <View>
                <MenuIcon />
            </View>
        </TouchableWithoutFeedback>
        <SmallToggle btn1="Odds" btn2="Survivor" handleBtn1={this.props.handleBtn1} handleBtn2={this.props.handleBtn2}/>
    </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: "#131C3E",
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30
      },
    
  });

