import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import TopBar from '../components/topBar.jsx';
import Button from '../components/button.jsx';
import MyBetItems from '../components/myBetItems.jsx';
import XLMyBetItems from '../components/xlMyBetItems.jsx';
import MediumHeader from '../components/mediumHeader.js';


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
                <MediumHeader title='My Bets'/>
                <View>
                <MyBetItems style={styles.betItems}type='Match Results' odds='1.4' team='Juventus' teamOne='Juventus' teamTwo='AC Milan' time='13:07, 22:45' betTime='Bet placed 12.07, 09:45' betAmount='$10' win='$14'/>
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

  headerView: {
    flex: 1,
    backgroundColor: '#131c3e',
  },

  white: {
      color: '#fff',
  },

  personalBackground: {
    width: width,
    height: 700,
    paddingTop: 20,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6d0fc',
    backgroundColor: '#fff',
    height: 60,
    width: 350,
    paddingLeft: 15,
  },

  scroll:{
    height: 650,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  label:{
    padding: 10,
  },

  text:{
    padding: 30,
     lineHeight: 25,
  },
});