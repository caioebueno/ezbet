import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import TopBar from '../components/topBar.jsx';
import Button from '../components/button.jsx';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class changePass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          
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
              <TopBar title = 'Terms and Conditions'/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
              <Text style={styles.text}>
                  
                  Terms and Conditions agreements act as a legal contract between you (the company) who has the website or mobile app and the user who access your website and mobile app. 
                  {'\n'}
                  {'\n'}
                    Having a Terms and Conditions agreement is completely optional. No laws require you to have one. Not even the super-strict and wide-reaching General Data Protection Regulation (GDPR).
                    {'\n'}
                    {'\n'}
                    It's up to you to set the rules and guidelines that the user must agree to. You can think of your Terms and Conditions agreement as the legal agreement where you maintain your rights to exclude users from your app in the event that they abuse your app, where you maintain your legal rights against potential app abusers, and so on.
                    {'\n'}
                    {'\n'}
                    Terms and Conditions are also known as Terms of Service or Terms of Use.
                    {'\n'}
                    {'\n'}
                    Check out our Terms and Conditions FAQ for more helpful insight into these important agreements.
            </Text>
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