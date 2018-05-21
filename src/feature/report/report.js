import React from "react";
import PropTypes from "prop-types";
import {View, Text, InteractionManager, TouchableOpacity, FlatList, ScrollView} from "react-native";
import {connect} from 'react-redux'
import {getTransaction, getTransactionAmount} from './reportAction';
import moment from 'moment';
import styleBase from '../../styles/base';
import Entypo from 'react-native-vector-icons/EvilIcons';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.type = [
            {id: "byDate", name: "Theo ngày"},
            {id: "byMonth", name: "Theo tháng"},
            {id: "byYear", name: "Theo năm"}
        ];
        this.state = {
            currentType: this.type[1]
        }
    }

    async componentDidMount() {
        await getTransactionAmount();
        // console.warn(this.props.transactionAmount)
        for (let skip = 0; skip <= this.props.transactionAmount; skip += 10) {
            await getTransaction(10, skip)
        }
    }

    getTime() {
        if (this.state.currentType.id === this.type[0].id) {
            return moment().utc().locale("vi").format(" DD/MM/YYYY")
        }
        if (this.state.currentType.id === this.type[1].id) {
            return moment().utc().locale("vi").format(" MM")
        }
        if (this.state.currentType.id === this.type[2].id) {
            return moment().utc().locale("vi").format(" YYYY")
        }
    }

    getAllPOS() {
        let result = [];
        for (item of this.props.allPOS) {
            result.push({
                _id: item._id,
                profile: item.profile,
                quantity: 0,
                price: 0
            })
        }

        return result;
    }

    getPaid(paid) {
        let result = 0;
        for (itemPaid of paid) {
            result += itemPaid.amount
        }
        return result
    }

    getPrice(tran) {
        let paid = this.getPaid(tran.paid);
        if (paid > tran.totalPrice) {
            return tran.totalPrice
        }
        else {
            return paid
        }
    }

    filter() {
        let result = this.getAllPOS();
        for (itemTran of this.props.transaction) {

            if (this.state.currentType.id === this.type[0].id && moment().utc().locale("vi").format(" DD/MM/YYYY") === moment(itemTran.createdAt).utc().locale("vi").format(" DD/MM/YYYY")) {
                for (itemPOS of result) {
                    if (itemPOS._id === itemTran.employeeId) {

                        itemPOS.quantity += itemTran.totalQuantity;
                        itemPOS.price += this.getPrice(itemTran)
                    }
                }
            }
            if (this.state.currentType.id === this.type[1].id && moment().utc().locale("vi").format(" MM/YYYY") === moment(itemTran.createdAt).utc().locale("vi").format(" MM/YYYY")) {
                for (itemPOS of result) {
                    if (itemPOS._id === itemTran.employeeId) {
                        itemPOS.quantity += itemTran.totalQuantity;
                        itemPOS.price += this.getPrice(itemTran)
                    }
                }

            }
            if (this.state.currentType.id === this.type[1].id && moment().utc().locale("vi").format(" YYYY") === moment(itemTran.createdAt).utc().locale("vi").format(" YYYY")) {
                for (itemPOS of result) {
                    if (itemPOS._id === itemTran.employeeId) {
                        itemPOS.quantity += itemTran.totalQuantity;
                        itemPOS.price += this.getPrice(itemTran)
                    }
                }
            }
        }
        return result;
    }

    _renderItem = ({item}) => {
        return (
            <View style={{padding:10,borderWidth:1,borderColor:'black'}}>
                <View sytle-={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <Text style={[styleBase.fontRubik,styleBase.fontBold]}>Tên Điểm Bán Hàng: </Text>
                    <Text style={[styleBase.fontRubik,{flex:1,textAlign:'right'}]}>{item.profile.name}</Text>
                </View>
                <View sytle-={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <Text style={[styleBase.fontRubik,styleBase.fontBold]}>Tổng Số Lượng Bán: </Text>
                    <Text style={[styleBase.fontRubik,{flex:1,textAlign:'right'}]}>{item.quantity}</Text>
                </View>
                <View sytle-={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                    <Text style={[styleBase.fontRubik,styleBase.fontBold]}>Tổng Doanh Thu: </Text>
                    <Text style={[styleBase.fontRubik,{flex:1,textAlign:'right'}]}>{item.price}</Text>
                </View>
            </View>
        )
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styleBase.title}>
                        {this.state.currentType.name}
                        {this.getTime()}
                    </Text>
                    <Entypo name={"chevron-down"} style={styleBase.fontIcon}/>
                </View>

                <ScrollView>
                    <FlatList
                        data={this.filter()}
                        extraData={this.state}
                        updateCellsBatchingPeriod={10}
                        maxToRenderPerBatch={1}
                        windowSize={400}
                        disableVirtualization={true}
                        removeClippedSubviews={true}
                        initialNumToRender={3}
                        // ListFooterComponent={this._renderFooter}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{paddingHorizontal:10}}
                        renderItem={this._renderItem}
                    />

                </ScrollView>

            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        transactionAmount: state.report.transactionAmount,
        transaction: state.report.transaction,
        allPOS: state.pos.all

    }
}
export default connect(mapStateToProps)(Report);