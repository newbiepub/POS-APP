import React, {PureComponent} from "react";
import {TextInput, View, TouchableWithoutFeedback, Animated, Dimensions, ScrollView, SectionList} from "react-native";
import {TextLarge, TextNormal, TextInputNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getTransaction} from '../../../action/transaction';
import {openPopup, renderPopup} from '../../../action/popup';
import CreateModifyProductPopup from '../../popup/product/createModifyProduct';
import CreateCategory from '../../popup/product/createCategory';
import {numberwithThousandsSeparator} from '../../reusable/function';
import moment from '../../momentJs';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            transaction: [],
            selectedTransaction: {}
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const transactionChanged = this.state.transaction !== nextState.transaction;
        const selectedTransactionChanged = this.state.selectedTransaction !== nextState.selectedTransaction;
        return transactionChanged || selectedTransactionChanged
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.transaction !== nextProps.transaction) {
            await this.setState({
                transaction: this.sortDataByDate(nextProps.transaction)
            });
            this.setState({
                selectedTransaction: this.state.transaction[0].data[0]
            })
        }
    }

    sortDataByDate(oldTransaction) {
        let newTransaction = [];
        for (var i = 0; i < oldTransaction.length; i++) {
            if (newTransaction.length === 0) {
                newTransaction.push({title: oldTransaction[i].date, data: [oldTransaction[i]]});
            } else {
                for (var j = 0; j < newTransaction.length; j++) {

                    if (moment(oldTransaction[i].date).format("DD/MM/YYYY") === moment(newTransaction[j].title).format("DD/MM/YYYY")) {
                        newTransaction[j].data.push(oldTransaction[i]);
                        break;
                    } else {
                        if (j === newTransaction.length - 1) {
                            newTransaction.push({title: oldTransaction[i].date, data: [oldTransaction[i]]});
                            break;
                        }
                    }
                }
            }

            if (i === oldTransaction.length - 1) {
                return newTransaction
            }
        }
        // return setTimeout(() => {
        //     return newTransaction
        // }, 0)
    }

    async componentWillMount() {
        let {access_token} = this.props.account;
        let a = await this.props.getTransaction(access_token, 10, 0);


    }

    getTitleDate(date) {
        let getDay = () => {
            if (moment(date).format('dddd') === "Monday") {
                return "Thứ hai"
            }
            if (moment(date).format('dddd') === "Tuesday") {
                return "Thứ ba"
            }
            if (moment(date).format('dddd') === "Wednesday") {
                return "Thứ tư"
            }
            if (moment(date).format('dddd') === "Thursday") {
                return "Thứ năm"
            }
            if (moment(date).format('dddd') === "Friday") {
                return "Thứ sáu"
            }
            if (moment(date).format('dddd') === "Saturday") {
                return "Thứ bảy"
            }
            if (moment(date).format('dddd') === "Sunday") {
                return "Chủ nhật"
            }
        };
        return moment(date).format(`[${getDay()},]DD [tháng] 12 [năm] YYYY `)
    }

    getTime(date) {
        let retrunSection = () => {
            if (moment(date).format('a') === 'pm') {
                return 'ch'
            } else {
                return 'sa'
            }
        };
        return moment(date).format(`hh:mm [${retrunSection()}]`)
    }

    previewListItemInTransaction(productItems) {
        let items = "";
        let i = 0;

        for (data of productItems) {
            items = (items !== "" ? items + ", " : "" ) + data.name;
            i++;
            if (i === productItems.length) {
                return items
            }
        }


    }

    _renderListTransactionHeader = ({section}) => (
        <View style={styleHome.listTransactionHeader}
              key={section.title}>
            <TextSmall>{this.getTitleDate(section.title)}</TextSmall>
        </View>
    );
    _renderListTransactionBody = ({item, index}) => (
        <TouchableWithoutFeedback onPress={()=> this.setState({
            selectedTransaction: item
        })}>
            <View
                style={[styleHome.listTransactionItem, this.state.selectedTransaction._id === item._id && styleBase.background2]}
            >

                <Ionicons name={"ios-cash-outline"}
                          style={[styleHome.listTransactionItemIcon, this.state.selectedTransaction._id === item._id && styleBase.color4]}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <TextNormal
                            style={[{flex: 1}, this.state.selectedTransaction._id === item._id && styleBase.color4]}>{numberwithThousandsSeparator(item.totalPrice)}</TextNormal>
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
                    <View>
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
                        <SectionList
                            renderItem={this._renderListTransactionBody}
                            renderSectionHeader={this._renderListTransactionHeader}
                            keyExtractor={(item) => item._id}
                            sections={this.state.transaction}
                        />
                    </View>
                </View>
                {/*----------------rightSide--------------------*/}
                <View style={[{flex: 7}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header, styleHome.boxPadding]}>
                        <TextLarge>
                            {this.state.selectedTransaction.totalPrice}
                        </TextLarge>
                        {/*{*/}
                        {/*this.state.selected.id === 'previewCategory' &&*/}
                        {/*<TouchableWithoutFeedback onPress={() => {*/}
                        {/*this.setState({*/}
                        {/*selected: {id: 'category', name: 'Loại hàng'},*/}
                        {/*})*/}
                        {/*}}>*/}
                        {/*<EvilIcons name="arrow-left"*/}
                        {/*style={[styleHome.titleBarIconBack]}/>*/}
                        {/*</TouchableWithoutFeedback>*/}
                        {/*}*/}
                        {/*<TextLarge style={[styleBase.color3]}>{this.state.selected.name}</TextLarge>*/}
                    </View>

                    <View>

                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        transaction: state.transaction.transaction

    }
};
const mapDispatchToProps = {
    openPopup,
    renderPopup,
    getTransaction
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);