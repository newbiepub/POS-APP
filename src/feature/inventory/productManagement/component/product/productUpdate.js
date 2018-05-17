import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert} from "react-native";
import styleBase from "../../../../../styles/base";
import {closePopup} from "../../../../../component/popup/actions/popupAction";
import ProductUpdateForm from "./productUpdateForm";
import EStyleSheet from "react-native-extended-stylesheet";
import {connect} from "react-redux";
import {inputData} from "../../../../../selector/discount";
import {productData, productInput} from "../../../../../selector/product";
import {INVENTORY} from "../../../action/index";
import store from "../../../../../store/store";
import {INVENTORY_ACTION} from "../../../../../constant/actionTypes";
import emitter from "../../../../../event/emitter";
import {EVENT_TYPE} from "../../../../../constant/eventType";
import {PRODUCT_STORAGE} from "../../../../../localStorage/index";

const modalStyle = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    },
})

class ProductUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }


    /**
     * handlers
     * @returns {Promise.<void>}
     */

    // Update product
    async handleUpdateProduct() {
        try {
            let { name = '', unit = '', importPrice = 0, productInventory = [],
                quantity = 0, productCode = '', productId = '', user } = this.props;
            let productUpdateIndex, currentProduct;

            if(!name.length) throw new Error('Tên sản phẩm bắt buộc !');
            if(!unit.length) throw new Error('Đơn vị sản phẩm bắt buộc !');

            // Optimictic Update
            productUpdateIndex = productInventory.findIndex(item => item.product._id === productId);
            currentProduct = productInventory[productUpdateIndex]
            productInventory[productUpdateIndex] = {
                ...currentProduct,
                product: {
                    ...currentProduct.product,
                    productCode,
                    name,
                },
                importPrice,
                quantity,
            }
            emitter.emit(EVENT_TYPE.UPDATE_PRODUCT);
            store.dispatch({
                type: INVENTORY_ACTION.UPDATE_PRODUCT,
                payload: productInventory
            })
            // SAVE LOCAL STORAGE
            await PRODUCT_STORAGE.SAVE_PRODUCT(user._id, productInventory)
            closePopup();
            // Update Product
            await INVENTORY.UPDATE_PRODUCT(productId, name, quantity, importPrice,
                '', unit,productCode);
        } catch (e) {
            Alert.alert('Thông báo', e.message);
        }
    }

    render() {
        return (
            <View style={[styleBase.fillParent, styleBase.center]}>
                <TouchableWithoutFeedback onPress={closePopup}>
                    <View style={[styleBase.fillParent, styleBase.overlay]}/>
                </TouchableWithoutFeedback>
                <View style={[modalStyle.listContainer, styleBase.shadowBox]}>
                    <ListHeader
                        onSubmit={this.handleUpdateProduct}/>
                    <ProductUpdateForm/>
                </View>
            </View>
        )
    }
}

const ListHeader = (props) => {
    return (
        <View style={[styleBase.panelHeader, styleBase.row, styleBase.alignCenter, styleBase.spaceBetween, {
            height: 65, padding: 0
        }]}>
            <View>
                <Text style={[styleBase.text4, styleBase.title, styleBase.p_md_horizontal, styleBase.p_md_vertical]}>
                    CẬP NHẬT MẶT HÀNG
                </Text>
            </View>
            <TouchableOpacity
                onPress={props.onSubmit}
                style={[styleBase.p_md_horizontal, styleBase.bgBlue,
                    styleBase.p_md_vertical, styleBase.center, styleBase.row]}>
                <Text style={[styleBase.fontRubik, styleBase.title, styleBase.textWhite]}>
                    {`CẬP NHẬT`}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

ProductUpdate.propTypes = {};

ProductUpdate.defaultProps = {};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        ...productData(state),
        ...productInput(state)
    };
}

export default connect(mapStateToProps)(ProductUpdate);