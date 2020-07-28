import React from 'react';
import { StyleSheet,AsyncStorage, StatusBar, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import Axios from "axios"
import TopBar from '../components/topBar.jsx';
import Button from '../components/button.jsx';
import * as Font from 'expo-font';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class changePass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          token: null, 
          loadingFont: true,
          leagueId: this.props.route.params.id
        }
        this.handleInputChanges.bind(this);
    }
    async getToken(){
      const token = await AsyncStorage.getItem("@token");
      this.setState({token: token});
    }
    handleInputChanges(name, value){
        this.setState({
            [name] : value

        })
    }

    componentWillMount(){
      this.getToken();
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

  joinLeague = () => {
    if(this.state.token != null){
      let header = {
        "x-access-token": this.state.token
      } 

      let body = {
        leagueId: this.state.leagueId
      }

      Axios.post("http://localhost:3000/leagues_users", body, {headers: header})
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          throw err;
        })
    }
  }

    render(){
      if(this.state.loadingFont){
        return <></>
      }
        return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.headerView}>
              <TopBar title = 'Survive Advance'/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                <View style={styles.advanceRules}>
                  <View>
                    <Text style={styles.advanceTitle}>Survive  Advance</Text>
                  </View>
                  <View>
                    <Text style={styles.advanceText}>Survive  Advace is a survior style contest offeed weekly</Text>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>1</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>2</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts until all users have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>3</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>4</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>5</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users have been eliminated.</Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View style={styles.rowItems}>
                    <View style={styles.col}>
                      <Text style={styles.title}>Players</Text>
                      <Text style={styles.money}>30/100</Text>
                    </View>
                    <View style={styles.colCenter}>
                      <Text style={styles.title}>Prize</Text>
                      <Text style={styles.money}>$10,000</Text>
                    </View>
                    <View style={styles.colEnd}>
                      <Text style={styles.title}>Entry</Text>
                      <Text style={styles.money}>$100</Text>
                    </View>
                  </View>
                  
              </View>
                <View>
                  <TouchableWithoutFeedback onPress={() => {this.joinLeague()}}>
                  <Button title = 'Join Tournament'/>
                  </TouchableWithoutFeedback>
                  </View>
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

  scroll:{
    height: 650,
    backgroundColor: '#f4f6fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  advanceTitle:{
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 24,
  },

  advanceRules:{
    width: 315,
    height: 'auto',
    borderRadius: 15,

    backgroundColor: '#fff',
    padding: 16,

  },

  advanceText:{
      color: '#131c3e',
      opacity: 0.6,
      
  },

  row:{
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10
  },

  circle:{
    height: 24,
    width: 24,
    borderRadius: 50,
    backgroundColor: '#E6D0FC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  advanceNumber:{
    color: '#8013EF',
    opacity: 0.6,
  },

  advanceProp:{
    paddingLeft: 16,
  },

  rowItems:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title:{
    color: '#131C3E',
    opacity: 0.6,
    fontSize: 12,

  },

  money:{
    color: '#131C3E',
    fontSize: 18,
    fontFamily: 'prompt-semiBold',
  },

  colCenter:{
    alignItems: 'center',
  },

  colEnd:{
    alignItems: 'flex-end',
  },

  line:{
    height: 1,
    width: 283,
    backgroundColor: '#e6d0fc',
    marginTop: 16,
    marginBottom: 16,
  }

});