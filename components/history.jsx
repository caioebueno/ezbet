import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import TopBar from '../components/topBar.jsx';
import Button from '../components/button.jsx';
import Header from '../components/Header.js';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class myBets extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    handleInputChanges(name, value){
        this.setState({
            [name] : value
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <Header title='Payment History'/>
                <View style={styles.header}>
                    <Text style={styles.text}>My balance</Text>
                    <Text style={styles.balance}>{this.props.balance}</Text>
                </View>
                
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f4f6fa',
  },

    text:{
        paddingTop: 37,
        flexDirection: 'column',
        fontSize: 12,
        color: '#0131c3e',
        height: 51,
        width: 140,
        alignItems: 'center',
    },

    balance:{
        fontFamily: 'Prompt',
        fontSize: 36,
        lineHeight: 36,
        flex: 1,
        alignItems: 'center',
        wdith: 122,
        paddingLeft: 18,
    },
 

  
});