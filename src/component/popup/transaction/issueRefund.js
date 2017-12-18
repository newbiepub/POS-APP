import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Alert, ActivityIndicator,} from "react-native";
import {TextInputNormal, TextLarge, TextInputPriceMask, TextNormal} from '../../reusable/text';
import styleBase from "../../style/base";
import styleHome from '../../style/home';
import {numberwithThousandsSeparator} from '../../reusable/function';
import styleProduct from "../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import PriceGrid from '../../home/product/price/priceGrid';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {issueRefund} from '../../../action/transaction';
import {clearCart} from '../../../action/cart';

class Charge extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width: width * 30 / 100,
            height,
            amount: this.props.refundInfo !== null ? this.props.refundInfo.amount : 0,
            reason: '',
            onProgressing: false,
            listReason: ["Hoàn tiền", "Đổi hàng", "Thanh toán nhầm"]
        }

    }

    getModalSize(evt) {
        var {width, height} = evt.nativeEvent.layout;
        this.setState({
            width,
            height
        })
    }

    async onRefund() {
        try {
            if (!this.state.onProgressing) {
                this.setState({
                    onProgressing: true
                });
                let {access_token} = this.props.account;
                let a = await this.props.issueRefund(access_token,
                    {
                        _id: this.props.transactionId,
                        issue_refund: {
                            amount: this.state.amount,
                            reason: [{name: this.state.reason}]
                        }

                    });
                if (a.status < 400) {
                    Alert.alert(
                        'Thành công',
                        'Bạn đã hoàn trả thành công !',
                        [
                            {text: 'OK', onPress: () => this.props.closePopup()},
                        ],
                        {cancelable: false}
                    );

                }
                else
                    Alert.alert("Thất bại", "Đã có lỗi xảy ra !!");
                this.setState({
                    onProgressing: false
                });
            }

        } catch (e) {
            console.warn(e)
        }
    }

    askForRefund() {
        Alert.alert(
            'Hoàn trả',
            'Bạn có muốn thực hiện hoàn trả này không ?',
            [
                {text: 'Không'},
                {text: 'OK', onPress: () => this.onRefund()},
            ],
            {cancelable: true}
        );
    }

    render() {
        try {
            var listReason = this.state.listReason.map((item) => {
                return (
                    <TouchableWithoutFeedback key={item}
                                              onPress={() => this.setState({reason: item})}>
                        <View style={styleHome.chargeOption}>
                            <TextNormal style={styleHome.chargeOptionTitle}>{item}</TextNormal>
                            <View style={[styleBase.center, styleHome.borderRadioButton]}>
                                {
                                    this.state.reason === item &&
                                    <View style={[styleBase.background2, styleHome.checkedRadioButton]}/>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }
        catch (e) {
            return <View></View>
        }
        return (
            <View onLayout={(event) => {
                this.getModalSize(event)
            }} style={[styleBase.container, styleBase.background4,]}>
                {/*-----------Header_____________------*/}
                <View style={styleHome.modalHeader}>

                    <TouchableWithoutFeedback onPress={() => {
                        this.props.closePopup()
                    }}>
                        <View style={[styleHome.menuButton]}>
                            <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={[{flex: 1}]}>
                        <TextLarge>Hoàn trả</TextLarge>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        this.askForRefund()
                    }}>
                        <View style={styleHome.modalButtonSubmit}>

                            <TextLarge style={[styleHome.modalButtonSubmitFont]}>Hoàn
                                trả {numberwithThousandsSeparator(this.state.amount)}đ</TextLarge>
                        </View>
                    </TouchableWithoutFeedback>


                </View>
                {/*content*/}
                <View style={styleHome.paddingModal}>
                    <TextLarge style={styleHome.transactionItemName}>Tiền hoàn lại</TextLarge>
                    <TextInputPriceMask
                        value={this.state.amount.toString()}
                        onChangeText={(num) => {
                            this.setState({
                                amount: num
                            })
                        }}
                        placeholder={"Tiền hoàn lại"}
                    />
                    <TextLarge style={[styleHome.transactionItemName, styleHome.modalItem]}>Lý do:</TextLarge>
                    {listReason}
                    <TextInputNormal
                        onChangeText={(text) => {
                            this.setState({
                                reason: text
                            })
                        }}
                        placeholder={"lý do khác"}
                        defaultValue={this.props.refundInfo !== null ? this.props.refundInfo.reason[0].name : ""}
                    />
                </View>
                {
                    this.state.onProgressing &&
                    <View style={{
                        position: 'absolute',
                        width: this.state.width,
                        height: this.state.height,
                        backgroundColor: 'rgba(1,1,1,0.1)'
                    }}>
                        <View style={[styleBase.center, {flex: 1}]}>
                            <ActivityIndicator size={"large"}/>
                        </View>
                    </View>
                }

            </View>
        )
    }
}


const mapDispatchToProps = {
    closePopup,
    issueRefund
};
const mapStateToProps = (state) => {
    return {
        account: state.account,
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Charge);