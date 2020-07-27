import React, { Component, useRef } from 'react';
import { Button, View, Animated, Text,ImageBackground,TouchableWithoutFeedback, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import Category from "./category";
import CategoryAct from "./categoryAct";
import * as RootNavigation from './nav';
import MenuIcon from './menuIcon.jsx';
import SmallMenu from './smallTopBar.jsx';


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
      smallMenu: false,
      height: new Animated.Value(0),
      parentYPosition: 0
    }

    this.small = React.createRef();
    this.big = React.createRef();

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

  componentDidMount(){
    
    console.log(this.big)
  }

  render(){

    var heightInterpolate = this.state.height.interpolate({
      inputRange: [0, 250],
      outputRange: [100, 0], 
    })

    if(this.state.loadingFont){
      return <></>
    }

 

    return (
      <View >
    
     
        <View style={this.props.menu ? styles.container : styles.containerMenu}>
       
        
        <View style={styles.nameView}>
        <Text style={styles.hello}>Hello, </Text><Text style={styles.name}>{this.props.name}</Text>
        
   
        </View>
       
        </View>
        
       
    


<ScrollView style={styles.scrollViewCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
     {this.state.soccer 
     ? <TouchableWithoutFeedback onPress={() => {this.handleCategoryChangeSoccer; console.log(this.props.y);}}>
       <View>
     <CategoryAct emoji="&#x26BD;" sport="Soccer"/>
     </View>
     </TouchableWithoutFeedback>
     : <TouchableWithoutFeedback onPress={() => {this.props.categoryHandler("soccer"); this.handleCategoryChangeSoccer()}}>
       <View>
     <Category emoji="&#x26BD;" sport="Soccer"/>
     </View>
     </TouchableWithoutFeedback>
     }
     
     {this.state.basktball
     ? <TouchableWithoutFeedback onPress={() => {this.handleCategoryChangeBasktball}}>
       <View>
     <CategoryAct emoji="&#127936;" sport="Basktball"/>
     </View>
     </TouchableWithoutFeedback>
     : <TouchableWithoutFeedback onPress={() => {this.props.categoryHandler("basketball"); this.handleCategoryChangeBasktball();}}>
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

      
      </View>)
  }
    
  }

  const styles = StyleSheet.create({
    container: { 
      width: width,
      height: 170,
      backgroundColor: "#151D3B",
      paddingTop: 15,
      borderBottomLeftRadius: 20,
      overflow: "visible",
    },
    containerMenu: { 
      width: width,
      height: 250,
      backgroundColor: "#151D3B",
      paddingTop: 30,
      borderRadius: 20,
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
        width: 44,
        height: 44,
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
        marginTop: -60,
    },
    icons: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingRight: 30,
        paddingLeft: 30,
        paddingBottom: 20,
        marginTop: -10
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: -30
    }
   
  });

  export default Top;