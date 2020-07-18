import React, { Component, useRef } from 'react';
import { Button, View, Text,ImageBackground,TouchableWithoutFeedback, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Main from "./main";
import Axios from "axios";
import * as Font from 'expo-font';
import MenuIcon from "./img/menu.png";
import Category from "./category";
import CategoryAct from "./categoryAct";
import { withNavigation } from 'react-navigation';
import * as RootNavigation from './nav';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;

class Top extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loadingFont: true,
      soccer: true,
      basktball: false,
      hockey: false,
      football: false,
      voleyball: false,
    }
  }

  handleCategoryChangeSoccer = () => {
    
    this.setState({
      soccer: true,
      basktball: false,
      hockey: false,
      football: false,
      voleyball: false
    })

}
handleCategoryChangeBasktball = () => {

  console.log("basktball")

  this.setState({
    basktball: true,
    soccer: false,
    hockey: false,
    football: false,
    voleyball: false
  })

}
handleCategoryChangeHockey = () => {

this.setState({
  hockey: true,
  soccer: false,
  basktball: false,
  football: false,
  voleyball: false
})

}
handleCategoryChangeFootball = () => {

this.setState({
football: true,
soccer: false,
basktball: false,
hockey: false,
voleyball: false
})

}
handleCategoryChangeVoleyball = () => {

this.setState({
voleyball: true,
soccer: false,
basktball: false,
footbal: false,
hockey: false
})

}

  UNSAFE_componentWillMount(){
    Font.loadAsync({
      'prompt': require('../assets/fonts/Prompt-Regular.ttf'),
      'prompt-bold': require("../assets/fonts/Prompt-Bold.ttf"),
      'prompt-medium': require("../assets/fonts/Prompt-Medium.ttf")
    })
    .then(() => {
      this.setState({
        loadingFont: false
      })
    })
  }

  render(){

    if(this.state.loadingFont){
      return <></>
    }

    return (
      <View>
      <View style={styles.container}>
          <View style={styles.icons}>
          <TouchableWithoutFeedback onPress={this.props.menuHandler}>
          <ImageBackground source={require("./img/menu.png")} style={styles.menuIcon}></ImageBackground>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate('Profile');}}>
          <ImageBackground source={require("./img/profile.png")} style={styles.menuIcon}></ImageBackground>
         </TouchableWithoutFeedback>
         </View>
          <View style={styles.nameView}>
          <Text style={styles.hello}>Hello, </Text><Text style={styles.name}>{this.props.name}</Text>
          </View> 
         
      </View>
       <ScrollView style={styles.scrollViewCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
       {this.state.soccer 
       ? <TouchableWithoutFeedback onPress={this.handleCategoryChangeSoccer}>
         <View>
       <CategoryAct emoji="&#x26BD;" sport="Soccer"/>
       </View>
       </TouchableWithoutFeedback>
       : <TouchableWithoutFeedback onPress={this.handleCategoryChangeSoccer}>
         <View>
       <Category emoji="&#x26BD;" sport="Soccer"/>
       </View>
       </TouchableWithoutFeedback>
       }
       
       {this.state.basktball
       ? <TouchableWithoutFeedback onPress={this.handleCategoryChangeBasktball}>
         <View>
       <CategoryAct emoji="&#127936;" sport="Basktball"/>
       </View>
       </TouchableWithoutFeedback>
       : <TouchableWithoutFeedback onPress={this.handleCategoryChangeBasktball}>
         <View>
       <Category emoji="&#127936;" sport="Basktball"/>
       </View>
       </TouchableWithoutFeedback>
       }
      {this.state.hockey
      ?<TouchableWithoutFeedback onPress={this.handleCategoryChangeHockey}>
      <View>
    <CategoryAct emoji="&#127954;" sport="Hockey"/>
    </View>
    </TouchableWithoutFeedback>
    :<TouchableWithoutFeedback onPress={this.handleCategoryChangeHockey}>
    <View>
  <Category emoji="&#127954;" sport="Hockey"/>
  </View>
  </TouchableWithoutFeedback>
    }

    {this.state.football 
    ? <TouchableWithoutFeedback onPress={this.handleCategoryChangeFootball}>
    <View>
   <CategoryAct emoji="&#127944;" sport="Footbal"/>
   </View>
   </TouchableWithoutFeedback>
   :<TouchableWithoutFeedback onPress={this.handleCategoryChangeFootball}>
   <View>
  <Category emoji="&#127944;" sport="Footbal"/>
  </View>
  </TouchableWithoutFeedback>
    }
       
  
       <TouchableWithoutFeedback onPress={this.handleCategoryChangeVoleyball}>
       <Category emoji="&#x26BD;" sport="Soccer"/>
       </TouchableWithoutFeedback>
       <Category emoji="&#x26BD;" sport="Soccer"/>
       <Category emoji="&#x26BD;" sport="Soccer"/>
       <Category emoji="&#x26BD;" sport="Soccer"/>
       </ScrollView>
       </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
      width: width,
      height: 250,
      backgroundColor: "#151D3B",
      paddingTop: 30,
      borderBottomLeftRadius: 20,
      overflow: "visible",
    },
    name: {
        color: "#fff",
        fontSize: 30,
        fontFamily: "prompt-medium"
    },
    hello: {
        color: "#fff",
        fontSize: 30,
        paddingLeft: 30,
        fontWeight: "200",
        fontFamily: "prompt"
    },
    menuIcon: {
        marginLeft: 30,
        marginBottom: 20,
        marginTop: 0,
        width: 50,
        height: 50,
        
        borderRadius: 10,
    },
    nameView: {
        flexDirection: "row",
    },
    img: {
        width: 50,
        height: 50,
    },
    scrollViewCategory: {
        paddingLeft: 10,
        marginTop: -60
    },
    icons: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingRight: 30,
        marginTop: -10
    }
   
  });

  export default Top;