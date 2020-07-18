import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SmallLine from './smallLine.jsx';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class XLMyBetItems extends React.Component {
    render(){
        return (
                  <View style={styles.bet}>
                    <Text style={styles.typeText}>
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
                    <SmallLine />
                </View>
          );
     }
 
}

const styles = StyleSheet.create({
    
  bet:{
    width: 315,
    height: 201,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'column',
  },

  typeText:{
    fontSize: 12,
  },

  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  team:{
    fontSize: 18,
  },

  odds:{
    fontSize: 18,
    fontWeight: 'bold',
  },

  matchUp:{
    fontSize: 12,
  },

  time:{
    fontSize: 12,
  },

  betAmount:{
    fontSize: 18,
    paddingTop: 20,
  },

  win:{
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
  },

});