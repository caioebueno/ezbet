import React from 'react';
import { StyleSheet, TouchableOpacity,FlatList, AsyncStorage, Text, View, Dimensions, TextInput } from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Axios from "axios";
import SingleBet from "./singleBet";
import TotalBet from "./totalBets";
import {Swipeable} from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import Toggle from "./toggleButton.jsx";


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class Button extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          bets: [],
          betNum: "0",
          loadingFont: true,
          amount: "50",
          activeId: null,
          activeType: null,
          token: null,
          win: 0,
          odds: 0,
          single: true,
        }
       this.handleAmount = this.handleAmount.bind(this);
       this.animation = this.animation.bind(this);
       this.handleSingle = this.handleSingle.bind(this);
       this.handleParley = this.handleParley.bind(this);
      }

      menuRef = ref => this.menu = ref;
     
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

        this.getToken();
        this.getBets();
      }

    async getToken(){
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
    }

    getBets = async () => {

        let bets = await AsyncStorage.getItem("@bets");
        let betNum = await AsyncStorage.getItem("@betNum");
        let win = 0;
        let odds = 0;
        if(bets != null ){
            let betsArray = JSON.parse(bets).newArray;

            this.setState({
                bets: betsArray
            });
            betsArray.forEach(element => {
              odds = Number(odds) + Number(element.odds);
              win = Number(win) + Number(this.state.amount)
            });
            this.setState({
              odds: odds,
              win: (win * odds)
            })
        }
        if(betNum != null){
          this.setState({
            betNum: betNum,
          })
        }
        console.log("updated");
    }

    animation = () => {
      
      if(this.props.small){

        console.log(this.menu);
        this.menu.transitionTo({height: 500});
      }
      else{

        this.menu.transitionTo({height: 80});
      }
    }

    closeAnimation = () => {
      
     

        this.menu.transitionTo({height: 80});
      
    }

    openAnimation = () => {
      
     

      this.menu.transitionTo({height: 500});
    
  }
  

    deleteBet = async (id, type) => {
      
     console.log(id);
     console.log(type)
     let asyncBet = await AsyncStorage.getItem("@bets");
     let betsAray = JSON.parse(asyncBet).newArray;

     let newArray = betsAray.filter(bet => (bet.matchId != id || bet.type != type));
     AsyncStorage.setItem("@bets", JSON.stringify({newArray: newArray}));
    this.getBets();
    }

    handleAmount = (text) => {

      let win = (Number(this.state.odds) * Number(text) * this.state.bets.length);

      this.setState({
        amount: text,
        win: win
      });
      


    }

    updateRef = (index, ref) => {
      this.index = ref;
    };

    handleSingle = () => {
 
        this.setState({
          single: true
        })
     
    }

    handleParley = () => {
      this.setState({
        single: false
      })
    }

    placeBet = async () => {


      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 
  
        let asyncBet = await AsyncStorage.getItem("@bets");
        let betsArray = JSON.parse(asyncBet).newArray;

        let body = {
          bets: betsArray
        }
  
        Axios.post("https://secret-bastion-86008.herokuapp.com/bet", body, {headers: header})
          .then(result => {
            if(result.status === 200){
              AsyncStorage.setItem("@bets", JSON.stringify({newArray: []}));
              this.getBets();
            }
          })
          .catch(err => {
            throw err;
          })
      }
  
    }

    render(){
     

      const swipeRender = () => {
        return (
          <TouchableOpacity onPress={() => {this.deleteBet(this.state.activeId, this.state.activeType)}}>
            <View style={styles.deleteCenter}>
            <View style={styles.deleteView}>
              <Text style={styles.deleteText}>Delete</Text>
            </View>
            </View>
          </TouchableOpacity>)
      }
  
        const singleBet = ({ item, index }) => (
          <Swipeable renderRightActions={swipeRender} onSwipeableOpen={() => {this.setState({activeId: item.matchId, activeType: item.type})}} ><View><SingleBet ref={this.index} id={item.matchId} odds={item.odds} type={item.type} team1={item.team1} team2={item.team2} team={item.team}/></View></Swipeable>
          );

        if(this.state.loadingFont){
            return <></>
        }




            return (
             
               <TouchableWithoutFeedback onPress={this.props.action}>
                <Animatable.View ref={this.menuRef} style={styles.container}>
                   {this.props.small ? <View style={styles.col}>
                     <View style={styles.swipeIcon}>

                     </View>
                     <View style={styles.row}>
                    <Text style={styles.yourBet}>Your bet</Text>
            
                    <TouchableOpacity onPress={() => {this.placeBet()}}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Place bet</Text>
                            <View style={styles.betNumView}>
                              <Text style={styles.numText}>{this.state.betNum}</Text>
                            </View>
                          </View>
                      </TouchableOpacity>
                      </View>
                      </View>
                    :   <View style={styles.bigContainer}>
                       <View style={styles.swipeIcon}></View>
                      <TouchableOpacity>
                      <Toggle handleSingle={this.handleSingle} handleParley={this.handleParley} btn1="Single bet" btn2="Parley"/>
                      </TouchableOpacity>
             
                   <ScrollView>
                      <FlatList data={this.state.bets} keyExtractor={item => item.matchId + item.type} renderItem={singleBet} />
                     </ScrollView>
             
                      <TotalBet state={this.state.amount} changeText={this.handleAmount} win={this.state.win} odds={this.state.odds}/>
                    </View>
                    }
                </Animatable.View>
                </TouchableWithoutFeedback>
          
             
        );
        
        // else{ 

        //     return(<Animatable.View ref={this.menuRef}  style={styles.bigContainer}>
        //         <FlatList data={this.state.bets} renderItem={singleBet} />
        //         <TotalBet state={this.state.amount} changeText={this.handleAmount} win="50" odds="3.3"/>
        //         </Animatable.View>)
        // }

     }

}

const styles = StyleSheet.create({
  container:{
    width: width,
    height: 80,
    backgroundColor: '#131C3E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 0,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16.00,

    elevation: 24,
  },
  bigContainer:{
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    width: width,
    paddingTop: 15,
  },
  
  yourBet: {
      color: "#fff",
      fontSize: 14,
      fontFamily: "prompt-semiBold"
  },
  button: {
      width: 122,
      height: 48,
      borderRadius: 16,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
  },
  buttonText: {
      fontSize: 14,
      color: "#8013EF",
      fontFamily: "prompt-semiBold"
  },
  betNumView: {
      width: 21,
      height: 18,
      borderRadius: 50,
      backgroundColor: "#8013EF",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5
  },
  numText: {
      color: "#fff",
      fontFamily: "prompt-semiBold"
  },
  deleteView: {
    backgroundColor: "#F20F0F",

    width: 100,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteText: {
    fontSize: 16,
    fontFamily: "prompt-semiBold",
    color: "#fff"
  },
  col: {
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  swipeIcon: {
    width: 60,
    height: 6,
    borderRadius: 50,
    backgroundColor: "#E6D0FC"
  },
  deleteCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingLeft: 20
  }
  

});