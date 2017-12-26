import React from "react";
import {
    FlatList,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert,
    ActivityIndicator
} from "react-native";
import {TextInputNormal, TextInputPriceMask, TextLarge, TextSmall, TextNormal} from '../../../reusable/text';
import styleBase from "../../../style/base";
import styleHome from '../../../style/home';
import styleModalItems from '../../../style/modalItem';
import styleProduct from "../../../style/product";
import {connect} from "react-redux";
import {closePopup} from '../../../../action/popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {numberwithThousandsSeparator} from '../../../reusable/function';
import {createDiscount, upsertDiscount, getDiscount} from '../../../../action/product';


class ChooseProduct extends React.PureComponent {

    addProduct(id) {
        let {productItems} = this.props.instant.state.discountData;
        for (item of productItems) {
            if (id === item._id) {
                productItems.splice(productItems.indexOf(item), 1)
                return true
            }

        }
        productItems.push({_id: id});

    }

    _renderItem = ({item}) => (
        <ProductItem item={item} productDiscount={this.props.instant.state.discountData.productItems}
                     addProduct={(id) => this.addProduct(id)}/>
    );

    render() {
        // console.warn(JSON.stringify(this.props.instant.state.discountData.product))
        return (
            <ScrollView style={{flex: 1}}>
                <View style={[styleHome.paddingModal]}>
                    <TextNormal>
                        Sản phẩm
                    </TextNormal>
                    <View style={[styleHome.modalItem]}>
                        <FlatList
                            data={this.props.productData}
                            extraData={this.state}
                            initialNumToRender={15}
                            keyExtractor={(item) => item._id}
                            renderItem={this._renderItem}
                        />
                    </View>

                </View>
            </ScrollView>
        )
    }
}


class ProductItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isPicked: this.checkIfExistInDiscountProduct(this.props.item._id)
        }
    }

    checkIfExistInDiscountProduct(id) {
        for (item of this.props.productDiscount) {
            if (id === item._id)
                return true
        }
        return false
    }

    render() {
        let item = this.props.item;
        return (
            <TouchableOpacity onPress={() => {
                this.props.addProduct(item._id);
                this.setState({
                    isPicked: !this.state.isPicked
                })
            }}
                              style={[styleHome.borderBottom, styleHome.itemBar, {
                                  flexDirection: 'row',
                                  flex: 1
                              }]}>
                <View style={[styleHome.itemIcon, {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>

                    <TextNormal style={styleBase.background2}>{item.name.substr(0, 2)}</TextNormal>
                </View>
                <View style={[styleHome.boxTitle, styleBase.background4, {flex: 1}]}>
                    <TextSmall style={{flex: 1}}>{item.name}</TextSmall>
                    <View style={[styleBase.center, styleHome.borderRadioButton]}>
                        {
                            this.state.isPicked &&
                            <View style={[styleBase.background2, styleHome.checkedRadioButton]}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapDispatchToProps = {
    closePopup,
    createDiscount,
    upsertDiscount,
    getDiscount
};
const mapStateToProps = (state) => {
    return {
        account: state.account,
        category: state.product.category,
        variantProduct: state.product.variantProduct,
        product: state.product.allProduct
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ChooseProduct);