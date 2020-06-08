import axios from 'axios';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Login from './Login';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class SignUp extends React.Component {
  state = {
    id: "",
    name: "",
    password: "",
    conpassword: "",
    email: "",
    ip: this.props.route.params.ip,
  }

  anyfunction() {
    console.log("Button pressed!");
    this.props.navigation.goBack();
  }
  toInv() {
    // console.log(this.state.id);
    // console.log("Button pressed!");
    // this.props.navigation.navigate("Investigator");
    if (this.state.id==""){
      alert("Please Enter Official ID.")
    }
    else if (this.state.name==""){
      alert("Please Enter your Full Name.")
    }
    else if (this.state.password==""){
      alert("Please Enter your Password.")
    }
    else if (this.state.conpassword==""){
      alert("Please Confirm your Password.")
    }
    else if (this.state.email==""){
      alert("Please Enter your Email.")
    }
    else if (this.state.password!=this.state.conpassword){
      alert("Confirm Password is not the same.")
    }
    else {
      this.signup()
    }
  }
  signup(){
    var self = this;
    axios.post(this.state.ip+'/api/signup', {
      id: this.state.id,
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
    })
    .then(function (response) {
     if (response.data=="Success"){
       alert("Please wait for a Verifier to verify your account.")
       self.props.navigation.navigate("Login");
     }
     else if(response.data=="Exist"){
      alert("This user already exists.")
      self.props.navigation.navigate("Login");
     }
     else {
       console.log(response.data);
     }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (

      <ImageBackground source={require('../image/background.png')} style={styles.backgroundImage}>
        <ScrollView>

          {/* <TouchableOpacity style={styles.container} onPress={() => this.anyfunction()}>
            {/* <Image style={styles.back} source={require('../image/back.png')}/> }
            <Text>BACK</Text>
          </TouchableOpacity> */}

          <View style={{marginTop: 20}}/>

          <View style={styles.container}>
            <Text style={styles.text}>Official ID :</Text>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                onChangeText={text => this.setState({ id: text })} />
            </View>

            <Text style={styles.text}>Full Name :</Text>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                onChangeText={text => this.setState({ name: text })} />
            </View>

            <Text style={styles.text}>Password :</Text>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                secureTextEntry
                onChangeText={text => this.setState({ password: text })} />
            </View>

            <Text style={styles.text}>Confirm Password :</Text>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                secureTextEntry
                onChangeText={text => this.setState({ conpassword: text })} />
            </View>

            <Text style={styles.text}>Email :</Text>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                onChangeText={text => this.setState({ email: text })} />
            </View>

            <View>
              <Text style={styles.bottom}>------------------------- REGISTER AS --------------------------</Text>
            </View>

            {/* <TouchableOpacity style={styles.verBtn}>
              <Text style={styles.btnText}>VERIFIER</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.invBtn} onPress={() => this.toInv()}>
              <Text style={styles.btnText}>INVESTIGATOR</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.invBtn} onPress={() => this.anyfunction()}>
              <Text style={styles.btnText}>back</Text>
            </TouchableOpacity> */}

            <SafeAreaView style={{marginBottom: 80}}/>

          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  back: {
    position: "absolute",
    marginLeft: 8,
    height: 50,
    width: 50,
    alignSelf:"baseline",
    justifyContent:"flex-start",
    top: 10,
  },

  text: {
    color: "#3D025A",
    alignSelf: "baseline",
    fontSize: 16,
    marginLeft: 44,
    marginBottom: 5
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    height: 43,
    marginBottom: 20,
    paddingHorizontal: 8,
    flexDirection: "row"
  },
  inputText: {
    fontSize: 17,
    width: "80%",
    color: "black"
  },
  bottom: {
    fontSize: 15,
    color: "black",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  btnText: {
    height: 60,
    fontSize: 16,
    fontWeight:"bold",
    color: "white",
    justifyContent: "center",
    padding: 20
  },
  verBtn: {
    width: "78%",
    backgroundColor: "#5A0012",
    borderRadius: 7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  invBtn: {
    width: "78%",
    backgroundColor: "#D57400",
    borderRadius: 7,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
    marginBottom: 10
  }
});