import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, InteractionManager, ScrollView, View, Text, SafeAreaView} from "react-native";
import styleBase from "../../../../styles/base";
import NavBar from "../../../../component/navbar/navbar";
import {equals} from "../../../../utils/utils";
import {AfterInteractions} from "react-native-interactions";
import {product_inventory_data} from "../../../../api/dataHandler/inventory";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.handleData = this.handleData.bind(this);
        this.renderProductInfo = this.renderProductInfo.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let itemChanged             = !equals(this.state.item, nextState.item);
        let productInventoryChanged = !equals(this.state.productInventory, nextState.productInventory);

        return itemChanged || productInventoryChanged;
    }

    /**
     * Normalize Data
     */
    handleData () {
        try {
            let currencyName = "VND";

            return {
                ...this.props.item,
                currency: currencyName
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    renderProductInfo(data) {
        return [
            {
                label: "TÊN SẢN PHẨM",
                value: data.product.name
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
                value: data.product.category != undefined ? data.product.category.name : 'Không có'
            }
        ]
    }

    render() {
        let data = this.handleData();
        let info = this.renderProductInfo(data);

        return (
            <SafeAreaView style={[styleBase.container, styleBase.bgWhite]}>
                <View style={[styleBase.container]}>
                    <NavBar navigator={this.props.navigator} title={this.props.title}/>
                    <AfterInteractions>
                        <ScrollView>
                            {info.length > 0 &&
                            info.map((item, index) => {
                                return (
                                    <View key={index} style={[
                                        styleBase.container,
                                        styleBase.row,
                                        styleBase.p_md_horizontal,
                                        styleBase.m_md_vertical
                                    ]}>
                                        <View style={[{flex: .5}, styleBase.center]}>
                                            <Text style={[styleBase.fontBold]}>
                                                {item.label}
                                            </Text>
                                        </View>
                                        <View style={[{flex: .5}, styleBase.center]}>
                                            <Text numberOfLines={1}>
                                                {item.value}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                            }
                        </ScrollView>
                    </AfterInteractions>
                </View>
            </SafeAreaView>
        )
    }
}

ProductDetail.propTypes = {
    item: PropTypes.object
};

export default ProductDetail