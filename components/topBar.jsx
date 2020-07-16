import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import BackButton from '../components/img/backButton.png';
import Avi from '../components/img/avi.png';
import { round } from 'react-native-reanimated';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class TopBar extends React.Component {
    render(){
        return (
                  <View style={styles.wrap}>
                      <Image style={styles.icons} source={BackButton}></Image>
                      <Text style={styles.text}>{this.props.title}</Text>
                      <Image style={styles.icons} source={Avi}></Image>
                  </View>
          );
     }
 
}

const styles = StyleSheet.create({

  wrap:{
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    paddingLeft: 30,
    paddingRight: 30,
  },

  icons:{
      height: 44,
      width: 44,
  },

  text:{
    color: '#fff',
    fontSize: 18,
  }
   
});