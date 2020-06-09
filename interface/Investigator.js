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
    PermissionsAndroid,
} from 'react-native';


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

async function locationPermission (){
    try {
        const x = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (x === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location granted.");
        }
        else {
            console.log("Permission denied.");
        }
    } 
    catch(error){
        console.warn(error);
    }
};

export default class Investigator extends React.Component {
    state = {
        ip: this.props.route.params.ip,
        id: this.props.route.params.id,
        name: this.props.route.params.name,
    }
    toExist() {
        console.log("Button pressed!");
        this.props.navigation.navigate("Cases");
    }
    toNewCase() {
        console.log("Button pressed!");
        this.props.navigation.navigate("NewForm", {ip:this.state.ip, id:this.state.id, name: this.state.name});
    }
    toExit = () => {
        BackHandler.exitApp();
    }
    componentDidMount() {
        var permission = locationPermission();
    }
    render() {
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.container}>

                        <TouchableOpacity style={styles.button} onPress={() => this.toNewCase()}>
                            <Image source={require('../image/newCase.png')} style={styles.icon} />
                            <Text style={styles.btnText}>New Case</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.toExist()}>
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
        // borderRadius: 7,
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
        width: "30%",
        //backgroundColor: "#4A2DFF",
        height: 65,
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