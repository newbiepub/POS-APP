import React from "react";
import PropTypes from "prop-types";
import {View, ScrollView, TextInput, Text, TouchableOpacity} from "react-native";
import styleBase from "../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import GroupCheckbox from "../../../../component/groupCheckbox/index";
import ListPosApply from '../listPosApply';
import {openPopup, renderContent} from "../../../../component/popup/actions/popupAction";
import InputDatePicker from "../../../../component/inputDatepicker/index";

const styles = EStyleSheet.create({
    formInner: {
        height: '80%',
        width: '80%'
    },
    input: {borderWidth: 1, borderColor: "#e5e5e5"},
})

class DiscountInput extends React.Component {
    constructor(props) {
        super(props);
        this.options = [
            {
                name: 'Theo % giá',
                value: 'percent'
            },
            {
                name: 'Theo giá',
                value: 'amount'
            }
        ];
        this.state = {
            amount: 0
        }
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
    }

    /**
     * handler
     */

    handleChangeAmount (amount) {
        amount = amount.match(/\d/gi) || [0];
        amount = amount.join('');
        this.setState({amount: +amount})
    }

    /**
     * Renderer
     * @returns {XML}
     */

    render() {
        return (
            <View style={[styleBase.container, styleBase.center]}>
                <View style={[ styles.formInner]}>
                    <ScrollView>
                        <TextInput
                            style={[
                                styles.input,
                                styleBase.p_md_horizontal, styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                            ]}
                            value={this.state.amount > 0 ? this.state.amount.seperateNumber() : ''}
                            onChangeText={this.handleChangeAmount}
                            placeholder="Giảm giá"/>
                        <InputDatePicker placeholder="Thời gian bắt đầu giảm giá" style={[styles.input]}/>
                        <InputDatePicker placeholder="Thời gian kết thúc giảm giá" style={[styles.input]}/>
                        <GroupCheckbox options={this.options}/>
                        <TouchableOpacity
                            style={[
                                styleBase.p_md_horizontal, styleBase.p_md_vertical,
                                styleBase.m_md_vertical, styles.input]}
                            onPress={() => {
                            openPopup();
                            renderContent(<ListPosApply/>)}}>
                            <Text style={[styleBase.text6]}>
                                ÁP DỤNG CHO CÁC ĐIỂM BÁN HÀNG
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <SubmitButton/>
                </View>
            </View>
        )
    }
}

const SubmitButton = (props) => {
    return (
        <View style={[styleBase.center]}>
            <TouchableOpacity style={[
                styleBase.bgBlack,
                styleBase.p_md_horizontal, styleBase.p_md_vertical,
                styleBase.m_md_vertical]}>
                <Text style={[styleBase.fontRubik, styleBase.textWhite]}>
                    ÁP DỤNG
                </Text>
            </TouchableOpacity>
        </View>
    )
}

DiscountInput.propTypes = {};

DiscountInput.defaultProps = {};

export default DiscountInput;