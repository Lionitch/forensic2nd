/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';


import Loginn from './interface/Login';
import ForgotPSs from './interface/ForgotPS';
import Signupp from './interface/SignUp';
import Investigatorr from './interface/Investigator';
import Verifierr from './interface/Verifier';
import Casess from './interface/Cases';
import NewFormm from './interface/NewForm';
import EvidenceFormm from './interface/EvidenceForm';
import Verifyingg from './interface/Verifying';
import Pdff from './interface/Pdf';
import InvCases from './interface/InvCase';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MainStack = createStackNavigator();

export default class App extends React.Component{
    render(){
      return(
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login" headerMode="screen" 
          screenOptions={{headerStyle:{backgroundColor:"#2B0140"}, headerTintColor: 'white', headerTitleStyle: {fontWeight: 'bold',},}}>
            <MainStack.Screen name="Login" component={Loginn} options={{ title: '     Mobile Forensic Application Tool' }}/>
            <MainStack.Screen name="ForgotPS" component={ForgotPSs} options={{ title: 'Forgot Password' }}/>
            <MainStack.Screen name="Signup" component={Signupp} options={{ title: 'Create New Account' }}/>
            <MainStack.Screen name="Investigator" component={Investigatorr} options={{ title: 'Homepage' }}/>
            <MainStack.Screen name="Verifier" component={Verifierr} options={{ title: 'Homepage' }}/>
            <MainStack.Screen name="Cases" component={Casess} options={{ title: 'Existing Cases' }}/>
            <MainStack.Screen name="NewForm" component={NewFormm} options={{ title: 'Case Form' }}/>
            <MainStack.Screen name="EvidenceForm" component={EvidenceFormm} options={{ title: 'Evidence Form' }}/>
            <MainStack.Screen name="Verifying" component={Verifyingg} options={{ title: 'Verifying Items' }}/>
            <MainStack.Screen name="Pdf" component={Pdff} options={{ title: 'Converting Data to PDF' }}/>
            <MainStack.Screen name="InvCase" component={InvCases} options={{ title: 'Existing Cases' }}/>
          </MainStack.Navigator>
        </NavigationContainer>
      );
    }
    
}




const styles = StyleSheet.create({
  

});

