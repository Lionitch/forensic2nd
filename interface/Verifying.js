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
    Modal,
} from 'react-native';


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class Verifying extends React.Component {
    state = {
        ip: this.props.route.params.ip,
        user: [],
        pdf: [],
        // for the whole screen turns transparent
        modalVisible: false,
        temporaryId: "",
        temp:"",
        modalVisibility: false,
        Visible: false,
        Visibility: false,
    }

    refreshSc() {
        var self = this;
        axios.get(this.state.ip + '/api/verifying')
            .then(function (response) {
                console.log(response);
                self.setState({ user: response.data });
            }).catch(function (error) {
                console.log(error);
            });
    }
    refresh() {
        var self = this;
        axios.get(this.state.ip + '/api/verifyingPdf')
            .then(function (response) {
                console.log(response);
                self.setState({ pdf: response.data });
            }).catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.callUser();
        this.callReport();
        
    }
    callUser(){
        var self = this;
        axios.get(this.state.ip + '/api/verifying')
            .then(function (response) {
                console.log(response);
                self.setState({ user: response.data });
            }).catch(function (error) {
                console.log(error);
            });
    }
    callReport(){
        var self = this;
        axios.get(this.state.ip + '/api/verifyingPdf')
            .then(function (response) {
                console.log(response);
                self.setState({ pdf: response.data });
            }).catch(function (error) {
                console.log(error);
            });
    }

    // componentWillUnmount() {
    //     this.onFocus();
    // }

    approve(userid) {
        var self = this;
        var userid = this.state.temporaryId;
        axios.post(this.state.ip + '/api/approve', { id: userid })
            .then(function (response) {
                //self.forceUpdate();
                self.setState({ modalVisibility: false });
                alert("This account has been approved.");
                self.refreshSc();
            })
            .catch(function (error) { console.log(error); })
    }

    approvePdf(caseNo) {
        var self = this;
        var caseNo = this.state.temp;
        console.log(this.state.temp);
        axios.post(this.state.ip + '/api/approvePdf', { caseNo: caseNo })
            .then(function (response) {
                //self.forceUpdate();
                self.setState({ Visibility: false });
                alert("This report has been approved.");
                self.refresh();
            })
            .catch(function (error) { console.log(error); })
    }

    deny() {
        var self = this;
        var userid = this.state.temporaryId;
        axios.post(this.state.ip + '/api/deny', { id: userid })
            .then(function (response) { self.setState({ modalVisible: false }); alert("This account has been deleted."); self.refreshSc(); })
            .catch(function (error) { console.log(error); })
    }

    denyPdf() {
        var self = this;
        var id = this.state.temp;
        axios.post(this.state.ip + '/api/denyPdf', { caseNo: id })
            .then(function (response) { self.setState({ Visible: false }); alert("This report has been deleted."); self.refresh(); })
            .catch(function (error) { console.log(error); })
    }

    conformation(x) {
        this.setState({ modalVisible: true });
        this.setState({ temporaryId: x });
    }

    conform(x) {
        this.setState({ modalVisibility: true });
        this.setState({ temporaryId: x });
    }

    conformationPdf(y) {
        this.setState({ Visible: true });
        this.setState({ temp: y });
    }

    conformPdf(y) {
        this.setState({ Visibility: true });
        this.setState({ temp: y });
    }

    noButt() {
        this.setState({ modalVisible: false });
        this.setState({ temporaryId: "" });
        this.setState({ temp: "" });
        this.setState({ modalVisibility: false });
        this.setState({ Visible: false });
        this.setState({ Visibility: false });
    }
    
    seePdf() {
        var self = this;
        var id = this.state.temp;
        axios.post(this.state.ip + '/api/seePdf', { caseNo: id })
            .then(function (response) { 
                alert("Seeing Report.");  
                console.log(response);
            })
            .catch(function (error) { 
                console.log(error); 
            })
    }

    render() {
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                <ScrollView>
                    {/* <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}> */}
                    {/* Nak buat alert box for deny use Modal*/}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.alertB}>
                            <View style={styles.alertW}>
                                <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5 }}>Alert</Text>
                                <Text style={{ fontSize: 16 }}>Are you sure you want to delete this account?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={styles.OpBoxNO} onPress={() => this.noButt()}>
                                        <Text style={styles.alertOp}>NO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.OpBoxYes} onPress={() => this.deny()}>
                                        <Text style={styles.alertOpY}>YES</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Nak buat alert box for approve*/}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisibility}
                    >
                        <View style={styles.alertB}>
                            <View style={styles.alertW}>
                                <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5 }}>Alert</Text>
                                <Text style={{ fontSize: 16 }}>Are you sure you want to approve this account?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={styles.OpBoxNO} onPress={() => this.noButt()}>
                                        <Text style={styles.alertOp}>NO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.OpBoxYes} onPress={() => this.approve()}>
                                        <Text style={styles.alertOpY}>YES</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Nak buat alert box for deny PDF*/}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.Visible}
                    >
                        <View style={styles.alertB}>
                            <View style={styles.alertW}>
                                <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5 }}>Alert</Text>
                                <Text style={{ fontSize: 16 }}>Are you sure you want to delete this report?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={styles.OpBoxNO} onPress={() => this.noButt()}>
                                        <Text style={styles.alertOp}>NO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.OpBoxYes} onPress={() => this.denyPdf()}>
                                        <Text style={styles.alertOpY}>YES</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Nak buat alert box for approve PDF*/}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.Visibility}
                    >
                        <View style={styles.alertB}>
                            <View style={styles.alertW}>
                                <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5 }}>Alert</Text>
                                <Text style={{ fontSize: 16 }}>Are you sure you want to approve this report?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={styles.OpBoxNO} onPress={() => this.noButt()}>
                                        <Text style={styles.alertOp}>NO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.OpBoxYes} onPress={() => this.approvePdf()}>
                                        <Text style={styles.alertOpY}>YES</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ alignItems: "center" }}>
                        {/* {this.state.user.map((item) => (<Text key={item.id}>{item.name}</Text>))} */}

                        {this.state.user.map((item, i) => (
                            <View style={styles.box} key={i}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textt}>Official ID:</Text>
                                    <Text style={styles.texttt}>{item.id}</Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textt}>Name:</Text>
                                    <Text style={styles.texttt}>{item.name}</Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textt}>Email:</Text>
                                    <Text style={styles.texttt}>{item.email}</Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={styles.yes} onPress={() => this.conform(item.id)}>
                                        <Text style={styles.yesTx}> ✓</Text>
                                        <Text style={styles.subtle}>Approve</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.no} onPress={() => this.conformation(item.id)}>
                                        <Text style={styles.noTx}>  ✕</Text>
                                        <Text style={styles.subtle}>Deny</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        ))}

                        {this.state.pdf.map((item, i) => (
                            <View style={styles.box} key={i}>
                                <Grid>
                                    <Col style={{ width: "37%" }}>
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
                                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 18, alignItems: "center", marginRight: 7 }}>
                                                    Case No:</Text>
                                                <Text style={styles.text}>{item.caseNo}</Text>
                                            </View>
                                        </Row>
                                        <Row>
                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 18, alignItems: "center" }}>
                                                    Case Name:</Text>
                                                <Text style={{ color: "#0048D8", fontSize: 18, alignItems: "center" }}>{item.caseName}</Text>
                                             </View>
                                        </Row>
                                        <Row>
                                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 18, alignItems: "center" }}>Made by:</Text>
                                                <Text style={{ color: "#0048D8", fontSize: 18, alignItems: "center"}}>{item.name}</Text>
                                            </View>
                                        </Row>
                                    </Col>
                                </Grid>

                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity style={styles.yes} onPress={() => this.conformPdf(item.caseNo)}>
                                        <Text style={styles.yesTx}> ✓</Text>
                                        <Text style={styles.subtle}>Approve</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.no} onPress={() => this.conformationPdf(item.caseNo)}>
                                        <Text style={styles.noTx}>  ✕</Text>
                                        <Text style={styles.subtle}>Deny</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        ))}

                        <SafeAreaView style={{ marginBottom: 120 }} />

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
    alertB: {
        backgroundColor: "rgba(0,0,0,0.7)",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    alertW: {
        backgroundColor: "white",
        width: "85%",
        height: "24%",
        //borderColor: "black",
        padding: 15,
        //borderWidth: 3,
        borderRadius: 3
    },
    alertOp: {
        //fontWeight: "bold",
        fontSize: 16,
        //marginTop: 28,
        marginHorizontal: 20,
    },
    alertOpY: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white",
        marginHorizontal: 20,
    },
    OpBoxNO: {
        //padding: 3,
        marginTop: 20,
        width: "30%",
        height: "60%",
        borderWidth: 1.5,
        borderColor: "#D7D7D7",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    OpBoxYes: {
        backgroundColor: "#3284FE",
        marginTop: 20,
        width: "30%",
        height: "60%",
        //borderWidth: 1.5,
        //borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
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
    subtle: {
        color: "white",
        fontSize: 15,
        alignSelf: "center",
    },
    yes: {
        width: "45%",
        backgroundColor: "#32BD05",
        //borderRadius: 5,
        borderColor: "black",
        height: 70,
        alignItems: "center",
        // alignSelf: "center",
        justifyContent: "center",
        margin: 15,
        marginTop: 25
    },
    yesTx: {
        color: "white",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 30,
        marginRight: 14
    },
    no: {
        width: "45%",
        backgroundColor: "#cc0000",
        //borderRadius: 5,
        borderColor: "black",
        height: 70,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginRight: 15,
        marginTop: 10
    },
    noTx: {
        color: "white",
        justifyContent: "center",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 30,
        marginRight: 14
    },
    textt: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 20,
        marginRight: 15,
        alignItems: "center",
    },
    texttt: {
        color: "#0048D8",
        fontSize: 20,
        marginRight: 15,
        alignItems: "center",

    },
    text: {
        color: "#0048D8",
        fontSize: 18,
        marginRight: 15,
        alignItems: "center",

    }
})