import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, InteractionManager} from "react-native";
import {View, TouchableOpacity, Subtitle, Text, Icon, Divider} from "@shoutem/ui";
import styleBase from "../../../../styles/base";
import ProductItemCollapse from "./productDetail";
import {equals} from "../../../../utils/utils";

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
            this.props.navigator.push({id: 'product_detail', product: this.props.item});
        })
    }

    render() {
        let {item} = this.props;
        try {
            return (
                <View styleName="vertical">
                    <TouchableOpacity onPress={this.handleNavigateProductDetail}>
                        <View styleName="horizontal space-between v-center"
                              style={StyleSheet.flatten([{height: 65}, styleBase.p_md_horizontal])}>
                            <View style={{flex: 0.33}}>
                                <Subtitle numberOfLines={1}>
                                    {item.product.name || ""}
                                </Subtitle>
                            </View>

                            <View styleName="horizontal v-center h-center" style={{flex: 0.33}}>
                                <Text numberOfLines={1}>{(!!item.quantity && item.quantity > 0) ? item.quantity : "HẾT HÀNG"}</Text>
                            </View>

                            <View styleName="horizontal v-center h-center" style={{flex: 0.2}}>
                                <Text numberOfLines={1}>
                                    {item.product.unit || ""}
                                </Text>
                            </View>

                            <View style={{flex: 0.13}} styleName="horizontal v-center h-end">
                                <Icon name="down-arrow" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider styleName="line"/>
                </View>
            )
        }
        catch (e) {
            console.warn("error - render ProductItem");
            return (
                <View>
                    <TouchableOpacity>
                        <View styleName="horizontal space-between v-center"
                              style={StyleSheet.flatten([{height: 65}, styleBase.p_md_horizontal])}>
                            <Subtitle numberOfLines={1}>
                                KHÔNG THỂ TẢI SẢN PHẨM
                            </Subtitle>

                            <Text numberOfLines={1}>0</Text>
                            <Icon name="down-arrow"/>
                        </View>
                    </TouchableOpacity>
                    <Divider styleName="line"/>
                </View>
            )
        }
    }
}

export default ProductItem