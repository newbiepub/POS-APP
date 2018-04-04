import React, {PureComponent} from "react";
import {Platform, StatusBar, Text, View, Image, TouchableOpacity, Alert, AsyncStorage} from "react-native";
import {TextNormal, TextInputNormal, TextInputUserName, TextInputPassword} from '../../component/text';
import EStyleSheet from "react-native-extended-stylesheet";
import config from '../../config';
import {ASYNC_STORAGE} from '../../constant/constant';
import {constantStyle} from '../../style/base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {connect} from 'react-redux';

import{ getProfile} from "./userAction";

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.navigator = null;
        this.state = {
            username: '',
            password: ''
        }
    }

    async onLogin() {
        if (this.state.username === "") {
            return Alert.alert(
                'Thông báo !',
                'Bạn phải nhập tài khoản!',
                [
                    {
                        text: 'OK', onPress: () => {
                    }
                    },
                ],
                {cancelable: false}
            )
        }
        if (this.state.password === "") {
            return Alert.alert(
                'Thông báo !',
                'Bạn phải nhập mât khẩu!',
                [
                    {
                        text: 'OK', onPress: () => {
                    }
                    },
                ],
                {cancelable: false}
            )
        }
        let {api} = config, username = this.state.username.trim(), password = this.state.password;
        let response = await fetch(`${api}/account/employee/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        });
        response = await response.json();
        if (response.errors) {
            Alert.alert(
                'Đăng nhập thất bại !',
                'Đã có lỗi xảy ra !',
                [
                    {
                        text: 'OK', onPress: () => {
                    }
                    },
                ],
                {cancelable: false}
            )
        } else {
            await AsyncStorage.setItem(ASYNC_STORAGE.AUTH_TOKEN, JSON.stringify(response));
            this.props.navigator.resetTo({id: "home"});
            this.props.getProfile();
            console.warn(JSON.stringify(response))
        }

    }


    render() {
        return (
            <View style={style.container}>
                <View style={{flex: 0.5, alignItems: 'center'}}>
                    <Image source={require('../../asset/img/logo/payment-method.png')}
                           style={{width: 100, height: 100, marginBottom: 100}}/>
                    <View style={{flexDirection: 'row', marginVertical: 10, marginHorizontal: 5}}>
                        <TextInputUserName value={this.state.username}
                                           onChangeText={(text) => this.setState({username: text})}/>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 10, marginHorizontal: 5}}>
                        <TextInputPassword value={this.state.password}
                                           onChangeText={(text) => this.setState({password: text})}/>
                    </View>
                    <TouchableOpacity onPress={() => this.onLogin()} style={style.buttonWrapper}>
                        <TextNormal style={{color:constantStyle.color2}}>Đăng nhập</TextNormal>
                    </TouchableOpacity>
                    <KeyboardSpacer/>
                </View>
            </View>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: constantStyle.colorBackground
    },
    buttonWrapper: {
        borderRadius: 30,
        backgroundColor: '#6893d8',
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginVertical: 10

    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapDispatchToProps = {
    getProfile
}
export default connect(null,mapDispatchToProps)(Login) ;