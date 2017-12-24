import React from "react";
import styleBase from "../style/base";
import {Text, TextInput, TouchableOpacity, View, Alert, Platform, Image, Dimensions, InteractionManager} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {companyLogin} from "../../action/accountCompany";
import KeyboardSpacer from "react-native-keyboard-spacer"
import {connect} from "react-redux";

class LoginCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onChangeDimension: false
        }
    }

    changeDimensions() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({onChangeDimension: !this.state.onChangeDimension});
        })
    }

    componentWillMount() {
        Dimensions.addEventListener("change", this.changeDimensions.bind(this));
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.changeDimensions.bind(this));
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.background5, styleBase.center, styleBase.shadowBox]}>
                <Image source={require("../../asset/img/adminBackground.jpg")}
                       resizeMode="cover"
                       style={[styleBase.fillParent,{width: Dimensions.get('window').width, height: Dimensions.get("window").height}]}/>
                <View style={[{height: 380, minWidth: 400}, styleBase.background4]}>
                    <View style={[styleBase.center, {marginTop: 30, paddingHorizontal: 20}]}>
                        <Text style={[styleBase.text4, styleBase.font16]}>
                            ĐĂNG NHẬP BẰNG TÀI KHOẢN QUẢN LÝ
                        </Text>
                    </View>
                    <View style={[{marginTop: 50, marginHorizontal: 20}]}>
                        <LoginForm {...this.props}/>
                    </View>
                </View>
                {Platform.OS === "ios" && <KeyboardSpacer/>}
            </View>
        )
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLogin: false
        }
    }

    validateEmailAndPassword() {
        return (new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm).test(this.state.email) && this.state.password.length >= 6)
    }

    onChangeEmail(email) {
        this.setState({email});
    }

    onChangePassword(password) {
        this.setState({password})
    }

    async onPressLogin() {
        this.setState({isLogin: true});
        try {
            let validate  = this.validateEmailAndPassword();
            if(validate) {
                await companyLogin(this.state.email, this.state.password);
                return this.setState({isLogin: false});
            }
            Alert.alert("Thông Báo", "Email hoặc mật khẩu không hợp lệ");
        } catch (e) {
            alert(e);
        }
        this.setState({isLogin: false})
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.row, styleBase.centerHorizontal,
                    styleBase.borderBottomE5,
                    {paddingVertical: 15, marginBottom: 15}]}>
                    <TextInput
                        style={[styleBase.grow]}
                        onChangeText={this.onChangeEmail.bind(this)}
                        value={this.state.email}
                        onSubmitEditing={this.onPressLogin.bind(this)}
                        placeholder={"Tên đăng nhập"}/>
                </View>
                <View style={[styleBase.row, styleBase.centerHorizontal, styleBase.borderBottomE5,
                    {paddingVertical: 15}]}>
                    <TextInput
                        style={[styleBase.grow]}
                        secureTextEntry={true}
                        onChangeText={this.onChangePassword.bind(this)}
                        value={this.state.password}
                        onSubmitEditing={this.onPressLogin.bind(this)}
                        placeholder={"Mật Khẩu"}/>
                </View>
                <TouchableOpacity disabled={this.state.isLogin} onPress={() => this.onPressLogin()} style={[styleBase.row,
                    styleBase.borderButton, styleBase.background1,
                    {height: 54, marginTop: 20}, styleBase.center]}>
                    <Text style={[styleBase.textWhite, styleBase.font14]}>
                        Đăng Nhập
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigator.pop()
                }} style={[styleBase.row, {
                    height: 40,
                    borderRadius: 20,
                    width: 40,
                    marginTop: 20,
                    alignSelf: "center"
                }, styleBase.center, styleBase.background2]}>
                    <Ionicons name="ios-arrow-back"
                              style={[styleBase.textWhite, styleBase.font14, {backgroundColor: "transparent"}]}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accountCompany: state.accountCompany
    }
};

export default connect(mapStateToProps, null) (LoginCompany);