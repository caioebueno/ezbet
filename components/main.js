import React, { Component, useRef } from 'react';
import { Button,Animated, ActivityIndicator, View, Text, Image, StyleSheet, ScrollView, Dimensions,TouchableWithoutFeedback, StatusBar, TextInput, AsyncStorage } from 'react-native';
import Axios from "axios";
import * as Font from 'expo-font';

import { withNavigation } from 'react-navigation';
import Top from "./top";
import LiveTitle from "./liveTitle";
import BetBar from "./betBar";
import LiveMatch from "./liveMatch";
import FutureTitle from "./futureTitle";
import MenuScreen from './menu';
import { FlatList } from 'react-native-gesture-handler';


var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;


class main extends React.Component {

  
  constructor(props) {
    super(props)
    this.state = {
      loadingGames: true,
      result: [],
      basketballInfo: [],
      token: null,
      name: null,
      menu: true,
      loadingFont: true,
      category: "soccer",
      num: 0,
      small: true
    }
    this.handleCategory = this.handleCategory.bind(this);
    this.menuHandler = this.menuHandler.bind(this);
  }
   

  UNSAFE_componentWillMount(){

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

      this.getBets();
    }

    async getToken(){
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
      this.userInfo();
      this.soccerInfo();
      this.getBasketballInfo();
    }
    handlePress(id, away, home, league){
      this.props.navigation.navigate("Match", {
        id: id,
        awayTeam: away,
        homeTeam: home,
        league: league
      });

    }

    soccerInfo = () => {

      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 
    

      Axios.get("https://secret-bastion-86008.herokuapp.com/soccer", {headers: header})
      .then(response => {
        console.log(response);
        response.data.forEach(obj => {
          this.setState(previousState => ({
            result: [...previousState.result, obj]
        }));
        });
        this.setState({loadingGames: false});
      })
      .catch(err => {
        console.log(err + "error in soccer info");
        throw err
      })
    }
    }

    getBasketballInfo = () => {
      let header = {
        "x-access-token": this.state.token
      } 

        Axios.get("http://localhost:3000/basketball", {headers: header})
        .then(response => {
          console.log(response);
          response.data.forEach(obj => {
            this.setState(previousState => ({
              basketballInfo: [...previousState.basketballInfo, obj]
          }));
          });
          
        })
        .catch(err => {
          console.log(err + "error in basketball info");
          throw err
        })
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

    getBets = async () => {

      let bets = await AsyncStorage.getItem("@bets");
      let betNums = await AsyncStorage.getItem("@betNum");
      console.log(JSON.stringify(bets));
      this.setState({
        num: betNums
      })

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

    handleCategory = (category) => {
      this.setState({
        category: category
      })
      console.log(this.state.category);
    }


  


render(){

  if(this.state.loadingFont){
    return <View style={styles.loadingScreen}><ActivityIndicator size="large" color="#151D3B"/></View>
  }

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback key={item.id} onPress={() => {this.handlePress(item.id, item.away.name, item.home.name, item.league.name)}} >
           <View style={styles.game}> 
           <View style={styles.row2}>
          <Text style={styles.leagueText}>{item.league.name} | Today 19:55</Text>
         </View>
         <View style={styles.teamsView}>
           <View style={styles.teamRow}>
             <Image source={require("./img/milan.png")} style={styles.futureTeamIcn}></Image>
         <Text style={styles.teamText}>{item.away.name}</Text>
         </View>
         <View style={styles.teamRow}>
             <Image source={require("./img/juventus.png")} style={styles.futureTeamIcn}></Image>
         <Text style={styles.teamText}>{item.home.name}</Text>
         </View>
         </View>
         <View style={styles.row}>
         <View style={styles.odds}><Text style={styles.text}>2.4</Text></View>
           <View style={styles.odds}><Text style={styles.text}>1.6</Text></View>
           <View style={styles.odds}><Text style={styles.text}>1.5</Text></View>
       </View>
      </View>
      </TouchableWithoutFeedback>
  );

  if(this.state.loadingFont){
    return <></>
  }

  return (
    
    <>
    {this.state.menu ? <></> : <MenuScreen name={this.state.name}/>}
    <ScrollView  contentContainerStyle={{ alignContent: "center", justifyContent: 'center'}} style={this.state.menu ? styles.container : styles.containerMenu}>
      <StatusBar backgroundColor="#151D3B" />
      <Top name={this.state.name} menuHandler={this.menuHandler} categoryHandler={this.handleCategory}/>
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
          
    {this.state.loadingGames 
    ? <ActivityIndicator />
    :  this.state.category === "soccer" 
    ? <FlatList renderItem={renderItem} data={this.state.result} keyExtractor={item => item.id} onEndReached={() => {this.setState({loadingGames: false});}}/>
    : this.state.category === "basketball" 
      ? this.state.basketballInfo.map(obj => {
        return(
        <TouchableWithoutFeedback key={obj.id} onPress={() => {this.handlePress(obj.id, obj.away.name, obj.home.name, obj.league.name)}} >
             <View style={styles.game}> 
             <View style={styles.row2}>
            <Text style={styles.leagueText}>{obj.league.name} | Today 19:55</Text>
           </View>
           <View style={styles.teamsView}>
             <View style={styles.teamRow}>
               <Image source={require("./img/milan.png")} style={styles.futureTeamIcn}></Image>
           <Text style={styles.teamText}>{obj.away.name}</Text>
           </View>
           <View style={styles.teamRow}>
               <Image source={require("./img/juventus.png")} style={styles.futureTeamIcn}></Image>
           <Text style={styles.teamText}>{obj.home.name}</Text>
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
        })
      : <Text>No</Text>
    }
    
     </View>
     
    
    </ScrollView>
    <TouchableWithoutFeedback onPress={() => {if(this.state.small){this.setState({small: false})}else{this.setState({small: true})}; console.log("click bar")}}>
    <View>
    <BetBar small={this.state.small} num={this.state.num}/>
    </View>
    </TouchableWithoutFeedback>
    </>
    
);
}
    
  }

  const styles = StyleSheet.create({
    container: { 

      backgroundColor: "#F5F6FA",
      height: 300,
      width: width
    },
    containerMenu: {
      marginLeft: 250,
      width: width,
      marginTop: 100,
      borderRadius: 25,
      height: height,
      backgroundColor: "#F5F6FA",
      shadowColor: "#000",
shadowOffset: {
	width: -10,
	height: -10,
},
shadowOpacity: 0.3,
shadowRadius: 16.00,

elevation: 50,
      
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
    },
    loadingScreen: {
      flex: 1,
      backgroundColor: "#fff",
    }
  });

  export default withNavigation(main);

