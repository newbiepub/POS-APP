import React from "react";
import {ScrollView, View, TouchableWithoutFeedback, Dimensions, FlatList} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber, TextInputPriceMask} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {addToCart, removeFromCart} from '../../cart/cartAction';
import {closePopup} from '../../popup/popupAction';
import {numberwithThousandsSeparator} from "../../../reuseable/function/function";
import {graphql} from 'react-apollo';
import {QUERY} from '../../../constant/query';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class ViewProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
            product: this.props.edit ? this.props.item : {
                _id: this.props.item.product._id,
                quantity: this.props.item.quantity > 0 ? 1 : 0,
                name: this.props.item.product.name,
                price: this.props.item.product.price[1],
                priceImport: this.props.item.product.price[0].price,
                prices: this.props.item.product.price,
                unit: this.props.item.product.unit,
                inventoryQuantity: this.props.item.quantity
            },
            otherPrice: 0
        };
        this.state.product.totalPrice = this.computeTotalPrice();

    }

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                width,
                height
            })
        })
    }

    computeTotalPrice() {
        try {
            return !!this.state.otherPrice ? this.state.otherPrice * this.state.product.quantity : this.state.product.price.price * this.state.product.quantity
        } catch (e) {
            return 0
        }

    }

    async onChangePrice(item, index) {
        await this.setState({
            product: {
                ...this.state.product,
                price: item,
            },
        });
        this.updateProduct()
    }

    async changeQuantity(subtend, value) {
        let min = this.state.product.inventoryQuantity > 0 ? 1 : 0, max = this.state.product.inventoryQuantity;
        if (subtend === "-") {
            if (this.state.product.quantity > min) {
                await this.setState({
                    product: {
                        ...this.state.product,
                        quantity: this.state.product.quantity - 1
                    }
                })
            }
        }
        if (subtend === "+") {
            if (this.state.product.quantity < max) {
                await this.setState({
                    product: {
                        ...this.state.product,
                        quantity: this.state.product.quantity + 1
                    }
                })
            }
        }
        if (subtend === "set") {
            if (value >= min && value <= max) {
                await this.setState({
                    product: {
                        ...this.state.product,
                        quantity: value
                    }
                })
            }
        }
        this.updateProduct()
    }

    updateProduct() {
        this.setState({
            product: {
                ...this.state.product,
                totalPrice: this.computeTotalPrice()
            }
        });
    }

    _renderPrice= ({item, index})=> {
        if (index > 0) {

            return (
                <TouchableWithoutFeedback onPress={() => this.onChangePrice(item, index)}>
                    <View
                        style={[style.pricePicker, this.state.product.price._id === item._id && {backgroundColor: constantStyle.color1}]}>
                        <TextSmall numberOfLines={1}
                                   style={[{flex: 1}, this.state.product.price._id === item._id && {color: constantStyle.color2}]}>{item.name}</TextSmall>
                        <TextSmall
                            style={this.state.product.price._id === item._id && {color: constantStyle.color2}}>{numberwithThousandsSeparator(item.price)}{item.currency.symbol}/{this.state.product.unit}</TextSmall>

                    </View>
                </TouchableWithoutFeedback>

            )
        }
    }

    addToCart() {
        // console.warn(this.state.product)
        // if(!!this.state.otherPrice)
        // {
        //     this.state.product.price.
        // }
        this.props.addToCart(this.state.product);
        this.props.closePopup()
    }

    render() {
        // console.warn(this.props.item)
        let item = this.props.edit ? this.props.item : this.props.item.product;
        return (
            <View style={style.container}>
                <PopupHeader
                    title={`${item.name} (${ numberwithThousandsSeparator(this.state.product.totalPrice)}${_.get(this.props.currency, "currency[0].symbol", "")})`}
                    submitFunction={() => {
                        this.addToCart()
                    }}
                    buttonText={this.props.edit ? "Sửa" : "Thêm vào giỏ"}/>
                <ScrollView style={style.body}>
                    <TextNormal style={style.titlePrice}>{item.name} giá:</TextNormal>
                    <FlatList
                        data={this.state.product.prices}
                        numColumns={2}
                        extraData={this.state}
                        keyExtractor={(item) => item.name}
                        renderItem={this._renderPrice}
                    />
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: constantStyle.md}}>
                        <TextNormal>Nhập giá: </TextNormal>
                        <TextInputPriceMask value={this.state.product.price.price} style={{flex: 1}}
                                            onChangeText={async (num) => {
                                                await this.setState({
                                                    product: {
                                                        ...this.state.product,
                                                        price: {
                                                            ...this.state.product.price,
                                                            price: num
                                                        }
                                                    }
                                                });
                                                this.updateProduct()
                                            }}/>
                    </View>

                    <TextNormal
                        style={style.titleQuantity}>Chọn số lượng (Trong kho có
                        : {this.state.product.inventoryQuantity} {this.state.product.unit}) </TextNormal>
                    <View style={style.boxQuantity}>
                        <TouchableWithoutFeedback onPress={() => this.changeQuantity("-")}>
                            <View style={style.subtend}>
                                <TextLarge>-</TextLarge>
                            </View>
                        </TouchableWithoutFeedback>
                        <TextInputNumber
                            minValue={1}
                            value={this.state.product.quantity}
                            onChangeText={(num) => this.changeQuantity("set", num)}
                            style={style.inputQuantity}/>
                        <TouchableWithoutFeedback onPress={() => this.changeQuantity("+")}>
                            <View style={style.subtend}>
                                <TextLarge>+</TextLarge>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {
                        this.props.edit &&
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.removeFromCart(this.state.product._id);
                            this.props.closePopup()
                        }}>
                            <View>
                                <TextNormal style={style.buttonDelete}>Xoá</TextNormal>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    <KeyboardSpacer/>
                </ScrollView>
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        padding: constantStyle.headerHeight
    },
    titlePrice: {
        marginBottom: constantStyle.paddingHorizontal
    },
    pricePicker: {
        borderWidth: 1,
        flex: 1,
        margin: constantStyle.sm,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: constantStyle.paddingHorizontal,
        paddingVertical: constantStyle.sm,
        borderColor: constantStyle.colorBorder
    },
    boxQuantity: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        height: constantStyle.headerHeight
    },
    subtend: {
        height: constantStyle.headerHeight,
        width: constantStyle.headerHeight,
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleQuantity: {
        marginTop: constantStyle.headerHeight,
        marginBottom: constantStyle.paddingHorizontal
    },
    inputQuantity: {
        marginHorizontal: constantStyle.paddingHorizontal,
        textAlign: "center",
        flex: 1
    },
    buttonDelete: {
        marginTop: constantStyle.headerHeight,
        paddingVertical: constantStyle.paddingHorizontal,
        textAlign: 'center',
        backgroundColor: 'red',
        color: constantStyle.color2

    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapStateToProps = (state) => {
    return {
        popup: state.popupReducer
    }
};
const mapDispatchToProps = {
    addToCart,
    removeFromCart,
    closePopup
};
let ViewProductApollo = graphql(QUERY.CURRENCY, {
    name: 'currency', options: {
        fetchPolicy: "cache-and-network"
    }
})(ViewProduct);
export default connect(mapStateToProps, mapDispatchToProps)(ViewProductApollo);