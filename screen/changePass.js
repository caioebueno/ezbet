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
              <TopBar title = 'Reset Password'/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                  <View>
                  <Input label = 'Current Password' state = 'currentPassword' value = {this.state.currentPassword} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'New Password' state = 'newPassword' value = {this.state.newPassword} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Confirm New Password' state = 'confirmNewPassword' value = {this.state.confirmNewPassword} handleInputChanges = {this.handleInputChanges}/>
                  </View>
                  <Button title = 'Reset'/>
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
});