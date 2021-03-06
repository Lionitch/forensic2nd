import axios from 'axios';
import FileDownload from 'js-file-download';
import RNFetchBlob from 'rn-fetch-blob'

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

export default class Pdf extends React.Component {
    state = {
        ip: this.props.route.params.ip,
        caseNo: this.props.route.params.caseNo,
        caseName: this.props.route.params.caseName,
        caseDetail: this.props.route.params.caseDetail,
        date: this.props.route.params.date,
        time: this.props.route.params.time,
        latitude: this.props.route.params.latitude,
        longitude: this.props.route.params.longitude,
        address: this.props.route.params.address,
        scene: this.props.route.params.scene,
        weather: this.props.route.params.weather,
        victim: this.props.route.params.victim,
        involveA: this.props.route.params.involveA,
        involveB: this.props.route.params.involveB,
        involveC: this.props.route.params.involveC,
        involveD: this.props.route.params.involveD,
        id: this.props.route.params.id,
        name: this.props.route.params.name,
        pdf: this.props.route.params.pdf,
        modalVisible: false,
        // ip: "http://192.168.0.197:8000"
    }

    conform() {
        this.setState({ modalVisible: true });
    }
    no() {
        this.setState({ modalVisible: false });
    }

    componentDidMount() {
        console.log(this.state.caseNo);
    }

    toHome() {
        this.props.navigation.navigate("Investigator", {ip:this.state.ip, id:this.state.id, name: this.state.name});
    }

    createPDF() {
        var self = this;
        var caseNo = this.state.caseNo;
        var caseName = this.state.caseName;
        console.log(this.state.ip);
        let dirs = RNFetchBlob.fs.dirs
        console.log(dirs.DownloadDir);
        axios.post(this.state.ip + '/api/pdf', {
            caseNo: caseNo,
        }).then(function (response) {
            console.log(response);
            RNFetchBlob.fs.createFile(dirs.DownloadDir + '/' + caseNo + ' - ' + caseName + '.pdf', response.data, 'base64');
            self.setState({ modalVisible: false });
            alert("Finish converting report to PDF. Please wait for it to be verified.");
            //alert("Converting report to PDF. The report will be saved to", response.path());
        }).catch(function (error) {
            console.log(error.response);
        });
        // axios.post(this.state.ip + '/api/pdf', { caseNo: caseNo })
        //     .then(function (response) {
        //         self.setState({ modalVisible: false });
        //         alert("Converting report to PDF.");
        //         FileDownload(response,"anything.pdf");
        //         console.log(response);
        //         //self.refreshSc();
        //     })
        //     .catch(function (error) {
        //         console.log(error.response);
        //     })
        // console.log("Button Push");
        // let dirs = RNFetchBlob.fs.dirs;
        // RNFetchBlob
        //     .config({
        //         // response data will be saved to this path if it has access right.
        //         path: dirs.DocumentDir + '/anything.pdf'
        //     })
        //     .fetch('POST', this.state.ip + '/api/pdf', {
        //         caseNo: caseNo
        //         //some headers ..
        //     })
        //     .then((res) => {
        //         // the path should be dirs.DocumentDir + 'path-to-file.anything'
        //         console.log('The file saved to ', res.path())
        //     })
        //     .catch(function (error) {
        //         console.log(error.response);
        //     })
    }
    render() {
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                <ScrollView>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={styles.alertB}>
                            <View style={styles.alertW}>
                                <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5 }}>Alert</Text>
                                <Text style={{ fontSize: 16 }}>Are you sure you want to convert this report to PDF?</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity style={styles.OpBoxNO} onPress={() => this.no()}>
                                        <Text style={styles.alertOp}>NO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.OpBoxYes} onPress={() => this.createPDF()}>
                                        <Text style={styles.alertOpY}>YES</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.container}>
                        <View style={styles.box}>
                            <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }}>
                                <Text style={styles.text}>Case No : </Text>
                                <Text style={styles.textt}>{this.state.caseNo}</Text>
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>Case Name :</Text>
                                <Text style={styles.textt}>{this.state.caseName}</Text>
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>Case Description :</Text>
                                <Text style={styles.textt}>{this.state.caseDetail}</Text>
                            </View>

                            <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }}>
                                <Text style={styles.text}>Date : </Text>
                                <Text style={styles.textt}>{this.state.date}</Text>
                                <Text style={styles.textt}> | </Text>
                                <Text style={styles.text}>Time : </Text>
                                <Text style={styles.textt}>{this.state.time}</Text>
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>Location :</Text>
                                <Text style={styles.textt}>Latitude → {this.state.latitude}</Text>
                                <Text style={styles.textt}>Longitude → {this.state.longitude}</Text>
                                <Text style={styles.textt}>Address → {this.state.address}</Text>
                            </View>

                            <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }}>
                                <Text style={styles.text}>Scene : </Text>
                                <Text style={styles.textt}>{this.state.scene}</Text>
                                <Text style={styles.textt}> | </Text>
                                <Text style={styles.text}>Weather : </Text>
                                <Text style={styles.textt}>{this.state.weather}</Text>
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>Victim/s :</Text>
                                <Text style={styles.textt}>{this.state.victim}</Text>
                            </View>

                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>Person Involve :</Text>
                                <Text style={styles.textt}>{this.state.involveA}</Text>
                                <Text style={styles.textt}>{this.state.involveB}</Text>
                                <Text style={styles.textt}>{this.state.involveC}</Text>
                                <Text style={styles.textt}>{this.state.involveD}</Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }}>
                        <TouchableOpacity style={styles.exit} onPress={() => this.toHome()}>
                            <Text style={{ color: "white" }}>CLOSE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.conform()}>
                            <Text style={{ color: "white" }}>Create PDF</Text>
                        </TouchableOpacity>
                        </View>
                        <Text>{this.state.filePath}</Text>
                        <SafeAreaView style={{ marginBottom: 100 }} />
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
        // alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 20,
    },
    box: {
        width: "95%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        margin: 10,
        padding: 10,
        //marginHorizontal: 20,
        flex: 1,
    },
    button: {
        width: "48%",
        height: 50,
        backgroundColor: "#340165",
        alignItems: "center",
        // // alignSelf: "center",
        // padding: 20,
        marginBottom: 25,
        borderRadius: 7,
        justifyContent: "center",
        marginTop: 35,
        marginLeft: 85
    },
    exit: {
        width: "40%",
        backgroundColor: "#9E3737",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginBottom: 25,
        marginTop: 35,
        marginLeft: 10
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
    text: {
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    textt: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0048D8",
        marginRight: 22
    },
});