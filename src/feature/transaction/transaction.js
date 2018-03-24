import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    FlatList,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    SectionList
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import Header from '../../component/header';
import {graphql, compose} from 'react-apollo';
import {QUERY} from '../../constant/query';
import {normalizeTransactionSectionList} from '../../reuseable/function/normalizeData';
import NoData from '../../component/noData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from '../../component/moment';
import _ from 'lodash';
import {connect} from 'react-redux';
import ListProduct from '../../component/listProduct/listProduct';
import IssueRefund from '../../component/popup/popupContent/issueRefund';
import {openPopup} from '../../component/popup/popupAction';
import UpdateTransaction from '../../component/popup/popupContent/updateTransaction';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.transactionOptionItems = [
            {name: 'Tất cả giao dịch', id: "allTransaction"},
            {name: 'Công nợ', id: "underpayment"},
            {name: 'Giao dịch hoàn tất', id: "transactionDone"},
            {name: 'Trả hàng', id: "transactionRefund"}
        ];
        let {width, height} = Dimensions.get('window');
        this.state = {
            selectedTransaction: {},
            currentTransactionOption: this.transactionOptionItems[0],
            transactionOptionVisible: false,
        }

    }

    getTitleDate(date) {

        return moment(date).format(`dddd, DD [tháng] MM [năm] YYYY `)
    }

    getTime(date) {
        return moment(date).format(`hh:mm a`)
    }

    _renderItem = ({item, index}) => (
        <TransactionProduct item={item}/>
    );

    getPaymentMethod(item) {
        return item.name
    }

    getPaymentStatus(item) {
        return item.name
    }

    //
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.hasOwnProperty("transaction")) {
    //         if (nextProps.transaction.getTransactionEmployee.length > 0) {
    //             this.setState({
    //                 listTransaction: normalizeTransactionSectionList(this.filterTransaction(nextProps.transaction.getTransactionEmployee))
    //             });
    //             if (!this.state.selectedTransaction._id) {
    //                 this.setState({
    //                     selectedTransaction: nextProps.transaction.getTransactionEmployee[0]
    //                 })
    //             }
    //         }
    //
    //     }
    // }

    _renderListTransactionHeader = ({section}) => (
        <View style={style.listHeader}
              key={section.title}>
            <TextSmall>{this.getTitleDate(section.title)}</TextSmall>
        </View>
    );
    _renderListTransactionBody = ({item, index}) => (
        <TouchableWithoutFeedback onPress={() => this.setState({
            selectedTransaction: item
        })}>
            <View
                style={[style.listItem, this.state.selectedTransaction._id === item._id && style.listItemSelected]}
            >

                <Ionicons name={"ios-cash-outline"}
                          style={[style.listIconCash, this.state.selectedTransaction._id === item._id && style.listTextSelected]}/>
                <View style={style.listContent}>
                    <TextNormal
                        style={[{flex: 1}, this.state.selectedTransaction._id === item._id && style.listTextSelected]}>{numberwithThousandsSeparator(item.totalPrice)}{_.get(this.props.currency, "currency[0].symbol", "")}</TextNormal>
                    <TextSmall
                        style={this.state.selectedTransaction._id === item._id && style.listTextSelected}>{this.getTime(item.createdAt)}</TextSmall>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

    getTotalPaid(paid) {
        let price = 0;
        for (itemsPaid of paid) {
            price = price + itemsPaid.amount;
        }

        return price
    }

    filterTransaction(data) {
        //console.warn(data)
        let result = [];
        if (this.state.currentTransactionOption.id === this.transactionOptionItems[0].id) {
            result = data;
        }
        if (this.state.currentTransactionOption.id === this.transactionOptionItems[1].id) {
            for (items of data) {

                if (this.getTotalPaid(items.paid) < items.totalPrice && items.issueRefund == 'false') {
                    result.push(items);
                }
            }
        }
        if (this.state.currentTransactionOption.id === this.transactionOptionItems[2].id) {
            for (items of data) {
                if (this.getTotalPaid(items.paid) > items.totalPrice && items.issueRefund == 'false') {
                    result.push(items);
                }
            }
        }
        if (this.state.currentTransactionOption.id === this.transactionOptionItems[3].id) {
            for (items of data) {
                if (items.issueRefund == 'true') {
                    result.push(items);
                }
            }
        }

        return result;

    }

    async onChangeTransactionOption(item) {
        await this.setState({
            currentTransactionOption: item,
            transactionOptionVisible: false,
            selectedTransaction: {}
        });

    }

    onUpdateTransaction() {
        if (this.state.selectedTransaction._id)
            this.props.openPopup(<UpdateTransaction transaction={this.state.selectedTransaction}/>)
    }

    render() {
        let currentTransaction = this.state.selectedTransaction;
        let totalPaid = this.state.selectedTransaction._id ? this.getTotalPaid(this.state.selectedTransaction.paid) : 0;
        return (
            <View style={style.container}>
                <Header type={"custom-right"} titleLeft={this.state.currentTransactionOption.name}
                        leftTitlePress={() => {
                            this.setState({transactionOptionVisible: !this.state.transactionOptionVisible})
                        }}>
                    {
                        currentTransaction._id &&
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                this.state.selectedTransaction._id && totalPaid >= this.state.selectedTransaction.totalPrice &&
                                <TouchableWithoutFeedback>
                                    <TextNormal style={style.functionButton}>In hoá đơn</TextNormal>
                                </TouchableWithoutFeedback>
                            }
                            {
                                this.state.selectedTransaction._id && totalPaid < this.state.selectedTransaction.totalPrice &&
                                <TouchableWithoutFeedback onPress={() => this.onUpdateTransaction()}>
                                    <TextNormal style={style.functionButton}>Tiếp tục thanh toán</TextNormal>
                                </TouchableWithoutFeedback>
                            }

                            <View style={{flex: 1}}/>
                            {
                                currentTransaction.issueRefund == "false" &&
                                <TouchableWithoutFeedback onPress={() => this.props.openPopup(<IssueRefund
                                    id={this.state.selectedTransaction._id}
                                    productItems={this.state.selectedTransaction.productItems}/>)}>
                                    <TextNormal style={style.functionButton}>Trả hàng</TextNormal>
                                </TouchableWithoutFeedback>
                            }

                        </View>
                    }

                </Header>
                <View style={style.body}>

                    <View style={style.leftView}>
                        <SectionList
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={this.state.refreshing}
                            //         onRefresh={this._onRefresh.bind(this)}
                            //     />
                            // }
                            renderItem={this._renderListTransactionBody}
                            renderSectionHeader={this._renderListTransactionHeader}
                            keyExtractor={(item) => item._id}
                            // onEndReached={() => {
                            //     this.transactionLoadmore()
                            // }}
                            onEndReachedThreshold={0.1}
                            sections={normalizeTransactionSectionList(this.filterTransaction(this.props.transaction.getTransactionEmployee))}
                            ListEmptyComponent={() => <NoData/>}
                        />
                        {/*menu option */}
                        {
                            this.state.transactionOptionVisible &&
                            <View style={style.transactionOption}>
                                {
                                    this.transactionOptionItems.map((item) => {
                                        if (item.id !== this.state.currentTransactionOption.id) {
                                            return (
                                                <TouchableWithoutFeedback key={item.id}
                                                                          onPress={() => this.onChangeTransactionOption(item)}>
                                                    <TextNormal
                                                        style={style.transactionOptionItems}>{item.name}</TextNormal>
                                                </TouchableWithoutFeedback>
                                            )
                                        }

                                    })
                                }
                            </View>
                        }

                    </View>
                    <View style={style.rightView}>
                        {
                            currentTransaction._id ?
                                <ScrollView style={{padding: constantStyle.xl, flex: 1}}>
                                    <View style={[style.spaceLine]}>
                                        <TextNormal>Ngày giao
                                            dịch: {this.getTitleDate(currentTransaction.date)}</TextNormal>
                                    </View>
                                    <View style={[style.spaceLine]}>
                                        <TextNormal>Hình thức thanh
                                            toán: {this.getPaymentMethod(currentTransaction.paymentMethod)}</TextNormal>
                                    </View>
                                    <View style={[style.spaceLine]}>
                                        <TextNormal>Tình
                                            trạng: {this.getPaymentStatus(currentTransaction.paymentStatus)}</TextNormal>
                                    </View>
                                    {
                                        this.state.selectedTransaction.issueRefund == "true" &&
                                        <View style={[style.spaceLine]}>
                                            <TextNormal>Ngày hoàn
                                                trả: {this.getTitleDate(currentTransaction.refundDate)}</TextNormal>
                                        </View>
                                    }
                                    <View style={[style.spaceLine]}>
                                        <TextNormal style={{textAlign: 'justify'}}>
                                           Lịch sử thanh toán:</TextNormal>
                                        {
                                            this.state.selectedTransaction.paid.map((item,index)=>{
                                                return(
                                                    <View key={index} style={style.transactionPaidItem}>
                                                        <TextNormal style={style.transactionPaidDate}>
                                                            {moment(item.date).format(`DD/MM/YYYY: hh:mm a`)}</TextNormal>
                                                        <TextNormal style={style.transactionPaidIAmount}>{numberwithThousandsSeparator(item.amount)} {_.get(this.props.currency, "currency[0].symbol", "")}</TextNormal>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    {
                                        currentTransaction.customer && (
                                            !!currentTransaction.customer.name ||
                                            !!currentTransaction.customer.email ||
                                            !!currentTransaction.customer.address ||
                                            !!currentTransaction.customer.company ||
                                            !!currentTransaction.customer.phoneNumber
                                        )
                                        &&

                                        <View style={[style.spaceLine]}>
                                            <TextNormal style={{textAlign: 'justify'}}>
                                                Thông tin khách hàng</TextNormal>
                                            {
                                                !!currentTransaction.customer.name &&
                                                <TextNormal
                                                    style={[style.transactionCustomerDetailText, {textAlign: 'justify'}]}>
                                                    Tên khách hàng: {currentTransaction.customer.name}</TextNormal>
                                            }
                                            {
                                                !!currentTransaction.customer.email &&
                                                <TextNormal
                                                    style={[style.transactionCustomerDetailText, {textAlign: 'justify'}]}>
                                                    Email: {currentTransaction.customer.email}</TextNormal>
                                            }
                                            {
                                                !!currentTransaction.customer.address &&
                                                <TextNormal
                                                    style={[style.transactionCustomerDetailText, {textAlign: 'justify'}]}>
                                                    Địa chỉ: {currentTransaction.customer.address}</TextNormal>
                                            }
                                            {
                                                !!currentTransaction.customer.company &&
                                                <TextNormal
                                                    style={[style.transactionCustomerDetailText, {textAlign: 'justify'}]}>
                                                    Công ty: {currentTransaction.customer.company}</TextNormal>
                                            }
                                            {
                                                !!currentTransaction.customer.phoneNumber &&
                                                <TextNormal
                                                    style={[style.transactionCustomerDetailText, {textAlign: 'justify'}]}>
                                                    Số điện
                                                    thoại: {currentTransaction.customer.phoneNumber}</TextNormal>
                                            }

                                        </View>
                                    }
                                    {
                                        !!currentTransaction.description &&
                                        <View style={[style.spaceLine]}>
                                            <TextNormal style={{textAlign: 'justify'}}>Ghi
                                                chú: {currentTransaction.description}</TextNormal>
                                        </View>
                                    }

                                    <View>
                                        <TextNormal>Mặt hàng:</TextNormal>
                                        <ListProduct data={currentTransaction.productItems}/>
                                    </View>


                                </ScrollView> :
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <TextNormal>Hãy chọn giao dịch để hiển thị !</TextNormal>
                                </View>
                        }

                    </View>
                </View>
            </View>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        flexDirection: 'row'
    },
    spaceLine: {
        marginBottom: constantStyle.lg
    },
    leftView: {
        flex: 0.3,
        borderRightWidth: 1,
        borderRightColor: constantStyle.colorBorder,
    },
    rightView: {
        flex: 0.7,
        // borderLeftWidth: 1,
        // borderColor: constantStyle.colorBorder,
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: constantStyle.sm

    },
    listItemSelected: {
        backgroundColor: constantStyle.color1
    },
    listIconCash: {
        fontSize: constantStyle.sizeNormal,
        marginHorizontal: constantStyle.md,
        height: constantStyle.sizeNormal
    },
    listContent: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginRight: constantStyle.md
    },
    listTextSelected: {
        color: constantStyle.color2
    },
    listHeader: {
        backgroundColor: "#e5e5e5",
        paddingVertical: constantStyle.md,
        paddingHorizontal: constantStyle.md

    },
    functionButton: {
        color: constantStyle.color2,
        paddingHorizontal: constantStyle.md,
        paddingVertical: constantStyle.sm
    },
    transactionOption: {
        position: 'absolute',
        right: 0,
        backgroundColor: constantStyle.colorBackground
    },
    transactionOptionItems: {
        paddingVertical: constantStyle.sm,
        paddingHorizontal: constantStyle.md
    },
    transactionCustomerDetailText: {
        paddingLeft:constantStyle.lg
    },
    transactionPaidItem:{
        flexDirection:'row',
        flex:1
    },
    transactionPaidIAmount:{

    },
    transactionPaidDate:{
        flex:1,
        paddingLeft:constantStyle.lg
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapDispatchToProps = {
    openPopup
};
let TransactionApollo = compose(
    graphql(QUERY.TRANSACTION, {name: 'transaction', options: {fetchPolicy: "cache-and-network"}}),
    graphql(QUERY.CURRENCY, {name: 'currency', options: {fetchPolicy: "cache-and-network"}}),
)(Transaction);
export default connect(null, mapDispatchToProps)(TransactionApollo);