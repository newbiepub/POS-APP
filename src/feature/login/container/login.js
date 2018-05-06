import React from "react";
import {
    Dimensions,
    InteractionManager,
    Platform,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    View,
    TextInput,
    Text
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../../styles/base";
import {AUTH} from "../action/login";
import {getToken, setToken} from "../utils/loginToken";
import {equals} from "../../../utils/utils";

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
        return !equals(this.state, nextState)
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
            // Validation
            if (!this.state.email) return alert("Xin mời nhập email");
            if (!this.state.password) return alert("Xin mời nhập mật khẩu");
            if (!this.validateEmail()) return alert("Email không hợp lệ");
            if (!this.validatePassword()) return alert("Mật khẩu không hợp lệ");
            // Login
            this.setState({isLogin: true});
            let token = await AUTH.LOGIN(this.state.email.toLowerCase().trim(), this.state.password);
            await setToken(token);
            await AUTH.CURRENT_USER()
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.resetTo({id: "home"});
            });
        }
        catch (e) {
            console.warn("error - ", e.message);
            if(e.message === "INCORRECT_PASSWORD") {
                alert("Sai mật khẩu");
            } else if(e.message === "INCORRECT_EMAIL") {
                alert("Sai email");
            } else if (e.message === "MISSING_EMAIL_AND_PASSWORD") {
                alert("Email và mật khẩu không được để trống");
            } else {
                alert(e.message);
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
            <View style={[styleBase.container, styleBase.center, styleBase.bgE5]}>
                <View style={[styleBase.column, styleBase.m_xl_bottom]}>
                    <Image
                        style={{height: 200, width: 200}}
                        source={require("../../../assets/img/laptop.png")}
                    />
                </View>
                <View style={[styleBase.justifyCenter, this.getFormWidth(), styleBase.shadowBox]}>
                    <View style={[styleBase.column, styleBase.m_md_bottom, styles.width100]}>
                        <TextInput
                            style={[
                                styleBase.textInput, styles.width100,
                                styleBase.fontRubik, styleBase.normalText,
                                styleBase.m_md_vertical, styleBase.p_md_horizontal]}
                            onChangeText={(email) => this.setState({email})}
                            placeholder={'Email'}
                        />
                        <View style={[styleBase.divider]}/>
                        <TextInput
                            style={[
                                styleBase.textInput, styles.width100,
                                styleBase.fontRubik, styleBase.normalText,
                                styleBase.m_md_vertical, styleBase.p_md_horizontal]}
                            onSubmitEditing={this.onSubmitLogin.bind(this)}
                            onChangeText={(password) => this.setState({password})}
                            placeholder={'Mật Khẩu'}
                            secureTextEntry
                        />
                        <View style={[styleBase.divider]}/>
                    </View>
                    <View styleName="horizontal md-gutter-bottom">
                        <TouchableOpacity
                            disabled={this.state.isLogin}
                            onPress={this.onSubmitLogin.bind(this)}
                            style={[
                                styleBase.bgBlack, styleBase.center,
                                styleBase.p_md_vertical
                            ]}>
                            {
                                this.state.isLogin ?
                                    <ActivityIndicator size='large'/>
                                    :
                                    <Text style={[
                                        styleBase.fontRubik, styleBase.title,
                                        styleBase.textWhite, styleBase.fontBold]}>
                                        ĐĂNG NHẬP
                                    </Text>
                            }
                        </TouchableOpacity>
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