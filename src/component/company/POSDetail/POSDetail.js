import React from "react";
import {TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import {TextLarge} from "../../reusable/text";
import Entypo from "react-native-vector-icons/Entypo";
import {connect} from "react-redux";
import {openMenu} from "../../../action/route";
import Ionicons from "react-native-vector-icons/Ionicons";

class POSDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: React.PropTypes.string
    };

    static defaultProps = {
        title: ""
    };

    render() {
        return (
            <View style={[styleBase.container, styleBase.row]}>
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
                    <View>

                    </View>
                </View>
                <View style={{flex: 0.7}}>
                    <View
                        style={[styleHome.header, styleBase.background6, styleBase.row,
                            styleBase.centerHorizontal, styleHome.boxPadding, styleBase.center]}>
                        <TextLarge style={[styleBase.color3]}>asdasd</TextLarge>
                    </View>
                    <View style={[styleBase.grow, {borderLeftWidth: 1, borderColor: "#e5e5e5"}]}>

                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = {
    openMenu
};

export default connect(null, mapDispatchToProps)(POSDetail);