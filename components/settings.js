import React, { Component, useRef } from 'react';
import { Button, View, Text, TouchableWithoutFeedback, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Main from "./main";
import Axios from "axios";
import SettingItems from "./settingsItems";
import MediumHeader from "./mediumHeader";
import RedItem from "./redItem";
import { withNavigation } from 'react-navigation';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




class Settings extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
     token: null,
     name: null,
     id: null
    }
  }

  async getToken(){
    const token = await AsyncStorage.getItem("@token");
    this.setState({token: token});
    this.userInfo();
  }

  userInfo = () => {

    if(this.state.token != null){
      let header = {
        "x-access-token": this.state.token
      } 
  
      Axios.get("https://secret-bastion-86008.herokuapp.com/userinfo", {headers: header})
        .then(result => {
          let name = result.data[0].email;
          let id = result.data[0].id;
          this.setState({name: name, id: id});
        })
        .catch(err => {
          throw err;
        })
    }
  }

  componentWillMount(){
      this.getToken();
  }

  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }


  logout = async () => {
    console.log("click");
    AsyncStorage.setItem("@token",  false);
    this.props.navigation.navigate('Login');
  }


  render(){
    return (
      
      <View style={styles.container}>
        <MediumHeader title="Settings"/>
        <SettingItems title="Payment history"/>
        <SettingItems title="Personal data"/>
        <SettingItems title="Reset password"/>
        <SettingItems title="Support"/>
        <SettingItems title="Terms and conditions"/>
        <SettingItems title="Rate our app"/>
        <TouchableWithoutFeedback onPress={this.logout}>
        <View>
        <RedItem title="Log out"/>
        </View>
        </TouchableWithoutFeedback>
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: "#F4F6FA",
     alignItems: "center"
    
    },
    
  });

  export default withNavigation(Settings);