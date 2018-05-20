import React from "react";
import PropTypes from "prop-types";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import styleBase from "../../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";

const customStyles = EStyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#e5e5e5"
    }
})

class PriceInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }

        this.handleChangeValue = this.handleChangeValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        })
    }

    handleChangeValue(ratio) {
        ratio = ratio.match(/\d/gi) || [0];
        ratio = ratio.join('');
        this.setState({value: +ratio}, () => this.props.onChangePrice(ratio))
    }

    render() {
        return (
            <View style={[styleBase.row]}>
                <TextInput
                    style={[customStyles.input, styleBase.p_md_horizontal, styleBase.p_md_vertical]}
                    placeholder="GIÁ NHẬP"
                    onChangeText={this.handleChangeValue}
                    value={`${this.state.value.seperateNumber()}`}
                />
                <TouchableOpacity style={[styleBase.p_md_vertical, styleBase.p_md_horizontal, styleBase.bgE5]}>
                    <Text>
                        VND
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

PriceInput.propTypes = {
    value: PropTypes.number,
    onChangePrice: PropTypes.func
};

PriceInput.defaultProps = {
    value: 0,
    onChangePrice: () => {}
};

export default PriceInput;