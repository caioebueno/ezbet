import React, { Component, useRef } from 'react';
import { Button, View, Text, CheckBox, Image,TouchableHighlight,TouchableWithoutFeedback,ImageBackground,  StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage, TouchableWithoutFeedbackBase, TouchableOpacity } from 'react-native';
import Axios from "axios";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;
import Odds from "./odd";
import MatchInfo from "./matchInfo";
import OddsAct from './oddsAct';
import Main from "./main";
import SingleBet from "./singleBet";





class match extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
        loadingFont: true,
        matchId: null,
        matchData: null,
        view2: false,
        view3: false,
        view4: true,
        showBets: true,
        showStatistics: false,
        showMyBet: false,
        result1: false,
        resultX: false,
        result2: false,
        double1: false,
        doubleX: false,
        double2: false,
        betValue: 0,
        betNum: 0,
    }
  }
   
  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }

  componentDidMount(){
      // let matchId = this.props.route.params.id;
      // this.setState({matchId: matchId});
      // Axios.get("https://apisoccer.com/api/Soccer/getOddsByMatchID?apiKey=gUrq5g8UWMgqZsPysDpfb0o3X9BNOCKM&matchID=" + this.props.route.params.id)
      //   .then(result => {
      //       this.setState({matchData: result.data.Data});
      //   })
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
  }


render(){

  if(this.state.loadingFont){
    return <></>
  }

  const betFalseRender = <Text style={styles.labelText}>Bets</Text>;
  const betTrueRender =  
  
  <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollFlex}contentContainerStyle={{flexGrow:1}}  nestedScrollEnabled={true}>
    <TouchableOpacity>
    <TouchableWithoutFeedback onPress={() => {}} style={styles.scrollFlex}>
      <>
    <View style={styles.titleView}>
      <Text style={styles.titleText}>Match result</Text>
    </View>
  <View style={styles.oddsView}>
    {this.state.result1 
    ?<OddsAct position="1" odds="2.5"/>
    :<TouchableWithoutFeedback onPress={() => {this.setState({result1: true, resultX: false, result2: false})}}><View><Odds position="1" odds="2.5"/></View></TouchableWithoutFeedback>
    }
    {this.state.resultX 
    ?<OddsAct position="x" odds="1.2"/>
    :<TouchableWithoutFeedback onPress={() => {this.setState({result1: false, resultX: true, result2: false})}}><View><Odds position="X" odds="2.5"/></View></TouchableWithoutFeedback>
    }
    {this.state.result2
    ?<OddsAct position="2" odds="1.2"/>
    :<TouchableWithoutFeedback onPress={() => {this.setState({result1: false, resultX: false, result2: true})}}><View><Odds position="2" odds="2.5"/></View></TouchableWithoutFeedback>
    }
  </View>
  <View style={styles.titleView}>
      <Text style={styles.titleText}>Double chance</Text>
    </View>
  <View style={styles.oddsView}>
  {this.state.double1 
    ?<OddsAct position="1" odds="2.5"/>
    :<TouchableWithoutFeedback onPress={() => {this.setState({double1: true, doubleX: false, double2: false})}}><View><Odds position="1" odds="2.5"/></View></TouchableWithoutFeedback>
    }
    {this.state.doubleX 
    ?<OddsAct position="x" odds="1.2"/>
    :<TouchableWithoutFeedback onPress={() => {this.setState({double1: false, doubleX: true, double2: false})}}><View><Odds position="X" odds="2.5"/></View></TouchableWithoutFeedback>
    }
    {this.state.double2
    ?<OddsAct position="2" odds="1.2"/>
    :<TouchableWithoutFeedback onPress={() => {this.setState({double1: false, doubleX: false, double2: true})}}><View><Odds position="2" odds="2.5"/></View></TouchableWithoutFeedback>
    }
  </View>
  <View style={styles.titleView}>
      <Text style={styles.titleText}>Total goals - Over/Under</Text>
  </View>
  <View style={styles.oddsView}>
    <Odds position="1" odds="2.5"/>
    <Odds position="x" odds="1.2" />
    <Odds position="2" odds="3.4" />
  </View>
  <View style={styles.oddsView}>
    <Odds position="1" odds="2.5"/>
    <Odds position="x" odds="1.2" />
    <Odds position="2" odds="3.4" />
  </View>
  </>
  </TouchableWithoutFeedback>
 </TouchableOpacity>
  </ScrollView>
 
  ;
  const statisticsFalseRender = <Text style={styles.labelText}>Statistics</Text>;
  const statisticsTrueRender = <></>;
  const myBetsFalseRender =   <View style={styles.falseMyBetView}>
  <View style={styles.expandIcon}></View>
  <View style={styles.falseBetRow}>
    <Text style={styles.yourBetText}>Your bet</Text>
    <TouchableWithoutFeedback onPress={() => {console.log("bet")}}>
    <View style={styles.yourBetBtn}>
      <Text style={styles.placeBetText}>Place bet</Text>
      <View style={styles.betNumView}><Text style={styles.betNumText}>{this.state.betNum}</Text></View>
    </View>
    </TouchableWithoutFeedback>
  </View></View>;
  const myBetsTrueRender = 
  <View style={styles.myBetTrueRenderView}>
 
    <View style={styles.scrollBet}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity>
    <SingleBet odds="1.2" type="Match result" team1="Juventus" team2="Milan" team="Junventus"/>
    <SingleBet odds="1.2" type="Match result" team1="Juventus" team2="Milan" team="Junventus"/>
    <SingleBet odds="1.2" type="Match result" team1="Juventus" team2="Milan" team="Junventus"/>
    <SingleBet odds="1.2" type="Match result" team1="Juventus" team2="Milan" team="Junventus"/>
    <SingleBet odds="1.2" type="Match result" team1="Juventus" team2="Milan" team="Junventus"/>
    <SingleBet odds="1.2" type="Match result" team1="Juventus" team2="Milan" team="Junventus"/>
  </TouchableOpacity>
    </ScrollView>
    </View>
  
  <View style={styles.allBetsView}>
  </View>
  </View>


  return (
      
    <View style={styles.container}>
        <View style={styles.firstRow}>
        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Main');}}>
          <ImageBackground source={require("./img/back.png")} style={styles.menuIcon}></ImageBackground>
         </TouchableWithoutFeedback>
       
        <Text style={styles.leagueText}>Serie A</Text>
        <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Profile');}}>
          <ImageBackground source={require("./img/profile.png")} style={styles.menuIcon}></ImageBackground>
         </TouchableWithoutFeedback>
          </View>

        <View style={styles.teamView}>
         
        <View style={(this.state.view3 || this.state.view2) ? styles.noTeamInfoView : styles.teamInfoView}>

          <MatchInfo date="18 january" team1="Juventus" team2="Milan"/>
        </View>
         
        <View  style={styles.betView2}>
          <TouchableWithoutFeedback onPress={() => {this.setState({showBets: true, showMyBet: false, view4: true,view2: false, showStatistics: false, view3: false})}}>
            <View  style={this.state.view4 ? styles.betView : styles.betView2}>
              <View style={(this.state.view3 || this.state.view2) ? styles.falseBetsView : styles.trueBetsView}>
                {this.state.showBets ? betTrueRender : betFalseRender}
                
              </View>
              
              <TouchableWithoutFeedback onPress={() => {this.setState({view2: true,showBets:false, showMyBet: false, showStatistics: true,  view3: false, view4: true})}}>
                <View  style={this.state.view2 ? styles.betView : styles.betView2}>
                  <View style={styles.falseStatisticsView}>
                    {this.state.showStatistics ? statisticsTrueRender : statisticsFalseRender}
                  </View>

                  <TouchableWithoutFeedback onPress={() => {this.setState({view3: true,showBets:false,showMyBet: true, showStatistics: false,  view2: true, view4: true})}}>
                    <View  style={this.state.view3 ? styles.betView4 : this.state.view2 ? styles.betView32 : styles.betView3}>
                      {this.state.showMyBet ? myBetsTrueRender : myBetsFalseRender}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
           
            </View>
          </TouchableWithoutFeedback>
        </View>
            
           

           

          
       
          
          </View>
         
           
         


        {/* <Button title="Back" onPress={() => {this.props.navigation.navigate("Main")}}></Button> */}
        {/* <Button title="state" onPress={() => {console.log(this.state)}}></Button> */}
{/*         
        <Text>Match Screen</Text>
        <Text>{this.state.matchId}</Text>
        <View>
            {this.state.matchData === null ? isNull :  <Text>{this.state.matchData.awayTeam} X {this.state.matchData.homeTeam}</Text>   }
        </View> */}

    </View>
);
}
   
  }

  const styles = StyleSheet.create({
    container: { 
      width: width,
      height: height,
      backgroundColor: "#151D3B",
      
      
    },
    firstRow: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20
    },
    menuIcon: {
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 20,
      marginTop: 0,
      width: 50,
      height: 50,
      
      borderRadius: 10,
  },
  leagueText: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "prompt"
  },
  teamView: {
    backgroundColor: "#ffffff",
    width: width,
    height: 600,
    flex: 1,
    borderRadius: 25
  },
  betView: {
    flex: 6,
    backgroundColor: "#ffffff",
    width: width,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  betView2: {
    flex: 3,
    backgroundColor: "#ffffff",
    width: width,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  betView3: {
    justifyContent: "center",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#151D3B",
    position: "relative"
  },
  betView32: {
    justifyContent: "center",
    flex: 0.2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#151D3B",
    position: "relative"
  },
  betView4: {
    justifyContent: "center",
    flex: 6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#151D3B",
    position: "relative"
  },
  falseBetsView: {
    flexDirection: "column",
    padding: 25,
    flex: 0.5,
    justifyContent: "center"
  },
  expandIcon: {
    height: 6,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#E6D0FC"
  },
  falseBetRow: {
    flexDirection: "row",
    width: width,
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 30,
    alignItems: "center"

  }, 
  yourBetBtn: {
    width: 122,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  placeBetText: {
    color: "#8013EF",
    fontSize: 14,
    fontFamily: "prompt-medium"
  },
  yourBetText: {
    color: "#fff",
    fontFamily: "prompt-bold"
  },
  falseStatisticsView: {
    justifyContent: "center",
    paddingLeft: 25,
    flex: 1
  },
  trueBetsView: {
    justifyContent: "center",
    padding: 15,
    flex: 5
  },

  teamInfoView: {
    flex: 1
  },
  noTeamInfoView: {
    flex: 0.4
  },
  labelText: {
    color: "#131C3E",
    fontFamily: "prompt-bold"
  },
  falseMyBetView: {
    padding: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  oddCheck: {
    width: 94,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(128, 19, 239, 0.05)",
    borderWidth: 1,
    borderColor: "#E6D0FC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15

  },
  oddsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5

  },
  sideNum: {
    color: "#131C3E",
    fontSize: 14
  },
  oddsNum: {
    color: "#8013EF",
    fontWeight: "bold",
    fontSize: 14
  },
  titleView: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 20
  },
  titleText: {
    color: "#131C3E",
    fontSize: 18,
    fontFamily: "prompt"
  },
  scrollFlex: {
    flex: 1,
  
  },
  betNumView: {
    width: 21,
    height: 18,
    borderRadius: 50,
    backgroundColor: "#8013EF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  },
  betNumText: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "prompt"
  },
  myBetTrueRenderView: {
    flexDirection: "column",
    alignItems: "center"
  },
  scrollBet: {
  
  },
  allBetsView: {
    
  }

 
  });

  export default withNavigation(match);