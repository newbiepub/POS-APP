import React from "react";
import PropTypes from "prop-types";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import styleBase from "../../../../../styles/base";
import {connect} from "react-redux";
import {productInput} from "../../../../../selector/product";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {PRODUCT} from "../../../../../constant/actionTypes";
import store from "../../../../../store/store";

class ProductUpdateForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChangeText(text, field, isNumber = false) {
        if(isNumber) {
            text = text.match(/\d/gi) || [0];
            text = text.join('');
            text = +text;
        }
        store.dispatch({
            type: PRODUCT.UPDATE_PRODUCT,
            payload: {
                [field]: text
            }
        })
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <KeyboardAwareScrollView contentContainerStyle={[styleBase.p_md_horizontal, styleBase.p_md_vertical]}>

                    <View style={[ styleBase.m_md_vertical,]}>
                        <Text style={[styleBase.m_sm_bottom, styleBase.fontRubik, styleBase.title]}>
                            TÊN SẢN PHẨM
                        </Text>
                        <TextInput
                            onChangeText={(text) => this.handleChangeText(text, 'name')}
                            style={[styleBase.p_md_vertical,
                                styleBase.p_md_horizontal, styleBase.input]}
                            placeholder="TÊN SẢN PHẨM"
                            value={this.props.name}/>
                    </View>
                    <View style={[ styleBase.m_md_vertical,]}>
                        <Text style={[styleBase.m_sm_bottom, styleBase.fontRubik, styleBase.title]}>
                            GIÁ NHẬP VÀO
                        </Text>
                        <TextInput
                            style={[styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                                styleBase.p_md_horizontal, styleBase.input]}
                            onChangeText={(text) => this.handleChangeText(text, 'importPrice', true)}
                            placeholder="GIÁ NHẬP VÀO"
                            value={this.props.importPrice.seperateNumber()}/>
                    </View>
                    <View style={[ styleBase.m_md_vertical,]}>
                        <Text style={[styleBase.m_sm_bottom, styleBase.fontRubik, styleBase.title]}>
                            SỐ LƯỢNG TRONG KHO
                        </Text>
                        <TextInput
                            style={[styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                                styleBase.p_md_horizontal, styleBase.input]}
                            placeholder="SỐ LƯỢNG TRONG KHO"
                            onChangeText={(text) => this.handleChangeText(text, 'quantity', true)}
                            value={this.props.quantity.seperateNumber()}/>
                    </View>

                    <View style={[ styleBase.m_md_vertical,]}>
                        <Text style={[styleBase.m_sm_bottom, styleBase.fontRubik, styleBase.title]}>
                            ĐƠN VỊ SẢN PHẨM
                        </Text>
                        <TextInput
                            style={[styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                                styleBase.p_md_horizontal, styleBase.input]}
                            onChangeText={(text) => this.handleChangeText(text, 'unit')}
                            placeholder="ĐƠN VỊ SẢN PHẨM"
                            value={this.props.unit}/>
                    </View>

                    <View style={[ styleBase.m_md_vertical,]}>
                        <Text style={[styleBase.m_sm_bottom, styleBase.fontRubik, styleBase.title]}>
                            MÃ SẢN PHẨM
                        </Text>
                        <TextInput
                            style={[styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                                styleBase.p_md_horizontal, styleBase.input]}
                            onChangeText={(text) => this.handleChangeText(text, 'productCode')}
                            placeholder="MÃ SẢN PHẨM"
                            value={this.props.productCode}/>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

ProductUpdateForm.propTypes = {};

ProductUpdateForm.defaultProps = {};

const mapStateToProps = (state) => {
    return productInput(state);
}

export default connect(mapStateToProps)(ProductUpdateForm);