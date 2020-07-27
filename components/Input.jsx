import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Input extends React.Component {
    render(){
        return (
                  <View style={ styles.wrap}>
                    <Text style={styles.label}> 
                      {this.props.label}
                     </Text>
                     <TextInput style={styles.input} value={this.props.value} placeholder={this.props.placeholder} onChangeText={(Text) => 
                        {this.props.handleInputChanges(this.props.state, Text)}}>
                  
                </TextInput>
                  </View>
          );
     }
 
}

const styles = StyleSheet.create({
  input:{
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e6d0fc',
    backgroundColor: '#fff',
    height: 60,
    width: 350,
    paddingLeft: 15,
  },

  label:{
    padding: 10,
  },

  wrap:{
    paddingBottom: 15,
    paddingTop: 15,
  },

});