import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, InteractionManager, View, Text, TouchableOpacity} from "react-native";
import styleBase from "../../../../../styles/base";
import ProductItemCollapse from "./productDetail";
import {equals} from "../../../../../utils/utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import {openPopup, renderContent} from "../../../../../component/popup/actions/popupAction";
import ProductUpdate from "./productUpdate";
import store from "../../../../../store/store";
import {PRODUCT} from "../../../../../constant/actionTypes";

class ProductItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleNavigateProductDetail = this.handleNavigateProductDetail.bind(this);
    }

    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !equals(this.props.item !== nextProps.item)
    }

    /**
     * Handle
     */

    handleNavigateProductDetail() {
        InteractionManager.runAfterInteractions( () => {
            console.warn(JSON.stringify(this.props.item, null, 4));
            let { importPrice, salesPrice, product = {}, quantity = 0 } = this.props.item;
            let { name = '', unit = '' } = product;

            store.dispatch({
                type: PRODUCT.UPDATE_PRODUCT,
                payload: {
                    name,
                    unit,
                    importPrice,
                    quantity
                }
            })
            openPopup();
            renderContent(<ProductUpdate/>)
        })
    }

    render() {
        let {item} = this.props;

        return (
            <View style={[styleBase.column]}>
                <TouchableOpacity onPress={this.handleNavigateProductDetail}>
                    <View style={[{height: 65},
                        styleBase.p_md_horizontal,
                        styleBase.center,
                        styleBase.row]}>
                        <View style={{flex: 0.33}}>
                            <Text numberOfLines={1}>
                                {item.product.name || ""}
                            </Text>
                        </View>

                        <View style={[{flex: 0.33},styleBase.center, styleBase.row]}>
                            <Text numberOfLines={1}>{(!!item.quantity && item.quantity > 0) ? item.quantity : "HẾT HÀNG"}</Text>
                        </View>

                        <View style={[{flex: 0.2}, styleBase.center, styleBase.row]}>
                            <Text numberOfLines={1}>
                                {item.product.unit || ""}
                            </Text>
                        </View>

                        <View style={[{flex: 0.13, justifyContent: 'flex-end'}, styleBase.alignCenter, styleBase.row]}>
                            <Ionicons name="ios-arrow-down-outline" style={[styleBase.title]}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[styleBase.divider]}/>
            </View>
        )
    }
}

export default ProductItem