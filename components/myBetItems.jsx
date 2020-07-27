import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Font from 'expo-font';
import SmallLine from './smallLine.jsx';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class MyBetItems extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      loadingFont: true
    }
  }

  UNSAFE_componentWillMount(){
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

    render(){

      if(this.state.loadingFont){
        return <></>
      }

        return (
                  <View style={styles.bet}>
                    <Text style={styles.time}>
                        {this.props.type}
                    </Text>
                     <View style={styles.row}>
                        <Text style={styles.team}>{this.props.team}</Text>
                        <Text style={styles.odds}>{this.props.odds}</Text>
                    </View>
                        <Text style={styles.matchUp}>{this.props.teamOne} - {this.props.teamTwo}</Text>
                        <View style={styles.row}>
                        <Text style={styles.time}>{this.props.time}</Text>
                        <Text style={styles.time}>{this.props.betTime}</Text>
                    </View>
                    <SmallLine style={styles.line} />
                    <View style={styles.row}>
                        <Text style={styles.time}>Bet amount</Text>
                        <Text style={styles.time}>Possible winnings</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.betAmount}>{this.props.betAmount}</Text>
                        <Text style={styles.win}>{this.props.win}</Text>
                    </View>
                </View>
          );
     }
 
}

const styles = StyleSheet.create({
  bet:{
    width: 315,
    height: "auto",
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'column',
    marginTop: 30,
  },

  typeText:{
    fontSize: 12,
  },

  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5
  },

  team:{
    fontSize: 18,
    fontFamily: "prompt"
  },

  odds:{
    fontSize: 18,
    fontFamily: "prompt-semiBold"
  },

  matchUp:{
    fontSize: 12,
    fontFamily: "prompt",
  },

  time:{
    fontSize: 12,
    fontFamily: "prompt",
    color: "#131C3E",
    opacity: 0.6,
  },

  betAmount:{
    fontSize: 18,

  },

  win:{
    fontSize: 18,
    fontWeight: 'bold',
  },
 

});