import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, FlatList,} from "react-native";
import {TextInputNormal, TextLarge, TextSmall, TextNormal, TextInputNumber} from '../../reusable/text';

import styleBase from "../../style/base";
import styleHome from '../../style/home';
import styleModalItems from '../../style/modalItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCart, removeCart} from '../../../action/cart';
import {numberwithThousandsSeparator} from '../../reusable/function';
import CustomAmount from '../../home/POS/customAmount';

class ViewItem extends React.Component {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            currentPrice: this.props.hasOwnProperty("existData") ? this.props.existData.productCharge : this.props.productData.allPrices[0],
            productInfo: this.props.hasOwnProperty("existData") ? this.props.existData.productInfo : this.props.productData,
            itemQuantity: this.props.hasOwnProperty("existData") ? this.props.existData.quantity : 1,
            discount: [],
            discountAmount: 0,
            discountPercent: 0,
            note: ""
        };
    }


    componentWillMount() {
        if (!this.props.hasOwnProperty("customAmount")) {
            let product = this.state.productInfo;
            let discount = this.state.discount;
            for (itemDiscount of this.props.discount) {

                for (discountProduct of itemDiscount.productItems) {
                    if (product._id === discountProduct._id) {
                        if (itemDiscount.type === 'percent') {
                            this.setState({
                                discountPercent: this.state.discountPercent + itemDiscount.value
                            })
                        }
                        if (itemDiscount.type === 'amount') {
                            this.setState({
                                discountAmount: this.state.discountAmount + itemDiscount.value
                            })
                        }
                        discount.push({
                            _id: itemDiscount._id,
                            name: itemDiscount.name,
                            value: itemDiscount.value,
                            type: itemDiscount.type
                        });
                        break;
                    }
                }
            }
        }


    }

    getCashDiscount(amount, percent, price) {
        return Math.floor((price * percent) / 100 - amount);
    }

    async addToCart() {
        let a = await  this.props.addToCart({
            productCharge: this.state.currentPrice,
            quantity: this.state.itemQuantity,
            discount: this.state.discount,
            totalPrice: (this.state.currentPrice.price - this.getCashDiscount(this.state.discountAmount, this.state.discountPercent, this.state.currentPrice.price)) * this.state.itemQuantity,
            productInfo: this.state.productInfo

        });
        this.closePopup()
    }

    removeItemInCart(id) {

        this.props.removeCart(id);
        this.closePopup()
    }

    async adjustItemInCart() {
        let a = await  this.props.addToCart({
            oldId: this.props.existData.productCharge._id,
            productCharge: this.state.currentPrice,
            quantity: this.state.itemQuantity,
            discount: this.state.discount,
            totalPrice: (this.state.currentPrice.price - this.getCashDiscount(this.state.discountAmount, this.state.discountPercent, this.state.currentPrice.price)) * this.state.itemQuantity,
            productInfo: this.state.productInfo

        });
        this.closePopup()
    }

    async adjustCustomAmountInCart() {
        let a = await  this.props.addToCart({
            productCharge: {
                _id: this.props.existData.productCharge._id,
                name: this.state.currentPrice.name !== "" ? this.state.currentPrice.name : "ghi chú",
                price: this.state.currentPrice.price,
                unit: 'cái',
            },
            quantity: 1,
            customAmount: true,
            totalPrice: this.state.currentPrice.price
        });
        this.closePopup()
    }

    closePopup() {
        this.props.closePopup();
    }

    _renderDiscount = ({item, index}) =>
        <View style={[styleHome.itemBar]}>
            <View style={[styleHome.itemBarIcon]}>
                <Ionicons name={"ios-pricetags-outline"} style={styleBase.vector18}/>
            </View>
            <View style={[styleHome.itemBarTitle]}>
                <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                <TextSmall> {item.value}{item.type === 'percent' ? "%" : "đ"}</TextSmall>
            </View>
        </View>

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4,]}>
                {/*-----------------------Header_____________------*/}
                <View style={styleHome.modalHeader}>

                    <TouchableWithoutFeedback onPress={() => {
                        this.closePopup()
                    }}>
                        <View style={[styleHome.menuButton]}>
                            <Ionicons name={"md-close"} style={[styleBase.vector26]}/>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={[{flex: 1, flexDirection: 'row'}]}>
                        <TextLarge>{this.state.currentPrice.name || ""}</TextLarge>
                        <TextLarge>  {numberwithThousandsSeparator((this.state.currentPrice.price - this.getCashDiscount(this.state.discountAmount, this.state.discountPercent, this.state.currentPrice.price)) * this.state.itemQuantity) || ""}
                            đ</TextLarge>
                    </View>
                    {
                        this.props.hasOwnProperty("existData") ?
                            (
                                this.props.existData.hasOwnProperty("customAmount") ?
                                    <TouchableWithoutFeedback onPress={() => {
                                        this.adjustCustomAmountInCart()
                                    }}>
                                        <View
                                            style={styleHome.modalButtonSubmit}>

                                            <TextLarge style={styleHome.modalButtonSubmitFont}>Sửa</TextLarge>
                                        </View>
                                    </TouchableWithoutFeedback> :
                                    <TouchableWithoutFeedback onPress={() => {
                                        this.adjustItemInCart()
                                    }}>
                                        <View
                                            style={styleHome.modalButtonSubmit}>

                                            <TextLarge style={styleHome.modalButtonSubmitFont}>Sửa</TextLarge>
                                        </View>
                                    </TouchableWithoutFeedback>
                            )
                            :
                            <TouchableWithoutFeedback onPress={() => {
                                this.addToCart()
                            }}>
                                <View
                                    style={styleHome.modalButtonSubmit}>

                                    <TextLarge style={styleHome.modalButtonSubmitFont}>Thêm vào giỏ</TextLarge>
                                </View>
                            </TouchableWithoutFeedback>
                    }

                </View>
                {this.props.hasOwnProperty("customAmount") ?
                    <CustomAmount existData={{
                        _id: this.props.existData.productCharge._id,
                        name: this.state.currentPrice.name,
                        price: this.state.currentPrice.price
                    }} adjustCustomAmount={(data) => console.warn(JSON.stringify(data))} instance={this}/>
                    :
                    <ScrollView>

                        <View style={[styleHome.paddingModal, {flex: 1}]}>
                            {/*-----------------List---------------------------*/}
                            <ListPrice productListPrice={this.state.productInfo.allPrices}
                                       instant={this} {...this.state}/>


                            {/*-----------------Note and Quantity---------------------------*/}
                            <TextNormal style={[styleModalItems.marginVertical, styleModalItems.modalItem]}>GHI CHÚ
                                VÀ
                                SỐ
                                LƯỢNG</TextNormal>
                            <TextInputNormal placeholder={"Ghi chú"} value={this.state.note}
                                             onChangeText={(text) => this.setState({note: text})}
                                             style={styleModalItems.marginVertical}/>
                            <View style={[styleModalItems.marginVertical, {flexDirection: 'row'}]}>
                                <TouchableWithoutFeedback
                                    onPress={() => this.setState({itemQuantity: this.state.itemQuantity > 1 ? this.state.itemQuantity - 1 : 1})}>
                                    <View style={[styleHome.boxPadding, styleHome.box]}>
                                        <TextLarge>-</TextLarge>
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={[styleBase.center, {flex: 1}]}>
                                    <TextInputNumber value={this.state.itemQuantity.toString()}
                                                     style={{textAlign: 'center', width: 100}}
                                                     placeholder={this.state.itemQuantity.toString()}
                                                     onChangeText={(text) => {

                                                         this.setState({itemQuantity: text > 0 ? text : 1})
                                                     }}/>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => this.setState({itemQuantity: this.state.itemQuantity + 1})}>
                                    <View style={[styleHome.boxPadding, styleHome.box]}>
                                        <TextLarge>+</TextLarge>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            {
                                this.state.discount.length > 0 &&
                                <View>
                                    <TextNormal style={[styleModalItems.marginVertical, styleModalItems.modalItem]}>KHUYẾN
                                        MÃI</TextNormal>
                                    <FlatList
                                        data={this.state.discount}
                                        extraData={this.state}
                                        initialNumToRender={15}
                                        keyExtractor={(item) => item._id}
                                        renderItem={this._renderDiscount}
                                    />
                                </View>
                            }


                            {
                                this.props.hasOwnProperty("existData") &&
                                <TouchableWithoutFeedback onPress={() => {
                                    this.removeItemInCart(this.props.existData.productCharge._id)
                                }}>
                                    <View style={styleHome.buttonDelete}>
                                        <TextNormal style={styleBase.color4}>Xoá</TextNormal>
                                    </View>
                                </TouchableWithoutFeedback>

                            }
                        </View>

                    </ScrollView>

                }


            </View>
        )
    }
}

class ListPrice extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
        }
    }

    measureView(event) {
        this.setState({
            width: event.nativeEvent.layout.width
        })
    }

    changeType(data) {
        this.props.instant.setState({
            currentPrice: data
        });

    }

    render() {
        let margin = 20;
        let priceItemWidth = (this.state.width - 20) / 2;
        try {
            var listPrice = this.props.productListPrice.map((data) => {
                return (
                    <TouchableWithoutFeedback key={data._id}
                                              onPress={() => this.changeType(data)}>
                        <View
                            style={[styleHome.box, styleHome.boxPadding, styleModalItems.marginVertical, styleModalItems.choosePriceItem, {
                                flexDirection: 'row',
                                width: priceItemWidth
                            }, this.props.productListPrice.indexOf(data) % 2 === 0 && {marginRight: margin}, this.props.instant.state.currentPrice._id === data._id && styleBase.background3]}>
                            <TextSmall numberOfLines={2}
                                       style={[styleBase.bold, this.props.instant.state.currentPrice._id === data._id && styleBase.color4, {flex: 1}]}>{data.name}</TextSmall>
                            <TextSmall numberOfLines={2}
                                       style={this.props.instant.state.currentPrice._id === data._id && styleBase.color4}>{numberwithThousandsSeparator(data.price)}đ/{data.unit}</TextSmall>
                        </View>
                    </TouchableWithoutFeedback>
                )

            })
        }
        catch
            (e) {
            console.warn(e);
            return <View></View>
        }
        return (
            <View>
                <View onLayout={(event) => {
                    this.measureView(event)
                }} style={{flexDirection: 'row'}}>
                    <TextNormal
                        style={[styleBase.bold]}>{this.props.instant.state.currentPrice.name.toUpperCase()}</TextNormal>
                    <TextNormal> CHỌN GIÁ</TextNormal>
                </View>
                <View style={[styleModalItems.marginVertical, {flexDirection: 'row', flexWrap: "wrap"}]}>
                    {
                        this.state.width !== 0 &&
                        listPrice
                    }
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = {
    closePopup,
    addToCart,
    removeCart
};
const mapStateToProps = (state) => {
    return {
        account: state.account,
        discount: state.product.discount
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);