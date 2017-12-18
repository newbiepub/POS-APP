import React from "react";
import {Text, View, TouchableWithoutFeedback,} from "react-native";
import styleBase from "../../style/base";
import styleHome from "../../style/home";
import style from '../../style/POS';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {numberwithThousandsSeparator} from '../../reusable/function';
import {TextInputNormal} from '../../reusable/text';
import {connect} from "react-redux";
import {addToCart, removeCart} from '../../../action/cart';
import {closePopup} from '../../../action/popup';
import {size} from "../../style/product";

class CustomAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.hasOwnProperty("existData") ? this.props.existData.name : '',
            customAmount: this.props.hasOwnProperty("existData") ? this.props.existData.price : 0
        }

    }

    async changeCustomAmount(number) {
        if (number === 11) {
            await this.setState({
                customAmount: Math.floor(this.state.customAmount / 10)
            })
        }

        if (number === 100) {
            await this.setState({
                customAmount: this.state.customAmount * 100
            })
        }
        if (number >= 0 && number <= 9) {
            await  this.setState({
                customAmount: this.state.customAmount * 10 + number
            })
        }

        if (this.props.hasOwnProperty("existData")) {
            this.props.instance.setState({
                currentPrice:{
                    ...this.props.instance.state.currentPrice,
                    price: this.state.customAmount
                }
            })


        }

    }

    addToCart() {
        this.props.addToCart({
            productCharge: {
                _id: new Date(),
                name: this.state.title !== "" ? this.state.title : "ghi chú",
                price: this.state.customAmount,
                unit: 'cái',
            },
            quantity: 1,
            customAmount: true,
            totalPrice: this.state.customAmount
        });
        this.setState(
            {
                customAmount: 0,
                title: ''
            }
        )
    }


    render() {
        return (
            <View style={[styleHome.container, styleBase.background4]}>
                <View style={[{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                }, styleHome.box, style.paddingContent]}>
                    <View style={{flex: 4, paddingHorizontal: 10}}>
                        <TextInputNormal placeholder={"ghi chú"}
                                         value={this.state.title}
                                         onChangeText={(text) => {
                                             this.setState({title: text});
                                             if (this.props.hasOwnProperty("existData")) {
                                                 this.props.instance.setState({
                                                     currentPrice:{
                                                         ...this.props.instance.state.currentPrice,
                                                         name: text
                                                     }
                                                 })
                                             }
                                         }}
                                         multiline={true}
                                         style={{justifyContent: 'center'}}
                        />
                    </View>
                    <View style={[{
                        flex: 6,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }, style.paddingContent]}>

                        <Text numberOfLines={1}
                              style={[styleBase.font32, this.state.customAmount === 0 && style.colorWhenNull]}>{numberwithThousandsSeparator(this.state.customAmount)}</Text>
                        <Text style={[styleBase.font32, this.state.customAmount === 0 && style.colorWhenNull]}>đ</Text>
                    </View>
                </View>

                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <View style={[{flex: 1, flexDirection: 'row'}]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(1)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>1</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(2)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>2</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(3)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>3</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[{flex: 1, flexDirection: 'row'},]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(4)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>4</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(5)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>5</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(6)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>6</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                        this.state.customAmount > 0 && this.changeCustomAmount(11)
                    }}>
                        <View style={[{flex: 1}, styleHome.box, styleBase.center]}>
                            <Ionicons name={"md-arrow-back"}
                                      style={[styleBase.font32, this.state.customAmount == 0 && style.colorWhenNull]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                        <View style={[{flex: 1, flexDirection: 'row'}]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(7)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>7</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(8)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>8</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(9)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>9</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[{flex: 1, flexDirection: 'row'},]}>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(100)}>
                                <View
                                    style={[{flex: 2,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>00</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.changeCustomAmount(0)}>
                                <View
                                    style={[{flex: 1,}, styleHome.box, styleBase.center]}>
                                    <Text style={styleBase.font32}>0</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    {
                        this.props.hasOwnProperty("existData") ?
                            <TouchableWithoutFeedback onPress={() => {
                                this.props.removeCart(this.props.existData._id);
                                this.props.closePopup()
                            }}>
                                <View style={[{flex: 1}, styleHome.box, styleBase.center]}>
                                    <Text style={[styleBase.font32, {color: 'red'}]}> - </Text>
                                </View>
                            </TouchableWithoutFeedback> :
                            <TouchableWithoutFeedback
                                onPress={() => this.state.customAmount !== 0 && this.addToCart()}>
                                <View style={[{flex: 1}, styleHome.box, styleBase.center]}>
                                    <Text style={[styleBase.font32, styleBase.color2]}> + </Text>
                                </View>
                            </TouchableWithoutFeedback>
                    }

                </View>
            </View>
        )
    }
}

const mapDispatchToProps = {
    addToCart,
    removeCart,
    closePopup
}
export default connect(null, mapDispatchToProps)(CustomAmount);