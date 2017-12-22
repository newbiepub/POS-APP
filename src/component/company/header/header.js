import React from "react";
import {TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {openMenu} from "../../../action/route";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    onOpenMenu() {
        openMenu()
    }

    render() {
        return (
            <View style={[{height: 60}, styleBase.background2, styleBase.row]}>
                <View style={[{flex: 0.3}, styleBase.centerVertical]}>
                    <TouchableOpacity style={[styleBase.row]} onPress={this.onOpenMenu.bind(this)}>
                        <Ionicons name="ios-menu-outline" style={[styleBase.font26, styleBase.text4, {paddingHorizontal: 15}]}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Header;  