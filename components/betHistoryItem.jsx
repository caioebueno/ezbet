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
                <View style={styles.row}>
                    <Text style={styles.textOne}>{this.props.date}</Text>
                    <Text style={styles.textTwo}>{this.props.amount}</Text>
                </View>
                <Text style={styles.paymentText}>{this.props.payment}</Text>
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
 container:{
    width: 315,
    height: 73,
    borderBottomWidth: 1,
    borderBottomColor: '#e6d0fc',
    marginTop: 10,
    marginBottom: 10,
 },

 row:{
     justifyContent: 'space-between',
     flexDirection: 'row',
     alignItems: 'center',
 },

 textOne:{
    fontSize: 14,
    color:'#131c3e',
    fontFamily: 'prompt',
 },

 textTwo:{
     fontSize: 18,
     color: '#131c3e',
     fontFamily: 'prompt-medium',
 },
 
paymentText:{
    color: '#131c3e',
    opacity: 0.6,
    fontSize: 12,
},

});