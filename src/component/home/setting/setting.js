import React from "react";
import {TouchableWithoutFeedback, View, FlatList, Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import styleBase from "../../style/base";
import {TextLarge} from "../../reusable/text";
import Entypo from "react-native-vector-icons/Entypo";
import styleHome from "../../style/home";
import * as _ from "lodash";
import styleSetting from "../../style/setting";
import * as Animate from "react-native-animatable";
import {logout} from "../../../action/account";
import SettingMain from "./settingMain";

const TouchableOpacityAnimate = Animate.createAnimatableComponent(TouchableOpacity);

class Setting extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentSetting: "Thuế"
        };
        this.listSectionSettings = [
            {
                title: "Tuỳ Chọn Thu Tiền",
                settings: [{name: "Thuế"}, {name: "Quản lý tiền"}]
            },
            {
                title: "Mở Rộng",
                settings: [{name: "Quét mã vạch"}]
            },
            {
                title: "Tài Khoản",
                settings: [{account: 1}]
            }
        ];
    }

    componentWillUnmount() {
        this.state.currentSetting = "Thuế";
    }

    renderSectionHeader(title) {
        return (
            <View key={title} style={[{paddingHorizontal: 10}]}>
                <Text style={[styleBase.text4, styleBase.font14]}>
                    {title}
                </Text>
            </View>
        )
    }

    checkActive(name) {
       return this.state.currentSetting === name
    }

    onPressSectionItem(name) {
        this.setState({currentSetting: name})
    }

    renderSectionItem(item, index, title) {
        try {
            let isActive = this.checkActive(item.name),
                activeButton = isActive ? styleSetting.activeSection : null,
                activeText = isActive ? styleSetting.activeText: null;

            let {account} = this.props,
                renderSection = (
                    <TouchableOpacity onPress={this.onPressSectionItem.bind(this, item.name)} key={index} style={[
                        styleBase.centerVertical,
                        styleSetting.sectionItem,
                        activeButton
                    ]}>
                        <Text style={[styleBase.font16, styleBase.bold, styleBase.text4, activeText]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                );

            if (title === "Tài Khoản") {
                renderSection = (
                    <View key={index}>
                        <View style={[styleBase.centerVertical,
                            styleSetting.sectionItem, {borderBottomColor: "transparent", marginBottom: 20}
                        ]}>
                            <Text style={[styleBase.font16, styleBase.text4]}>
                                {account.user.username.toUpperCase()}
                            </Text>
                        </View>
                        <LogoutButton {...this.props}/>
                    </View>
                )
            }
            return renderSection;
        } catch(e) {
            return <View/>
        }
    }

    renderSection() {
        return _.map(this.listSectionSettings, (section, index) => {
            return (
                <FlatList
                    key={index}
                    ListHeaderComponent={this.renderSectionHeader.bind(this, section.title)}
                    data={section.settings}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => this.renderSectionItem(item, index, section.title)}
                />
            )
        })
    }

    render() {
        return (
            <Animate.View animation="fadeIn" style={[styleBase.container, styleBase.row, styleBase.background4]}>
                <View style={{flex: 0.3}}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header, styleBase.background6,
                            styleBase.centerHorizontal, styleBase.row, {marginBottom: 15}]}>
                        <TouchableWithoutFeedback onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[styleBase.center, styleBase.wrappedText]}>
                            <TextLarge style={[styleBase.color3]}>{this.props.title}</TextLarge>
                        </View>
                    </View>
                    <View>
                        {this.renderSection()}
                    </View>
                </View>
                <View style={{flex: 0.7,}}>
                    <View
                        style={[styleHome.header, styleBase.background6, styleBase.row,
                            styleBase.centerHorizontal, styleHome.boxPadding, styleBase.center]}>
                        <TextLarge style={[styleBase.color3]}>{this.state.currentSetting}</TextLarge>
                    </View>
                    <View style={[styleBase.grow, {borderLeftWidth: 1, borderColor: "#e5e5e5"}]}>
                        <SettingMain {...this.props} setting={this.state.currentSetting}/>
                    </View>
                </View>
            </Animate.View>
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
                                     style={[styleSetting.logoutButton, styleBase.center]}>
                <Animate.Text ref="text_ref" style={[styleBase.font18, styleBase.bold, {color: "#d64242"}]}>
                    {this.state.isLogout ? "Xác Nhận" : "Đăng Xuất" }
                </Animate.Text>
            </TouchableOpacityAnimate>
        )
    }
}

Setting.propTypes = {
    openMenu: React.PropTypes.func,
    title: React.PropTypes.string
};

Setting.defaultProps = {
    openMenu: () => {
    },
    title: ""
};

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null)(Setting);