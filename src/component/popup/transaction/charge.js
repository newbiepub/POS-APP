import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, ActivityIndicator,} from "react-native";
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
import {createTransaction} from '../../../action/transaction';
import {clearCart} from '../../../action/cart';
class Charge extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            currentView: 'Main',
            width: width * 30 / 100,
            height,
            totalPrice: 0,
            productItems: [],
            inputPrices: 0,
            paymentMethod: this.props.paymentMethod[0],
            paymentStatus: this.props.paymentStatus[0],
            description: '',
            onProgressing: false
        }

    }

    async componentWillMount() {
        let itemInCart = this.state.productItems;
        let totalPrice = 0;
        this.props.cart.forEach(async (item) => {
            await  itemInCart.push({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                unit: item.unit,
            });
            totalPrice += await item.totalPrice;
        });

        setTimeout(() => {
            this.setState({
                totalPrice: totalPrice,
            })
        }, 0)

    }

    async onCharge() {
        this.setState({
            onProgressing: true
        })
        let transaction = {
            productItems: this.state.productItems,
            totalPrice: this.state.totalPrice,
            paymentMethod: this.state.paymentMethod,
            paymentStatus: this.state.paymentStatus,
            description: this.state.description,
            type: 'Thu'
        };
        let {access_token} = this.props.account;
        let result = await this.props.createTransaction(access_token, transaction);
        console.warn(JSON.stringify(result));
        if (result === false) {
            console.warn("loi tao giao dich")
        } else {
            this.closePopup();
            this.props.clearCart();
            console.warn(result._bodyInit)
        }
    }

    closePopup() {
        this.props.closePopup();
    }

    getModalSize(evt) {
        var {width, height} = evt.nativeEvent.layout;
        this.setState({
            width,
            height
        })
    }

    render() {
        return (
            <View onLayout={(event) => {
                this.getModalSize(event)
            }} style={[styleBase.container, styleBase.background4,]}>
                {/*-----------Header_____________------*/}
                <View style={styleHome.modalHeader}>
                    {
                        this.state.currentView === 'Main' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.closePopup()
                        }}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {
                        this.state.currentView !== 'Main' &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({currentView: 'Main'});
                        }}>
                            <View style={[styleHome.menuButton]}>
                                <Ionicons name={"md-arrow-back"} style={[styleBase.vector26]}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    <View style={[{flex: 1}]}>
                        <TextLarge>{numberwithThousandsSeparator(this.state.totalPrice)}đ</TextLarge>
                    </View>
                    {this.state.currentView === 'Main' &&
                    <TouchableWithoutFeedback onPress={() => {
                        this.onCharge()
                    }}>
                        <View style={styleHome.modalButtonSubmit}>

                            <TextLarge style={[styleHome.modalButtonSubmitFont]}>Thanh toán</TextLarge>
                        </View>
                    </TouchableWithoutFeedback>
                    }

                </View>
                {/*content*/}
                <View style={styleHome.chargeContent}>
                    {
                        this.state.currentView === "Main" &&
                        <ChargeOption instant={this}/>
                    }
                    {
                        this.state.currentView === "Cash" &&
                        <AddCash instant={this}/>
                    }
                    {
                        this.state.currentView === "PaymentStatus" &&
                        <PaymentStatus instant={this} paymentStatus={this.props.paymentStatus}/>
                    }

                    {
                        this.state.currentView === "PaymentMethod" &&
                        <PaymentMethod instant={this} paymentMethod={this.props.paymentMethod}/>
                    }

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

class ChargeOption extends React.Component {
    render() {

        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.props.instant.setState({currentView: "Cash"})}>
                    <View style={styleHome.chargeOption}>
                        <Ionicons name={"ios-cash-outline"} style={[styleHome.listTransactionItemIcon]}/>
                        <TextNormal style={styleHome.chargeOptionTitle}>Tiền mặt</TextNormal>
                        <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.instant.setState({currentView: "PaymentStatus"})}>
                    <View style={styleHome.chargeOption}>
                        <Ionicons name={"ios-reorder"} style={[styleHome.listTransactionItemIcon]}/>
                        <TextNormal
                            style={styleHome.chargeOptionTitle}>{this.props.instant.state.paymentStatus}</TextNormal>
                        <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.instant.setState({currentView: "PaymentMethod"})}>
                    <View style={styleHome.chargeOption}>
                        <Ionicons name={"ios-barcode-outline"} style={[styleHome.listTransactionItemIcon]}/>
                        <TextNormal style={styleHome.chargeOptionTitle}>Hình thức thanh
                            toán({this.props.instant.state.paymentMethod})</TextNormal>
                        <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                    </View>
                </TouchableWithoutFeedback>
                <TextInputNormal value={this.props.instant.state.description}
                                 onChangeText={(text) =>
                                     this.props.instant.setState({
                                         description: text
                                     })
                                 }
                                 placeholder={"ghi chú"}
                />

            </View>
        )
    }
}

class AddCash extends React.Component {
    render() {

        return (
            <View>
                <View style={[{flexDirection: "row"}, styleHome.borderBottom]}>
                    <Ionicons name={"ios-cash-outline"} style={[styleHome.listTransactionItemIcon]}/>
                    <TextInputPriceMask
                        style={{flex: 1, paddingHorizontal: 15}}
                        value={this.props.instant.state.inputPrices.toString()}
                        onChangeText={(num) => {
                            this.props.instant.setState({
                                inputPrices: num
                            })
                        }}
                    />
                </View>


            </View>
        )
    }
}

class PaymentStatus extends React.Component {
    render() {

        try {
            var listPaymentStatus = this.props.paymentStatus.map((item, index) => {
                return (
                    <TouchableWithoutFeedback key={index}
                                              onPress={() => this.props.instant.setState({paymentStatus: item})}>
                        <View style={styleHome.chargeOption}>
                            <TextNormal style={styleHome.chargeOptionTitle}>{item}</TextNormal>
                            <View style={[styleBase.center, styleHome.borderRadioButton]}>
                                {
                                    this.props.instant.state.paymentStatus === item &&
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
            <View>
                {listPaymentStatus}
            </View>
        )
    }
}

class PaymentMethod extends React.Component {
    render() {

        try {
            var listPaymentMethod = this.props.paymentMethod.map((item, index) => {
                return (
                    <TouchableWithoutFeedback key={index}
                                              onPress={() => this.props.instant.setState({paymentMethod: item})}>
                        <View style={styleHome.chargeOption}>
                            <TextNormal style={styleHome.chargeOptionTitle}>{item}</TextNormal>
                            <View style={[styleBase.center, styleHome.borderRadioButton]}>
                                {
                                    this.props.instant.state.paymentMethod === item &&
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
            <View>
                {listPaymentMethod}
            </View>
        )
    }
}

const mapDispatchToProps = {
    closePopup,
    createTransaction,
    clearCart
};
const mapStateToProps = (state) => {
    return {
        account: state.account,
        cart: state.cart.currentCart,
        paymentMethod: state.transaction.paymentMethod,
        paymentStatus: state.transaction.paymentStatus,
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Charge);