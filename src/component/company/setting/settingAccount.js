import React from "react";
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import styleBase from "../../style/base";
import {connect} from "react-redux";
import {logout} from "../../../action/accountCompany";
import styleSetting from "../../style/setting";
import * as Animate from "react-native-animatable";

const TouchableOpacityAnimate = Animate.createAnimatableComponent(TouchableOpacity);

class SettingAccount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            companyEmail: this.props.account.company.companyEmail || "",
            companyName: this.props.account.company.hasOwnProperty("companyProfile")
                ? this.props.account.company.companyProfile.companyName || "" : ""
        }
    }


    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styles.paddingBox, styleBase.borderBottomE5]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={[styles.paddingBox]}>
                    <View style={[styleBase.row, styleBase.centerHorizontal]}>
                        <View style={{flex: 0.3}}>
                            <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                                Email
                            </Text>
                        </View>
                        <View style={{flex: 0.7}}>
                            <TextInput
                                style={[styleBase.grow, styles.input, styleBase.borderBottomE5, styleBase.font16, styleBase.text4]}
                                onChangeText={(companyEmail) => this.setState({companyEmail})}
                                value={this.state.companyEmail}
                            />
                        </View>
                    </View>
                    <View style={[styleBase.row, styleBase.centerHorizontal]}>
                        <View style={{flex: 0.3}}>
                            <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                                Tên Công Ty
                            </Text>
                        </View>
                        <View style={{flex: 0.7}}>
                            <TextInput
                                style={[styleBase.grow, styles.input, styleBase.borderBottomE5, styleBase.font16, styleBase.text4]}
                                onChangeText={(companyName) => this.setState({companyName})}
                                value={this.state.companyName}
                            />
                        </View>
                    </View>
                    <View style={[styleBase.row, {marginTop: 30}]}>
                        <View style={{flex: 0.5}}>

                        </View>
                        <View style={[{flex: 0.5}, styleBase.center]}>
                            <LogoutButton {...this.props}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class LogoutButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLogout: false
        }
    }

    async onLogout() {
        try {
            await logout();
            this.props.navigator.resetTo({id: "login"});
        } catch(e) {
            alert(e);
            this.setState({isLogout: false})
        }
    }

    onConfirm() {
        if(this.state.isLogout) {
            return this.onLogout();
        }
        this.setState({isLogout: true});
        this.refs["text_ref"].transitionTo({color: "#fff"});
        this.refs["logout_ref"].transitionTo({backgroundColor: "#d64242"})
        setTimeout(() => {
            if(this.refs.text_ref  != undefined) {
                this.refs["text_ref"].transitionTo({color: "#d64242"});
                this.refs["logout_ref"].transitionTo({backgroundColor: "transparent"});
                this.setState({isLogout: false});
            }
        }, 2000);
    }

    render() {
        return (
            <TouchableOpacityAnimate ref="logout_ref" onPress={this.onConfirm.bind(this)}
                                     style={[styles.logoutButton, styleBase.center]}>
                <Animate.Text ref="text_ref" style={[styleBase.font18, styleBase.bold, {color: "#d64242"}]}>
                    {this.state.isLogout ? "Xác Nhận" : "Đăng Xuất" }
                </Animate.Text>
            </TouchableOpacityAnimate>
        )
    }
}

const styles = StyleSheet.create({
    paddingBox: {paddingVertical: 15, marginHorizontal: 20},
    input: {marginHorizontal: 15, paddingVertical: 10},
    logoutButton: {
        paddingHorizontal: 20,
        marginHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#d64242"
    },
});


SettingAccount.propTypes = {
    title: React.PropTypes.string
};

SettingAccount.defaultProps = {
    title: "Thông Tin Tài Khoản"
};

const mapStateToProps = (state) => {
    return {
        account: state.accountCompany
    }
};

export default connect(mapStateToProps, null)(SettingAccount);