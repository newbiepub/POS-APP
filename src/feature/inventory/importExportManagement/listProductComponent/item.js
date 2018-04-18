import React from "react";
import PropTypes from "prop-types";
import {View, TextInput, Text, TouchableOpacity, InteractionManager} from "react-native";
import styleBase from "../../../../styles/base";

class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceImport: 0,
            priceSale: 0,
            quantity: 0
        }

        this.handleChangePrice    = this.handleChangePrice.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.handleSubmitRatio    = this.handleSubmitRatio.bind(this);
    }

    /**
     * Component life cycle
     */

    componentDidMount () {
        this.handleGetPrice(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.handleGetPrice(nextProps)
    }

    /**
     * handler
     */

    handleGetPrice (props) {
        let { product = {}, quantity = 0 } = props.item || {};
        let price = product.price.find(price => price.name === 'import') || {};
        let priceSale = product.price.find(price => price.name === 'default') || {};
        InteractionManager.runAfterInteractions(() => {
            this.setState(state => {
                state.priceImport = price.price;
                state.priceSale = priceSale.price;
                state.quantity = quantity;
                return state;
            })
        })
    }

    handleChangePrice (price) {
        price = price || '0';
        price = price.match(/\d/gi).join('') || 0;
        this.setState({priceSale: +price});
    }

    handleChangeQuantity (qty) {
        let {quantity = 0} = this.props.item;
        // Check quantity input is lower than quantity of inventory
        if(qty < quantity)
           this.setState({quantity: qty});
    }

    handleSubmitRatio (ratio) {
        InteractionManager.runAfterInteractions(() => {
            this.setState(state => {
                state.priceSale = state.priceImport + (state.priceImport * ratio / 100);
                return state;
            })
        })
    }

    /**
     * renderer
     * @returns {XML}
     */

    render() {
        let {item = {}} = this.props;
        let { product = {} } = item;
        let { priceSale, priceImport, quantity } = this.state;

        return (
            <View style={[{height: 200},
                styleBase.m_md_vertical,
                styleBase.shadowBox,
                styleBase.m_md_horizontal]}>
                <View style={[styleBase.p_md_vertical, styleBase.column, styleBase.p_md_horizontal]}>
                    <RatioSale onSubmitRatio={this.handleSubmitRatio}/>
                    <View style={[styleBase.row, styleBase.spaceBetween]}>
                        <View style={[styleBase.column]}>
                            <ProductInfo label="TÊN HÀNG" value={product.name}/>
                            <ProductInfo label="SỐ LƯỢNG TRONG KHO"
                                         value={!item.quantity ? 'HẾT HÀNG' : item.quantity}/>
                            <ProductInfo label="GIÁ NHẬP VÀO"
                                         value={`${priceImport.seperateNumber()} VND`}/>
                        </View>
                        <View style={[styleBase.column]}>
                            <InputGroup label="SỐ LƯỢNG XUẤT"
                                        onChangeText={this.handleChangeQuantity}
                                        value={quantity.seperateNumber()}
                                        placeholder="0"/>
                            <View style={[styleBase.row]}>
                                <InputGroup label="GIÁ BÁN"
                                            renderCustom={(
                                                <Text style={[styleBase.fontRubik,
                                                    styleBase.text4,
                                                    styleBase.normalText]}>
                                                    VND
                                                </Text>
                                            )}
                                            onChangeText={this.handleChangePrice}
                                            value={priceSale.seperateNumber()}
                                            placeholder="0"/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class RatioSale extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChangeRatio = this.handleChangeRatio.bind(this);
        this.handleSubmitRatio = this.handleSubmitRatio.bind(this);
    }

    state = {
        ratio: 0
    }

    static propTypes = {
        onSubmitRatio: PropTypes.func
    }

    static defaultProps = {
        onSubmitRatio: () => {}
    }

    /**
     * Handler
     * @param ratio
     */
    handleChangeRatio(ratio) {
        ratio = ratio.match(/\d/gi) || [0];
        ratio = ratio.join('');
        this.setState({ratio: +ratio})
    }

    handleSubmitRatio() {
        this.props.onSubmitRatio(this.state.ratio);
    }

    /**
     * Renderer
     * @returns {XML}
     */

    render () {
        return (
            <View style={[styleBase.row,
                {width: 160, borderWidth: 1, borderColor: "#e5e5e5"}]}>
                <TextInput
                    style={[styleBase.p_md_horizontal]}
                    onChangeText={this.handleChangeRatio}
                    value={`${this.state.ratio}%`}
                    placeholder="% GIÁ NHẬP"/>
                <TouchableOpacity
                    onPress={this.handleSubmitRatio}
                    style={[styleBase.p_md_horizontal,
                    styleBase.bgE5,
                    styleBase.row,
                    styleBase.p_md_vertical]}>
                    <Text style={[styleBase.fontRubik, styleBase.text4, styleBase.normalText]}>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const InputGroup = (props) => {
    return (
        <View style={[styleBase.row, styleBase.m_md_top, {marginRight: 200, width: 200}]}>
            <View style={[styleBase.m_md_right]}>
                <Text style={[styleBase.fontBold, styleBase.normalText]}>
                    {props.label}
                </Text>
            </View>
            <TextInput
                onChangeText={props.onChangeText}
                style={[{width: 100}, styleBase.normalText,
                    styleBase.m_md_right,
                    styleBase.fontRubik]}
                value={props.value}
                placeholder={props.placeholder}/>
            {props.renderCustom || null}
        </View>
    )
}

const ProductInfo = (props) => {
    return (
        <View style={[styleBase.m_md_top]}>
            <Text style={[styleBase.normalText]}>
                <Text style={[styleBase.fontBold]}>
                    {props.label}
                </Text>
                <Text>
                    {`  ${props.value}`}
                </Text>
            </Text>
        </View>
    )
}

ProductItem.propTypes = {
    item: PropTypes.object
};

ProductItem.defaultProps = {
    item: {}
};

export default ProductItem;