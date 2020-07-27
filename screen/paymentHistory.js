import React from 'react';
import { StyleSheet, Text, AsyncStorage,StatusBar, View, Dimensions, TextInput, ScrollView, FlatList } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import Axios from "axios";
import Avatar from '../components/avatar.jsx';
import TopBar from '../components/topBar.jsx';
import History from '../components/history.jsx';
import ToggleButton from '../components/toggleButton.jsx';
import BetHistoryItem from '../components/betHistoryItem.jsx';
import Button from '../components/button.jsx';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Personal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: null,
            depositHistory: [],
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

            this.setState({firstName: name, email: email, balance: balance});
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
    render(){

        const renderItem = ({ item }) => (
            <BetHistoryItem date='15 May 2020 9:00 AM' amount={item.amount} payment='Payment: Visa/MC: 5375XXXXXXXX6764'/>
          );

        return (
            <View style={styles.container}>
              <StatusBar backgroundColor="#151D3B"/>
              <View style={styles.headerView}>
              <TopBar title="Payment History"/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                <View style={styles.button}>
                  <History balance={"$" + this.state.balance + ".00"} />
                  <ToggleButton />
                 <FlatList data={this.state.depositHistory} renderItem={renderItem}/>
                  </View>
                  <Button title ='Make a deposit'/>
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
    paddingTop: 20,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button:{
      marginBottom: 60,
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
});