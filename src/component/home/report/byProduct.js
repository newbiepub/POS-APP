import React, {Component} from "react";
import {
    ActivityIndicator,

    ScrollView,

    TouchableOpacity,

    View,

} from "react-native";
import {TextLarge, TextNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {openPopup, renderPopup} from '../../../action/popup';

import {numberwithThousandsSeparator} from "../../reusable/function";
import {VictoryBar, VictoryPie, VictoryChart, VictoryGroup, VictoryTheme, VictoryLabel} from "victory-native";


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
                                    })
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
                                    })
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
            widthChart: width * 80 / 100,
            heightChart: height * 90 / 100
        })
    }

    render() {

        return (
            <View style={{flex: 1}}>
                {/*Header*/}

                <View
                    style={[styleHome.header, styleHome.boxPadding, {zIndex: 5}]}>

                    <TextLarge style={[styleBase.color3, {flex: 1}]}>Theo mặt hàng</TextLarge>
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
                            <View>
                                {
                                    this.props.transaction.length > 0 ?
                                        <View>
                                            {
                                                this.state.length < 3 ?
                                                    <View style={{flexDirection: 'row'}}>
                                                        {
                                                            this.state.criteria === "Theo số lượng" ?
                                                                <View>
                                                                    <TextNormal>Số lượng</TextNormal>

                                                                    <VictoryChart
                                                                        theme={VictoryTheme.material}
                                                                        width={this.state.widthChart}
                                                                        domainPadding={{x: [25, 25]}}
                                                                        height={this.state.heightChart}
                                                                    >
                                                                        <VictoryBar
                                                                            animate={{
                                                                                duration: 2000,
                                                                                onLoad: {duration: 1000}
                                                                            }}
                                                                            labels={(d) => `${d.y}`}
                                                                            // y={(data) => data.y}
                                                                            x={(data) => this.splitLabel(data.x)}
                                                                            style={{
                                                                                data: {fill: "#c43a31", width: 50},
                                                                                labels: {
                                                                                    fill: "black",
                                                                                    fontSize: 16,
                                                                                    lineHeight: 2
                                                                                },
                                                                                x: {textAlign: 'center'}
                                                                            }}
                                                                            data={this.state.dataByQuantity}
                                                                        />

                                                                    </VictoryChart>
                                                                </View> :
                                                                <View>
                                                                    <TextNormal>Tiền</TextNormal>

                                                                    <VictoryChart
                                                                        theme={VictoryTheme.material}
                                                                        width={this.state.width}
                                                                        domainPadding={{x: [25, 25]}}
                                                                        height={this.state.heightChart}
                                                                    >
                                                                        <VictoryBar
                                                                            animate={{
                                                                                duration: 2000,
                                                                                onLoad: {duration: 1000}
                                                                            }}
                                                                            labels={(d) => `${numberwithThousandsSeparator(d.y)}đ`}
                                                                            // y={(data) => data.y}
                                                                            x={(data) => this.splitLabel(data.x)}
                                                                            style={{
                                                                                data: {fill: "#c43a31", width: 50},
                                                                                labels: {
                                                                                    fill: "black",
                                                                                    fontSize: 16,
                                                                                    lineHeight: 2
                                                                                },
                                                                                x: {textAlign: 'center',}
                                                                            }}
                                                                            data={this.state.dataByPrice}
                                                                        />

                                                                    </VictoryChart>
                                                                </View>
                                                        }


                                                    </View> :
                                                    <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
                                                        {
                                                            this.state.criteria === "Theo số lượng" ?
                                                                <View>
                                                                    <TextNormal>Số lượng</TextNormal>

                                                                    <VictoryChart
                                                                        theme={VictoryTheme.material}
                                                                        width={this.state.widthChart* (this.state.length/3) }
                                                                        domainPadding={{x: [25, 25]}}
                                                                        height={this.state.heightChart}
                                                                    >
                                                                        <VictoryBar
                                                                            animate={{
                                                                                duration: 2000,
                                                                                onLoad: {duration: 1000}
                                                                            }}

                                                                            labels={(d) => `${d.y}`}
                                                                            // y={(data) => data.y}
                                                                            x={(data) => this.splitLabel(data.x)}
                                                                            style={{
                                                                                data: {fill: "#c43a31", width: 50},
                                                                                labels: {
                                                                                    fill: "black",
                                                                                    fontSize: 16,
                                                                                    lineHeight: 2
                                                                                }
                                                                            }}
                                                                            data={this.state.dataByQuantity}
                                                                        />

                                                                    </VictoryChart>
                                                                </View> :
                                                                <View>
                                                                    <TextNormal>Tiền</TextNormal>

                                                                    <VictoryChart
                                                                        theme={VictoryTheme.material}
                                                                        width={this.state.widthChart* (this.state.length/3) }
                                                                        domainPadding={{x: [25, 25]}}
                                                                        height={this.state.heightChart}
                                                                    >
                                                                        <VictoryBar
                                                                            animate={{
                                                                                duration: 2000,
                                                                                onLoad: {duration: 1000}
                                                                            }}
                                                                            labels={(d) => `${numberwithThousandsSeparator(d.y)}đ`}
                                                                            // y={(data) => data.y}
                                                                            x={(data) => this.splitLabel(data.x)}
                                                                            style={{
                                                                                data: {fill: "#c43a31", width: 50},
                                                                                labels: {
                                                                                    fill: "black",
                                                                                    fontSize: 16,
                                                                                    lineHeight: 2
                                                                                },
                                                                                x: {textAlign: 'center'}
                                                                            }}
                                                                            data={this.state.dataByPrice}
                                                                        />

                                                                    </VictoryChart>
                                                                </View>

                                                        }


                                                    </ScrollView>

                                            }
                                            <TextNormal style={{textAlign: 'right'}}>Mặt hàng</TextNormal>
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
export default connect(mapStateToProps, mapDispatchToProps)(ByProduct);