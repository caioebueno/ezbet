import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import Avi from '../components/img/avi.png';
import { round } from 'react-native-reanimated';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Avatar extends React.Component {
    render(){
        return (
                  <View style={styles.wrap}>
                      <Image style={styles.avi} source={Avi}></Image>
                      <Text style={styles.changeAvi}>
                          Change Avatar
                      </Text>
                  </View>
          );
     }
 
}

const styles = StyleSheet.create({

  wrap:{
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: "column",
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
  },

    avi:{
        width: 64,
        height: 64,
    },

    changeAvi:{
        fontSize: 18,
        color: '#8013ef',
    },
});