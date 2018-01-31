import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextInputNormal} from '../../component/text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {constantStyle} from '../../style/base';
import {connect} from 'react-redux';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import {addToCart, removeFromCart} from '../../component/cart/cartAction';

class CustomAmount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.edit ? this.props.item : {
                price: 0,
                name: '',
                quantity: 1,
                currency: 'VND',
                customAmount: true

            }

        }

    }

    editItemUpdate() {
        this.props.item.price = this.state.item.price;
        this.props.item.name = this.state.item.name;
    }

    async onAmountChange(num, type) {
        if (type === 'remove') {
            await  this.setState({
                item: {
                    ...this.state.item,
                    price: Math.floor(this.state.item.price / 10)
                }

            })
        }
        if (type === 'add') {
            if (num === "00") {
                await this.setState({
                    item: {
                        ...this.state.item,
                        price: this.state.item.price * 100
                    }

                })
            } else
                await  this.setState({
                    item: {
                        ...this.state.item,
                        price: this.state.item.price * 10 + parseInt(num)
                    }


                })
        }
        if (this.props.edit)
            this.editItemUpdate()
    }

    async onTextChange(text) {
        await this.setState({
            item: {
                ...this.state.item,
                name: text
            }
        });
        if (this.props.edit)
            this.editItemUpdate()
    }

    addToCart() {
        if (this.state.item.price > 0) {
            let item = this.state.item;
            item._id = new Date();
            if (item.name === "")
                item.name = "ghi chú";
            this.props.addToCart(item);
            this.setState({
                item: {
                    price: 0,
                    name: '',
                    quantity: 1,
                    currency: 'VND',
                    customAmount: true

                }
            })
        }

    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.amountHeader}>
                    <View style={{flex: 0.4, paddingHorizontal: 20}}>
                        <TextInputNormal value={this.state.item.name}
                                         multiline={true}
                                         placeholder={"ghi chú"}
                                         onChangeText={(text) => this.onTextChange(text)}/>
                    </View>
                    <View style={{flex: 0.6, paddingHorizontal: 20}}>
                        <TextLarge numberOfLines={1}
                                   style={{textAlign: 'right'}}>{numberwithThousandsSeparator(this.state.item.price)}</TextLarge>
                    </View>
                </View>
                <View style={style.amountKeypad}>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                        <View style={{flex: 3}}>
                            <View
                                style={style.row}>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("1", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>1</TextLarge>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("2", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>2</TextLarge>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("3", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>3</TextLarge>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={style.row}>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("4", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>4</TextLarge>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("5", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>5</TextLarge>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("6", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>6</TextLarge>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={style.row}>
                            <TouchableOpacity style={{flex: 1}} onPress={() => {
                                this.onAmountChange("", 'remove')
                            }}>
                                <View style={style.amountKeyButton}>
                                    <Ionicons name={"md-arrow-back"}
                                              style={{fontSize: constantStyle.sizeNormal}}/>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{flex: 0.5, flexDirection: 'row'}}>
                        <View style={{flex: 3}}>
                            <View
                                style={style.row}>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("7", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>7</TextLarge>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("8", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>8</TextLarge>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("9", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>9</TextLarge>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={style.row}>
                                <TouchableOpacity style={{flex: 2}} onPress={() => {
                                    this.onAmountChange("00", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>00</TextLarge>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.onAmountChange("0", 'add')
                                }}>
                                    <View style={style.amountKeyButton}>
                                        <TextLarge style={{textAlign: 'center'}}>0</TextLarge>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={style.row}>
                            {
                                this.props.edit ?
                                    <TouchableOpacity style={{flex: 1}} onPress={() => {
                                        this.props.removeFromCart(this.state.item._id);
                                        this.props.closePopup()
                                    }}>
                                        <View style={[style.amountKeyButton]}>
                                            <TextLarge style={{textAlign: 'center', color: 'red'}}>-</TextLarge>
                                        </View>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={{flex: 1}} onPress={() => this.addToCart()}>
                                        <View style={[style.amountKeyButton]}>
                                            <TextLarge
                                                style={{textAlign: 'center', color: constantStyle.color1}}>+</TextLarge>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    amountHeader: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        backgroundColor: constantStyle.color2,
    },
    amountKeyButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: constantStyle.colorBorder
    },
    amountKeypad: {
        flex: 0.8,
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        backgroundColor: constantStyle.color2,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapDispatchToProps = {
    addToCart,
    removeFromCart
};
export default connect(null, mapDispatchToProps)(CustomAmount);