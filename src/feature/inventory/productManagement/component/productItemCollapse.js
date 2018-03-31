import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Animated} from "react-native";
import {View, Text} from "@shoutem/ui";
import styleBase from "../../../../styles/base";
import isEquals from 'lodash/isEqual';

class ProductItemCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            height: new Animated.Value(0),
        };

        this.handleData = this.handleData.bind(this);
        this.renderProductInfo = this.renderProductInfo.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let heightChanged = this.state.height !== nextState.height;
        let itemChanged   = !isEquals(this.state.item, nextState.item);

        return heightChanged || itemChanged;
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            item: nextProps.item
        })
    }

    showCollapse() {
        Animated.spring(this.state.height, {
            toValue: 150,
            friction: 7
        }).start();
    }

    closeCollapse() {
        Animated.timing(this.state.height, {
            toValue: 0,
            duration: 200
        }).start();
    }

    /**
     * Normalize Data
     */
    handleData () {
        let {item = {}} = this.state;
        let { price = [] } = item;
        let { category = {} } = item;
        let { currency = {} } = price;
        let importPrice = price.find(price => price.name === "import") || {};
        let salesPrice  = price.find(price => price.name === "default") || {};
        let currencyName = currency.name || "VND";
        let categoryName = category.name || "Không có";
        let quantity    = item.quantity || 0;

        return {
            name: item.name || "",
            importPrice: importPrice.price || 0,
            salesPrice: salesPrice.price || 0,
            currency: currencyName,
            quantity,
            category: categoryName
        }
    }

    renderProductInfo(data) {
        return [
            {
                label: "TÊN SẢN PHẨM",
                value: data.name
            },
            {
                label: "GIÁ NHẬP VÀO",
                value: `${data.importPrice.toLocaleString('vi')} ${data.currency}`
            },
            {
                label: "GIÁ BÁN RA",
                value: `${data.salesPrice.toLocaleString('vi')} ${data.currency}`
            },
            {
                label: "LOẠI HÀNG",
                value: data.category
            }
        ]
    }

    render() {
        let data = this.handleData();
        let info = this.renderProductInfo(data);

        return (
            <Animated.View style={{
                ...StyleSheet.flatten([{
                    height: this.state.height,
                    overflow: 'hidden'
                }, styleBase.bgE5, styleBase.m_md_horizontal])
            }}>
                {info.length > 0 &&
                    info.map((item, index) => {
                        return (
                            <View key={index} style={{
                                ...StyleSheet.flatten([
                                    styleBase.container,
                                    styleBase.row,
                                    styleBase.p_md_horizontal,
                                    styleBase.m_md_vertical
                                ])
                            }}>
                                <View style={{...StyleSheet.flatten([{flex: .5}, styleBase.center])}}>
                                    <Text style={{...StyleSheet.flatten([styleBase.fontBold])}}>
                                        {item.label}
                                    </Text>
                                </View>
                                <View style={{...StyleSheet.flatten([{flex: .5}, styleBase.center])}}>
                                    <Text numberOfLines={1}>
                                        {item.value}
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </Animated.View>
        )
    }
}

ProductItemCollapse.propTypes = {
    item: PropTypes.object
};

export default ProductItemCollapse