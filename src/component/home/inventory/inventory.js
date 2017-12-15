import React from "react";
import {connect} from "react-redux";
import {FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styleBase from "../../style/base";
import * as Animate from "react-native-animatable";
import {TextLarge} from "../../reusable/text";
import styleHome from "../../style/home";
import Entypo from "react-native-vector-icons/Entypo";
import styleSetting from "../../style/setting";

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.sideBarOption = [{
            name: "Nguyên Liệu"
        }]
        this.state = {
            currentSetting: "Nguyên Liệu"
        }
    }

    checkActive(name) {
        return this.state.currentSetting === name
    }

    onPressSectionItem() {

    }

    renderItem({item, index}) {
        let isActive = this.checkActive(item.name),
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
                        <FlatList
                            data={this.sideBarOption}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </View>
                </View>
                <View style={{flex: 0.7,}}>
                    <View
                        style={[styleHome.header, styleBase.background6, styleBase.row,
                            styleBase.centerHorizontal, styleHome.boxPadding, styleBase.center]}>
                        <TextLarge style={[styleBase.color3]}>{this.state.currentSetting}</TextLarge>
                    </View>
                    <View style={[styleBase.grow, {borderLeftWidth: 1, borderColor: "#e5e5e5"}]}>
                            
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

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, null) (Inventory);