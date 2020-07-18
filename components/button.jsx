import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, TextInput } from 'react-native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Button extends React.Component {
    render(){
        return (
                  <TouchableOpacity onPress={this.props.action} style={styles.button}>
                      <Text style={styles.text}>{this.props.title}</Text>
                  </TouchableOpacity>
          );
     }
}

const styles = StyleSheet.create({
  button:{
    width: 350,
    height: 62,
    backgroundColor: '#8013ef',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text:{
      color: '#fff',
  },

});