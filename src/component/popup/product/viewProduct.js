import React from "react";
import {ScrollView, View, Dimensions, TouchableWithoutFeedback, Text, TextInput,} from "react-native";
import {TextInputNormal, TextLarge, TextSmall, TextNormal, TextInputNumber} from '../../reusable/text';

import styleBase from "../../style/base";
import styleHome from '../../style/home';
import styleModalItems from '../../style/modalItem';

import {connect} from "react-redux";
import {closePopup} from '../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addToCart} from '../../../action/cart';
import {numberwithThousandsSeparator} from '../../reusable/function';

class ViewItem extends React.Component {
    constructor(props) {
        super(props);
        var {width, height} = Dimensions.get('window');
        this.state = {
            currentPrice: this.props.productData.price,
            currentName: this.props.productData.name,
            itemQuatity: 1,
            note: ""
        };
    }

    getVariantProduct(product, allVariant) {
        product = [product];
        allVariant.forEach(async (item) => {
            if (product[0]._id === item.productVariantParent) {
                await product.push(item);
            }
        });
        return product;
    }

    componentWillMount() {
        this.setState({
            product: this.getVariantProduct(this.props.productData, this.props.variant)
        })

    }

    async addToCart() {
        let a = await  this.props.addToCart({
            name: this.state.currentName,
            price: this.state.currentPrice,
            quatity: this.state.itemQuatity,
            totalPrice: this.state.currentPrice * this.state.itemQuatity
        });
        this.closePopup()
    }

    closePopup() {
        this.props.closePopup();
    }


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
                        <TextLarge>{this.state.currentName || ""}</TextLarge>
                        <TextLarge>  {numberwithThousandsSeparator(this.state.currentPrice * this.state.itemQuatity) || ""}
                            đ</TextLarge>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        this.addToCart()
                    }}>
                        <View
                            style={styleHome.modalButtonSubmit}>

                            <TextLarge style={styleHome.modalButtonSubmitFont}>Thêm vào giỏ</TextLarge>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styleHome.paddingModal, {flex: 1}]}>
                    {/*-----------------List---------------------------*/}
                    <ListPrice productData={this.state.product} instant={this} {...this.state}/>


                    {/*-----------------Note and Quatity---------------------------*/}
                    <TextNormal style={[styleModalItems.marginVertical, styleModalItems.modalItem]}>GHI CHÚ VÀ SỐ
                        LƯỢNG</TextNormal>
                    <TextInputNormal placeholder={"Ghi chú"} value={this.state.note}
                                     onChangeText={(text) => this.setState({note: text})}
                                     style={styleModalItems.marginVertical}/>
                    <View style={[styleModalItems.marginVertical, {flexDirection: 'row'}]}>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({itemQuatity: this.state.itemQuatity > 1 ? this.state.itemQuatity - 1 : 1})}>
                            <View style={[styleHome.boxPadding, styleHome.box]}>
                                <TextLarge>-</TextLarge>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[styleBase.center, {flex: 1}]}>
                            <TextInputNumber value={this.state.itemQuatity.toString()}
                                             style={{textAlign: 'center', width: 100}}
                                             placeholder={this.state.itemQuatity.toString()} onChangeText={(text) => {

                                this.setState({itemQuatity: text > 0 ? text : 1})
                            }}/>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({itemQuatity: this.state.itemQuatity + 1})}>
                            <View style={[styleHome.boxPadding, styleHome.box]}>
                                <TextLarge>+</TextLarge>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>


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

    changeType(name, price) {
        this.props.instant.setState({
            currentPrice: price,
            currentName: name
        });

    }

    render() {
        let margin = 20;
        let priceItemWidth = (this.state.width - 20) / 2;
        try {
            var listPrice = this.props.productData.map((data) => {
                return (
                    <TouchableWithoutFeedback key={data._id} onPress={() => this.changeType(data.name, data.price)}>
                        <View
                            style={[styleHome.box, styleHome.boxPadding, styleModalItems.marginVertical, styleModalItems.choosePriceItem, {
                                flexDirection: 'row',
                                width: priceItemWidth
                            }, this.props.productData.indexOf(data) % 2 === 0 && {marginRight: margin}, this.props.instant.state.currentName === data.name && styleBase.background3]}>
                            <TextSmall numberOfLines={2}
                                       style={[styleBase.bold, this.props.instant.state.currentName === data.name && styleBase.color4, {flex: 1}]}>{data.name}</TextSmall>
                            <TextSmall numberOfLines={2}
                                       style={this.props.instant.state.currentName === data.name && styleBase.color4}>{numberwithThousandsSeparator(data.price)}đ</TextSmall>
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
                        style={[styleBase.bold]}>{this.props.instant.state.currentName.toUpperCase()}</TextNormal>
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
    addToCart
};
const mapStateToProps = (state) => {
    return {
        account: state.account,
        variant: state.product.variantProduct
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewItem);