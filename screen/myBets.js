 import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions,FlatList, ActivityIndicator, TextInput, ScrollView, AsyncStorage } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import TopBar from '../components/topBar.jsx';
import Axios from "axios";
import Button from '../components/button.jsx';
import MyBetItems from '../components/myBetItems.jsx';
import XLMyBetItems from '../components/xlMyBetItems.jsx';
import MediumHeader from '../components/mediumHeader.js';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class myBets extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          token: null,
          bets: [],
          loading: false
        }
    }

    UNSAFE_componentWillMount(){
      this.getToken();
    }

    async getToken(){
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
      this.betInfo();
    }

    betInfo = () => {
      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 
      Axios.get("https://secret-bastion-86008.herokuapp.com/bet", {headers: header})
        .then(result => {
          console.log(result.data);
          this.setState({
            bets: result.data
          })
        })
      }
    }

    render(){

      const renderItem = ({ item }) => (
        <MyBetItems style={styles.betItems}type={item.type} odds={item.odds} team={item.team} teamOne={item.homeTeam} teamTwo={item.awayTeam} time='13:07, 22:45' betTime='Bet placed 12.07, 09:45' betAmount={item.amount} win={"$" + (Number(item.amount) * Number(item.odds))}/>
      );

     

        return (
            <View style={styles.container}>
                <MediumHeader title='My Bets'/>
                <View>

                {this.state.loading 
                ? <ActivityIndicator />
                : <FlatList data={this.state.bets} renderItem={renderItem} keyExtractor={item => item.id} onEndReached={() => {this.setState({loading: false})}} showsVerticalScrollIndicator={false}/>
                }

                </View>
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f4f6fa',
  },

  headerView: {
    flex: 1,
    backgroundColor: '#131c3e',
  },

  white: {
      color: '#fff',
  },

  personalBackground: {
    width: width,
    height: 700,
    paddingTop: 20,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e6d0fc',
    backgroundColor: '#fff',
    height: 60,
    width: 350,
    paddingLeft: 15,
  },

  scroll:{
    height: 650,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  label:{
    padding: 10,
  },

  text:{
    padding: 30,
     lineHeight: 25,
  },
});