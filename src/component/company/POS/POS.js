import React from "react";
import {TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import {TextLarge} from "../../reusable/text";
import styleHome from "../../style/home";
import {connect} from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import POSGrid from "./POSGrid";

class POS extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View>
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
                </View>
                <POSGrid/>
            </View>
        )
    }
}

POS.propTypes = {
    openMenu: React.PropTypes.func,
    title: React.PropTypes.string
};

POS.defaultProps = {
    openMenu: () => {
    },
    title: ""
};

export default connect(null, null)(POS);