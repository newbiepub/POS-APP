import React, {PureComponent} from "react";
import {
    View,
    Dimensions,
    Image,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    InteractionManager
} from "react-native";
import * as Responsive from "react-native-responsive-dimensions";
import styleBase from "../style/base";
import styleLogin from "../style/login";
import Ionicons from "react-native-vector-icons/Ionicons";
import KeyboardSpacer from "react-native-keyboard-spacer";
import * as Animate from "react-native-animatable";
import {connect} from "react-redux";
import {auth, getCurrentUser, login} from "../../action/account";

const TouchableAnimate = Animate.createAnimatableComponent(TouchableOpacity);

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isDimensionChanged: false
        }
    }

    async componentDidMount() {
        Dimensions.addEventListener('change', this.dimensionChanged);
        try {
            await auth()
        } catch(e) {
            alert(e);
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.dimensionChanged)
    }


    dimensionChanged() {
        if (this.refs.login != undefined)
            this.setState({isDimensionChanged: !this.state.isDimensionChanged});
    }

    render() {
        try {
            let {width, height} = Dimensions.get("window");
            return (
                <View ref="login" style={[styleBase.container, {backgroundColor: "#444"}]}>
                    <Image source={require("../../asset/img/bg2.jpg")} style={[styleBase.fillParent, {height, width}]}/>
                    <View style={[styleBase.container]}>
                        <ScrollView>
                            <View style={[{margin: 75}, styleBase.centerHorizontal, styleBase.centerVertical]}>
                                <Text style={[{fontSize: Responsive.responsiveFontSize(5)}, styleLogin.headerText]}>
                                    POS
                                </Text>
                            </View>
                            <View style={{marginVertical: 145}}>
                                <LoginForm ref="loginForm" {...this.props} instance={this}/>
                            </View>
                        </ScrollView>
                    </View>
                    {
                        Platform.OS === "ios" && <KeyboardSpacer/>
                    }
                </View>
            )
        } catch (e) {
            console.warn("Error - Render Login");
        }
    }
}

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLogin: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account.loginState) {
            this.refs["loginBtn"].transitionTo({backgroundColor: "#e5e5e5"}, 200);
            setTimeout(() => {
                this.refs["loginBtn"].transitionTo({transform: [{scale: 40}]}, 1000);
               InteractionManager.runAfterInteractions(() => {
                   this.props.navigator.resetTo({
                       id: "home"
                   });
                   getCurrentUser();
               })
            }, 200)
        }
    }

    onPressLogin() {
        try {
            if (!this.state.username.length) return alert("Xin mời nhập username");
            if (!this.state.password.length) return alert("Xin mời nhập password");
            this.setState({isLogin: true});
            let {login} = this.props;
            login(this.state.username, this.state.password, (e) => {
                alert("Đăng Nhập Thất Bại");
                this.setState({isLogin: false})
            })
        } catch (e) {
            alert("Đăng Nhập Thất Bại");
            this.setState({isLogin: false})
        }
    }

    render() {
        return (
            <View style={[styleBase.centerVertical, styleBase.centerHorizontal]}>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#999"
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    style={{
                        width: Responsive.responsiveWidth(30),
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        fontSize: Responsive.responsiveFontSize(2),
                        color: "#e5e5e5",
                        borderBottomWidth: 2,
                        borderBottomColor: "#e5e5e5",
                        marginBottom: 15
                    }}/>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#999"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry={true}
                    style={{
                        width: Responsive.responsiveWidth(30),
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        fontSize: Responsive.responsiveFontSize(2),
                        color: "#e5e5e5",
                        borderBottomWidth: 2,
                        borderBottomColor: "#e5e5e5",
                        marginBottom: 15
                    }}/>
                <TouchableAnimate ref="loginBtn" onPress={this.onPressLogin.bind(this)} style={[{
                    marginTop: 38,
                    height: 67,
                    width: 67,
                    borderRadius: 34,
                    borderWidth: 1,
                    borderColor: "#e5e5e5",
                    overflow: "hidden"
                }, styleBase.centerHorizontal, styleBase.centerVertical]}>
                    <View>
                        {
                            !this.state.isLogin &&
                            <Ionicons name="ios-arrow-round-forward-outline" style={{
                                fontSize: Responsive.responsiveFontSize(5),
                                backgroundColor: "transparent", color: "#e5e5e5"
                            }}/>
                        }
                        {
                            this.state.isLogin &&
                            <ActivityIndicator color="#e5e5e5" size="large"/>
                        }

                    </View>
                </TouchableAnimate>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);