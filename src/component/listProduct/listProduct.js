import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    FlatList,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Easing,
    Animated,
    Alert
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {SearchInput, TextSmall, TextNormal} from '../text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import _ from 'lodash';

class ListProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {};
    }

    _renderItem = ({item}) => (
        <View style={style.itemWrapper}>
            <View style={style.item}>
                <View style={style.itemName}>
                    <TextNormal
                        style={[style.itemNameText, {flex: 1}]}>{item.name || item.productName}</TextNormal>
                    <TextNormal numberOfLines={1}
                                style={style.itemNameText}>{item.quantity > 1 && ` x${item.quantity}`}</TextNormal>
                </View>
                <View style={style.itemPrice}>
                    <TextNormal numberOfLines={1}
                                style={style.itemPriceText}>{numberwithThousandsSeparator(item.price.price)} {_.get(item, "price.currency.symbol", "")}</TextNormal>
                </View>
            </View>
            {
                item.discounts && item.discounts.length > 0 &&
                <View style={{marginLeft: constantStyle.headerHeight}}>
                    {
                        item.discounts.map(itemDiscount => {
                            return (
                                <View key={itemDiscount._id} style={style.item}>
                                    <View style={[style.itemPrice,{flex:1}]}>
                                        <TextNormal style={style.itemPriceText}>{itemDiscount.name}</TextNormal>
                                    </View>
                                    <View style={[style.itemName,{flex:0}]}>
                                        <TextNormal style={style.itemNameText}>{itemDiscount.type === "amount" ? `${itemDiscount.value}${_.get(this.props.currency, "symbol", "")}` : `${itemDiscount.value}%`}</TextNormal>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>
            }

        </View>
    );

    getTotalPrice(products) {
        let totalPrice = 0;
        for (items of products) {

            totalPrice += items.totalPrice
        }
        return totalPrice
    }

    render() {
        let data = this.props.data;
        // console.warn(data)
        return (
            <View style={style.container}>
                <FlatList
                    data={data}
                    extraData={this.state}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={style.listItem}
                    renderItem={this._renderItem}
                />

                <View style={[style.item, {marginTop: constantStyle.md}]}>
                    <View style={style.itemName}>
                        <TextNormal
                            style={style.itemNameText}>Tổng:</TextNormal>
                    </View>
                    <View style={style.itemPrice}>
                        <TextNormal
                            style={style.itemPriceText}>{numberwithThousandsSeparator(this.getTotalPrice(data))} {_.get(this.props.currency, "symbol", "")}</TextNormal>
                    </View>
                </View>
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyle.color2,
    },
    listItem: {
        flex: 1
    },
    itemWrapper: {
        marginVertical: constantStyle.marginVerticalSmall
    },
    item: {
        flexDirection: 'row',
    },
    itemName: {
        backgroundColor: constantStyle.color1,
        paddingVertical: constantStyle.paddingVerticalSmall,
        paddingHorizontal: constantStyle.paddingHorizontal,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemNameText: {
        color: constantStyle.color2
    },
    itemPrice: {
        backgroundColor: constantStyle.color2,

        paddingVertical: constantStyle.paddingVerticalSmall,
        paddingHorizontal: constantStyle.paddingHorizontal,
        marginLeft: constantStyle.marginVerticalSmall,
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: constantStyle.colorBorder
    },
    itemPriceText: {
        color: "gray",
        textAlign: "right",
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
export default ListProduct;