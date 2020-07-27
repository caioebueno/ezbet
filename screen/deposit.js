import React from 'react';
import { StyleSheet, AsyncStorage,StatusBar, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import Axios from "axios";
import * as Font from 'expo-font';
import SmallInput from '../components/smallInput.jsx';
import TopBar from '../components/topBar.jsx';
import Button from '../components/button.jsx';
import PositiveAlert from "../components/positiveAlert.jsx";
import LottieView from "lottie-react-native";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Personal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: null,
            amount : "",
            cardNumber: "",
            expDate: "",
            cvv: "",
            alert: false
        }
        this.handleInputChanges.bind(this);
        this.makeDeposit.bind(this);
    }
    handleInputChanges = (name, value) => {
        this.setState({
            [name] : value
        })
    }

   getToken = async () => {
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
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
      this.getToken();
    }

    handleDeposit = (status) => {
      if(status === 200){
        this.setState({alert: true});
        setTimeout(() => {this.setState({alert: false})}, 1000);
      }
    }

    makeDeposit = () => {
      
      console.log(this.state.token);

      if(this.state.token != null){
        
        let header = {
          "x-access-token": this.state.token
        } 

        let body = {
          amount: this.state.amount
        }

        Axios.post("https://secret-bastion-86008.herokuapp.com/deposit", body ,{headers: header})
          .then(result => {
            console.log(result);
            this.handleDeposit(result.data.status);
          })
      
      }
    }

    render(){

      if(this.state.loadingFont){
        return <></>
      }

      if(this.state.alert){
        return <PositiveAlert alert="Deposity made"/>
      }

        return (
            <View style={styles.container}>
              <StatusBar backgroundColor="#151D3B" />
              <View style={styles.headerView}>
              <TopBar title='Make a Deposit'/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                <View style={styles.moveButton}>
                  <Input  label='Amount' placeholder="$$$" state='amount' value={this.state.amount} handleInputChanges = {this.handleInputChanges}/>
                  <Line />
                  <Input placeholder="**** **** **** ****" label = 'Card Number' state = 'cardNumber' value = {this.state.cardAmount} handleInputChanges = {this.handleInputChanges}/>
                  <View style={styles.sideBySide}>
                  <SmallInput placeholder="mm / yy" label = 'Exp. Date' state = 'expDate' value = {this.state.expDate} handleInputChanges = {this.handleInputChanges}/>
                  <SmallInput placeholder="***" label = 'CVV' state = 'cvv' value = {this.state.cvv} handleInputChanges = {this.handleInputChanges}/>
                  </View>
                  </View>
                  <Button title='Deposit' action={this.makeDeposit}/>
                </View>
             </ScrollView>
            </View>
        );
    }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131c3e',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
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
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
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

  sideBySide:{
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-around',
  },

  scroll:{
    height: 650,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  moveButton:{
    flexDirection: 'column',
    alignItems: 'center',
  },

  label:{
    padding: 10,
  },
});