import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Line extends React.Component {
    render(){
        return (
                  <View style={styles.line}>
                    
                  </View>
          );
     }
 
}

const styles = StyleSheet.create({
  line:{
    height: 1,
    width: 350,
    backgroundColor: '#e6d0fc',
    marginTop: 15,
    marginBottom: 15,
  },
});