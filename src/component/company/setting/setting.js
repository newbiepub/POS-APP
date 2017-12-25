import React from "react";
import {Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {connect} from "react-redux";
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import Entypo from "react-native-vector-icons/Entypo";
import {TextLarge} from "../../reusable/text";
import SettingMain from "./settingMain";
import styleSetting from "../../style/setting";
import Tax from './tax';
class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.listSectionSettings = [
            {
                title: "Tài Khoản",
                settings: [{id: 'account', name: "Thông tin"}, {id: 'tax', name: "Thuế"}]
            }
        ];
        this.state = {
            currentSetting: {title: "Tài Khoản", id: "account"}
        };
    }

    checkActive(id) {
        return this.state.currentSetting.id === id
    }

    onPressSectionItem(setting) {
        this.setState({
            currentSetting: { title: setting.name, id: setting.id}
        })
    }

    renderSection() {
        return this.listSectionSettings.map((item, index) => {
            return (
                <View key={index}>
                    <View style={[{paddingHorizontal: 10}]}>
                        <Text style={[styleBase.text4, styleBase.font16]}>
                            {item.title}
                        </Text>
                    </View>
                    {
                        item.settings.map((setting, i) => {
                            let isActive = this.checkActive(setting.id),
                                activeButton = isActive ? styleSetting.activeSection : null,
                                activeText = isActive ? styleSetting.activeText : null;
                            return (
                                <TouchableOpacity onPress={()=> this.onPressSectionItem(setting)} key={i} style={[
                                    styleBase.centerVertical,
                                    styleSetting.sectionItem,
                                    activeButton
                                ]}>
                                    <Text style={[styleBase.font16, styleBase.bold, styleBase.text4, activeText]}>
                                        {setting.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            )
        })
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.row]}>
                <View style={{flex: 0.3}}>
                    <View
                        style={[styleHome.header, styleBase.background6,
                            styleBase.centerHorizontal, styleBase.row, {marginBottom: 15}]}>
                        <TouchableOpacity onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableOpacity>
                        <View style={[styleBase.center, styleBase.wrappedText]}>
                            <TextLarge style={[styleBase.color3]}>{this.props.title}</TextLarge>
                        </View>
                    </View>
                    <View>
                        {this.renderSection()}
                    </View>
                </View>
                <View style={{flex: 0.7}}>
                    <View
                        style={[styleHome.header, styleBase.background6, styleBase.row,
                            styleBase.centerHorizontal, styleHome.boxPadding, styleBase.center]}>
                        <TextLarge style={[styleBase.color3]}>{this.state.currentSetting.title}</TextLarge>
                    </View>
                    <View style={[styleBase.grow, {borderLeftWidth: 1, borderColor: "#e5e5e5"}]}>
                        {
                            this.state.currentSetting.id === this.listSectionSettings[0].settings[0].id &&
                            <SettingMain {...this.props} setting={this.state.currentSetting.id}/>
                        }
                        {
                            this.state.currentSetting.id === this.listSectionSettings[0].settings[1].id &&
                            <Tax {...this.props} setting={this.state.currentSetting.id}/>
                        }
                    </View>
                </View>
            </View>
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

export default connect(null, null)(Setting);