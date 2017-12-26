import React, {Component} from "react";
import {
    ActivityIndicator,

    ScrollView,
    TouchableOpacity,
    View,

} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../../../reusable/text';
import styleHome from "../../../style/home";
import styleBase from "../../../style/base";
import {connect} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {openPopup, renderPopup} from '../../../../action/popup';
import ChartBar from '../../../chart/chartBar';
import moment from '../../../momentJs'

class ByDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            length: 0,
            data: [],
            widthChart: 0,
            heightChart: 0
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
                if (tran.employeeId === this.props.employee._id) {
                    totalPrice = totalPrice + tran.totalPrice
                }

            }
            if (totalPrice > 0) {
                data.push({
                    y: totalPrice,
                    x: moment(itemDate.title).format(`DD/MM/YYYY `),
                })
            }


        }
        this.setState({
            data: data,
            length: data.length
        })

    }


    getWidthChart(event) {
        var {width, height} = event.nativeEvent.layout;
        this.setState({
            widthChart: width,
            heightChart: height * 90 / 100
        })
    }

    render() {

        return (
            <View style={{flex: 1}}>
                {/*Header*/}

                <View
                    style={[styleHome.header, styleHome.boxPadding]}>
                    <TouchableOpacity
                        onPress={() => this.props.instance.setState({selected: {id: 'main', name: 'Thống kê'}})}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <EvilIcons name="arrow-left"
                                       style={[styleHome.titleBarIconBack]}/>
                            <TextLarge style={[styleBase.color3]}>Theo ngày</TextLarge>
                        </View>

                    </TouchableOpacity>
                </View>
                <View onLayout={(event) => {
                    this.getWidthChart(event)
                }} style={{flex: 1, padding: 15}}>

                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <ChartBar y={"Tiền"} x={"Mặt hàng"} data={this.state.data} yType={"money"}/>

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