import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';

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
    PermissionsAndroid,
} from 'react-native';


const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
var radio_props = [
    { label: 'outdoor', value: 'Outdoor' },
    { label: 'indoor', value: 'Indoor' }
];



export default class NewForm extends React.Component {
    state = {
        caseNo: "",
        caseName: "",
        caseDetail: "",
        date: "",
        time: "",
        scene: "",
        weather: "",
        involveA: "",
        involveB: "",
        involveC: "",
        involveD: "",
        ip: this.props.route.params.ip,
        latitude: "",
        longitude: "",
        address: "",
        victim: "",
    }

    anyfunction() {
        console.log("Button pressed!");
        //this.props.navigation.navigate("EvidenceForm");
        if (this.state.caseNo == "") {
            alert("Please Enter the Case Number.")
        }
        else if (this.state.scene == "") {
            alert("Please Pick one of the Scene.")
        }
        else if (this.state.weather == "") {
            alert("Please Insert the Current Weather.")
        }
        else if (this.state.victim == "") {
            alert("If there is no victim, please write 'NONE'.")
        }
        else {
            this.next()
        }
    }
    componentDidMount(){
        var self = this;
        // Dapat Date
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var tarikh = date + "/" + month + "/" + year;
        this.setState({ date: tarikh});

        // Dapat Masa
        var masa = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        this.setState({ time: masa});

        // Panggil function for permission dekat Investigator.js
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(function(response){
            if(response == true){
                Geolocation.getCurrentPosition(
                            (position) => {
                              console.log(position);
                              self.setState({latitude : position.coords.latitude, longitude: position.coords.longitude});
                            //   self.callGeo();
                            },
                            (error) => {
                              // See error code charts below.
                              console.log(error.code, error.message);
                            },
                            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                        );
            }
        });
        

    }
    // CALLGEO BUKAK BILA NAK SHOWCASE
    // callGeo() {
    //     var self = this;
    //     //Geolocation APIs
    //     var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.state.latitude+","+this.state.longitude+"&key=AIzaSyAjdYQTnkVVnOXYbDa-ziuQJXdCeHoGmCw";
    //     axios.get(url)
    //         .then(function (response) {
    //             console.log(response);
    //             console.log(response.data.results[0].formatted_address);
    //             self.setState({address: response.data.results[0].formatted_address});
    //         }).catch(function (error) {
    //             console.log(error);
    //         });
    // }

    next() {
        var self = this;
        console.log(this.state);
        axios.post(this.state.ip + '/api/newform', {
            caseNo: this.state.caseNo,
            caseName: this.state.caseName,
            caseDetail: this.state.caseDetail,
            date: this.state.date,
            time: this.state.time,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            //address: this.state.address,
            address: "sungai",
            scene: this.state.scene,
            weather: this.state.weather,
            victim: this.state.victim,
            involveA: this.state.involveA,
            involveB: this.state.involveB,
            involveC: this.state.involveC,
            involveD: this.state.involveD,
        })
            .then(function (response) {
                if (response.data == "Success") {
                    self.props.navigation.navigate("Pdf", 
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
                    alert("unsuccessful.")
                    console.log(response.data);
                }
            })
            .catch(function (error) {
                console.log(error.response);
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
                <ScrollView >
                    <View style={styles.container}>
                        <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }} >
                            {/* Row for case no */}
                            <Text style={styles.text}>Case Number :</Text>
                            <TextInput
                                style={styles.inputTextt}
                                onChangeText={text => this.setState({ caseNo: text })}
                                underlineColorAndroid="#070052"
                            />
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text}>Case Name :</Text>
                            <TextInput
                                style={styles.inputText}
                                onChangeText={text => this.setState({ caseName: text })}
                                underlineColorAndroid="#070052"
                            />
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text}>Case Description :</Text>
                            <TextInput
                                style={styles.inputText}
                                onChangeText={text => this.setState({ caseDetail: text })}
                                underlineColorAndroid="#070052"
                                multiline />
                        </View>

                        <View style={{ marginBottom: 10, flexDirection: "row", width: "80%", alignItems: "center" }}>
                            <Text style={styles.text}>Date :</Text>
                            <Text style={{ fontSize: 18, color: "#2C3CB8", marginLeft: 10 }}>
                                {tarikh}            ||            {masa}
                            </Text>
                        </View>


                        {/* Auto Locate */}
                        <Text style={styles.text}>Location :</Text>
                        <Text style={{color: "#2C3CB8", fontSize: 16}}>Latitude → {this.state.latitude}</Text>
                        <Text style={{color: "#2C3CB8", fontSize: 16}}>Longitude → {this.state.longitude}</Text>
                        {/* <Text style={{color: "#2C3CB8", fontSize: 16}}>Address → {this.state.address}</Text> */}


                        <Text style={styles.textt}>Scene :</Text>
                        <RadioForm
                            radio_props={radio_props}
                            initial={-1}
                            onPress={(value) => { this.setState({ scene: value }) }}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#070052'}
                            //buttonWrapStyle={{marginLeft: 10}}
                            selectedButtonColor={'#2C3CB8'}
                            //buttonOuterColor={"#070052"}
                            // style={{marginLeft: 20}}
                            labelStyle={{ marginRight: 70 }}
                            buttonSize={17}
                        />

                        <View style={{ marginBottom: 14, flexDirection: "row", width: "80%", alignItems: "center" }} >
                            <Text style={styles.text}>Weather :</Text>
                            <TextInput
                                style={styles.inputTextt}
                                onChangeText={text => this.setState({ weather: text })}
                                underlineColorAndroid="#070052" />
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.text}>Victim/s :</Text>
                            <TextInput
                                style={styles.inputText}
                                onChangeText={text => this.setState({ victim: text })}
                                underlineColorAndroid="#070052"
                                multiline />

                        </View>

                        <Text style={styles.text}>Person Involve :</Text>
                        <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
                            <Text>1) </Text>
                            <TextInput
                                style={styles.inputInvest}
                                onChangeText={text => this.setState({ involveA: text })}
                                underlineColorAndroid="#070052" />
                        </View>
                        <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
                            <Text>2) </Text>
                            <TextInput
                                style={styles.inputInvest}
                                onChangeText={text => this.setState({ involveB: text })}
                                underlineColorAndroid="#070052" />
                        </View>
                        <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
                            <Text>3) </Text>
                            <TextInput
                                style={styles.inputInvest}
                                onChangeText={text => this.setState({ involveC: text })}
                                underlineColorAndroid="#070052" />
                        </View>
                        <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
                            <Text>4) </Text>
                            <TextInput
                                style={styles.inputInvest}
                                onChangeText={text => this.setState({ involveD: text })}
                                underlineColorAndroid="#070052" />
                        </View>

                        <View style={{ flexDirection: "row", width: "80%", alignItems: "center", marginTop: 20 }}>
                            <TouchableOpacity style={styles.Btn}>
                                <Text style={{color: "transparent"}}>LOCATION</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.Btn2} onPress={() => this.anyfunction()}>
                                <Text style={styles.btnText}>NEXT</Text>
                            </TouchableOpacity>
                        </View>

                        <SafeAreaView style={{ marginBottom: 90 }} />
                        {/* <SafeAreaView style={{ marginBottom: 220 }} /> */}
                    </View>

                </ScrollView>
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
    text: {
        fontSize: 17,
        fontWeight: "bold",
    },
    textt: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 2,
        marginTop: 10
    },
    inputTextt: {
        fontSize: 17,
        width: screenWidth - 160,
        color: "#070052",
        marginLeft: 15,
    },
    inputText: {
        fontSize: 17,
        width: screenWidth - 34,
        color: "#070052",
        //marginLeft: 3,
    },
    inputInvest: {
        fontSize: 17,
        width: screenWidth - 50,
        color: "#070052",
        //marginLeft: 15,
    },
    Btn: {
        width: "48%",
        backgroundColor: "transparent",
        height: 50,
        alignItems: "center",
        borderRadius: 7,
        justifyContent: "center",
        marginTop: 35,
        marginBottom: 15
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
})