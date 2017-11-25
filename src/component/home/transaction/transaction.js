import React, {PureComponent} from "react";
import {TextInput, View, TouchableWithoutFeedback, Animated, Dimensions, ScrollView, SectionList} from "react-native";
import {TextLarge, TextNormal, TextInputNormal, TextSmall} from '../../reusable/text';
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {openPopup, renderPopup} from '../../../action/popup';
import CreateModifyProductPopup from '../../popup/product/createModifyProduct';
import CreateCategory from '../../popup/product/createCategory';

class Transaction extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            transaction: [],
            currentView:{},
        }
    }

    async componentWillMount() {
        //console.warn(JSON.stringify(this.props.transaction));
        let oldTransaction = this.props.transaction;
        let newTransaction = [];
        for (var i = 0; i < oldTransaction.length; i++) {
            //console.warn(oldTransaction[i].date)
            if (newTransaction.length === 0) {
                newTransaction.push({title: oldTransaction[i].date, data: [oldTransaction[i]]});

            } else {
                for (var j = 0; j < newTransaction.length; j++) {

                    if (oldTransaction[i].date === newTransaction[j].title) {
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

                await this.setState({
                    transaction: newTransaction
                });
                console.warn(JSON.stringify(this.state.transaction))
            }
        }

    }

    _renderListTransactionHeader = ({section}) => (
        <View style={styleHome.listTransactionHeader}
              key={section.title}>
            <TextNormal>{section.title}</TextNormal>
        </View>
    );
    _renderListTransactionBody = ({item}) => (
        <View style={styleHome.listTransactionItem}>
            <Ionicons name={"ios-cash-outline"} style={[styleHome.listTransactionItemIcon]}/>
            <View style={styleHome.listTransactionItemTitle}>
                <TextNormal>{item.productItems[0].productName}</TextNormal>
            </View>
            <TextSmall>Giờ</TextSmall>
        </View>
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
                            sections={this.state.transaction}
                        />
                    </View>
                </View>
                {/*----------------rightSide--------------------*/}
                <View style={[{flex: 7}]}>
                    {/*Header*/}
                    <View
                        style={[styleHome.header, styleHome.boxPadding]}>

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
    renderPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);