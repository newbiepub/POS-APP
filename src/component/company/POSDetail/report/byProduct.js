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

class ByProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            length: 0,
            dataByPrice: [],
            dataByQuantity: [],
            widthChart: 0,
            heightChart: 0,
            criteria: 'Theo số lượng',
            isSelectCriteria: false
        }
    }

    componentWillMount() {
        let transaction = this.props.transaction;
        if (transaction.length > 0) {
            this.getDataByProduct(transaction)
        }

    }

    async componentWillReceiveProps(nextProps) {

        if (nextProps.hasOwnProperty("transaction")) {
            let transaction = this.props.transaction;
            if (transaction.length > 0) {
                this.getDataByProduct(transaction)
            }
        }
    }


    getDataByProduct(transaction) {
        let dataByQuantity = [];
        for (itemDate of transaction) {
            for (tran of itemDate.data) {
                if (tran.employeeId === this.props.employee._id) {
                    for (product of tran.productItems) {
                        if (dataByQuantity.length === 0) {
                            dataByQuantity.push({
                                y: product.quantity,
                                x: product.name,
                                _id: product._id
                            })
                        } else {
                            for (itemData of dataByQuantity) {
                                if (itemData._id === product._id) {
                                    itemData.y = itemData.y + product.quantity;
                                    break;
                                } else {
                                    if (dataByQuantity.indexOf(itemData) === dataByQuantity.length - 1) {
                                        dataByQuantity.push({
                                            y: product.quantity,
                                            x: product.name,
                                            _id: product._id
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
            length: dataByQuantity.length,
            dataByQuantity: dataByQuantity
        });
        let dataByPrice = [];
        for (itemDate of transaction) {
            for (tran of itemDate.data) {
                if (tran.employeeId === this.props.employee._id) {
                    for (product of tran.productItems) {
                        if (dataByPrice.length === 0) {
                            dataByPrice.push({
                                y: product.totalPrice,
                                x: product.name,
                                _id: product._id
                            })
                        } else {
                            for (item of dataByPrice) {
                                if (item._id === product._id) {
                                    item.y = item.y + product.totalPrice;
                                    break;
                                } else {
                                    if (dataByPrice.indexOf(item) === dataByPrice.length - 1) {
                                        dataByPrice.push({
                                            y: product.totalPrice,
                                            x: product.name,
                                            _id: product._id
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
            dataByPrice: dataByPrice
        })


    }

    splitLabel(s) {
        let index = 0
        for (var i = 0, len = s.length; i < len; i++) {
            if (s.charAt(i) === " ") {
                if (index > 7) {
                    s = s.substr(0, i) + '\n' + s.substr(i + 1);
                    i++;
                    index = 0
                }
            }
            index++;
        }
        return s
    }

    getWidthChart(event) {
        var {width, height} = event.nativeEvent.layout;
        this.setState({
           widthChart: width,
            heightChart: height * 85 / 100
        })
    }

    render() {

        return (
            <View style={{flex: 1}}>
                {/*Header*/}

                <View
                    style={[styleHome.header, styleHome.boxPadding, {zIndex: 5}]}>

                    <View
                        style={[styleHome.header]}>
                        <TouchableOpacity
                            onPress={() => this.props.instance.setState({selected: {id: 'main', name: 'Thống kê'}})}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <EvilIcons name="arrow-left"
                                           style={[styleHome.titleBarIconBack]}/>
                                <TextLarge style={[styleBase.color3]}>Theo ngày</TextLarge>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}/>

                    <TouchableOpacity onPress={() => this.setState({isSelectCriteria: !this.state.isSelectCriteria})}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 200,
                            paddingLeft: 10,
                            justifyContent: 'flex-end'
                        }}>
                            <TextNormal style={[styleBase.color3]}>{this.state.criteria}</TextNormal>
                            <EvilIcons name="chevron-down" style={styleBase.vector32}/>
                        </View>
                    </TouchableOpacity>

                    {
                        this.state.isSelectCriteria &&
                        <TouchableOpacity style={{
                            position: 'absolute',
                            right: 0,
                            top: 70,
                            padding: 25,
                            zIndex: 10,
                            paddingLeft: 10,
                            backgroundColor: '#e5e5e5',
                            width: 215,

                        }} onPress={() => {
                            this.state.criteria === "Theo số lượng" ? this.setState({
                                    criteria: "Theo tiền",
                                    isSelectCriteria: false
                                }) :
                                this.setState({
                                    criteria: "Theo số lượng",
                                    isSelectCriteria: false
                                })

                            this.getDataByProduct(this.props.transaction)
                        }}>
                            <View>
                                <TextNormal style={{
                                    backgroundColor: 'transparent',
                                    textAlign: 'right'
                                }}>{this.state.criteria === "Theo số lượng" ? "Theo tiền" : "Theo số lượng"}</TextNormal>
                            </View>
                        </TouchableOpacity>

                    }


                </View>
                <View onLayout={(event) => {
                    this.getWidthChart(event)
                }} style={{flex: 1, padding: 15, zIndex: 1}}>

                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <View style={{flex:1}}>
                                {
                                    this.state.criteria === "Theo số lượng" ?
                                        <ChartBar y={"Số lượng"} x={"Mặt hàng"} data={this.state.dataByQuantity} yType={"quantity"}/> :
                                        <ChartBar y={"Tiền"} x={"Mặt hàng"} data={this.state.dataByPrice} yType={"money"}/>

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
export default connect(mapStateToProps, mapDispatchToProps)(ByProduct);