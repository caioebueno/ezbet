import React from 'react';
import { StyleSheet, TouchableOpacity,FlatList, AsyncStorage, Text, View, Dimensions, TextInput } from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

import * as Animatable from "react-native-animatable";


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class SurvivorFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          loadingFont: true,
          close: true
        }
        this.bar = React.createRef();
        this.animation = this.animation.bind(this);
      }

     
    componentWillMount(){

        Font.loadAsync({
            'prompt': require('../assets/fonts/Prompt-Regular.ttf'),
            'prompt-bold': require("../assets/fonts/Prompt-Bold.ttf"),
            'prompt-medium': require("../assets/fonts/Prompt-Medium.ttf"),
            'prompt-semiBold': require("../assets/fonts/Prompt-SemiBold.ttf")
          })
          .then(() => {
            this.setState({
              loadingFont: false
            })
          })

       
      }

  
      animation = () => {
          if(this.state.close){
            this.bar.current.transitionTo({height: 500});
            this.setState({
                close: false
            })
          }
          else{
            this.bar.current.transitionTo({height: 0});
            this.setState({
                close: true
            })
          }
          
      }
  
     

    render(){
     

     
  
        if(this.state.loadingFont){
            return <></>
        }


        return(
            <Animatable.View ref={this.bar} style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {this.animation()}}>
                <View style={styles.btnView}>
                    <Text style={styles.btnText}>Ok</Text>
                </View>
                </TouchableWithoutFeedback>
            </Animatable.View>
        )

            
             

     }

}

const styles = StyleSheet.create({
  container:{
      width: width,
      height:0,
      backgroundColor: "#131C3E",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      alignItems: "center"
  },
  btnView: {
      width: 350,
      borderRadius: 16,
      backgroundColor: "#8013EF",
      height: 60,
      justifyContent: "center",
      alignItems: "center"
  },
  btnText: {
    fontFamily: "prompt-medium",
    color: "#fff"
  }
 
  

});