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

export default class Cases extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                {/* <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}> */}

                <View style={styles.topcontain}>
                    <View style={styles.inputView} >
                        <Image source={require('../image/search1.png')} style={styles.searchimage} />
                        <TextInput
                            style={styles.inputText}
                            placeholder="Insert Case No / Case Name to search"
                            placeholderTextColor="#959297" />
                    </View>
                </View>

                <View style={{ alignItems: "baseline", marginLeft: 16, marginBottom: 5 }}>
                    <Text style={styles.head}>Results :</Text>
                </View>

                {/* Kotak place report */}
                <View style={{ alignItems: "center" }}>
                    <View style={styles.box}>
                    <ScrollView>
                    
                    </ScrollView>
                    </View>
                    
                    
                </View>

                {/* <View style={{ alignItems: "center" }}>
                    <TouchableOpacity  style={styles.exit}>
                            <Text style={styles.textt}>Exit</Text>
                        </TouchableOpacity>
                        </View> */}
                {/* </ScrollView> */}
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
        //alignItems: 'center',
        //justifyContent: 'center',
        marginHorizontal: 20
    },
    topcontain: {
        flex: 1,
        alignItems: "center",
        marginTop: 10,
    },
    inputView: {
        width: "90%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        //borderRadius: 25,
        height: 50,
        //marginBottom: 10,
        padding: 3,
        flexDirection: "row"
    },
    box: {
        width: "90%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        //borderRadius: 25,
        height: "86%",
        //marginBottom: 20,
        //padding: 3,
        // flexDirection: "row"
    },
    inputText: {
        width: "80%",
        color: "black"
    },
    searchimage: {
        width: 25,
        height: 25,
        marginRight: 8,
        marginTop: 6,
        marginLeft: 3
    },
    head: {
        fontWeight: "bold",
        fontSize: 22,
        alignItems: "baseline",
        //justifyContent:"flex-start",
        margin: 2
    },
    exit: {
        width: "60%",
        backgroundColor: "#290150",
        //backgroundColor: "#fb5b5a",
        borderRadius: 20,
        //borderColor: "black",
        height: 60,
        alignItems: "center",
        // alignSelf: "center",
        justifyContent: "center",
        padding: 20,
        marginBottom: 20,
    },
    textt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
})