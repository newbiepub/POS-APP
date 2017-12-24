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
import moment from '../../momentJs'

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
                totalPrice = totalPrice + tran.totalPrice
            }
            data.push({
                y: totalPrice,
                x: moment(itemDate.title).format(`DD/MM/YYYY `),
            })

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

                    <TextLarge style={[styleBase.color3]}>Theo ngày</TextLarge>

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
                                        <View>
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
                                                                    },
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
                                                                    },
                                                                }}
                                                                data={this.state.data}
                                                            />

                                                        </VictoryChart>
                                                    </ScrollView>

                                            }
                                            <TextNormal style={{textAlign: 'right'}}>Ngày</TextNormal>
                                        </View>
                                        :
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
export default connect(mapStateToProps, mapDispatchToProps)(ByDate);