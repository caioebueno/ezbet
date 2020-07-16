import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import Avatar from '../components/avatar.jsx';
import TopBar from '../components/topBar.jsx';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Personal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
    handleInputChanges(name, value){
        this.setState({
            [name] : value
        })
    }
    render(){
        return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.headerView}>
              <TopBar />
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                  <Avatar />
                  <Input label = 'First Name' state = 'firstName' value = {this.state.firstName} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Last Name' state = 'lastName' value = {this.state.lastName} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Birthday' state = 'birthday' value = {this.state.birthday} handleInputChanges = {this.handleInputChanges}/>
                  <Line />
                  <Input label = 'Phone Number' state = 'phoneNumber' value = {this.state.lastName} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Email' state = 'email' value = {this.state.email} handleInputChanges = {this.handleInputChanges}/>
                  <Line />
                  <Input label = 'Country' state = 'country' value = {this.state.country} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'City' state = 'City' value = {this.state.city} handleInputChanges = {this.handleInputChanges}/>
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