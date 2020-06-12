import axios from 'axios';
import { Col, Row, Grid } from "react-native-easy-grid";

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

export default class InvCase extends React.Component {
    state = {
        ip: this.props.route.params.ip,
        id: this.props.route.params.id,
        pdf: [],
        caseNo:"",
    }

    componentDidMount() {
        var self = this;
        axios.get(this.state.ip + '/api/madePdf', {id: this.state.id})
            .then(function (response) {
                console.log(response);
                self.setState({ pdf: response.data });
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                {/* <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}> */}
                <ScrollView>

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
                    <Text>{this.state.id}</Text>
                    {this.state.pdf.map((item, i) => (
                            <View style={styles.box2} key={i}>
                                <Grid>
                                    <Col style={{ width: "33%" }}>
                                        <View>
                                            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }} onPress={() => this.seePdf()}>
                                                <Image source={require('../image/pdf.png')} style={styles.imagePdf}></Image>
                                                <Text style={{ fontSize: 8 }}>Click image to see report</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.textt}>Case No:</Text>
                                                <Text style={styles.texttt}>{item.caseNo}</Text>
                                            </View>
                                        </Row>
                                        <Row>
                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, alignItems: "center" }}>
                                                    Case Name:</Text>
                                                <Text style={{ color: "blue", fontSize: 16, alignItems: "center" }}>{item.caseName}</Text>
                                             </View>
                                        </Row>
                                        <Row>
                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, alignItems: "center" }}>Made by:</Text>
                                                <Text style={{ color: "blue", fontSize: 16, alignItems: "center", marginBottom: 5 }}>{item.name}</Text>
                                            </View>
                                        </Row>
                                    </Col>
                                </Grid>

                                

                            </View>
                        ))}
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
    imagePdf: {
        height: 90,
        width: 90,
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
    box2: {
        width: "92.5%",
        //height: "25%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
        marginTop: 38,
        paddingTop: 10,
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
        marginLeft: 2,
        marginTop: 15
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
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
        //marginLeft: 20,
        marginRight: 15,
        alignItems: "center",
    },
    texttt: {
        color: "blue",
        fontSize: 16,
        marginRight: 15,
        alignItems: "center",

    }
})