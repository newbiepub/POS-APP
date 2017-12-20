import React, {PureComponent} from "react";
import {
    TextInput,
    View,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,
    ScrollView,
    SectionList,
    ActivityIndicator,
    Alert,
    RefreshControl
} from "react-native";
import {TextLarge, TextNormal, TextInputNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getTransaction, countTransaction, commitPurchase, cleanTransaction} from '../../../action/transaction';
import {openPopup, renderPopup} from '../../../action/popup';
import CreateModifyProductPopup from '../../popup/product/createModifyProduct';
import CreateCategory from '../../popup/product/createCategory';
import {numberwithThousandsSeparator} from '../../reusable/function';
import moment from '../../momentJs';
import IssueRefund from '../../popup/transaction/issueRefund';
import * as Animate from "react-native-animatable";
class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            selectedTransaction: {},
            isLoadmore: false,
            limit: 10,
            refreshing: false,
            currentDiscount: []

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const transactionChanged = this.props.transaction !== nextProps.transaction;
        const selectedTransactionChanged = this.state.selectedTransaction !== nextState.selectedTransaction;
        const loadingChanged = this.state.isLoadmore !== nextState.isLoadmore;
        return transactionChanged || selectedTransactionChanged || loadingChanged
    }


    async transactionLoadmore() {
        let {access_token} = this.props.account;
        if (this.state.isLoadmore === false && this.props.currentNumberOfTransaction < this.props.transactionAmount) {
            this.setState({isLoadmore: true});
            let a = await this.props.getTransaction(access_token, 10, this.props.currentNumberOfTransaction);
            this.setState({isLoadmore: false})
        }

    }

    openIssueRefundPopup() {
        this.props.openPopup();
        this.props.renderPopup(
            <IssueRefund
                transactionId={this.state.selectedTransaction._id}
                refundInfo={this.state.selectedTransaction.hasOwnProperty('issue_refund') ? this.state.selectedTransaction.issue_refund : null}/>
        )
    }


    componentWillReceiveProps(nextProps) {
        if (this.state.selectedTransaction = {} && nextProps.transaction.length > 0) {
            this.setState({
                selectedTransaction: nextProps.transaction[0].data[0],
            })
        }
    }

    onPurchase() {
        let {access_token} = this.props.account;
        Alert.alert(
            'Xác nhận thanh toán',
            'Bán có muốn xác nhận thanh toán giao dịch này không ?',
            [
                {text: 'Không', style: 'cancel'},
                {
                    text: 'OK', onPress: () => {
                    this.props.commitPurchase(access_token, this.state.selectedTransaction._id);

                }
                },
            ],
            {cancelable: true}
        );
    }

    getTitleDate(date) {

        return moment(date).format(`dddd,DD [tháng] 12 [năm] YYYY `)
    }

    getTime(date) {
        return moment(date).format(`hh:mm a`)
    }

    previewListItemInTransaction(productItems) {
        let items = "";
        //let i = 0;

        for (data of productItems) {
            items = (items !== "" ? items + ", " : "" ) + data.name;
            //  i++;
            // if (i === productItems.length) {
            //
            // }
        }

        return items
    }

    _onRefresh() {
        //this.setState({refreshing: true});
        let a = this.props.cleanTransaction();
        let {access_token} = this.props.account;
        let b = this.props.getTransaction(access_token, 10, 0);
        //this.setState({refreshing: false});
    }

    _renderItem = ({item, index}) => (
        <TransactionProduct item={item}/>
    );

    _renderListTransactionHeader = ({section}) => (
        <View style={styleHome.listTransactionHeader}
              key={section.title}>
            <TextSmall>{this.getTitleDate(section.title)}</TextSmall>
        </View>
    );
    _renderListTransactionBody = ({item, index}) => (
        <TouchableWithoutFeedback onPress={() => this.setState({
            selectedTransaction: item
        })}>
            <View
                style={[styleHome.listTransactionItem, this.state.selectedTransaction._id === item._id && styleBase.background2]}
            >

                <Ionicons name={"ios-cash-outline"}
                          style={[styleHome.listTransactionItemIcon, this.state.selectedTransaction._id === item._id && styleBase.color4]}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                        <TextNormal
                            style={[{flex: 1}, this.state.selectedTransaction._id === item._id && styleBase.color4]}>{numberwithThousandsSeparator(item.totalPrice)}đ</TextNormal>
                        <TextSmall
                            style={this.state.selectedTransaction._id === item._id && styleBase.color4}>{this.getTime(item.date)}</TextSmall>
                    </View>
                    <TextSmall
                        numberOfLines={1}
                        style={[styleBase.color6, {flex: 1}]}>{this.previewListItemInTransaction(item.productItems)}</TextSmall>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );

    render() {

        return (
            <View style={[styleBase.container, styleBase.background4, {flexDirection: 'row'}]}>
                {/*----------------leftSide--------------------*/}
                <View style={[styleHome.borderRight, {flex: 3}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header]}>
                        <TouchableWithoutFeedback onPress={() => this.props.openMenu()}>
                            <View style={[styleHome.menuButton]}>
                                <Entypo name="menu" style={[styleBase.vector26, styleBase.color3]}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TextLarge style={[styleBase.color3]}>Giao dịch</TextLarge>
                    </View>
                    {/*content*/}
                    <View style={styleBase.container}>
                        {/*------Search------------*/}

                        <View style={styleHome.itemBar}>
                            <View style={[styleHome.transactionSearch]}>
                                <EvilIcons name="search" style={[styleBase.vector26]}/>
                            </View>
                            <View style={[styleHome.transactionSearchText]}>
                                <TextInput value={this.state.searchText} placeholder={`Tìm kiếm ...`}
                                           onChangeText={(text) => {
                                               this.setState({searchText: text})
                                           }} style={[styleBase.font16, {flex: 1}]}/>
                                {
                                    this.state.searchText !== '' &&
                                    <TouchableWithoutFeedback onPress={() => this.setState({searchText: ''})}>
                                        <EvilIcons name="close" style={[styleBase.vector26]}/>
                                    </TouchableWithoutFeedback>
                                }
                            </View>
                        </View>
                        {
                            this.props.transactionLoading ?
                                <View style={[styleBase.center, {flex: 1}]}>
                                    <ActivityIndicator size={"large"}/>
                                </View> :
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
                                    onEndReached={() => {
                                        this.transactionLoadmore()
                                    }}
                                    onEndReachedThreshold={0.1}
                                    sections={this.props.transaction}
                                    ListEmptyComponent={() => <View style={[styleBase.center, {flex: 1}]}>
                                        <TextNormal>Không có giao dịch</TextNormal>
                                    </View>}
                                />
                        }

                        {
                            this.state.isLoadmore &&
                            <View>
                                <ActivityIndicator size={"large"}/>
                            </View>
                        }

                    </View>
                </View>
                {/*----------------rightSide--------------------*/}
                <View style={[{flex: 7}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header, styleHome.boxPadding]}>
                        {
                            this.state.selectedTransaction.hasOwnProperty("totalPrice") &&
                            <TextLarge>
                                {numberwithThousandsSeparator(this.state.selectedTransaction.totalPrice)}đ
                            </TextLarge>
                        }

                    </View>

                    <View style={{flex: 1}}>
                        {
                            this.state.selectedTransaction.hasOwnProperty("productItems")
                            &&
                            <ScrollView style={styleHome.scrollView}>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        !this.state.selectedTransaction.hasOwnProperty("issue_refund") &&
                                        <TouchableOpacity onPress={() => {
                                            this.openIssueRefundPopup()
                                        }}
                                                          style={[styleHome.transactionButton, this.state.selectedTransaction.paymentStatus !== "Đã Thanh Toán" && {marginRight: 15}]}>
                                            <TextNormal style={[styleBase.color2]}>Hoàn trả</TextNormal>
                                        </TouchableOpacity>
                                    }
                                    {
                                        this.state.selectedTransaction.paymentStatus !== "Đã Thanh Toán" &&
                                        <TouchableOpacity onPress={() => {
                                            this.onPurchase()
                                        }}
                                                          style={[styleHome.transactionButton, !this.state.selectedTransaction.hasOwnProperty("issue_refund") && {marginLeft: 15}]}>
                                            <TextNormal style={[styleBase.color2]}>Xác nhận thanh toán</TextNormal>
                                        </TouchableOpacity>
                                    }
                                </View>

                                <View style={styleHome.modalItem}>
                                    <TextNormal style={styleHome.transactionItemName}>Thông tin</TextNormal>
                                    <View style={styleHome.chargeOption}>
                                        <EvilIcons name={"calendar"} style={[styleHome.listTransactionItemIcon]}/>
                                        <TextSmall
                                            style={styleHome.chargeOptionTitle}>{this.getTitleDate(this.state.selectedTransaction.date) + " " + this.getTime(this.state.selectedTransaction.date)}</TextSmall>
                                    </View>

                                    <View style={styleHome.chargeOption}>
                                        <Ionicons name={"ios-reorder"} style={[styleHome.listTransactionItemIcon]}/>
                                        <TextSmall
                                            style={styleHome.chargeOptionTitle}>Tình
                                            trạng: {this.state.selectedTransaction.paymentStatus}</TextSmall>
                                    </View>

                                    <View style={styleHome.chargeOption}>
                                        <Ionicons name={"ios-barcode-outline"}
                                                  style={[styleHome.listTransactionItemIcon]}/>
                                        <TextSmall style={styleHome.chargeOptionTitle}>Hình thức thanh
                                            toán: {this.state.selectedTransaction.paymentMethod}</TextSmall>
                                    </View>
                                </View>
                                {
                                    this.state.selectedTransaction.hasOwnProperty("issue_refund") &&
                                    <View style={styleHome.modalItem}>
                                        <TextNormal style={styleHome.transactionItemName} l>Hoàn trả</TextNormal>
                                        <View style={styleHome.chargeOption}>
                                            <TextSmall style={styleHome.chargeOptionTitle}>Ngày hoàn
                                                trả: {this.getTitleDate(this.state.selectedTransaction.issue_refund.refundDate) + " " + this.getTime(this.state.selectedTransaction.issue_refund.refundDate)}</TextSmall>
                                        </View>
                                        <View style={styleHome.chargeOption}>
                                            <TextSmall style={styleHome.chargeOptionTitle}>Số tiền hoàn
                                                trả: {numberwithThousandsSeparator(this.state.selectedTransaction.issue_refund.amount)}đ</TextSmall>
                                        </View>
                                        <View style={styleHome.chargeOption}>
                                            <TextSmall style={styleHome.chargeOptionTitle}>Lý
                                                do: {this.state.selectedTransaction.issue_refund.reason[0].name}</TextSmall>
                                        </View>

                                    </View>
                                }

                                <View style={styleHome.modalItem}>
                                    <TextNormal style={styleHome.transactionItemName} l>Hàng</TextNormal>
                                    <FlatList
                                        data={this.state.selectedTransaction.productItems}
                                        extraData={this.state}
                                        initialNumToRender={15}
                                        keyExtractor={(item) => item._id}
                                        renderItem={this._renderItem}
                                    />

                                </View>
                                {
                                    this.state.selectedTransaction.tax > 0 &&
                                    <View style={styleHome.modalItem}>
                                        <TextNormal style={styleHome.transactionItemName}>Thuế</TextNormal>
                                        <View style={[styleHome.itemBar]}>
                                            <View style={[styleHome.itemBarIcon]}>
                                                <Ionicons name={"ios-paper-outline"} style={styleBase.vector26}/>
                                            </View>
                                            <View style={[styleHome.itemBarTitle]}>
                                                <TextSmall style={{flex: 1}}>Thuế</TextSmall>
                                                <TextSmall> {this.state.selectedTransaction.tax}%</TextSmall>
                                            </View>
                                        </View>
                                    </View>
                                }
                                <View style={styleHome.modalItem}>
                                    <TextNormal style={styleHome.transactionItemName}>Tổng</TextNormal>
                                    <View style={[styleHome.itemBar]}>
                                        <View style={[styleHome.itemBarIcon]}>
                                            <Ionicons name={"ios-paper-outline"} style={styleBase.vector26}/>
                                        </View>
                                        <View style={[styleHome.itemBarTitle]}>
                                            <TextSmall style={{flex: 1}}>Tổng tiền</TextSmall>
                                            <TextSmall> {numberwithThousandsSeparator(this.state.selectedTransaction.totalPrice)}đ</TextSmall>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        }

                    </View>
                </View>
            </View>
        )
    }
}

class TransactionProduct extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isViewMore: false
        }
    }

    render() {
        let item = this.props.item;
        return (
            <View style={[styleHome.box]}>
                <TouchableWithoutFeedback onPress={()=> {item.discount.length > 0 && this.setState({isViewMore: !this.state.isViewMore})}}>
                    <View style={[styleHome.itemBar]}>
                        <View style={[styleHome.itemBarIcon]}>
                            <TextNormal style={styleBase.background2}>{item.name.substr(0, 2)}</TextNormal>
                        </View>
                        <View style={[styleHome.itemBarTitle]}>
                            <View style={{flex: 1}}>
                                <TextSmall>{item.name}</TextSmall>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        item.quantity > 1 &&
                                        <TextSmall style={[styleBase.color6]}>x{item.quantity} </TextSmall>
                                    }
                                    {
                                        item.discount.length > 0 &&
                                        <View style={{flexDirection:'row'}}>
                                            <TextSmall>Khuyến mãi:</TextSmall>
                                            {
                                                item.discount.map(discount => {
                                                    return (
                                                        <View key={discount._id} style={{flexDirection: 'row'}}>
                                                            <TextSmall>{discount.name}({discount.value}{discount.type === "percent" ? "%" : "đ"})</TextSmall>
                                                        </View>

                                                    )
                                                })
                                            }
                                        </View>
                                    }
                                </View>
                            </View>
                            <TextSmall> {numberwithThousandsSeparator(item.totalPrice)}đ</TextSmall>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
                {
                    item.discount.length > 0 && this.state.isViewMore &&
                    <Animate.View style={styleHome.transactionDiscountItem} animation={"bounceIn"} duration={750}>
                        <View style={{flexDirection: 'row'}}>
                            <TextSmall style={{flex: 1}}>Giá gốc:</TextSmall>
                            <TextSmall>{numberwithThousandsSeparator(item.price)}đ</TextSmall>
                            {
                                item.quantity > 1 &&
                                <TextSmall style={[styleBase.color6]}> x{item.quantity}</TextSmall>
                            }
                        </View>

                        {
                            item.discount.map(discount => {
                                return (
                                    <View key={discount._id} style={{flexDirection: 'row'}}>
                                        <TextSmall style={{flex: 1}}>Khuyến
                                            mãi:{discount.name}({discount.value}{discount.type === "percent" ? "%" : "đ"})</TextSmall>
                                        <TextSmall>-{discount.type === "percent" ? numberwithThousandsSeparator(Math.floor(item.price * item.quantity * discount.value / 100)) : numberwithThousandsSeparator(discount.value * item.quantity)}đ</TextSmall>
                                    </View>

                                )
                            })
                        }
                    </Animate.View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        transaction: state.transaction.transaction,
        transactionLoading: state.transaction.loading,
        transactionAmount: state.transaction.transactionAmount,
        currentNumberOfTransaction: state.transaction.currentNumberOfTransaction,
    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup,
    getTransaction,
    countTransaction,
    commitPurchase,
    cleanTransaction
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);