import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker';

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
    NativeModules,
    Modal,
    PermissionsAndroid,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
var ImagePicker = NativeModules.ImageCropPicker;

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
var radio_props = [
    { label: 'outdoor', value: 0 },
    { label: 'indoor', value: 1 }
];

export default class EvidenceForm extends React.Component {
    state = {
        modalVisible: false,
        enableScrollViewScroll: true,
        //temporaryId: "",
        // data: [],
        image: [],
        caseNo: this.props.route.params.caseNo,
        caseName: this.props.route.params.caseName,
        caseDetail: this.props.route.params.caseDetail,
        date: this.props.route.params.date,
        time: this.props.route.params.time,
        scene: this.props.route.params.scene,
        weather: this.props.route.params.weather,
        involveA: this.props.route.params.involveA,
        involveB: this.props.route.params.involveB,
        involveC: this.props.route.params.involveC,
        involveD: this.props.route.params.involveD,
        ip: this.props.route.params.ip,
        latitude: this.props.route.params.latitude,
        longitude: this.props.route.params.longitude,
        address: this.props.route.params.address,
        victim: this.props.route.params.victim,
        id: this.props.route.params.id,
        name: this.props.route.params.name,
        pdf: this.props.route.params.pdf,
        status: this.props.route.params.status,

        //ip: "http://192.168.0.197:8000"
    }

    toElse() {
        this.props.navigation.navigate("Pdf", {
            ip: this.state.ip,
            caseNo: this.state.caseNo,
            caseName: this.state.caseName,
            caseDetail: this.state.caseDetail,
            date: this.state.date,
            time: this.state.time,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            address: this.state.address,
            scene: this.state.scene,
            weather: this.state.weather,
            victim: this.state.victim,
            involveA: this.state.involveA,
            involveB: this.state.involveB,
            involveC: this.state.involveC,
            involveD: this.state.involveD,
            id: this.state.id,
            name: this.state.name,
            pdf: this.state.pdf,
            status: this.state.status,
        });
    }

    no() {
        this.setState({ modalVisible: false });
    }

    pick() {
        this.setState({ modalVisible: true });
    }

    gallery() {
        var self = this;
        ImagePicker.openPicker({
            multiple: true,
            includeBase64: true,
        }).then(images => { 
            console.log(images);
            images.map(item => {
                self.picArray(item);
            });
            
        });
    }

    bukakCam() {
        var self = this;
        ImagePicker.openCamera({
            width: 1920,
            height: 1080,
            cropping: false,
            includeBase64: true,
        }).then(imaged => {
            console.log(imaged);
            self.picArray(imaged);
        });
    }

    picArray(pic) {
        let temp = this.state.image;
        temp.push(pic);
        this.setState({ image: temp });
        console.log(this.state.image);
    }

    renderImage = ({ item, index }) => {
        return (
            <View>
                <Image source={{ uri: `data:${item.mime};base64,${item.data}` }}
                    style={{ width: 200, height: 275, resizeMode: 'contain', margin: 10, borderWidth: 3 }} />
            </View>
        )
    }

    uploadImage() {
        var self = this;
        var caseNo = this.state.caseNo;
        const uploadData = new FormData();
        console.log(this.state.caseNo);
        this.state.image.map(item => {
            // FormData macam array, tapi bukan array -Daus
            uploadData.append('image[]', {
                uri: item.path,
                name: 'anything.jpg',
                type: item.mime
            })
        });
        //console.log(uploadData);

        var url2 = this.state.ip + '/api/evidence/' + caseNo;
        axios({
            // caseNo: caseNo,
            url: url2,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application-json',
            },
            method: 'post',
            data: uploadData,
        })
            .then(function (response) {
                console.log(response);
                alert("Finish uploading evidence.");

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    render() {
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                
                {/* Nak buat alert box choosing either Gallery / Camera*/}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.alertB}>
                        <View style={styles.alertW}>
                            {/* <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5 }}>Alert</Text> */}
                            <Text style={{ fontSize: 16 }}>Please select an action.</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

                                <TouchableOpacity style={styles.gallery} onPress={() => this.gallery()}>
                                    <Image source={require('../image/gallery.png')} style={styles.circle}></Image>
                                    <Text>Gallery</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cam} onPress={() => this.bukakCam()}>
                                    <Image source={require('../image/camera.png')} style={styles.circle}></Image>
                                    <Text>Camera</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
                                <TouchableOpacity style={styles.cancel} onPress={() => this.no()}>
                                    <Text style={styles.cancelTx}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* https://github.com/facebook/react-native/issues/1966 */}
                <View style={styles.container}>
                {/* <ScrollView scrollEnabled={this.state.enableScrollViewScroll}> */}
                    <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }}>
                        {/* Row for case no */}
                        <Text style={styles.text}>Case No : </Text>
                        <Text style={styles.textt}>{this.state.caseNo}</Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.text}>Case Name :</Text>
                        <Text style={styles.textt}>{this.state.caseName}</Text>
                    </View>

                    {/* Kotak place evidence */}
                    <View style={{ alignItems: "center" }}>

                        <Text style={styles.text}>Evidence : </Text>
                        <View style={styles.box}>
                        
                            {/* <ScrollView> */}

                            <TouchableOpacity onPress={() => this.pick()}>
                                <Text>Press here to Import / Capture evidence</Text>
                            </TouchableOpacity>
                            {/* <Image style={{ width: 200, height: 200, resizeMode: 'contain' }} source={this.state.image} /> */}
                            {/* <Image source={{uri: `data:${this.state.image.mime};base64,${this.state.image.data}`}} 
                                    style={{ width: 200, height: 200, resizeMode: 'contain' }}/> */}
                            <FlatList
                                data={this.state.image} //amek dari array
                                renderItem={this.renderImage} //render design //xguna bracket cause by default send item & index
                                keyExtractor={index => index.toString()} //[keyExtractor]run array untuk pastikan run dri 0 and xrun balik //memang kene guna toString() if not error
                                onStartShouldSetResponderCapture={() => {
                                    this.setState({ enableScrollViewScroll: false })
                                    if (this.refs.myList.scrollProperties.offset === 0 && this.state.enableScrollViewScroll === false) {
                                      this.setState({ enableScrollViewScroll: true })
                                    }
                                }}
                            />

                            {/* </ScrollView> */}
                            <TouchableOpacity style={styles.Btn} onPress={() => this.uploadImage()}>
                                <Text style={styles.btnText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity style={styles.Btn2} onPress={() => this.uploadImage()}>
                                    <Text style={styles.btnText}>Upload</Text>
                                </TouchableOpacity> */}
                        <TouchableOpacity style={styles.Btn2} onPress={() => this.toElse()}>
                            <Text style={styles.btnText}>NEXT</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View > */}
                        
                    {/* </View> */}



                    <SafeAreaView style={{ marginBottom: 90 }} />

                    {/* </ScrollView> */}
                </View>

                
            </ImageBackground >
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
        marginHorizontal: 20,
        //flexDirection: "row"
    },
    box: {
        width: "90%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 9,
        //borderRadius: 25,
        height: "72%",
        //marginBottom: 20,
        //padding: 3,
        // flexDirection: "row"
    },
    circle: {
        width: 45,
        //backgroundColor: "#ffe2e2",
        //borderRadius: 23,
        height: 45,
    },
    Btn: {
        width: "48%",
        backgroundColor: "#008DDC",
        height: 50,
        alignItems: "center",
        borderRadius: 7,
        justifyContent: "center",
        marginTop: 35,
        marginBottom: 15,
    },
    Btn2: {
        width: "48%",
        backgroundColor: "#3D025A",
        height: 50,
        alignItems: "center",
        borderRadius: 7,
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 165
    },
    btnText: {
        height: 60,
        color: "white",
        justifyContent: "center",
        padding: 18,
        fontWeight: "bold",
        fontSize: 18
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
    textt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0048D8",
    },
    gallery: {
        //padding: 3,
        marginTop: 20,
        width: "35%",
        height: "70%",
        borderWidth: 1.5,
        borderColor: "#D7D7D7",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    cam: {
        marginTop: 20,
        width: "35%",
        height: "70%",
        borderWidth: 1.5,
        borderColor: "#D7D7D7",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    cancel: {
        //backgroundColor: "#FD4C4C",
        backgroundColor: "rgba(253,76,76,0.8)",
        //marginTop: 10,
        width: "35%",
        height: "40%",
        //borderWidth: 1.5,
        //borderColor: "#D7D7D7",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    cancelTx: {
        fontWeight: "bold",
        //fontSize: 16,
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
        height: "38%",
        //borderColor: "black",
        padding: 15,
        //borderWidth: 3,
        borderRadius: 3
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
})

