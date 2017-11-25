import React from "react";
import {Text, View, TextInput} from "react-native";
import styleBase from "../../style/base";
import styleSetting from "../../style/setting";

class CashManagement extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.center, styleSetting.taxList, styleBase.row]}>
                    <View style={[styleBase.center, styleBase.grow,
                        styleSetting.addTaxButton, styleBase.row, {paddingHorizontal: 15, justifyContent: "space-between"}
                    ]}>
                        <View style={[styleBase.center, styleBase.row]}>
                            <Text style={[styleBase.bold, styleBase.font16, styleBase.text4]}>
                                Vốn Ban Đầu
                            </Text>
                        </View>
                        <View style={[styleBase.row, styleBase.center]}>
                            <TextInput key="textInput" style={[styleBase.font16]} keyboardType={"numeric"} placeholder="0 đ"/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CashManagement;