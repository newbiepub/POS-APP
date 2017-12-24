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

import {numberwithThousandsSeparator} from "../../reusable/function";
import {VictoryBar, VictoryPie, VictoryChart, VictoryGroup, VictoryTheme, VictoryAxis} from "victory-native";

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
                                    })
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
            widthChart: width * 80 / 100,
            heightChart: height * 90 / 100
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {/*Header*/}

                <View
                    style={[styleHome.header, styleHome.boxPadding]}>

                    <TextLarge style={[styleBase.color3]}>Theo loại hàng</TextLarge>

                </View>
                <View onLayout={(event) => {
                    this.getWidthChart(event)
                }} style={{flex: 1, padding: 15}}>

                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <View>
                                {
                                    this.props.transaction.length > 0 ?
                                        < View>
                                            {
                                                this.state.length < 5 ?
                                                    <View style={{flexDirection: 'row'}}>

                                                        <TextNormal>Tiền</TextNormal>
                                                        <VictoryChart
                                                            theme={VictoryTheme.material}
                                                            width={this.state.widthChart}
                                                            height={this.state.heightChart}
                                                        >
                                                            <VictoryBar
                                                                animate={{
                                                                    duration: 2000,
                                                                    onLoad: {duration: 1000},
                                                                }}
                                                                labels={(d) => `${numberwithThousandsSeparator(d.y)}đ`}
                                                                y={(data) => data.y}
                                                                x={(data) => data.x}
                                                                style={{
                                                                    data: {fill: "#c43a31", width: 50}, labels: {
                                                                        fill: "black",
                                                                        fontSize: 16,
                                                                        lineHeight: 2
                                                                    }
                                                                }}
                                                                data={this.state.data}
                                                            />

                                                        </VictoryChart>

                                                    </View> :
                                                    <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
                                                        <TextNormal>Tiền</TextNormal>
                                                        <VictoryChart
                                                            theme={VictoryTheme.material}
                                                            height={this.state.heightChart}
                                                        >
                                                            <VictoryBar
                                                                animate={{
                                                                    duration: 2000,
                                                                    onLoad: {duration: 1000}
                                                                }}
                                                                labels={(d) => `${numberwithThousandsSeparator(d.y)}đ`}
                                                                y={(data) => data.y}
                                                                x={(data) => data.x}
                                                                style={{
                                                                    data: {fill: "#c43a31", width: 50}, labels: {
                                                                        fill: "black",
                                                                        fontSize: 16,
                                                                        lineHeight: 2
                                                                    }
                                                                }}
                                                                data={this.state.data}
                                                            />

                                                        </VictoryChart>
                                                    </ScrollView>

                                            }
                                            <TextNormal style={{textAlign: 'right'}}>Loại hàng</TextNormal>
                                        </View> :
                                        <View style={[styleBase.center, {flex: 1}]}>
                                            <TextNormal>Không có dữ liệu</TextNormal>
                                        </View>
                                }
                            </View>

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