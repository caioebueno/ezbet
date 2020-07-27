import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Font from 'expo-font';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class TripleToggle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          toggle1: true,
          toggle2: false,
          toggle3: false,
          loadingFont : true,
        }
    }
    handleInputChanges(name, value){
        this.setState({
            [name] : value
        })
    }
    componentWillMount(){

        Font.loadAsync({
            'prompt': require('../assets/fonts/Prompt-Regular.ttf'),
            'prompt-bold': require("../assets/fonts/Prompt-Bold.ttf"),
            'prompt-medium': require("../assets/fonts/Prompt-Medium.ttf"),
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
            {/* Notary expression for toggle bar */}
            <TouchableWithoutFeedback onPress={() => {this.setState({toggle1: true, toggle2: false, toggle3: false});if(this.props.handleBtn1){ this.props.handleBtn1();}}}>
                <View style={this.state.toggle1 ? styles.active : styles.nonactive}>
        <Text style={this.state.toggle1 ? styles.activeText : styles.nonactiveText}>{this.props.btn1}</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {this.setState({toggle2 : true, toggle1: false, toggle3: false}); if(this.props.handleBtn2){ this.props.handleBtn2();}}}>
                <View style={this.state.toggle2 ? styles.active : styles.nonactive}>
        <Text style={this.state.toggle2 ? styles.activeText : styles.nonactiveText}>{this.props.btn2}</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {this.setState({toggle3 : true, toggle2: false, toggle1: false}); if(this.props.handleBtn3){ this.props.handleBtn3();}}}>
                <View style={this.state.toggle3 ? styles.active : styles.nonactive}>
                    <Text style={this.state.toggle3 ? styles.activeText : styles.nonactiveText}>{this.props.btn3}</Text>
                </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
 container:{
     width: 350,
     height: 48,
     backgroundColor: '#fff',
     borderRadius: 16,
     flexDirection: 'row',
     alignItems: "center",
     padding: 5,
 },

  active:{
      width: 113,
      height: 40,
      backgroundColor: '#8013ef',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
  },

  nonactive:{
    width: 113,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
},

activeText:{
    color: '#fff',
    fontFamily: 'prompt-medium',
    fontSize: 14
},

nonactiveText:{
    color: '#8013ef',
    fontFamily: 'prompt-medium',
    fontSize: 14
},

});