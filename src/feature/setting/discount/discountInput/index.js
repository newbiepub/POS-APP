import React from "react";
import PropTypes from "prop-types";
import {View, ScrollView, TextInput, Text, TouchableOpacity, Alert} from "react-native";
import styleBase from "../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import GroupCheckbox from "../../../../component/groupCheckbox/index";
import ListPosApply from '../listPosApply';
import {openPopup, renderContent} from "../../../../component/popup/actions/popupAction";
import InputDatePicker from "../../../../component/inputDatepicker/index";
import ListProductApply from "../listProductApply/index";
import NavBar from "../../../../component/navbar/navbar";
import {DISCOUNT_ACTION} from "../../../../constant/actionTypes";
import store from "../../../../store/store";
import { connect } from "react-redux";
import {discounts, inputData} from "../../../../selector/discount";
import DISCOUNT from "../action/index";

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

        this.handleChangeName        = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeAmount      = this.handleChangeAmount.bind(this);
        this.handleChangeAppliedDate = this.handleChangeAppliedDate.bind(this);
        this.handleChangeDueDate     = this.handleChangeDueDate.bind(this);
        this.handleChangeOptions     = this.handleChangeOptions.bind(this);

    }

    /**
     * handler
     */

    handleChangeName (name) {
        store.dispatch({
            type: DISCOUNT_ACTION.CHANGE_AMOUNT,
            payload: {
                name
            }
        })
    }

    handleChangeDescription (description) {
        store.dispatch({
            type: DISCOUNT_ACTION.CHANGE_AMOUNT,
            payload: {
                description
            }
        })
    }

    handleChangeAmount (amount) {
        amount = amount.match(/\d/gi) || [0];
        amount = amount.join('');
        this.setState({amount: +amount}, () => {
            store.dispatch({
                type: DISCOUNT_ACTION.CHANGE_AMOUNT,
                payload: {
                    amount: this.state.amount
                }
            })
        })
    }

    handleChangeAppliedDate (date) {
        store.dispatch({
            type: DISCOUNT_ACTION.APPLY_DATE,
            payload: {
                appliedDate: date
            }
        })
    }

    handleChangeDueDate(date) {
        store.dispatch({
            type: DISCOUNT_ACTION.DUE_DATE,
            payload: {
                dueDate: date
            }
        })
    }

    handleChangeOptions (option) {
        store.dispatch({
            type: DISCOUNT_ACTION.CHANGE_OPTION,
            payload: {
                type: option
            }
        })
    }

    handleApplyPOS (pos) {
        store.dispatch({
            type: DISCOUNT_ACTION.PICK_POS,
            payload: {
                employeeIds: pos
            }
        })
    }

    handleApplyProducts (products) {
        store.dispatch({
            type: DISCOUNT_ACTION.PICK_PRODUCTS,
            payload: {
                products
            }
        })
    }

    async handleSubmitDiscount() {
        try {
            let {
                discountId,
                discounts,
                amount,
                type,
                name,
                description,
                appliedDate,
                dueDate,
                employeeIds,
                products
            } = this.props;
            let insertItem = {
                value: amount,
                type: type.value,
                name,
                description,
                appliedDate,
                dueDate,
                employeeIds,
                products
            }, updateItemIndex;

            // Validation
            if(!name.length) throw new Error('Tên khuyến mại bắt buộc');
            if(!description.length) throw new Error('Mô tả khuyến mại là bắt buộc');
            if(!appliedDate) throw new Error('Ngày áp dụng là bắt buộc');
            if(!dueDate) throw new Error('Ngày hết hạn là bắt buộc');
            if(!type) throw new Error('Loại là bắt buộc');
            if(!amount) throw new Error('Giá trị khuyến mãi là bắt buộc');
            if(!products.length) throw new Error('Mời chọn sản phẩm');
            if(!employeeIds.length) throw new Error('Mời chọn điểm bán hàng');

            // Navigate back
            this.props.navigator.pop();
            if(this.props.modifiedType === 'create') {
                // Optimistic Discount
                store.dispatch({
                    type: DISCOUNT_ACTION.FETCH_ALL_DISCOUNT,
                    payload: [...discounts, insertItem]
                })
                // Create discount
                await DISCOUNT.CREATE_DISCOUNT(
                    name, description, appliedDate, dueDate,
                    type.value , amount, products, employeeIds
                )
            } else {

                // Optimistic Update
                updateItemIndex = discounts.findIndex(discount => discount._id === discountId);
                discounts[updateItemIndex] = {...discounts[updateItemIndex], ...insertItem}
                updateItemIndex > -1 && store.dispatch({
                    type: DISCOUNT_ACTION.FETCH_ALL_DISCOUNT,
                    payload: discounts
                })

                await DISCOUNT.UPDATE_DISCOUNT(
                    discountId, name, description, appliedDate, dueDate,
                    type.value , amount, products, employeeIds
                )
            }
        } catch (e) {
            alert(e.message);
        }
    }

    /**
     * Renderer
     * @returns {XML}
     */

    render() {
        return (
            <View style={[styleBase.container, styleBase.center]}>
                <NavBar navigator={this.props.navigator}/>
                <View style={[ styles.formInner]}>
                    <ScrollView>
                        <TextInput
                            style={[
                                styles.input,
                                styleBase.p_md_horizontal, styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                            ]}
                            value={this.props.name}
                            onChangeText={this.handleChangeName}
                            placeholder="TÊN KHUYẾN MẠI"/>
                        <TextInput
                            style={[
                                styles.input,
                                styleBase.p_md_horizontal, styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                            ]}
                            value={this.props.description}
                            onChangeText={this.handleChangeDescription}
                            placeholder="MÔ TẢ KHUYẾN MẠI"/>
                        <TextInput
                            style={[
                                styles.input,
                                styleBase.p_md_horizontal, styleBase.p_md_vertical,
                                styleBase.m_md_vertical,
                            ]}
                            value={this.props.amount > 0 ? this.props.amount.seperateNumber() : ''}
                            onChangeText={this.handleChangeAmount}
                            placeholder="GIẢM GIÁ"/>
                        <InputDatePicker placeholder="Thời gian bắt đầu giảm giá"
                                         datePicked={this.props.appliedDate}
                                         onChangeDate={this.handleChangeAppliedDate}
                                         style={[styles.input]}/>
                        <InputDatePicker placeholder="Thời gian kết thúc giảm giá"
                                         datePicked={this.props.dueDate}
                                         onChangeDate={this.handleChangeDueDate}
                                         style={[styles.input]}/>
                        <GroupCheckbox options={this.options}
                                       onChangeOptions={this.handleChangeOptions}
                                       currentOption={this.props.type}/>
                        <ListApplied title={this.props.employeeIds.length > 0 ? `${this.props.employeeIds.length} ĐIỂM BÁN HÀNG` : `ÁP DỤNG CHO CÁC ĐIỂM BÁN HÀNG`} onPress={() => {
                            openPopup();
                            renderContent(<ListPosApply/>)}}/>
                        <ListApplied title={this.props.products.length > 0 ? `${this.props.products.length} SẢN PHẨM` : 'ÁP DỤNG CHO CÁC SẢN PHẨM'} onPress={() => {
                            openPopup();
                            renderContent(<ListProductApply/>)}}/>
                    </ScrollView>
                    <SubmitButton onPress={() => this.handleSubmitDiscount()}/>
                </View>
            </View>
        )
    }
}

const ListApplied = (props) => {
    return (
        <TouchableOpacity
            style={[
                styleBase.p_md_horizontal, styleBase.p_md_vertical,
                styleBase.m_md_vertical, styles.input]}
            onPress={props.onPress}>
            <Text style={[styleBase.text6]}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const SubmitButton = (props) => {
    return (
        <View style={[styleBase.center]}>
            <TouchableOpacity
                onPress={props.onPress}
                style={[
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

DiscountInput.propTypes = {
    modifiedType: PropTypes.string,
    discountId: PropTypes.string
};

DiscountInput.defaultProps = {
    modifiedType: 'create',
    discountId: ''
};

const mapStateToProps = (state) => {
    return {
        discounts: discounts(state),
        ...inputData(state)
    }
}

export default connect(mapStateToProps) (DiscountInput);