import React, { Component, useRef } from 'react';
import { Button, View, Text, ActivityIndicator, CheckBox, Image,TouchableHighlight,TouchableWithoutFeedback,ImageBackground,  StyleSheet, ScrollView, Dimensions, StatusBar, TextInput, AsyncStorage, TouchableWithoutFeedbackBase, TouchableOpacity } from 'react-native';
import Axios from "axios";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height;
import Odds from "./odd";
import MatchInfo from "./matchInfo";
import OddsAct from './oddsAct';
import OddsBig from "./oddsBig";
import TotalBets from "./totalBets";
import OddsBigAct from "./oddsBigAct";
import SingleBet from "./singleBet";





class match extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
        bets: [],
        loading: true,
        token: null,
        loadingFont: true,
        matchId: null,
        matchData: null,
        view2: false,
        view3: false,
        view4: true,
        amount: 50,
        showBets: true,
        showStatistics: false,
        showMyBet: false,
        result1: false,
        resultX: false,
        result2: false,
        double1: false,
        doubleX: false,
        double2: false,
        under01: false,
        under02: false,
        under11: false,
        under12: false,
        betValue: 0,
        betNum: 0,
        team1: "",
        team2: "",
        league: "",
        odds: null,
        oddsDouble: null,
        totalOdds: 0,
        win: 0

    }
    this.handleAmountChange.bind(this);
  }
   
  handleChange(name, value) {
    this.setState(() => ({ [name]: value }));
  }

  componentDidMount(){
      
  }

  oddsInfo = () => {
    let matchId = this.props.route.params.id;
    let awayTeam = this.props.route.params.awayTeam;
    let homeTeam = this.props.route.params.homeTeam;
    let league = this.props.route.params.league;
      this.setState(
        {
          matchId: matchId,
          team1: homeTeam,
          team2: awayTeam,
          league: league
        });

      if(this.state.token != null){
        let header = {
          "x-access-token": this.state.token
        } 
      
        Axios.get("https://secret-bastion-86008.herokuapp.com/odds/" + this.state.matchId, {headers: header})
        .then(result => {
          console.log(result);
            this.setState({
              odds: result.data[0].main.sp.full_time_result.odds, 
              loading: false,
              oddsDouble: result.data[0].main.sp.double_chance.odds
            });
            console.log(this.state);
       })
      }
  }

  handleAmountChange = (txt) => {
    this.setState({
      amount: txt
    });
  }

  async getToken(){
    const token = await AsyncStorage.getItem("@token");
    this.setState({token: token});
    this.oddsInfo();
  }

  UNSAFE_componentWillMount(){
    this.getToken()
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

  // componentDidUpdate(){
  //   this.setTotal();
  // }

  selectBetResult  = async (position, odds, type, team1, team2, team) => {

    let newArray = this.state.bets.filter(bet => bet.type != type);
   
    console.log(newArray);

    let body = {
      amount: this.state.amount,
      position: position,
      type: type,
      odds: odds,
      game_id: this.state.matchId,
      team1: team1,
      team2, team2,
      team: team
    }

    newArray.push(body);


    if(newArray.length != this.state.bets.length){
      await this.setState({
        bets: newArray,
        betNum: this.state.betNum + 1,
      });
    }else{
      await this.setState({
        bets: newArray,
        
      });
    }

    this.setTotal();

  }
  
 

   makeBet = () => {


    if(this.state.token != null){
      let header = {
        "x-access-token": this.state.token
      } 

      let body = {
        bets: this.state.bets
      }

      Axios.post("http://localhost:3000/bet", body, {headers: header})
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          throw err;
        })
    }

  }

  setTotal = async () => {
    let toalOdds = 0;
    let win = 0;
    await this.state.bets.forEach(bet => {

      toalOdds = toalOdds + Number(bet.odds);
      win = win + (Number(bet.amount) * bet.odds);

    });   
    console.log(toalOdds);
    this.setState({
      totalOdds: toalOdds,
      win: win
    })

  }

  unselectBetResult = (type) => {
    let newArray = this.state.bets.filter(bet => bet.type != type);

    this.setState({
      bets: newArray,
      betNum: this.state.betNum - 1,
    })
  }

 


render(){

  if(this.state.loadingFont || this.state.loading){
    return <View style={styles.loadingPage}><ActivityIndicator /></View>
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
    ?<TouchableWithoutFeedback onPress={() => {this.unselectBetResult("Match Result") ,this.setState({result1: false, resultX: false, result2: false});}}><View><OddsAct position="1" odds={this.state.odds[0].odds}/></View></TouchableWithoutFeedback>
    :<TouchableWithoutFeedback onPress={() => {this.selectBetResult(1, this.state.odds[0].odds, "Match Result", this.state.team1, this.state.team2, this.state.team1); this.setState({result1: true, resultX: false, result2: false});}}><View><Odds position="1" odds={this.state.odds[0].odds}/></View></TouchableWithoutFeedback>
    }
    {this.state.resultX 
    ?<TouchableWithoutFeedback onPress={() => {this.unselectBetResult("Match Result") ,this.setState({result1: false, resultX: false, result2: false});}}><View><OddsAct position="X" odds={this.state.odds[1].odds}/></View></TouchableWithoutFeedback>
    :<TouchableWithoutFeedback onPress={() => {this.selectBetResult(1, this.state.odds[1].odds, "Match Result", this.state.team1, this.state.team2, "Draw"); this.setState({result1: false, resultX: true, result2: false})}}><View><Odds position="X" odds={this.state.odds[1].odds}/></View></TouchableWithoutFeedback>
    }
    {this.state.result2
    ?<TouchableWithoutFeedback onPress={() => {this.unselectBetResult("Match Result") ,this.setState({result1: false, resultX: false, result2: false});}}><View><OddsAct position="2" odds={this.state.odds[2].odds}/></View></TouchableWithoutFeedback>
    :<TouchableWithoutFeedback onPress={() => {this.selectBetResult(1, this.state.odds[2].odds, "Match Result", this.state.team1, this.state.team2, this.state.team2); this.setState({result1: false, resultX: false, result2: true})}}><View><Odds position="2" odds={this.state.odds[2].odds}/></View></TouchableWithoutFeedback>
    }
  </View>
  <View style={styles.titleView}>
      <Text style={styles.titleText}>Double chance</Text>
    </View>
  <View style={styles.oddsView}>
  {this.state.double1 
    ?<TouchableWithoutFeedback onPress={() => {this.unselectBetResult("Double Chance"), this.setState({double1: false, doubleX: false, double2: false})}}><View><OddsAct position="1" odds={this.state.oddsDouble[0].odds}/></View></TouchableWithoutFeedback>
    :<TouchableWithoutFeedback onPress={() => {this.selectBetResult(1, this.state.oddsDouble[0].odds, "Double Chance", this.state.team1, this.state.team2, this.state.team1); this.setState({double1: true, doubleX: false, double2: false})}}><View><Odds position="1" odds={this.state.oddsDouble[0].odds}/></View></TouchableWithoutFeedback>
    }
    {this.state.doubleX 
    ?<TouchableWithoutFeedback onPress={() => {this.unselectBetResult("Double Chance"), this.setState({double1: false, doubleX: false, double2: false})}}><View><OddsAct position="X" odds={this.state.oddsDouble[1].odds}/></View></TouchableWithoutFeedback>
    :<TouchableWithoutFeedback onPress={() => {this.selectBetResult(1, this.state.oddsDouble[1].odds, "Double Chance", this.state.team1, this.state.team2, "Draw"); this.setState({double1: false, doubleX: true, double2: false})}}><View><Odds position="X" odds={this.state.oddsDouble[1].odds}/></View></TouchableWithoutFeedback>
    }
    {this.state.double2
    ?<TouchableWithoutFeedback onPress={() => {this.unselectBetResult("Double Chance"), this.setState({double1: false, doubleX: false, double2: false})}}><View><OddsAct position="2" odds={this.state.oddsDouble[2].odds}/></View></TouchableWithoutFeedback>
    :<TouchableWithoutFeedback onPress={() => {this.selectBetResult(1, this.state.odds[2].odds, "Double Chance", this.state.team1, this.state.team2, this.state.team2); this.setState({double1: false, doubleX: false, double2: true})}}><View><Odds position="2" odds={this.state.oddsDouble[2].odds}/></View></TouchableWithoutFeedback>
    }
  </View>
  <View style={styles.titleView}>
      <Text style={styles.titleText}>Total goals - Over/Under</Text>
  </View>
  <View style={styles.oddsView}>
    {this.state.under01 
    ? <TouchableWithoutFeedback onPress={() => {this.setState({under01: false, under02: false, under11: false, under12: false})}}><View><OddsBigAct position="Over 0.5" odds="2.5"/></View></TouchableWithoutFeedback>
    : <TouchableWithoutFeedback onPress={() => {this.setState({under01: true, under02: false, under11: false, under12: false})}}><View><OddsBig position="Over 0.5" odds="2.5"/></View></TouchableWithoutFeedback>
    }
    {this.state.under02 
    ? <TouchableWithoutFeedback onPress={() => {this.setState({under01: false, under02: false, under11: false, under12: false})}}><View><OddsBigAct position="Over 0.5" odds="2.5"/></View></TouchableWithoutFeedback>
    : <TouchableWithoutFeedback onPress={() => {this.setState({under01: false, under02: true, under11: false, under12: false})}}><View><OddsBig position="Over 0.5" odds="2.5"/></View></TouchableWithoutFeedback>
    }
  </View>
  <View style={styles.oddsView}>
    {this.state.under11 
    ? <TouchableWithoutFeedback onPress={() => {this.setState({under01: false, under02: false, under11: false, under12: false})}}><View><OddsBigAct position="Over 1" odds="2.5"/></View></TouchableWithoutFeedback>
    : <TouchableWithoutFeedback onPress={() => {this.setState({under01: false, under02: false, under11: true, under12: false})}}><View><OddsBig position="Over 1" odds="2.5"/></View></TouchableWithoutFeedback>
    }
    {this.state.under12 
    ? <TouchableWithoutFeedback onPress={() => {this.setState({under01: false, under02: false, under11: false, under12: false})}}><View><OddsBigAct position="Over 1" odds="2.5"/></View></TouchableWithoutFeedback>
    : <TouchableWithoutFeedback onPress={() => {this.setState({under01: false, under02: false, under11: false, under12: true})}}><View><OddsBig position="Over 1" odds="2.5"/></View></TouchableWithoutFeedback>
    }
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
    <TouchableWithoutFeedback onPress={this.makeBet}>
    <View style={styles.yourBetBtn}>
      <Text style={styles.placeBetText}>Place bet</Text>
      <View style={styles.betNumView}><Text style={styles.betNumText}>{this.state.betNum}</Text></View>
    </View>
    </TouchableWithoutFeedback>
  </View></View>;
  const myBetsTrueRender = 
  <View style={styles.myBetTrueRenderView}>
 
   
    <ScrollView style={styles.scrollBet} showsVerticalScrollIndicator={false}>
      <TouchableOpacity>


        {(this.state.bets.length === 0) ? <> </> : this.state.bets.map(bet => {
          return   <SingleBet odds={bet.odds} type={bet.type} team1={bet.team1} team2={bet.team2} team={bet.team}/>
        })}

      </TouchableOpacity>
    </ScrollView>

    <TotalBets odds={this.state.totalOdds} win={this.state.win} changeText={this.handleAmountChange} state={this.state.amount}/>
   
  
 
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

          {(this.state.showStatistics === false && this.state.showMyBet === false) ? <MatchInfo date="18 january" team1={this.state.team1} team2={this.state.team2}/> : <></>}
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
      padding: 15
    },
    menuIcon: {
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 0,
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
    flex: 0.3,
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
    height: 300
  },
  allBetsView: {
    
  },
  loadingPage: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }

 
  });

  export default withNavigation(match);