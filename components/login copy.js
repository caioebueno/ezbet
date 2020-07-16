import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput } from 'react-native';
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;


export default function main({navigation}) {

    this.state = {
      result = [{name: "caio", age: "19"}, {name: "Jean", age: "47"}]
    }

     componentWillMount = () => {
      
    }


    return (
        <View style={styles.container}>
          {this.state.result.map(obj => {
            return(
            <Text>{obj.name + " " + obj.age}</Text>
            )
          })}
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: { 
      flex: 1,
      backgroundColor: "#BABABA",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 40,
    },
    input: {
      width: width,
      height: 70,
      marginBottom: 30,
      paddingLeft: 20,
      fontSize: 20,
      color: "#fff",
      backgroundColor: "#000"
    }
  });