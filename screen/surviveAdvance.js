import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Input from '../components/Input.jsx';
import Line from '../components/line.jsx';
import TopBar from '../components/topBar.jsx';
import Button from '../components/button.jsx';
import SmallLine from '../components/smallLine.jsx';
import * as Font from 'expo-font';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class changePass extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loadingFont: true,
        }
        this.handleInputChanges.bind(this);
    }
    handleInputChanges(name, value){
        this.setState({
            [name] : value

        })
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
  }
    render(){
      if(this.state.loadingFont){
        return <> </>
      }
        return (
            <View style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.headerView}>
              <TopBar title = 'Survive & Advance'/>
              </View>
              <ScrollView style={styles.scroll}>
              <View style={styles.personalBackground}>
                <View style={styles.advanceRules}>
                  <View>
                    <Text style={styles.advanceTitle}>Survive & Advance</Text>
                  </View>
                  <View>
                    <Text style={styles.advanceText}>Survive & Advace is a survior style contest offeed weekly</Text>
                  </View>
                  <SmallLine />
                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>1</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users <br></br>have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>1</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts until all users <br></br>have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>1</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users <br></br>have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>1</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users <br></br>have been eliminated.</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text style={styles.advanceNumber}>1</Text>
                    </View>
                    <View>
                    <Text style={styles.advanceProp}>Each contest lasts untill all users <br></br>have been eliminated.</Text>
                    </View>
                  </View>
                  <View>
                  <SmallLine />
                  </View>

                  <View stlye={styles.rowItems}>
                    <View style={styles.column}>
                     <Text>Players</Text>
                      <Text>30/100</Text>
                    </View>
                  </View>

                  <View stlye={styles.rowItems}>
                    <View style={styles.column}>
                     <Text>Players</Text>
                      <Text>30/100</Text>
                    </View>
                  </View>

                </View>
                <View>
                  <Button title = 'Join Tournament'/>
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
    height: 467,
    borderRadius: 15,

    backgroundColor: '#fff',
    padding: 30,
    fontFamily: 'prompt',
  },

  advanceText:{
      color: '#131c3e',
      opacity: 0.6,
  },

  row:{
    flexDirection: 'row',
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
    alignItems: 'row',
  },

  column:{
    flexDirection: "column",
  },
});