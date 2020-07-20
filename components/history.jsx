import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class history extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    handleInputChanges(name, value){
        this.setState({
            [name] : value
        })
    }
    render(){
        return (
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <Text style={styles.text}>My balance</Text>
                    <Text style={styles.balance}>{this.props.balance}</Text>
                </View>
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f4f6fa',
  },

  header:{
      paddingTop: 37,
  },

  text:{
    fontSize: 12,
    color: '#131c3e',
    textAlign: 'center',

  },

  balance:{
      fontSize: 36,
      color: '#131c3e',
      textAlign: 'center',
  },
  
});