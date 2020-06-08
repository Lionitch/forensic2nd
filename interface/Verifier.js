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
    BackHandler,
} from 'react-native';


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class Verifier extends React.Component {
    state = {
        ip: this.props.route.params.ip,
    }
    anyfunction() {
        console.log("Button pressed!");
        this.props.navigation.navigate("Cases");
    }
    toVerify(){
        console.log("Button pressed!");
        this.props.navigation.navigate("Verifying", {ip:this.state.ip});
    }
    toExit = () => {
        BackHandler.exitApp();
    }
    render() {
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.container}>

                        <TouchableOpacity style={styles.button} onPress={() => this.toVerify()}>
                            <Image source={require('../image/verify.png')} style={styles.icon} />
                            <Text style={styles.btnText}>Verify</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.anyfunction()}>
                            <Image source={require('../image/exist.png')} style={styles.icon2} />
                            <Text style={styles.btnText}>Existing Cases</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.exit} onPress={this.toExit}>
                            <Text style={styles.textt}>Exit</Text>
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
    button: {
        width: "60%",
        backgroundColor: "#340165",
        // backgroundColor: "#002B5C",
        // borderColor: "black",
        height: 150,
        alignItems: "center",
        // // alignSelf: "center",
        justifyContent: "center",
        // padding: 20,
        marginBottom: 25,
    },
    btnText: {
        height: 60,
        fontSize: 20,
        color: "white",
        justifyContent: "space-evenly",
        //fontWeight:"bold",
        alignSelf: "center"
    },
    icon: {
        marginTop: 30,
        marginBottom: 20,
        width: 56,
        //backgroundColor: "#4A2DFF",
        height: 62,
    },
    icon2: {
        marginTop: 30,
        marginBottom: 20,
        width: "37%",
        //backgroundColor: "#4A2DFF",
        height: 69,
    },
    exit: {
        width: "60%",
        backgroundColor: "#9E3737",
        //backgroundColor: "#fb5b5a",
        borderRadius: 20,
        //borderColor: "black",
        height: 60,
        alignItems: "center",
        // alignSelf: "center",
        justifyContent: "center",
        padding: 20,
        marginBottom: 17,
        marginTop: 25
    },
    textt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
})