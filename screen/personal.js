import React from 'react';
import { StyleSheet,StatusBar, Text, AsyncStorage, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import Axios from "axios";
import Avatar from '../components/avatar.jsx';
import TopBar from '../components/topBar.jsx';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Personal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: null,
            firstName : "",
            lastName : "",
            birthday : "",
            phoneNumber: "",
            email: "",
            country: "",
            city: "",
        }
        this.handleInputChanges.bind(this);
    }
    handleInputChanges = (name, value) => {
        this.setState({
            [name] : value
        })
    }

    UNSAFE_componentWillMount(){
      this.getToken();
      this.userInfo
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
            let name = result.data[0].name;
            let email = result.data[0].email;
            let id = result.data[0].id;
            this.setState({firstName: name, email: email});
          })
          .catch(err => {
            throw err;
          })
      }
    }
  

    render(){
        return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.headerView}>
              <TopBar title="Personal data"/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                  <Avatar />
                  <Input label = 'First Name' state = 'firstName' value = {this.state.firstName} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Last Name' state = 'lastName' value = {this.state.lastName} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Birthday' state = 'birthday' value = {this.state.birthday} handleInputChanges = {this.handleInputChanges}/>
                  <Line />
                  <Input label = 'Phone Number' state = 'phoneNumber' value = {this.state.phoneNumber} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Email' state = 'email' value = {this.state.email} handleInputChanges = {this.handleInputChanges}/>
                  <Line />
                  <Input label = 'Country' state = 'country' value = {this.state.country} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'City' state = 'city' value = {this.state.city} handleInputChanges = {this.handleInputChanges}/>
                </View>
             </ScrollView>
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131c3e',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
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
    paddingTop: 20,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
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
});