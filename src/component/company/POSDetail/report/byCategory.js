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

import {openPopup, renderPopup} from '../../../../action/popup';
import ChartBar from '../../../chart/chartBar';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

class ByCategory extends React.Component {

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
        if (this.props.category.length > 0 && this.props.allProduct.length > 0 && this.props.transaction.length > 0) {
            let transaction = this.props.transaction;
            this.getDataByCategory(transaction)
        }
    }

    async componentWillReceiveProps(nextProps) {


        if (this.props.category.length > 0 && this.props.allProduct.length > 0 && this.props.transaction.length > 0) {
            let transaction = nextProps.transaction;
            this.getDataByCategory(transaction)
        }

    }

    getCategoryId(id) {
        for (item of this.props.allProduct) {
            if (item._id === id) {

                return item.categoryId
            }
        }
        return ''
    }

    getCategoryName(id) {
        for (item of this.props.category) {
            // console.warn(item._id, id)
            if (item._id === id) {

                return item.name
            }
        }
        return ''
    }

    async getDataByCategory(transaction) {
        let data = [];

        for (itemDate of transaction) {
            for (tran of itemDate.data) {
                if (tran.employeeId === this.props.employee._id) {
                    for (product of tran.productItems) {
                        if (data.length === 0) {
                            let categoryId = await this.getCategoryId(product._id);
                            data.push({
                                y: product.totalPrice,
                                x: this.getCategoryName(categoryId),
                                _id: categoryId
                            })
                        } else {
                            for (itemData of data) {
                                if (itemData._id === this.getCategoryId(product._id)) {
                                    itemData.y = itemData.y + product.totalPrice;
                                    break;
                                } else {
                                    if (data.indexOf(itemData) === data.length - 1) {
                                        let categoryId = await this.getCategoryId(product._id);

                                        data.push({
                                            y: product.totalPrice,
                                            x: this.getCategoryName(categoryId),
                                            _id: categoryId
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

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
                            <TextLarge style={[styleBase.color3]}>Theo loại hàng</TextLarge>
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
export default connect(mapStateToProps, mapDispatchToProps)(ByCategory);