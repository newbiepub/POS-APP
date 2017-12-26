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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {openPopup, renderPopup} from '../../../action/popup';
import ChartPie from '../../chart/chartPie';


class ByProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentWillMount() {
        let transaction = this.props.transaction;
        if (transaction.length > 0) {
            this.getDataByEmployee(transaction)
        }

    }

    async componentWillReceiveProps(nextProps) {

        if (nextProps.hasOwnProperty("transaction")) {
            let transaction = this.props.transaction;
            if (transaction.length > 0) {
                this.getDataByEmployee(transaction)
            }
        }
    }

    getEmployeeName(id) {
        for (item of this.props.employee) {
            if (id === item._id) {
                return item.username
            }

        }
        return ""

    }

    getDataByEmployee(transaction) {

        let data = [];

        for (itemDate of transaction) {
            for (tran of itemDate.data) {
                if (data.length === 0) {
                    data.push({
                        y: tran.totalPrice,
                        x: this.getEmployeeName(tran.employeeId),
                        _id: tran.employeeId
                    })
                } else {
                    for (itemData of data) {
                        if (itemData._id === tran.employeeId) {
                            itemData.y = itemData.y + tran.totalPrice;
                            break;
                        } else {
                            if (data.indexOf(itemData) === data.length - 1) {
                                data.push({
                                    y: tran.totalPrice,
                                    x: this.getEmployeeName(tran.employeeId),
                                    _id: tran.employeeId
                                })
                                break;
                            }
                        }
                    }
                }
            }


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
                <View style={{flex: 1}}>

                    {
                        this.props.loading ?
                            <View style={[styleBase.center, {flex: 1}]}>
                                <ActivityIndicator size={"large"}/>
                            </View> :
                            <ChartPie data={this.state.data}/>

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
        loading: state.transaction.loading,
        employee: state.employeeCompany.data

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(ByProduct);