import React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "react-native";
import {View, TouchableOpacity, Subtitle, Text, Icon, Divider} from "@shoutem/ui";
import styleBase from "../../../../styles/base";
import ProductItemCollapse from "./productItemCollapse";
import isEqual from "lodash/isEqual";

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.collapse = false;

        this.handleToogleCollapse = this.handleToogleCollapse.bind(this);
    }

    static propTypes = {
        item: PropTypes.object
    };

    static defaultProps = {
        item: {}
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props.item !== nextProps.item)
    }

    handleToogleCollapse () {
        if(this.collapse) {
            this.collapse = false;
            this.refs.productCollapse.closeCollapse();
        } else {
            this.collapse = true;
            this.refs.productCollapse.showCollapse();
        }
    }

    render() {
        let {item} = this.props;
        try {
            return (
                <View styleName="vertical">
                    <TouchableOpacity onPress={this.handleToogleCollapse}>
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
                    <ProductItemCollapse ref="productCollapse" item={item.product}/>
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