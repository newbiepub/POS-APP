import React from "react";
import {Text, TouchableOpacity, View, TextInput, Alert} from "react-native";
import styleBase from "../../style/base";
import styleSetting from "../../style/setting";
import {setTax} from '../../../action/transaction';
import {connect} from "react-redux";

class Taxes extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tax: this.props.tax
        }
    }

    onChange(text) {
        let newText = '';
        let numbers = '0123456789';
        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                if (newText === '' && text[i] == 0) {

                } else {
                    newText = newText + text[i];

                }

            }
        }
        if (newText < 1) {
            newText = 0
        }
        if (newText > 100) {
            newText = 100
        }
        this.setState({tax: newText})
    }

    async setTax() {

        let a = await this.props.setTax(this.state.tax)
        if (a === true) {
            Alert.alert(
                'Lưu thuế',
                'thành công !',
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.center, styleSetting.taxList, styleBase.row]}>
                    <TouchableOpacity onPress={() => this.setTax()}
                                      style={[styleBase.center, styleBase.grow, styleSetting.addTaxButton]}>
                        <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                            Lưu
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        keyboardType='decimal-pad'
                        onChangeText={(tax) => this.onChange(tax) || 0}
                        style={[styleBase.font16, styleBase.wrappedText,
                            {textAlign: "right", marginRight: 5, color: "#999"}
                        ]}
                        value={this.state.tax.toString()}
                        placeholderTextColor="#999"
                    />
                    <Text style={[styleBase.font16, {color: "#999"}]}>
                        %
                    </Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = {
    setTax
};
const mapStatetoProps = (state)=>{
    return{
        tax: state.transaction.tax
    }

}
export default connect(mapStatetoProps, mapDispatchToProps)(Taxes);