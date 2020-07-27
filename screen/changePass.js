
import React from 'react';
import { StyleSheet, Animated, StatusBar, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
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
          animate: new Animated.Value(700),
        }
        this.handleInputChanges.bind(this);
    }
    componentDidMount(){
      this.animation();
    }
    animation = () => {
      Animated.timing(this.state.animate, {
        toValue: 200,
        duration: 5000
      }).start();
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
              <Animated.View style={[styles.personalBackground, {height: this.state.animate}]}>
                  <View>
                  <Input label = 'Current Password' state = 'currentPassword' value = {this.state.currentPassword} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'New Password' state = 'newPassword' value = {this.state.newPassword} handleInputChanges = {this.handleInputChanges}/>
                  <Input label = 'Confirm New Password' state = 'confirmNewPassword' value = {this.state.confirmNewPassword} handleInputChanges = {this.handleInputChanges}/>
                  </View>
                  <Button title = 'Reset'/>
                  </Animated.View>
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