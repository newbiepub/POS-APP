import React from "react";
import {ScrollView, View, TouchableWithoutFeedback, Dimensions, FlatList} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {addToCart, removeFromCart} from '../../cart/cartAction';
import {closePopup} from '../../popup/popupAction';
import {numberwithThousandsSeparator} from "../../../reuseable/function/function";

class ViewProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
            product: this.props.edit ? this.props.item : {
                _id: this.props.item._id,
                quantity: 1,
                name: this.props.item.name,
                price: this.props.item.price[0].price,
                priceName: this.props.item.price[0].name,
                currency: this.props.item.price[0].currency.name,
                prices: this.props.item.price,
                index: 0,
                unit: this.props.item.unit
            },

        }

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

    onChangePrice(item, index) {
        this.setState({
            product: {
                ...this.state.product,
                price: item.price,
                currency: item.currency.name,
                priceName: item.name,
                index: index,
            },


        })
    }

    changeQuantity(subtend, value) {
        let min = 1, max = 1000;
        if (subtend === "-") {
            if (this.state.product.quantity > min) {
                this.setState({
                    product: {
                        ...this.state.product,
                        quantity: this.state.product.quantity - 1
                    }
                })
            }

        }
        if (subtend === "+") {
            if (this.state.product.quantity < max) {
                this.setState({
                    product: {
                        ...this.state.product,
                        quantity: this.state.product.quantity + 1
                    }
                })
            }


        }
        if (subtend === "set") {
            if (value >= min && value <= max) {
                this.setState({
                    product: {
                        ...this.state.product,
                        quantity: value
                    }
                })
            }


        }
    }

    _renderPrice = ({item, index}) => (
        <TouchableWithoutFeedback onPress={() => this.onChangePrice(item, index)}>
            <View
                style={[style.pricePicker, this.state.product.index === index && {backgroundColor: constantStyle.color1}]}>
                <TextSmall numberOfLines={1}
                           style={[{flex: 1}, this.state.product.index === index && {color: constantStyle.color2}]}>{item.name}</TextSmall>
                <TextSmall
                    style={this.state.product.index === index && {color: constantStyle.color2}}>{numberwithThousandsSeparator(item.price)}{item.currency.name}/{this.state.product.unit}</TextSmall>

            </View>
        </TouchableWithoutFeedback>

    );

    addToCart() {
        this.props.addToCart(this.state.product);
        this.props.closePopup()
    }

    render() {
        let item = this.props.item;

        return (
            <View style={style.container}>
                <PopupHeader
                    title={`${item.name} (${ numberwithThousandsSeparator(this.state.product.price * this.state.product.quantity)}${this.state.product.currency})`}
                    submitFunction={() => {
                        this.addToCart()
                    }}
                    buttonText={this.props.edit ? "Sửa" : "Thêm vào giỏ"}/>
                <ScrollView style={style.body}>
                    <TextNormal style={style.titlePrice}>{item.name} chọn
                        giá:</TextNormal>
                    <FlatList
                        data={this.state.product.prices}
                        numColumns={2}
                        extraData={this.state}
                        keyExtractor={(item) => item.name}
                        renderItem={this._renderPrice}
                    />
                    <TextNormal
                        style={style.titleQuantity}>Chọn số lượng (Trong kho có : ?) </TextNormal>
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
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: constantStyle.paddingHorizontal,
        paddingVertical: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);