import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, InteractionManager, ScrollView} from "react-native";
import {Text, View} from "@shoutem/ui";
import styleBase from "../../../../styles/base";
import NavBar from "../../../../component/navbar/navbar";
import {equals} from "../../../../utils/utils";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
        };

        this.handleData = this.handleData.bind(this);
        this.renderProductInfo = this.renderProductInfo.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                item: this.props.item.product
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let itemChanged   = !equals(this.state.item, nextState.item);

        return itemChanged;
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            item: nextProps.item.product
        })
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
                value: `${data.importPrice.seperateNumber()} ${data.currency}`
            },
            {
                label: "GIÁ BÁN RA",
                value: `${data.salesPrice.seperateNumber()} ${data.currency}`
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
            <View style={StyleSheet.flatten([styleBase.container])}>
                <NavBar navigator={this.props.navigator} title={this.props.title}/>
                <ScrollView>
                    {info.length > 0 &&
                    info.map((item, index) => {
                        return (
                            <View key={index} style={StyleSheet.flatten([
                                styleBase.container,
                                styleBase.row,
                                styleBase.p_md_horizontal,
                                styleBase.m_md_vertical
                            ])}>
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
                </ScrollView>
            </View>
        )
    }
}

ProductDetail.propTypes = {
    item: PropTypes.object
};

export default ProductDetail