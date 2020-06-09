import axios from 'axios';

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


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class Login extends React.Component {
  state = {
    id: "",
    password: "",
    name: "",
    ip:"http://192.168.0.197:8000"
  }
  checkInput(){
    if (this.state.id==""){
      alert("Please Enter Official ID.")
    }
    else if (this.state.password==""){
      alert("Please Enter your Password.")
    }
    else {
      this.login()
    }
  }
  login(){
    var self = this;
    axios.post(this.state.ip+'/api/login', {
      id: this.state.id,
      password: this.state.password,
      name: this.state.name,
    })
    .then(function (response) {
     if (response.data=="Investigator"){
       self.props.navigation.navigate("Investigator",{ip:self.state.ip, id:self.state.id, name: self.state.name,})
     }
     else if (response.data=="Verifier"){
       self.props.navigation.navigate("Verifier",{ip:self.state.ip})
     }
     else {alert("Your Official ID or password is incorrect.")}
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  anyfunction() {
    console.log(this.state.id);
    console.log("Button pressed!");
    this.props.navigation.navigate("Signup",{ip:this.state.ip});
  }
  toVer() {
    console.log(this.state.id);
    console.log("Button pressed!");
    this.props.navigation.navigate("Verifier");
  }

  render() {
    return (
        <ImageBackground source={require('../image/background.png')} style={styles.backgroundImage}>
          <ScrollView contentContainerStyle={{flex:1,justifyContent:'center'}}>
          <View style={styles.bekas}>
            <View><Image source={require('../image/icon.png')} style={styles.logo}></Image></View>
          </View>

          <View style={styles.container}>


            <View style={styles.inputView} >
              <Image source={require('../image/persona.png')} style={styles.circle}></Image>
              <TextInput
                style={styles.inputText}
                placeholder="Official ID"
                placeholderTextColor="#959297"
                onChangeText={text => this.setState({ id: text })} />
            </View>
            <View style={styles.inputView} >
              <Image source={require('../image/passw.png')} style={styles.circle}></Image>
              <TextInput
                style={styles.inputText}
                secure
                placeholder="Password"
                placeholderTextColor="#959297"
                secureTextEntry 
                onChangeText={text => this.setState({ password: text })} />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => this.checkInput()}>
              <Text style={styles.loginText}>LOG IN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgot}>
              <Text style={{color: "#525252"}}>Forgot your password?</Text>
            </TouchableOpacity>

            <View style={{marginTop:28, alignItems:"center"}}>
              <Text style={{color: "white"}}>------------------------------------ OR -------------------------------------</Text>
            </View>

            <TouchableOpacity onPress={() => this.anyfunction()}>
              <Text style={styles.ext}>Create New Account</Text>
            </TouchableOpacity>


          </View>
          </ScrollView>
        </ImageBackground>
    );
  }
}





const styles = StyleSheet.create({

  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bekas:{
    alignItems:'center',
    marginTop: 38
  },
  logo: {
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "black",
    height: 170,
    width: 170

  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    padding: 3,
    flexDirection: "row"
  },
  circle: {
    width: 45,
    backgroundColor: "#ffe2e2",
    borderRadius: 23,
    height: 45,
  },
  forgot: {
    color: "blue",
    fontSize: 11,
    alignSelf: "flex-end",
    marginRight: 43,
    marginTop:8
  },
  loginBtn: {
    width: "78%",
    backgroundColor: "#3D025A",
    height: 50,
    alignItems: "center",
    borderRadius: 7,
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15
  },
  loginText: {
    height: 60,
    color: "white",
    justifyContent: "center",
    padding: 18,
    fontWeight:"bold",
    fontSize: 18
  },
  ext: {
    height: 60,
    color: "#525252",
    justifyContent: "center",
    padding: 20,
    marginTop: 10,
    fontSize: 16
  },
  inputText: {
    height: 50,
    width: "80%",
    color: "black"
  }
});

