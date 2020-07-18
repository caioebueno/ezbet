import React, { Component, useRef } from 'react';
import { Button, View, Text,TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Axios from "axios";
import google from "./img/Registration/google.png";
import facebook from "./img/Registration/facebook.png";
import { withNavigation } from 'react-navigation';
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;





class login extends React.Component {

  //  navigation = useNavigation();

  constructor(props) {
    super(props)
    this.state = {
      token: null,
      email: "",
      name: "",
      password: "",
      loading: true,
      login: true,
      signup: false
    }
  }
   
  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }

  login = () => {
    Axios.post('https://secret-bastion-86008.herokuapp.com/login', {
      user: this.state.email,
      pwd: this.state.password
    })
    .then(async result => {
       this.setState({token: result.data.token});

       await AsyncStorage.setItem("@token", result.data.token);
       
       if(result.status === 200){
        this.props.navigation.navigate('Main');
       }
    })
    .catch(err => {
      console.log("error in the POST calls");
      throw err
    })
  }

  componentWillMount(){

    this.getToken();

  }
  componentDidMount(){

    this.getToken();

    
  }

  signup = () => {
    console.log("signup");
  }
  

  getToken = async () => {
    const token = await AsyncStorage.getItem("@token");
    console.log(token);
    this.setState({token: token});

    if(token != null){
      let headers = {
        "x-access-token": token
      }

      Axios.get("https://secret-bastion-86008.herokuapp.com/userinfo", {headers: headers})
        .then(result => {
          if(result.status === 200){
            this.props.navigation.navigate('Main');
          }
          else{
            this.setState({
              loading: false
            })
          }
        })
        .catch(err => {
          
          this.setState({
            loading: false
          })
          throw err;
        })
    }
  }

  handleToggle = () => {
    if(this.state.login === false){
      this.setState({
        login: true,
        signup: false
      })
    }else{
      this.setState({
        login: false,
        signup: true
      })
    }
    
  }
render(){
  return (
    <View style={styles.container}>
      
    {this.state.loading === true ? <View style={styles.loadingView}><ActivityIndicator size="large" color="#151D3B" /></View> 
    :  
    <>
    <View style={styles.headerView}></View>
    
    <View style={styles.whiteView}>
    <TouchableWithoutFeedback onPress={this.handleToggle} style={styles.toggle}>
      <View style={styles.toggle}>
      <View style={this.state.signup ? styles.active : styles.notActive}><Text style={this.state.signup ? styles.activeText : styles.notActiveText}>SignUp</Text></View>
      <View style={this.state.login ? styles.active : styles.notActive}><Text style={this.state.login ? styles.activeText : styles.notActiveText}>LogIn</Text></View>
      </View>
    </TouchableWithoutFeedback>
    {this.state.login 

    ? 
    <>
    <Text style={styles.label}>Email</Text>
    <TextInput textContentType="emailAddress" style={styles.input} onChangeText={(txt) => this.handleChange("email", txt)} value={this.state.email} name="email"  placeholder="Email"></TextInput>
    <Text style={styles.label}>Password</Text>
    <TextInput textContentType="password" style={styles.input} onChangeText={(txt) => this.handleChange("password", txt)} value={this.state.password} name="password" placeholder="Password"></TextInput>
    <View style={styles.orView}>
      <View styles={styles.line}></View>
      <Text styles={styles.orText}>Or</Text>
      <View styles={styles.line}></View>
    </View>
    <View style={styles.authView}>
      <TouchableOpacity style={styles.authBtn}><Image source={facebook}></Image></TouchableOpacity>
      <TouchableOpacity style={styles.authBtn}><Image source={google}></Image></TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.loginBtn} onPress={this.login}><Text style={styles.buttonText}>LogIn</Text></TouchableOpacity></>
  :
  <>
  <Text style={styles.label}>Name</Text>
  <TextInput style={styles.input} onChangeText={(txt) => this.handleChange("name", txt)} value={this.state.name} name="name"  placeholder="Name"></TextInput>
  <Text style={styles.label}>Email</Text>
  <TextInput style={styles.input} onChangeText={(txt) => this.handleChange("email", txt)} value={this.state.email} name="email"  placeholder="Email"></TextInput>
  <Text style={styles.label}>Password</Text>
  <TextInput style={styles.input} onChangeText={(txt) => this.handleChange("password", txt)} value={this.state.password} name="password" placeholder="Password"></TextInput>
  <View style={styles.orView}>
    <View styles={styles.line}></View>
    <Text styles={styles.orText}>Or</Text>
    <View styles={styles.line}></View>
  </View>
  <View style={styles.authView}>
    <TouchableOpacity style={styles.authBtn}><Image source={facebook}></Image></TouchableOpacity>
    <TouchableOpacity style={styles.authBtn}><Image source={google}></Image></TouchableOpacity>
  </View>
  <TouchableOpacity style={styles.signupBtn} onPress={this.signup}><Text style={styles.buttonText}>Signup</Text></TouchableOpacity></>
  }
    
 </View>
    </>
    }
   

    </View>
);
}
   
  }

  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: "#151D3B",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 40,
    },
    input: {
      width: 350,
      borderRadius: 15,
      height: 65,
      marginBottom: 30,
      paddingLeft: 20,
      fontSize: 14,
      borderWidth: 1,
      borderColor: "#E6D0FC",
      color: "#000",
      backgroundColor: "#fff",
    },
    loadingView: {
      width: width,
      height: height,
      backgroundColor: "#F5F6FA",
      alignItems: "center",
      justifyContent: "center",
    },
    whiteView: {
      width: width,
      flex: 13,
      height: 750,
      backgroundColor: "#F4F6FA",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      justifyContent: "space-around",
      alignItems: "center",
      paddingTop: 30,
      paddingBottom: 30
    },
    headerView: {
      flex: 2,
      backgroundColor: "#151D3B"
    },
    loginBtn: {
      width: 350,
      borderRadius: 15,
      height: 65,
      backgroundColor: "#8013EF",
      opacity: 0.4,
      borderWidth: 1,
      borderColor: "#E6D0FC",
      color: "#ffffff",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 100

    },
    buttonText: {
      color: "#ffffff",
      fontSize: 18,
      opacity: 1
    },
    orView: {
      
      padding: 10
    },
    line: {
      borderBottomColor: '#E6D0FC',
      borderBottomWidth: 1,
     
    },
    toggle: {
      width: 350,
      height: 48,
      backgroundColor: "#fff",
      padding: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      marginBottom: 30
    },
    active: {
      width: 167,
      height: 42,
      backgroundColor: "#8013EF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
    },
    notActive: {
      width: 175,
      height: 42,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
    },
    activeText: {
      color: "#fff",
      fontWeight: "bold"
    },
    notActiveText: {
      color: "#8013EF",
      fontWeight: "bold"
    },
    label: {
      width: 350,
      paddingLeft: 10,
      color: "#131C3E",
      opacity: 0.6
    },
    authView: {
      width: 200,
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10
    },
    authBtn: {
      height: 60,
      width: 60,
      borderRadius: 15,
      backgroundColor: "rgba(128, 19, 239, 0.05)",
      borderWidth: 1,
      borderColor: "#E6D0FC",
      justifyContent: "center",
      alignItems: "center"
    },
    signupBtn: {
      width: 350,
      borderRadius: 15,
      height: 65,
      backgroundColor: "#8013EF",
      opacity: 0.4,
      borderWidth: 1,
      borderColor: "#E6D0FC",
      color: "#ffffff",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50

    },

  });

  export default withNavigation(login);