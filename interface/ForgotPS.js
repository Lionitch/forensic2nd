import axios from 'axios';

import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Dimensions,
} from 'react-native';


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class ForgotPS extends React.Component {
    state = {
        ip: this.props.route.params.ip,
        id: "",
        email: "",
    }
    check(){
        var self = this;
        axios.post(this.state.ip+'/api/forget', {
          id: this.state.id,
          email: this.state.email,
        })
        .then(function (response) {
         if (response.data=="Same"){
           alert("An email has been send to your email address. Please login with your new password.")
           self.props.navigation.navigate("Login");
         }
         else if(response.data=="Exist"){
          alert("Official ID and Email address doesn't match.")
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
                <View style={{marginTop: 90}}/>
                    <View style={styles.container}>
                        <View style={styles.box}>
                        <Text style={styles.text}>Please insert your Official ID :</Text>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder="Official ID"
                                placeholderTextColor="#959297"
                                onChangeText={text => this.setState({ id: text })} />
                        </View>

                        <Text style={styles.text}>Email :</Text>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email"
                                placeholderTextColor="#959297"
                                onChangeText={text => this.setState({ email: text })} />
                        </View>

                        <TouchableOpacity style={styles.invBtn} onPress={() => this.check()}>
                            <Text style={styles.btnText}>RESET PASSWORD</Text>
                        </TouchableOpacity>
                        </View>
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
    box: {
        width: "80%",
        //height: "25%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        //flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        //borderRadius: 25,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 38,
        paddingTop: 10,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#EFF1F3",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        padding: 3,
        paddingHorizontal: 8,
        //flexDirection: "row"
    },
    inputText: {
        //height: 17,
        //width: "80%",
        color: "black",
    },
    text: {
        //color: "#3D025A",
        color: "black",
        alignSelf: "baseline",
        fontSize: 16,
        fontWeight: "200",
        marginLeft: 44,
        marginBottom: 5
    },
    btnText: {
        height: 60,
        fontSize: 16,
        fontWeight:"bold",
        color: "white",
        justifyContent: "center",
        padding: 20
      },
      invBtn: {
        width: "78%",
        backgroundColor: "#3D025A",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 18
      }
});