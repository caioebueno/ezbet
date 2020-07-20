import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Font from 'expo-font';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class toggleButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          toggle : true,
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
            <TouchableWithoutFeedback onPress={() => {this.setState({toggle : true})}}>
                <View style={this.state.toggle ? styles.active : styles.nonactive}>
                    <Text style={this.state.toggle ? styles.activeText : styles.nonactiveText}>Deposit History</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {this.setState({toggle : false})}}>
                <View style={this.state.toggle ? styles.nonactive : styles.active}>
                    <Text style={this.state.toggle ? styles.nonactiveText : styles.activeText}>Withdrawl</Text>
                </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
 container:{
     width: 315,
     height: 48,
     backgroundColor: '#fff',
     borderRadius: 16,
     flexDirection: 'row',
     padding: 5,
     marginTop: 20,
     marginBottom: 20,
 },

  active:{
      width: 153,
      height: 40,
      backgroundColor: '#8013ef',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
  },

  nonactive:{
    width: 153,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
},

activeText:{
    color: '#fff',
    fontFamily: 'prompt-semiBold',
},

nonactiveText:{
    color: '#8013ef',
    fontFamily: 'prompt-semiBold',
},

});