import React from "react";
import PropTypes from "prop-types";
import {InteractionManager, Text, TextInput, TouchableOpacity, View} from "react-native";
import styleBase from "../../../../../styles/base";
import PriceInput from "./priceInput";
import EStyleSheet from "react-native-extended-stylesheet";
import {connect} from "react-redux";
import {productData} from "../../../../../selector/product";

const customStyles = EStyleSheet.create({
    box: {
        borderWidth: 1,
        borderColor: '#e5e5e5'
    }
})

class OrderProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            currentProduct: null
        }

        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    }

    componentDidMount() {
        this.handleFetchQuantity(this.props);
    }

    handleFetchQuantity (props) {
        try {
            let products = props.productInventory || [];
            let currentItem = props.item;
            let currentProduct = products.find(item => item.product._id === props.item._id);
            if(!!currentProduct) {
                let quantity = currentItem.quantity > currentProduct.quantity ? currentProduct.quantity : currentItem.quantity
                InteractionManager.runAfterInteractions(() => {
                    this.setState({quantity, currentProduct})
                })
            }
        } catch (e) {
            console.warn(e.message);
        }
    }

    handleChangeQuantity (quantity) {
        let currentProduct = this.state.currentProduct;

        if(!!currentProduct) {
            quantity = quantity.match(/\d/gi) || [0];
            quantity = quantity.join('');
            quantity = +quantity > currentProduct.quantity ? currentProduct.quantity : +quantity
            quantity >= 0 &&this.setState({quantity}, () => this.props.onChangeQuantity(quantity, this.props.index))
        }
    }


    render() {
        let {item} = this.props

        return (
            <View style={[styleBase.m_md_vertical,
                customStyles.box, styleBase.m_md_horizontal,
                styleBase.p_md_vertical, styleBase.p_md_horizontal]}>
                <Text style={[styleBase.fontRubik, styleBase.m_md_vertical]}>
                    <Text style={[styleBase.fontBold, styleBase.title]}>
                        TÊN SẢN PHẨM:{`  `}
                    </Text>
                    <Text style={{fontSize: 16}}>
                        {item.name}
                    </Text>
                </Text>
                <View style={[styleBase.row, styleBase.spaceBetween]}>
                    <View style={[styleBase.row, styleBase.alignCenter]}>
                        <Text style={[styleBase.fontRubik, styleBase.fontBold, styleBase.m_sm_right]}>
                            GIÁ NHẬP
                        </Text>
                        <PriceInput onChangePrice={(price) => this.props.onChangePrice(price, this.props.index)}/>
                    </View>
                    <View style={[styleBase.row, styleBase.alignCenter]}>
                        <Text style={[styleBase.fontRubik,
                            styleBase.m_md_right,
                            styleBase.title, styleBase.fontBold]}>
                            SỐ LƯỢNG NHẬP
                        </Text>
                        <QuantityControl quantity={this.state.quantity}
                                         onChangeQuantity={this.handleChangeQuantity}
                                         itemId={item._id}
                                         products={this.props.productInventory}/>
                    </View>
                </View>
            </View>
        )
    }
}

const QuantityControl = (props) => {
    return (
        <View style={[styleBase.row, styleBase.alignCenter]}>
            <TouchableOpacity
                onPress={() => props.onChangeQuantity((+props.quantity - 1).seperateNumber())}
                style={[styleBase.p_md_horizontal,
                styleBase.bgE5, styleBase.m_md_right,
                styleBase.p_md_vertical, styleBase.center]}>
                <Text style={[styleBase.fontRubik, styleBase.title]}>
                    -
                </Text>
            </TouchableOpacity>
            <TextInput style={[styleBase.fontRubik, styleBase.title, {width: 100, textAlign: 'center'}]}
                       onChangeText={props.onChangeQuantity}
                       placeholder="0"
                       value={props.quantity.seperateNumber()}
            />
            <TouchableOpacity
                onPress={() => props.onChangeQuantity((+props.quantity + 1).seperateNumber())}
                style={[styleBase.p_md_horizontal,
                styleBase.bgE5, styleBase.m_md_left,
                styleBase.p_md_vertical, styleBase.center]}>
                <Text  style={[styleBase.fontRubik, styleBase.title]}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
}

OrderProductItem.propTypes = {
    item: PropTypes.object,
    onChangeQuantity: PropTypes.func,
    onChangePrice: PropTypes.func
};

OrderProductItem.defaultProps = {
    item: {},
    onChangeQuantity: () => {},
    onChangePrice: () => {}
};

const mapStateToProps = (state) => {
    return {
        ...productData(state)
    }
}

export default connect(mapStateToProps)(OrderProductItem);