import React, { Component, useRef } from 'react';
import { Button,Animated, View, Text, Image, StyleSheet, ScrollView, Dimensions,TouchableWithoutFeedback, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Axios from "axios";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { withNavigation } from 'react-navigation';
import Top from "./top";
import LiveTitle from "./liveTitle";
import MatchInfo from "./matchInfo";
import LiveMatch from "./liveMatch";
import FutureTitle from "./futureTitle";
import MenuScreen from './menu';
import { loadAsync } from 'expo-auth-session';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;


class main extends React.Component {

  
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      token: null,
      name: null,
      menu: true,
      loadingFont: true,
      category: "soccer"
    }

    this.menuHandler = this.menuHandler.bind(this);
  }
   

  UNSAFE_componentWillMount(){
      Axios.get("https://api.the-odds-api.com/v3/odds/?apiKey=747d53c27641a79402b91eccf31c7923&sport=soccer_epl&region=uk&mkt=h2h")
      .then(response => {
        console.log(response);
        response.data.data.forEach(obj => {
          this.setState(previousState => ({
            result: [...previousState.result, obj]
        }));
        });
      });

      this.getToken();

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

    async getToken(){
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
      this.userInfo();
    }
    handlePress(id){
      this.props.navigation.navigate("Match", {id: id});
    }

    

    userInfo = () => {

      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 
    
        Axios.get("https://secret-bastion-86008.herokuapp.com/userinfo", {headers: header})
          .then(result => {
            let name = result.data[0].name;
            this.setState({name: name});
          })
          .catch(err => {
            throw err;
          })
      }
  
    }

    menuHandler = () => {
      if(this.state.menu === true){
        this.setState({
          menu: false
        })
      }
      else{
        this.setState({
          menu: true
        })
      }
    }


  


render(){

  if(this.state.loadingFont){
    return <></>
  }

  return (
    
    <>
    {this.state.menu ? <></> : <MenuScreen name={this.state.name}/>}
    <ScrollView  contentContainerStyle={{ alignContent: "center", justifyContent: 'center'}} style={this.state.menu ? styles.container : styles.containerMenu}>
      <StatusBar backgroundColor="#151D3B" />
      <Top name={this.state.name} menuHandler={this.menuHandler} />
      {/* <Button title="Profile" onPress={() => {this.props.navigation.navigate('Profile')}}> </Button> */}
      <LiveTitle />
      <ScrollView style={styles.scrollViewCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
      <LiveMatch />
      <LiveMatch />
      <LiveMatch />
      <LiveMatch />
      </ScrollView>
      <FutureTitle />
      <View style={styles.futureDiv}>
          
     {this.state.result.map(obj => {
     return(
     <TouchableWithoutFeedback key={obj.home_team} onPress={() => {this.props.navigation.navigate("Match")} }>
          <View style={styles.game}> 
          <View style={styles.row2}>
         <Text style={styles.leagueText}>{obj.sport_nice} | Today 19:55</Text>
        </View>
        <View style={styles.teamsView}>
          <View style={styles.teamRow}>
            <Image source={require("./img/milan.png")} style={styles.futureTeamIcn}></Image>
        <Text style={styles.teamText}>{obj.teams[0]}</Text>
        </View>
        <View style={styles.teamRow}>
            <Image source={require("./img/juventus.png")} style={styles.futureTeamIcn}></Image>
        <Text style={styles.teamText}>{obj.teams[1]}</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.odds}><Text style={styles.text}>2.4</Text></View>
          <View style={styles.odds}><Text style={styles.text}>1.6</Text></View>
          <View style={styles.odds}><Text style={styles.text}>1.5</Text></View>
      </View>
     </View>
     </TouchableWithoutFeedback>
       )
     })}
     </View>
     
     
    </ScrollView>
    
    </>
    
);
}
    
  }

  const styles = StyleSheet.create({
    container: { 
      width: width,
      height: height,
      backgroundColor: "#F5F6FA",
      zIndex: 0,
    },
    containerMenu: {
      marginLeft: 300,
      width: width,
      marginTop: 200,
      borderRadius: 25,
      height: height,
      backgroundColor: "#F5F6FA",
      
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
    },
    game: {
      width: 350,
      borderRadius: 20,
      height: 218,
      justifyContent: "space-between",
      backgroundColor: "#fff",
      flexDirection: "column",
      marginBottom:  20,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 15
    },
    row:{
      flexDirection: "row",
      justifyContent: "space-around",
      paddingRight: 10,
      paddingLeft: 10
    },
    row2: {
      flexDirection: "row",
      paddingTop: 15,
      paddingLeft: 30,
    },
    odds: {
      width: 84,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#F2EDFA",
      borderColor: "#D1C0F1",
      borderWidth: 1,
  
    },
    text: {
      color: "#8956EA",
      fontSize: 14,
      fontFamily: "prompt-bold"
    },
    teamsView: {
      paddingLeft: 30,
      paddingBottom:20,
      paddingTop: 10
    },
    teamText: {
      fontSize: 15,
      paddingTop: 10,
      fontFamily: "prompt-bold"
    },
    futureDiv: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    futureTeamIcn: {
      width: 12,
      height: 20,
      marginTop:10,
      marginRight: 5
    },
    leagueText: {
      color: "#A7A8AB",
      fontWeight: "400",
      fontFamily: "prompt"
    },
    teamRow: {
      flexDirection: "row",
      alignItems: "center"
    }
  });

  export default withNavigation(main);


//   {this.state.result.map(obj => {
//     return(
//       <TouchableWithoutFeedback key={obj.matchID} onPress={() => {this.handlePress(obj.matchID)}}>
//       <View style={styles.game}> 
//     <View style={styles.teamsView}>
//     <Text style={styles.teamText}>{obj.homeTeamInfo.homeTeam}</Text>
//     <Text style={styles.teamText}>{obj.awayTeamInfo.awayTeam}</Text>
//     </View>
//     <View style={styles.row}>
//     <View style={styles.odds}><Text style={styles.text}>dsadsa</Text></View>
//       <View style={styles.odds}><Text style={styles.text}>1.6</Text></View>
//       <View style={styles.odds}><Text style={styles.text}>1.5</Text></View>
//   </View>
//  </View>
//  </TouchableWithoutFeedback>
//     )
//   })}