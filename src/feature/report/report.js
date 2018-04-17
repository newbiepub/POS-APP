import React from "react";
import {
    ActivityIndicator,
    Text,
    ScrollView,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Alert,
    AsyncStorage
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import Header from '../../component/header';
import _ from "lodash";
import moment from "../../component/moment";
import {normalizeTransactionSectionList} from "../../reuseable/function/normalizeData";
import ChartBar from '../../component/chart/chartBar';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

class Report extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.option = [
            {
                id: 'byTime',
                name: 'Theo thời gian'
            },
            {
                id: 'byProduct',
                name: 'Theo sản phầm'
            },
            {
                id: 'byCategory',
                name: 'Theo loại hàng'
            },

        ];
        this.childOption = [
            {
                id: 'byMoney',
                name: 'Theo số tiền'
            },
            {
                id: 'byQuantity',
                name: 'Theo số lượng'
            },
        ];
        this.timeOption = [
            {
                id: 'today',
                name: "Trong ngày"
            },
            {
                id: 'week',
                name: "Trong tuần"
            },
            {
                id: 'month',
                name: "Trong tháng"
            }
        ];
        this.state = {
            currentOption: this.option[0],
            currentChildOption: this.childOption[0],
            childOptionVisible: false,
            dataByQuantity: [],
            currentTimeOption: this.timeOption[0],
            timeOptionVisible: false
        }
    }

    onItemPress(id) {
        this.setState({
            currentOption: id
        })
    }

    onItemChildPress(id) {
        this.setState({
            currentChildOption: id,
            childOptionVisible: false
        })
    }

    onItemTimePress(id) {
        this.setState({
            currentTimeOption: id,
            timeOptionVisible: false
        })
    }

    // componentWillMount() {
    //     this.getDataByProduct([...this.props.asyncTransaction, ...this.props.transaction]);
    //     // console.warn(this.props.transaction)
    // }


    render() {
        return (
            <View style={style.container}>
                <Header type={"custom-right"} titleLeft={"Thống kê"}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {
                            this.state.currentOption.id === this.option[0].id ?
                                <TouchableWithoutFeedback
                                    onPress={() => this.setState({timeOptionVisible: !this.state.timeOptionVisible})}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: constantStyle.md,
                                            flex: 1
                                        }}>
                                        <TextNormal
                                            style={style.buttonOptionRight}>{this.state.currentTimeOption.name} </TextNormal>
                                        <Entypo name="chevron-thin-down"
                                                style={[{fontSize: constantStyle.md, color: constantStyle.color2}]}/>
                                    </View>
                                </TouchableWithoutFeedback> :
                                <TextNormal style={style.titleRight}>{this.state.currentOption.name}</TextNormal>

                        }

                        <TouchableWithoutFeedback
                            onPress={() => this.setState({childOptionVisible: !this.state.childOptionVisible})}>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: constantStyle.md}}>
                                <TextNormal
                                    style={style.buttonOptionRight}>{this.state.currentChildOption.name} </TextNormal>
                                <Entypo name="chevron-thin-down"
                                        style={[{fontSize: constantStyle.md, color: constantStyle.color2}]}/>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </Header>
                <View style={style.body}>
                    <View style={style.leftView}>
                        <ScrollView>
                            {
                                this.option.map((item) => {
                                    return (
                                        <TouchableWithoutFeedback key={item.id}
                                                                  onPress={() => this.onItemPress(item)}>
                                            <View
                                                style={[style.item, this.state.currentOption.id === item.id && style.itemSelected]}>
                                                <TextNormal
                                                    style={[style.itemText, this.state.currentOption.id === item.id && style.itemTextSelected]}>{item.name}</TextNormal>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={style.rightView}>
                        {
                            this.state.currentOption.id === this.option[0].id &&
                            <ByTime transaction={[...this.props.asyncTransaction, ...this.props.transaction]}
                                    timeOption={this.timeOption} currentTimeOption={this.state.currentTimeOption}
                                    childOption={this.childOption} currentChildOption={this.state.currentChildOption}
                                    currency={this.props.currency}/>
                        }

                        {
                            this.state.currentOption.id === this.option[1].id &&
                            <ByProduct transaction={[...this.props.asyncTransaction, ...this.props.transaction]}
                                       childOption={this.childOption} currentChildOption={this.state.currentChildOption}
                                       currency={this.props.currency}/>
                        }

                        {
                            this.state.timeOptionVisible &&
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                borderWidth: 1,
                                borderColor: constantStyle.colorBorder
                            }}>
                                {
                                    this.timeOption.map((item) => {
                                        if (item.id !== this.state.currentTimeOption.id) {
                                            return (
                                                <TouchableWithoutFeedback key={item.id}
                                                                          onPress={() => this.onItemTimePress(item)}>
                                                    <View
                                                        style={[style.itemChildOption]}>
                                                        <TextNormal
                                                            style={[style.itemText]}>{item.name}</TextNormal>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }

                                    })
                                }
                            </View>
                        }
                        {
                            this.state.childOptionVisible &&
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                borderWidth: 1,
                                borderColor: constantStyle.colorBorder
                            }}>
                                {
                                    this.childOption.map((item) => {
                                        if (item.id !== this.state.currentChildOption.id) {
                                            return (
                                                <TouchableWithoutFeedback key={item.id}
                                                                          onPress={() => this.onItemChildPress(item)}>
                                                    <View
                                                        style={[style.itemChildOption]}>
                                                        <TextNormal
                                                            style={[style.itemText]}>{item.name}</TextNormal>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            )
                                        }

                                    })
                                }
                            </View>
                        }

                    </View>
                </View>
            </View>
        )
    }
}

class ByTime extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            dataToDay: [],
            dataMonth: [],
            dataWeek:[]
        }
    }

    componentWillMount() {
        this.getDataToday(this.props.transaction)
    }

    pushData(dataByQuantity, tran) {
        for (product of tran.productItems) {
            if (dataByQuantity.length === 0) {
                dataByQuantity.push({
                    y: {quantity: product.quantity, money: product.totalPrice},
                    x: product.productName,
                    _id: product.productId
                })
            } else {
                for (itemData of dataByQuantity) {
                    if (itemData._id === product.productId) {
                        itemData.y.quantity += product.quantity;
                        itemData.y.money += product.totalPrice;

                        break;
                    } else {
                        if (dataByQuantity.indexOf(itemData) === dataByQuantity.length - 1) {
                            dataByQuantity.push({
                                y: {quantity: product.quantity, money: product.totalPrice},
                                x: product.productName,
                                _id: product.productId
                            });
                            break;
                        }
                    }
                }
            }
        }
    }

    getDataToday(transaction) {
        let dataToDay = [], dataMonth = [], dataWeek = [];
        for (tran of transaction) {
            if (!tran.issueRefund) {
                if (moment(tran.createdAt).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY"))
                    this.pushData(dataToDay, tran);
                if (moment(tran.createdAt).week() === moment().week() && moment(tran.createdAt).format("YYYY") === moment().format("YYYY"))
                    this.pushData(dataWeek, tran);
                if (moment(tran.createdAt).format("MM/YYYY") === moment().format("MM/YYYY"))
                    this.pushData(dataMonth, tran);
            }


        }
        this.setState({
            dataToDay,
            dataMonth,
            dataWeek
        })
    }

    getData() {
        if (this.props.currentTimeOption.id === this.props.timeOption[0].id) {
            return this.state.dataToDay
        }
        if (this.props.currentTimeOption.id === this.props.timeOption[1].id) {
            return this.state.dataWeek
        }
        if (this.props.currentTimeOption.id === this.props.timeOption[2].id) {
            return this.state.dataMonth
        }
        return []
    }

    render() {
        let type = this.props.currentChildOption.id === this.props.childOption[1].id ? 1 : 0;
        return (
            <View style={style.container}>
                <ChartBar y={type === 1 ? "Số lượng" : this.props.currency.name} x={"Mặt hàng"}
                          data={this.getData()}
                          yType={type === 1 ? "quantity" : "money"}/>

            </View>
        )
    }
}

class ByProduct extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(this.props.transaction),
        }
    }

    getData(transaction) {
        let dataByQuantity = [];
        for (tran of transaction) {
            if (!tran.issueRefund) {
                for (product of tran.productItems) {
                    if (dataByQuantity.length === 0) {
                        dataByQuantity.push({
                            y: {quantity: product.quantity, money: product.totalPrice},
                            x: product.productName,
                            _id: product.productId
                        })
                    } else {
                        for (itemData of dataByQuantity) {
                            if (itemData._id === product.productId) {
                                itemData.y.quantity += product.quantity;
                                itemData.y.money += product.totalPrice;

                                break;
                            } else {
                                if (dataByQuantity.indexOf(itemData) === dataByQuantity.length - 1) {
                                    dataByQuantity.push({
                                        y: {quantity: product.quantity, money: product.totalPrice},
                                        x: product.productName,
                                        _id: product.productId
                                    });
                                    break;
                                }
                            }
                        }
                    }
                }
            }


        }
        return dataByQuantity;
    }

    render() {
        let type = this.props.currentChildOption.id === this.props.childOption[1].id ? 1 : 0;
        return (
            <View style={style.container}>
                <ChartBar y={type === 1 ? "Số lượng" : this.props.currency.name} x={"Mặt hàng"}
                          data={type === 1 ? this.state.data : this.state.data}
                          yType={type === 1 ? "quantity" : "money"}/>

            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        flexDirection: 'row'
    },
    leftView: {
        flex: 0.3,
        borderRightWidth: 1,
        borderRightColor: constantStyle.colorBorder,
    },
    rightView: {
        flex: 0.7,
        backgroundColor: constantStyle.color2
        // borderLeftWidth: 1,
        // borderColor: constantStyle.colorBorder,
    },
    item: {
        width: '100%',
        height: constantStyle.headerHeight,
        padding: constantStyle.md,
        borderBottomColor: constantStyle.colorBorder,
        borderBottomWidth: 1,
    },
    itemSelected: {
        backgroundColor: constantStyle.color1
    },
    itemTextSelected: {
        color: constantStyle.color2
    },
    titleRight: {
        color: constantStyle.color2,
        padding: constantStyle.md,
        flex: 1
    },
    buttonOptionRight: {
        color: constantStyle.color2,
    },
    itemChildOption: {
        padding: constantStyle.md,
        backgroundColor: constantStyle.colorBackground,

    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapStateToProps = (state) => {
    return {
        transaction: state.transactionReducer.transaction,
        asyncTransaction: state.transactionReducer.asyncTransaction,
        currency: state.userReducer.currency
    }
}
export default connect(mapStateToProps, null)(Report);