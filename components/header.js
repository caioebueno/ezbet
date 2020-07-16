import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Main from "./main";
import Axios from "axios";
import { withNavigation } from 'react-navigation';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      name: "",
      email: "",
      password: "",
      createStatus: null,
      props: this.props
    }
  }

  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }


  signup = () => {
    Axios.post("https://secret-bastion-86008.herokuapp.com/signup", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then(async result => {
      console.log(result);
      await AsyncStorage.setItem("@token", result.data.token);
      this.props.navigation.navigate("Main");
    })
  }

  render(){
    return (
      
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(txt) => this.handleChange("name", txt)} value={this.state.name} name="name"  placeholder="Name"></TextInput>
      <TextInput style={styles.input} onChangeText={(txt) => this.handleChange("email", txt)} value={this.state.email} name="email"  placeholder="Email"></TextInput>
      <TextInput style={styles.input} onChangeText={(txt) => this.handleChange("password", txt)} value={this.state.password} name="password" placeholder="Password"></TextInput>
      <Button title="Signup" onPress={this.signup}></Button>
      <Button title="Login" onPress={() => {this.props.navigation.navigate("Login")}}></Button>
      <Button title="state" onPress={() => {console.log(this.state)}}></Button>
      <Text>{this.state.createStatus}</Text>
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
    title: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 40,
    },
    input: {
      width: width,
      height: 70,
      marginBottom: 30,
      paddingLeft: 20,
      fontSize: 20,
      color: "#fff",
      backgroundColor: "#000"
    }
  });

  export default withNavigation(Header);