import React, {Component} from "react";
import {
    ActivityIndicator,

    ScrollView,

    View,

} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';

import {openPopup, renderPopup} from '../../../action/popup';

import moment from '../../momentJs'
import ChartBar from '../../chart/chartBar';

class ByDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentWillMount() {

        let transaction = this.props.transaction;
        if (transaction.length > 0) {
            this.getDataByDate(transaction)
        }

    }

    async componentWillReceiveProps(nextProps) {

        let transaction = this.props.transaction;
        if (transaction.length > 0) {
            this.getDataByDate(transaction)
        }
    }

    getDataByDate(transaction) {
        let data = [];

        for (itemDate of transaction) {
            var totalPrice = 0;
            for (tran of itemDate.data) {
                totalPrice = totalPrice + tran.totalPrice
            }
            data.push({
                y: totalPrice,
                x: moment(itemDate.title).format(`DD/MM/YYYY `),
            })

        }
        this.setState({
            data: data,
        })

    }


    render() {

        return (
            <View style={{flex: 1}}>
                {/*Header*/}

                <View
                    style={[styleHome.header, styleHome.boxPadding]}>

                    <TextLarge style={[styleBase.color3]}>Theo ngày</TextLarge>

                </View>
                <View style={{flex:1}}>

                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <ChartBar y={"Tiền"} x={"Mặt hàng"} data={this.state.data} length={this.state.length} yType={"money"}/>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        allProduct: state.product.allProduct,
        category: state.product.category,
        transaction: state.transaction.transaction,
        loading: state.transaction.loading

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(ByDate);