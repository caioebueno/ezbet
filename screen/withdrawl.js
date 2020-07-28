
import React from 'react';
import { StyleSheet, StatusBar, AsyncStorage, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import Axios from "axios";
import SmallInput from '../components/smallInput.jsx';
import TopBar from '../components/topBar.jsx';
import Button from '../components/button.jsx';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
        }
        this.handleInputChanges = this.handleInputChanges.bind(this);
    }
    
    handleInputChanges(name, value){
        this.setState({
            [name] : value
        })
    }

    UNSAFE_componentWillMount() {
      this.getToken()
    }

    async getToken(){
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
    }

    withdraw = () => {
      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 

        let body = {
          amount: this.state.amount,
          paymant: "Payment Visa/MC: 537541XXXXXX6764",
          time: "15 May 2020 8:00 am"
        }
    
        Axios.post("https://secret-bastion-86008.herokuapp.com/withdraw", body,{headers: header})
          .then(result => {
           console.log(result)
          })
          .catch(err => {
            throw err;
          })
      }
    }

    render(){
        return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.headerView}>
              <TopBar title='Withdrawl'/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                <View style={styles.moveButton}>
                  <Input label='Amount' state='amount' value={this.state.amount} handleInputChanges={this.handleInputChanges}/>
                  <Line />
                  <Input label = 'Card Number' state = 'cardNumber' value = {this.state.cardAmount} handleInputChanges = {this.handleInputChanges}/>
                  <View style={styles.sideBySide}>
                  <SmallInput label = 'Exp. Date' state = 'expDate' value = {this.state.expDate} handleInputChanges = {this.handleInputChanges}/>
                  <SmallInput label = 'CVV' state = 'cvv' value = {this.state.cvv} handleInputChanges = {this.handleInputChanges}/>
                  </View>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {this.withdraw()}}>
                  <Button title='Withdrawl' />
                  </TouchableWithoutFeedback>
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