import React from 'react';
import { StyleSheet, TouchableOpacity,FlatList, AsyncStorage, Text, View, Dimensions, TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import SingleBet from "./singleBet";
import TotalBet from "./totalBets";


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class Button extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          bets: [],
          betNum: 0,
            loadingFont: true
        }
       
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

        this.getBets();
    }

    getBets = async () => {

        let bets = await AsyncStorage.getItem("@bets");
        let betNum = await AsyncStorage.getItem("@betNum");
        if(bets != null){
            let betsArray = JSON.parse(bets).newArray;

            this.setState({
                betNum: betNum,
                bets: betsArray
            })
        }
    }

    render(){

        const singleBet = ({ item }) => (
           <SingleBet odds={item.odds} type={item.type} team1={item.team1} team2={item.team2} team={item.team}/>
          );

        if(this.state.loadingFont){
            return <></>
        }

        if(this.props.small){
            return (
                <View onPress={this.props.action} style={styles.container}>
                    <Text style={styles.yourBet}>Your bet</Text>
                    <TouchableWithoutFeedback>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Place bet</Text>
                            <View style={styles.betNumView}>
                              <Text style={styles.numText}>{this.state.betNum}</Text>
                            </View>
                          </View>
                      </TouchableWithoutFeedback>
                </View>
        );
        }
        else{ 

            return(<View style={styles.bigContainer}>
                <FlatList data={this.state.bets} renderItem={singleBet} />
                <TotalBet />
                </View>)
        }
     }

}

const styles = StyleSheet.create({
  container:{
    width: width,
    height: 80,
    backgroundColor: '#131C3E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
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
    width: width,
    height: 500,
    backgroundColor: '#131C3E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
 
    flexDirection: "column",
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
  }

});