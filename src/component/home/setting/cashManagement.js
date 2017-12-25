import React from "react";
import {Text, View, TextInput, Platform} from "react-native";
import styleBase from "../../style/base";
import styleSetting from "../../style/setting";
import {numberwithThousandsSeparator} from "../../reusable/function";
import KeyboardSpacer from "react-native-keyboard-spacer";

class CashManagement extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            initialPrice: this.props.account.user.fund || 0
        }
    }

    onChange(text) {
        let newText = '';
        let numbers = '0123456789';

        for (let i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        this.setState({initialPrice: newText})
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
                        <View style={[styleBase.row, styleBase.wrappedText, styleBase.centerHorizontal]}>
                            <TextInput key="textInput"
                                       keyboardType='decimal-pad'
                                       onChangeText={(initialPrice) => this.onChange(initialPrice)}
                                       style={[styleBase.font16, styleBase.wrappedText,
                                           {textAlign: "right", marginRight: 5, color: "#999"}
                                           ]}
                                       value={numberwithThousandsSeparator(this.state.initialPrice)}
                                       placeholderTextColor="#999"
                                       editable={false}
                                       placeholder="0"/>
                            <Text style={[styleBase.font16, {color: "#999"}]}>
                                đ
                            </Text>
                        </View>
                    </View>
                    {Platform.OS === "ios" && <KeyboardSpacer/>}
                </View>
            </View>
        )
    }
}

export default CashManagement;