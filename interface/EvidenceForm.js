import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
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
        modalVisibility: false,
        //temporaryId: "",
        // ip: this.props.route.params.ip,
        // data: [],
        caseNo: "",
        caseName: "",
        image: [],
        ip: "http://192.168.0.197:8000"
    }
    // amek data from database
    // componentDidMount() {
    //     var self = this;
    //     axios.get(this.state.ip + '/api/verifying')
    //         .then(function (response) {
    //             console.log(response);
    //             self.setState({ user: response.data });
    //         }).catch(function (error) {
    //             console.log(error);
    //         });
    // }
    toElse(){
        var self = this;
        console.log("Button pressed!");
        // this.props.navigation.navigate("Pdf", {ip:this.state.ip});
        axios.post(this.state.ip + '/api/EvidenceForm', {
            caseNo: "caseNo",
            caseName: "caseName",
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
        })
        .then(function (response){
            if (response.data == "Success") {
                self.props.navigation.navigate("EvidenceForm", 
                {
                    ip:self.state.ip, caseNo:self.state.caseNo, caseName:self.state.caseName,
                    caseDetail:self.state.caseDetail, date:self.state.date, time:self.state.time,
                    latitude: self.state.latitude, longitude: self.state.longitude, address: self.state.address,
                    scene: self.state.scene, weather: self.state.weather,
                    victim: self.state.victim, involveA: self.state.involveA, involveB: self.state.involveB,
                    involveC: self.state.involveC, involveD: self.state.involveD,
                });
            }
            else {
                console.log(response.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    no() {
        this.setState({ modalVisible: false });
        this.setState({modalVisibility: false});
    }

    approve(){
        // convert report to PDF
    }

    pick() {
        this.setState({ modalVisible: true });
    }

    conform() {
        this.setState({ modalVisibility: true });
    }

    gallery() {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
        });
    }

    bukakCam() {
        var self = this;
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
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
        const uploadData = new FormData();
        this.state.image.map(item => {
            // FormData macam array, tapi bukan array -Daus
            uploadData.append('image[]', {
                uri: item.path,
                name: 'anything.jpg',
                type: item.mime
            })
        });
        //console.log(uploadData);

        var url2 = this.state.ip + '/api/evidence';
        axios({
            url: url2,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application-json',
            },
            method: 'post',
            data: uploadData,
        })
            .then(function (response) {
                console.log(response.caseNo);
            })
            .catch(function (error) {
                console.log(error.response.caseNo);
            });
    }

    render() {
        // Dapat Date
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var tarikh = date + "/" + month + "/" + year;

        // Dapat Masa
        var masa = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        return (
            <ImageBackground source={require('../image/background2.png')} style={styles.backgroundImage}>
                {/* <ScrollView > */}
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

                {/* Nak buat alert box for approve report turn to PDF*/}
                <Modal 
                animationType="fade" 
                transparent={true}
                visible={this.state.modalVisibility} 
                >
                    <View style={styles.alertB}>
                        <View style={styles.alertW}>
                            <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5}}>Alert</Text>
                            <Text style={{fontSize: 16}}>Are you sure you want to convert this report to PDF?</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly"}}>
                                <TouchableOpacity style={styles.OpBoxNO} onPress={()=>this.no()}>
                                    <Text style={styles.alertOp}>NO</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.OpBoxYes} onPress={()=>this.approve()}>
                                    <Text style={styles.alertOpY}>YES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.container} >

                    {/* <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }}>
                        Row for case no
                        <Text style={styles.text}>Case No : </Text>
                        <Text style={styles.textt}>{this.state.caseNo}</Text>
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.text}>Case Name :</Text>
                        <Text style={styles.textt}>{this.state.caseName}</Text>
                    </View> */}

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
                            />

                            {/* </ScrollView> */}
                            <TouchableOpacity style={styles.Btn2} onPress={() => this.uploadImage()}>
                                <Text style={styles.btnText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <TouchableOpacity style={styles.Btn2} onPress={() => this.uploadImage()}>
                                    <Text style={styles.btnText}>Upload</Text>
                                </TouchableOpacity> */}

                    </View>

                    <View >
                        <TouchableOpacity style={styles.Btn2} onPress={() => this.toElse()}>
                            <Text style={styles.btnText}>NEXT</Text>
                        </TouchableOpacity>
                    </View>



                    <SafeAreaView style={{ marginBottom: 90 }} />


                </View>

                {/* </ScrollView> */}
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
        //height: "86%",
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
    Btn2: {
        width: "48%",
        backgroundColor: "#3D025A",
        height: 50,
        alignItems: "center",
        borderRadius: 7,
        justifyContent: "center",
        marginTop: 35,
        marginBottom: 15,
        marginLeft: 85
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
        fontSize: 17,
        fontWeight: "bold",
    },
    textt: {
        fontSize: 19,
        fontWeight: "bold",
        color: "blue",
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
    OpBoxNO:{
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
    OpBoxYes:{
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

