import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import styleSetting from "../../style/setting";

class Taxes extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.center, styleSetting.taxList, styleBase.row]}>
                    <TouchableOpacity style={[styleBase.center, styleBase.grow, styleSetting.addTaxButton]}>
                        <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                            Thêm Thuế
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Taxes;