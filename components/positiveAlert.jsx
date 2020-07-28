import React from 'react';
import { StyleSheet, TouchableOpacity, Animated, Text, View, Dimensions } from 'react-native';
import SuccessIcon from "./successIcon.jsx";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class PositiveAlert extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      y: new Animated.Value(0),
    }
    this.show = this.show.bind(this);
  }
  
  
  show = () => {
    Animated.timing(this.state.y, {
      toValue: -height,
      duration: 300
    }).start();
  }

    render(){
        return (
                  <Animated.View style={[styles.container, {transform: [{translateY: this.state.y}]}]}>
                    <View style={styles.alert}>
                    <Text style={styles.title}>{this.props.title}</Text> 
                    <Text style={styles.desc}>{this.props.desc}</Text>
                    <TouchableOpacity onPress={() => { Animated.timing(this.state.y, {
      toValue: height,
      duration: 300
    }).start();}}>
                    <View style={styles.btn}>
                    <Text>Ok</Text>
                    </View>
                    </TouchableOpacity>
                   
                    </View>
                  </Animated.View>
          );
     }
 
}

const styles = StyleSheet.create({

  container:{
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: 'center',
    justifyContent: "center"
  },
  alert: {
    height: 350,
    width: 250,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
  },
  btn: {
    width: 100,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#CCFFB4",
    justifyContent: "center",
    alignItems: "center"
  }

});