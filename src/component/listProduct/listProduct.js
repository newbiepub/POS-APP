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
import {connect} from 'react-redux';
import {QUERY} from '../../constant/query';
import {graphql, compose} from 'react-apollo';
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
                        style={style.itemNameText}>{item.name|| item.productName}{item.quantity > 1 && ` x${item.quantity}`}</TextNormal>
                </View>
                <View style={style.itemPrice}>
                    <TextNormal
                        style={style.itemPriceText}>{numberwithThousandsSeparator(item.totalPrice)} {_.get(item,"price.currency.symbol","")}</TextNormal>
                </View>
            </View>

        </View>
    );
    getTotalPrice(products){
        let totalPrice = 0;
        for(items of products)
        {
            totalPrice += items.totalPrice
        }
        return totalPrice
    }
    render() {
        let data = this.props.data;
        return (
            <View style={style.container}>
                <FlatList
                    data={data}
                    extraData={this.state}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={style.listItem}
                    renderItem={this._renderItem}
                />

                <View style={[style.item,{marginTop:constantStyle.md}]}>
                    <View style={style.itemName}>
                        <TextNormal
                            style={style.itemNameText}>Tổng:</TextNormal>
                    </View>
                    <View style={style.itemPrice}>
                        <TextNormal
                            style={style.itemPriceText}>{numberwithThousandsSeparator(this.getTotalPrice(data))} {_.get(this.props.currency, "currency[0].symbol", "")}</TextNormal>
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
        flexDirection: 'row'
    },
    itemName: {
        backgroundColor: constantStyle.color1,
        paddingVertical: constantStyle.paddingVerticalSmall,
        paddingHorizontal: constantStyle.paddingHorizontal
    },
    itemNameText: {
        color: constantStyle.color2
    },
    itemPrice: {
        backgroundColor: constantStyle.color2,
        flex: 1,
        paddingVertical: constantStyle.paddingVerticalSmall,
        paddingHorizontal: constantStyle.paddingHorizontal,
        marginLeft: constantStyle.marginVerticalSmall,
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: constantStyle.colorBorder
    },
    itemPriceText: {
        color: "gray",
        textAlign: "right",
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
let ListProductApollo = compose(
    graphql(QUERY.CURRENCY, {name: 'currency', options: {fetchPolicy: "cache-and-network"}}),
)(ListProduct);
export default ListProductApollo;