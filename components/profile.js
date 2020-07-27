import React, { Component, useRef } from 'react';
import { Button, View, Text,TouchableHighlight,  Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Axios from "axios";
import { withNavigation } from 'react-navigation';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




class Profile extends React.Component {

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
    await AsyncStorage.setItem("@token",  "null");
    this.props.navigation.navigate("Login");
    // this.props.navigation.navigate('Login');
  }

  check = async () => {
     token = await AsyncStorage.getItem("@token");
  }

  mini = () => {
    return(
      <Text>mini</Text>
    );
  }

  full = () => {
    return(
      <Text>full</Text>
    );
  }


  render(){
    return (
      
      <View style={styles.container}>
          <Button title="back" onPress={() => {this.props.navigation.navigate("Main")}}></Button>
          <Text>{this.state.name}</Text>
          <Text>{this.state.id}</Text>
          <Button title="Log Out" onPress={this.logout}></Button>
          <Button title="Check" onPress={this.check}></Button>
        
      </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: "#BABABA",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
    },
    testView: {
      width: 200,
      height: 200,
      backgroundColor: "#fff"
    },
    swipe: {
      height: 500,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20
    }
    
  });

  export default withNavigation(Profile);