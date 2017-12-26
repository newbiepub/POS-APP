import React from "react";
import {TouchableOpacity, View, ScrollView, Text} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import {TextLarge} from "../../reusable/text";
import {connect} from "react-redux";
import {openMenu} from "../../../action/route";
import Ionicons from "react-native-vector-icons/Ionicons";
import styleSetting from "../../style/setting";
import POSDetailMain from "./POSDetailMain";

class POSDetail extends React.Component {
    constructor(props) {
        super(props);
        this.menu = [{
            id: "inventory",
            name: "Kho"
        },{
            id: "report",
            name: "Báo cáo"
        }, {
            id: "setting",
            name: "Cài đặt"
        }];
        this.state = {
            currentMenuItem: this.menu[0]
        }
    }

    static propTypes = {
        title: React.PropTypes.string,
        employee: React.PropTypes.object
    };

    static defaultProps = {
        title: "",
    };

    onPressSectionItem(item) {
        this.setState({currentMenuItem: item})
    }

    isActive(item) {
        return this.state.currentMenuItem.id === item.id;
    }

    renderMenu(item, index) {
        try {
            let isActive = this.isActive(item),
                activeButton = isActive ? styleSetting.activeSection : null,
                activeText = isActive ? styleSetting.activeText: null;

            return (
                <TouchableOpacity onPress={this.onPressSectionItem.bind(this, item)} key={index} style={[
                    styleBase.centerVertical,
                    styleSetting.sectionItem,
                    activeButton
                ]}>
                    <Text style={[styleBase.font16, styleBase.bold, styleBase.text4, activeText]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        } catch(e) {
            alert(e);
            console.warn("Error - renderMenu");
        }
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.row, styleBase.whiteBackground]}>
                <View style={{flex: 0.3}}>
                    <View
                        style={[styleHome.header, styleBase.background6,
                            styleBase.centerHorizontal, styleBase.row, {marginBottom: 15}]}>
                        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name="md-arrow-back" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableOpacity>
                        <View style={[styleBase.center, styleBase.wrappedText]}>
                            <TextLarge style={[styleBase.color3]}>{this.props.title}</TextLarge>
                        </View>
                    </View>
                    <ScrollView>
                        {this.menu.map((item, index) => this.renderMenu(item, index))}
                    </ScrollView>
                </View>
                <View style={{flex: 0.7}}>
                    <View style={[styleBase.grow, {borderLeftWidth: 1, borderColor: "#e5e5e5"}]}>
                        <POSDetailMain {...this.props} route={this.state.currentMenuItem.id} employee={this.props.pos}/>
                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = {
    openMenu
};

export default connect(null, mapDispatchToProps)(POSDetail);