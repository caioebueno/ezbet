import React, { Component, useRef } from 'react';
import { Button, View, Text, Image, StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import TopBar from '../components/topBar.jsx';
import LeftSmallArrow from '../components/leftSmallArrow.jsx'
import RightSmallArrow from '../components/rightSmallArrow.jsx'
import TripleToggle from '../components/tripleToggle.jsx';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;




export default class Survivor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        loadingFont: true,
        advancedWidth: 104,
        advanced: 4,
        pending: 4,
        eliminated: 4,
        pendingWidth: 104,
        eliminatedWidth: 104
    }
  }

 
  UNSAFE_componentWillMount(){
    Font.loadAsync({
      'prompt': require('../assets/fonts/Prompt-Regular.ttf'),
      'prompt-bold': require("../assets/fonts/Prompt-Bold.ttf"),
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
    
       
    <View style={styles.container}>
        <TopBar title="League 1" />
        <View style={styles.whiteView}>
            <TripleToggle btn1="My pick" btn2="Favorites" btn3="Leaderboard"/>
            <View style={styles.row}>
                <View style={styles.backBtn}><LeftSmallArrow /></View>
                <Text style={styles.weekText}>Week #2</Text>
                <View style={styles.backBtn}><RightSmallArrow /></View>
            </View>
            <View style={styles.row}>
                <View style={styles.infoView}>
                    <Text style={styles.infoText}>Week #2</Text>
                    <View style={styles.rowCenter}>
                        <View style={[styles.advancedView, {width: this.state.advancedWidth}]}></View><View style={[styles.pendingView, {width: this.state.pendingWidth}]}></View><View style={[styles.eliminatedView, {width: this.state.eliminatedWidth}]}></View>  
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.col}>
                            <Text style={styles.smallInfoText}>
                                Advanced
                            </Text>
                            <Text style={styles.numText}>
                                {this.state.advanced}
                            </Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.smallInfoText}>
                            Pending
                            </Text>
                            <Text style={styles.numText}>
                                {this.state.pending}
                            </Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.smallInfoText}>
                                Eliminated
                            </Text>
                            <Text style={styles.numText}>
                                {this.state.eliminated}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.info2}>
            <Text style={styles.infoText}>Week #2</Text>
            <View style={styles.row3}>
                        <View style={styles.col}>
                            <Text style={styles.smallInfoText}>
                                Eliminated
                            </Text>
                            <Text style={styles.numText}>
                                {this.state.eliminated}
                            </Text>
                        </View>
                        <View style={styles.circle}>
                            <View style={styles.whiteCircle}>
                                </View>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.smallInfoText}>
                                Eliminated
                            </Text>
                            <Text style={styles.numText}>
                                {this.state.eliminated}
                            </Text>
                        </View>
            </View>
            </View>
        </View>
    </View>
  );
  }
    
  }

  const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: "#131C3E",

    },
    whiteView: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
        paddingTop: 30 
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 350,
        alignItems: "center",
        paddingTop: 30
    },
    backBtn: {
        width: 48,
        height: 48,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E6D0FC",
        justifyContent: "center",
        alignItems: "center"
    },
    weekText: {
        fontSize: 18,
        color: "#131C3E",
        fontFamily: "prompt"
    },
    infoView: {
        width: 350,
        height: "auto",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E6D0FC",
        backgroundColor: "#fff",
        padding: 16
    },
    infoText: {
        fontFamily: "prompt-semiBold",
        color: "#131C3E"
    },
   
    rowCenter: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15
    },
    advancedView: {
        backgroundColor: "#459E48",
        height: 8,
        borderWidth: 2,
        borderColor: "#E6D0FC",
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100
    },
    pendingView: {
        height: 8,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 2,
        borderColor: "#E6D0FC",
        backgroundColor: "#FF931A"
    },
    eliminatedView: {
        backgroundColor: "#DE2C00",
        height: 8,
        borderWidth: 2,
        borderColor: "#E6D0FC",
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100
    },
    smallInfoText: {
        fontSize: 12,
        color: "#131C3E",
        opacity: 0.6,
        fontFamily: "prompt"
    },
    numText: {
        fontSize: 12,
        color: "#131C3E",
        fontFamily: "prompt"
    },
    row2: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 15
    },
    col: {
        alignItems: 'center'
    },
    info2: {
        width: 350,
        height: "auto",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E6D0FC",
        backgroundColor: "#fff",
        padding: 16
    },
    row3: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    circle: {
        width: 50,
        height: 100,
        backgroundColor: "#459E48",
        borderTopLeftRadius: 200,
        borderBottomLeftRadius: 200,
        justifyContent: "center",
        alignItems: "flex-end",
        borderWidth: 2,
        borderColor: "#E6D0FC"
    },
    whiteCircle: {
        width: 45,
        height: 90,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50
    }
   
  });

