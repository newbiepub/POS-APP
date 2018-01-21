import React from "react";
import {Platform, StyleSheet, InteractionManager, Dimensions} from "react-native";
import {Button, Divider, Image, TextInput, Tile, View, Spinner, Text} from "@shoutem/ui";
import KeyboardSpacer from "react-native-keyboard-spacer";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../../styles/base";
import * as _ from "lodash";
import {companyLogin} from "../action/login";
import {getToken, setToken} from "../utils/loginToken";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLogin: false,
        }
    }

    static propTypes = {};

    static defaultProps = {};

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState)
    }

    async componentWillMount() {
        try {
            let token = await getToken();
            InteractionManager.runAfterInteractions(() => {
                if (token) {
                    this.props.navigator.resetTo({id: "home"});
                }
            });
        }
        catch (e) {
            console.warn("error - componentWillMount - Login")
        }
    }

    validateEmail() {
        return new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm).test(this.state.email);
    }

    validatePassword() {
        return this.state.password.length >= 6;
    }

    async onSubmitLogin() {
        try {
            if (!this.state.email) return alert("Xin mời nhập email");
            if (!this.state.password) return alert("Xin mời nhập mật khẩu");
            if (!this.validateEmail()) return alert("Email không hợp lệ");
            if (!this.validatePassword()) return alert("Mật khẩu không hợp lệ");
            this.setState({isLogin: true});
            let token = await companyLogin(this.state.email.toLowerCase().trim(), this.state.password);
            await setToken(token);
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.resetTo({id: "home"});
            });
        }
        catch (e) {
            console.warn("error - onSubmitLogin");
            if(e.message === "INCORRECT_PASSWORD") {
                alert("Sai mật khẩu");
            } else if(e.message === "INCORRECT_EMAIL") {
                alert("Sai email");
            } else if (e.message === "MISSING_EMAIL_AND_PASSWORD") {
                alert("Email và mật khẩu không được để trống");
            }
        }
        this.setState({isLogin: false});
    }

    getFormWidth() {
        let screenWidth = Dimensions.get("window").width;
        if (screenWidth >= 768) return styles.width50;
        else return styles.width80;
    }

    render() {
        return (
            <View styleName="vertical h-center v-center fill-parent" style={StyleSheet.flatten([styleBase.bgE5])}>
                <View styleName="vertical xl-gutter-bottom">
                    <Tile style={StyleSheet.flatten([styleBase.noBg, styleBase.center])}>
                        <Image
                            styleName="small"
                            source={require("../../../assets/img/laptop.png")}
                        />
                    </Tile>
                </View>
                <View styleName="vertical h-center v-center"
                      style={StyleSheet.flatten([this.getFormWidth(), styleBase.shadowBox])}>
                    <View styleName="vertical md-gutter-bottom" style={StyleSheet.flatten([styles.width100])}>
                        <TextInput
                            onChangeText={(email) => this.setState({email})}
                            placeholder={'Email'}
                        />
                        <Divider styleName="line"/>
                        <TextInput
                            onSubmitEditing={this.onSubmitLogin.bind(this)}
                            onChangeText={(password) => this.setState({password})}
                            placeholder={'Mật Khẩu'}
                            secureTextEntry
                        />
                        <Divider styleName="line"/>
                    </View>
                    <View styleName="horizontal md-gutter-bottom">
                        <Button
                            disabled={this.state.isLogin}
                            onPress={this.onSubmitLogin.bind(this)}
                            styleName="confirmation" style={StyleSheet.flatten([styleBase.bgBlack])}>
                            {
                                this.state.isLogin ?
                                    <Spinner style={{color: "#fff", size: "large"}}/>
                                    :
                                    <Text style={{color: "#fff"}}>ĐĂNG NHẬP</Text>
                            }
                        </Button>
                    </View>
                </View>
                {Platform.OS === "ios" && <KeyboardSpacer/>}
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    width50: {
        width: "50%"
    },
    width100: {
        width: "100%"
    },
    width80: {
        width: "80%"
    }
});

export default Login;