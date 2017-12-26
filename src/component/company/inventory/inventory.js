import React from "react";
import {connect} from "react-redux";
import {FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View, InteractionManager} from "react-native";
import styleBase from "../../style/base";
import * as Animate from "react-native-animatable";
import {TextLarge} from "../../reusable/text";
import styleHome from "../../style/home";
import Entypo from "react-native-vector-icons/Entypo";
import styleSetting from "../../style/setting";
import * as _ from "lodash";
import InventoryMain from "./InventoryMain";

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.sideBarOption = [{
            name: "Nguyên Liệu"
        }, {
            name: "Sản Phẩm"
        }];
        this.state = {
            currentSetting: "Nguyên Liệu"
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        let currentSetting = !_.isEqual(this.state.currentSetting, nextState.currentSetting);
        return currentSetting;
    }

    onPressSectionItem(name) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({currentSetting: name});
        })
    }

    renderItem({item, index}) {
        try {
            let isActive = this.state.currentSetting === item.name,
                activeButton = isActive ? styleSetting.activeSection : null,
                activeText = isActive ? styleSetting.activeText: null;

            return (
                <TouchableOpacity onPress={this.onPressSectionItem.bind(this, item.name)} key={index} style={[
                    styleBase.centerVertical,
                    styleSetting.sectionItem,
                    activeButton
                ]}>
                    <Text style={[styleBase.font16, styleBase.bold, styleBase.text4, activeText]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        } catch (e) {
            console.warn("Error - Render Item Inventory");
        }
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
                    {this.sideBarOption.map((item, index) => this.renderItem({item, index}))}
                </View>
                <View style={{flex: 0.7,}}>
                    <View
                        style={[styleHome.header, styleBase.background6, styleBase.row,
                            styleBase.centerHorizontal, styleHome.boxPadding, styleBase.center]}>
                        <TextLarge style={[styleBase.color3]}>{this.state.currentSetting}</TextLarge>
                    </View>
                    <View style={[styleBase.grow, {borderLeftWidth: 1, borderColor: "#e5e5e5"}]}>
                        <InventoryMain view={this.state.currentSetting}/>
                    </View>
                </View>
            </Animate.View>
        )
    }
}

Inventory.propTypes = {
    openMenu: React.PropTypes.func,
    title: React.PropTypes.string
};

Inventory.defaultProps = {
    openMenu: () => {},
    title: 'Kho Hàng'
};


export default connect(null, null) (Inventory);