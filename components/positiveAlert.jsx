import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class PositiveAlert extends React.Component {
    render(){
        return (
                  <View style={styles.container}>
                    <View style={styles.alert}>
                        <Text>{this.props.alert}</Text>
                    </View>
                  </View>
          );
     }
 
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: 'center',
    justifyContent: "center"
  },
  alert: {
    height: 200,
    width: 300,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }

});