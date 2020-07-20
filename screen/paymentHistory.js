import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import History from '../components/history.jsx';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class paymentHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }
    handleInputChanges(name, value){
        this.setState({
            [name] : value
        })
    }
    render(){
        return (
            <History balance='$2503.67'/>
        );
    }
     
}

export default withNavigation(paymentHistory);