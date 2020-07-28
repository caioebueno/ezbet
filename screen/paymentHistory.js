import React from 'react';
import { StyleSheet, Text,ActivityIndicator,  AsyncStorage,StatusBar, View, Dimensions, TextInput, ScrollView, FlatList } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import Axios from "axios";
import * as RootNavigation from '../components/nav.js';
import Avatar from '../components/avatar.jsx';
import TopBar from '../components/topBar.jsx';
import History from '../components/history.jsx';
import ToggleButton from '../components/toggleButton.jsx';
import BetHistoryItem from '../components/betHistoryItem.jsx';
import Button from '../components/button.jsx';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Personal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: null,
            loading: true,
            deposit: true,
            depositHistory: [],
            withdrawHistory: [],
            firstName : "",
            lastName : "",
            birthday : "",
            phoneNumber: "",
            email: "",
            country: "",
            city: "",
            balance: 0
        }
        this.handleInputChanges.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleInputChanges = (name, value) => {
        this.setState({
            [name] : value
        })
    }

    UNSAFE_componentWillMount(){
      this.getToken();
    }

    async getToken(){
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
      this.userInfo();
      this.getDeposit();
      this.getWithdraw();
    }

    handleToggle = () => {
      if(this.state.deposit){
        this.setState({
          deposit: false
        })
      }
      else{
        this.setState({
          deposit: true
        })
      }
    }

    userInfo = () => {

      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 
    
        Axios.get("https://secret-bastion-86008.herokuapp.com/userinfo", {headers: header})
          .then(result => {
            let name = result.data[0].name;
            let email = result.data[0].email;
            let balance = result.data[0].balance;

            this.setState({firstName: name, email: email, balance: balance, loading: false});
          })
          .catch(err => {
            throw err;
          })
      }
    }
  
    getDeposit= ()=> {
        if(this.state.token != null){
            let header = {
              "x-access-token": this.state.token
            } 
        
            Axios.get("https://secret-bastion-86008.herokuapp.com/deposit", {headers: header})
              .then(result => {
                console.log(result)
                this.setState({
                    depositHistory : result.data
                })
              })
              .catch(err => {
                throw err;
              })
          }

    }

    getWithdraw = () => {
      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 
    
        Axios.get("https://secret-bastion-86008.herokuapp.com/withdraw", {headers: header})
          .then(result => {
            console.log(result)
            this.setState({
                withdrawHistory : result.data
            })
          })
          .catch(err => {
            throw err;
          })
      }
    }
    render(){

      

        const renderItem = ({ item }) => (
            <BetHistoryItem date='15 May 2020 9:00 AM' amount={item.amount} payment='Payment: Visa/MC: 5375XXXXXXXX6764'/>
          );

          const deposit = <><ScrollView style={styles.scroll}>
        <FlatList data={this.state.depositHistory} renderItem={renderItem}/>
        </ScrollView>
        <Button title ='Make a deposit'/></>;
        const withdraw = <><ScrollView style={styles.scroll}>
        <FlatList data={this.state.withdrawHistory} renderItem={renderItem}/>
        </ScrollView>
        <TouchableWithoutFeedback onPress={() => {RootNavigation.navigate("Withdraw")}}><Button title ='Make a withdraw'/></TouchableWithoutFeedback></>;

        if(this.state.loading){
          return <View style={{flex: 1}}><ActivityIndicator size="large" color="#151D3B" /></View>
        }

        return (
            <View style={styles.container}>
              <StatusBar backgroundColor="#151D3B"/>
              <View style={styles.headerView}>
              <TopBar title="Payment History"/>
              </View>
           
              <View style={styles.personalBackground}>
                  <History balance={"$" + this.state.balance + ".00"} />
                  <ToggleButton handle={this.handleToggle} btn1="Deposit" btn2="Withdraw"/>
                  {this.state.deposit ? deposit : withdraw}
              </View>
          
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
    flex: 8,
    width: width,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button:{
     paddingBottom: 30
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
    height: 300,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  label:{
    padding: 10,
  },
});