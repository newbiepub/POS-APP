import React, {PureComponent} from "react";
import {
    Platform,
    StatusBar,
    Animated,
    View,
    ScrollView,
    TouchableOpacity,
    Easing,
    TouchableWithoutFeedback
} from "react-native";
import {TextNormal, TextLarge, TextSmall} from '../../component/text';
import EStyleSheet from "react-native-extended-stylesheet";
import Entypo from 'react-native-vector-icons/Entypo';
import {constantStyle} from '../../style/base';
import {connect} from 'react-redux';
import {clearCart} from './cartAction';
import {numberwithThousandsSeparator} from "../../reuseable/function/function";
import {openPopup} from '../popup/popupAction';
import ViewProduct from '../popup/popupContent/viewProduct';
import CustomAmountView from '../popup/popupContent/customAmountView';
import ChargeView from '../popup/popupContent/chargeView';
import _ from "lodash";

class Cart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clearSalesVisible: false,
            rightSideWidth: 0,
            clearArrow: new Animated.Value(0),
            clearSalesTop: new Animated.Value(0),

        }
    }

    getRightSideWidth(evt) {
        let width = evt.nativeEvent.layout.width;
        this.setState({
            rightSideWidth: width
        })
    }

    onOpenClearButton() {
        this.setState({clearSalesVisible: true});
        Animated.timing(
            this.state.clearArrow,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
        Animated.timing(
            this.state.clearSalesTop,
            {
                toValue: constantStyle.headerHeight,
                duration: 300,
                easing: Easing.linear,
            }
        ).start()
    }

    onCloseClearBottom() {
        this.setState({clearSalesVisible: false});
        Animated.timing(
            this.state.clearArrow,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
        Animated.timing(
            this.state.clearSalesTop,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
            }
        ).start()
    }

    switchClearBottom() {
        if (this.state.clearSalesVisible) {
            this.onCloseClearBottom()
        } else {
            this.onOpenClearButton()
        }
    }

    onCLickItem(item) {
        if (item.customAmount) {
            this.props.openPopup(<CustomAmountView edit={true} item={item}/>);
        } else {
            this.props.openPopup(<ViewProduct edit={true} item={item}/>);
        }
    }

    onCharge() {
        this.props.openPopup(<ChargeView/>)
    }

    render() {
        const spinArrow = this.state.clearArrow.interpolate({
            inputRange: [0, 1],
            outputRange: ['0 deg', '180 deg']
        });
        return (
            <View style={style.container}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.clearCart();
                    this.onCloseClearBottom()
                }} style={{zIndex: 4}}>
                    <Animated.View
                        style={[style.buttonClearCart, {
                            width: this.state.rightSideWidth,
                            top: this.state.clearSalesTop
                        }]}>
                        <TextLarge style={[{color: 'white'}]}>
                            Xoá
                        </TextLarge>
                    </Animated.View>

                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{zIndex: 5}} onPress={() => this.switchClearBottom()}
                                          onLayout={(event) => this.getRightSideWidth(event)}>
                    <View style={style.buttonShopping}>
                        <TextLarge style={[{flex: 1}]}>
                            Đang mua
                        </TextLarge>
                        <Animated.View style={{
                            transform: [{rotate: spinArrow}]
                        }}>
                            <Entypo name="chevron-thin-down" style={[{fontSize: constantStyle.sizeLarge}]}/>
                        </Animated.View>


                    </View>

                </TouchableWithoutFeedback>

                <ScrollView style={{flex: 1, zIndex: 2}}>
                    {
                        this.props.cart.map((item) => {
                            return (
                                <TouchableWithoutFeedback key={item._id} onPress={() => this.onCLickItem(item)}>
                                    <View style={style.cartItem}>
                                        <View style={style.cartItemTitle}>
                                            <TextNormal>{item.name}</TextNormal>
                                            <View style={{flexDirection:'row'}}>
                                                {
                                                    item.quantity > 1 &&
                                                    <TextSmall style={{color: 'gray'}}>x{item.quantity} </TextSmall>
                                                }
                                                <TextSmall> {numberwithThousandsSeparator(item.price.price)}{_.get(this.props.currency, "symbol", "")}</TextSmall>
                                            </View>

                                        </View>
                                        <TextSmall>{numberwithThousandsSeparator(item.totalPrice)}{_.get(this.props.currency, "symbol", "")}</TextSmall>

                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </ScrollView>
                <TouchableWithoutFeedback onPress={() => {
                    if (this.props.cart.length > 0) this.onCharge()
                }}>
                    <View style={style.buttonCharge}>
                        <TextLarge style={style.buttonChargeText}>
                            Thanh toán
                        </TextLarge>

                    </View>
                </TouchableWithoutFeedback>
            </View>

        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyle.colorBackground
    },

    buttonShopping: {
        height: constantStyle.headerHeight,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomColor: constantStyle.colorBorder,
        borderBottomWidth: 1,
        backgroundColor: constantStyle.colorBackground,
        zIndex: 5
    },
    buttonClearCart: {
        paddingHorizontal: 20,
        height: constantStyle.headerHeight,
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 4,
        backgroundColor: "black",
    },
    buttonCharge: {
        height: constantStyle.headerHeight,
        alignItems: "center",
        justifyContent: 'center',
        borderBottomColor: constantStyle.colorBorder,
        borderBottomWidth: 1,
        backgroundColor: constantStyle.color1
    },
    cartItem: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center'
    },
    cartItemTitle: {
        flex: 1,
    },
    buttonChargeText: {
        color: constantStyle.color2
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart,
        currency: state.userReducer.currency
    }
};
const mapDispatchToProps = {
    clearCart,
    openPopup
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
