import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    SectionList,
    InteractionManager
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import Header from '../../component/header';
import {normalizeTransactionSectionList} from '../../reuseable/function/normalizeData';
import NoData from '../../component/noData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from '../../component/moment';
import _ from 'lodash';
import {connect} from 'react-redux';
import ListProduct from '../../component/listProduct/listProduct';
import IssueRefund from '../../component/popup/popupContent/issueRefund';
import PrintInvoice from '../../component/popup/popupContent/printInvoice';
import {openPopup} from '../../component/popup/popupAction';
import UpdateTransaction from '../../component/popup/popupContent/updateTransaction';
import {getTransactionAmount, getTransaction, selectTransaction} from './transactionAction';

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
            skip: 0,
            refreshing: false,
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

    async componentDidMount() {
        await this.props.getTransactionAmount();
        // this.initData()
        await this.props.getTransaction(10, this.state.skip);
    }

    initData() {
        InteractionManager.runAfterInteractions(async () => {
            for (let i = 0; i <= this.props.transactionAmount; i += 10) {
                await this.props.getTransaction(10, i);
            }

        });
    }

    async loadMore() {
        if (this.props.transaction.length < this.props.transactionAmount) {
            await this.setState({
                skip: this.state.skip + 10
            });
            await this.props.getTransaction(10, this.state.skip);
        }

    }

    _renderListTransactionHeader = ({section}) => (
        <View style={style.listHeader}
              key={section.title}>
            <TextSmall>{this.getTitleDate(section.title)}</TextSmall>
        </View>
    );
    _renderListTransactionBody = ({item, index}) => (
        <TouchableWithoutFeedback key={item._id} onPress={() => {
            this.props.selectTransaction(item)
        }}>
            <View
                style={[style.listItem, this.props.currentTransaction._id === item._id && style.listItemSelected]}
            >

                <Ionicons name={"ios-cash-outline"}
                          style={[style.listIconCash, this.props.currentTransaction._id === item._id && style.listTextSelected]}/>
                <View style={style.listContent}>
                    <TextNormal
                        style={[{flex: 1}, this.props.currentTransaction._id === item._id && style.listTextSelected]}>{numberwithThousandsSeparator(item.totalPrice)}{_.get(this.props.currency, "symbol", "")}</TextNormal>
                    <TextSmall
                        style={this.props.currentTransaction._id === item._id && style.listTextSelected}>{this.getTime(item.createdAt)}</TextSmall>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

    getTotalPaid(paid) {
        let price = 0;
        for (itemsPaid of paid) {
            price += (+itemsPaid.amount);
        }
        return price
    }

    filterTransaction(data) {
        //console.warn(data)
        try {
            let result = [];
            if (this.state.currentTransactionOption.id === this.transactionOptionItems[0].id) {
                result = data;
            }
            if (this.state.currentTransactionOption.id === this.transactionOptionItems[1].id) {
                for (items of data) {
                    if (items && items.paid)
                        if (this.getTotalPaid(items.paid) < items.totalPrice && items.issueRefund === false) {
                            result.push(items);
                        }
                }
            }
            if (this.state.currentTransactionOption.id === this.transactionOptionItems[2].id) {
                for (items of data) {

                    if (items && items.paid) {
                        if (this.getTotalPaid(items.paid) > items.totalPrice && items.issueRefund === false) {
                            result.push(items);
                        }
                    }
                }
            }
            if (this.state.currentTransactionOption.id === this.transactionOptionItems[3].id) {
                for (items of data) {
                    if (items && items.issueRefund)
                        if (items.issueRefund === true) {
                            result.push(items);
                        }
                }
            }

            return result;

        } catch (e) {
            console.warn("transaction.js-filterTransaction-" + e);
            return []
        }


    }

    async onChangeTransactionOption(item) {
        await this.setState({
            currentTransactionOption: item,
            transactionOptionVisible: false,
            selectedTransaction: {}
        });

    }

    onUpdateTransaction() {
        if (this.props.currentTransaction._id)
            this.props.openPopup(<UpdateTransaction transaction={this.props.currentTransaction}/>)
    }

    async _onRefresh() {
        await this.setState({
            refreshing: true,
            skip: 0
        });
        // await this.initData();
        await this.props.getTransaction(10, this.state.skip);
        this.setState({
            refreshing: false,
        })

    }

    render() {
        let currentTransaction = this.props.currentTransaction;
        let totalPaid = currentTransaction._id ? this.getTotalPaid(currentTransaction.paid) : 0;
        console.warn(this.props.transaction);
        return (
            <View style={style.container}>
                <Header type={"custom-right"} titleLeft={this.state.currentTransactionOption.name}
                        leftTitlePress={() => {
                            this.setState({transactionOptionVisible: !this.state.transactionOptionVisible})
                        }}>
                    {
                        currentTransaction._id && currentTransaction.issueRefund === false &&
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                currentTransaction._id && totalPaid >= currentTransaction.totalPrice &&
                                <TouchableWithoutFeedback onPress={() => this.props.openPopup(<PrintInvoice
                                    transaction={currentTransaction}/>)}>
                                    <TextNormal style={style.functionButton}>In hoá đơn</TextNormal>
                                </TouchableWithoutFeedback>
                            }
                            {
                                currentTransaction._id && totalPaid < currentTransaction.totalPrice &&
                                <TouchableWithoutFeedback onPress={() => this.onUpdateTransaction()}>
                                    <TextNormal style={style.functionButton}>Tiếp tục thanh toán</TextNormal>
                                </TouchableWithoutFeedback>
                            }

                            <View style={{flex: 1}}/>
                            {
                                currentTransaction.issueRefund === false &&
                                <TouchableWithoutFeedback onPress={() => this.props.openPopup(<IssueRefund
                                    transaction={currentTransaction}/>)}>
                                    <TextNormal style={style.functionButton}>Trả hàng</TextNormal>
                                </TouchableWithoutFeedback>
                            }

                        </View>
                    }

                </Header>
                <View style={style.body}>

                    <View style={style.leftView}>
                        <SectionList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            renderItem={this._renderListTransactionBody}
                            renderSectionHeader={this._renderListTransactionHeader}
                            keyExtractor={(item) => item._id}
                            onEndReached={async () => {
                                await this.loadMore()
                            }}
                            onEndReachedThreshold={0.1}
                            sections={normalizeTransactionSectionList(this.filterTransaction([...this.props.asyncTransaction, ...this.props.transaction]))}
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
                                        currentTransaction.issueRefund === true &&
                                        <View>
                                            <View style={[style.spaceLine]}>
                                                <TextNormal>Ngày hoàn
                                                    trả: {this.getTitleDate(currentTransaction.refundDate)}</TextNormal>
                                            </View>
                                            <View style={[style.spaceLine]}>
                                                <TextNormal>Lý do
                                                    trả: {currentTransaction.issueRefundReason}</TextNormal>
                                            </View>
                                        </View>
                                    }
                                    <View style={[style.spaceLine]}>
                                        <TextNormal style={{textAlign: 'justify'}}>
                                            Tiền nhận:</TextNormal>
                                        {
                                            currentTransaction.paid.map((item, index) => {
                                                return (
                                                    <View key={index} style={style.transactionPaidItem}>
                                                        <TextNormal style={style.transactionPaidDate}>
                                                            {moment(item.date).format(`DD/MM/YYYY: hh:mm a`)}</TextNormal>
                                                        <TextNormal
                                                            style={style.transactionPaidIAmount}>{numberwithThousandsSeparator(item.amount)} {_.get(this.props.currency, "symbol", "")}</TextNormal>
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
                                                !!currentTransaction.customer.phone &&
                                                <TextNormal
                                                    style={[style.transactionCustomerDetailText, {textAlign: 'justify'}]}>
                                                    Số điện
                                                    thoại: {currentTransaction.customer.phone}</TextNormal>
                                            }
                                            {
                                                !!currentTransaction.customer.description &&
                                                <TextNormal
                                                    style={[style.transactionCustomerDetailText, {textAlign: 'justify'}]}>
                                                    Ghi chú: {currentTransaction.customer.description}</TextNormal>
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

                                    <View style={{height: constantStyle.xl * 2}}/>
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
        backgroundColor: constantStyle.color2
        // borderLeftWidth: 1,
        // borderColor: constantStyle.colorBorder,
    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: constantStyle.sm,
        backgroundColor: constantStyle.color2

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
        paddingLeft: constantStyle.lg
    },
    transactionPaidItem: {
        flexDirection: 'row',
        flex: 1
    },
    transactionPaidIAmount: {},
    transactionPaidDate: {
        flex: 1,
        paddingLeft: constantStyle.lg
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapStateToProps = (state) => {
    return {
        transactionAmount: state.transactionReducer.transactionAmount,
        currency: state.userReducer.currency,
        transaction: state.transactionReducer.transaction,
        asyncTransaction: state.transactionReducer.asyncTransaction,
        currentTransaction: state.transactionReducer.currentTransaction
    }
}
const mapDispatchToProps = {
    openPopup,
    getTransactionAmount,
    getTransaction,
    selectTransaction
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);