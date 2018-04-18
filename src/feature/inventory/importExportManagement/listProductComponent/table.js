import React from "react";
import PropTypes from "prop-types";
import styleBase from "../../../../styles/base";
import {View, Text, InteractionManager, TextInput, Switch, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import List from "../../../../component/list/list";
import ProductItem from "./item";
import ErrorBoundary from "../../../../component/errorBoundary/errorBoundary";

class TableProducts extends React.PureComponent {
    constructor(props) {
        super(props);
        this.list = null;
        this.state = {
            confirmOption: false,
            products: props.products
        }

        this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
        this.handleSubmitRatio  = this.handleSubmitRatio.bind(this);
    }

    /**
     * component life cycle
     */

    /**
     * handler
     */

    handleChangeSwitch(value) {
        this.setState({
            confirmOption: value
        })
    }

    handleSubmitRatio (ratio) {
        InteractionManager.runAfterInteractions( () => {
            let { products = [] } = this.state;
            let data = products.map(item => {
                let product = item.product || {};
                let price = product.price || [];
                let importPrice = price.find(price => price.name === 'import') || {};
                let salePrice   = price.find(price => price.name === "default") || {};
                let priceImport = importPrice.price || 0;
                let sale = salePrice.price || 0;

                sale = priceImport + (priceImport * ratio / 100);
                price = [
                    {...importPrice, price: priceImport},
                    {...salePrice, price: sale}
                ]
                return {
                    ...item,
                    product: {
                        ...product,
                        price
                    }
                }
            })
            this.list.onUpdateList()
            this.setState({
                products: data
            })
        })
    }

    handleSubmitExport () {
        let { products = [] } = this.state;
        products = products.map(item => {
            let { product = {}, quantity = 0 } = item;
            let { price = [] } = product;
            let salePrice = price.find(price => price.name === 'default') || {};

            salePrice = salePrice.price || 0;
            return {
                _id: product._id,
                quantity,
                salePrice
            }
        });
        return products;
    }

    /**
     * renderer
     * */

    renderItem (item, index) {
        return <ErrorBoundary fallback={(
            <View style={[styleBase.center, {height: 100}, styleBase.m_md_horizontal]}>
                <Text style={[styleBase.fontRubik, styleBase.text4, styleBase.title]}>
                    ĐÃ CÓ LỖI XẢY RA
                </Text>
            </View>
        )}>
            <ProductItem key={`ITEM-${index}`} item={item}/>
        </ErrorBoundary>
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.row, styleBase.panelHeader]}>
                    <View style={[{flex: .33},
                        styleBase.row, styleBase.center]}>
                        <TextInput style={[styleBase.grow, styleBase.fontRubik, styleBase.title]}
                                   placeholder="TÌM KIẾM"/>
                        <Ionicons name="ios-search-outline" style={[{fontSize: 30}, styleBase.text4]}/>
                    </View>
                    {/*Text search*/}
                    <View style={[{flex: .333}, styleBase.center,
                        styleBase.row]}>
                        <Text style={[styleBase.normalText, styleBase.fontRubik]}>
                            {`XÁC NHẬN KHI NHẬN HÀNG   `}
                        </Text>
                        <Switch value={this.state.confirmOption} onValueChange={this.handleChangeSwitch}/>
                    </View>
                    {/*Sale percentage*/}
                    <SalePercentage onSubmitRatio={this.handleSubmitRatio}/>
                </View>
                <List
                    ref={list => this.list = list}
                    initialNumToRender={3}
                    dataSources={this.state.products}
                    renderItem={(item, index) => this.renderItem(item, index)}/>
            </View>
        )
    }
}

class SalePercentage extends React.PureComponent {
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

    render() {
        return (
            <View style={[styleBase.row, styleBase.center, {flex: 0.33}]}>
                <TextInput
                    style={[styleBase.p_md_horizontal]}
                    onChangeText={this.handleChangeRatio}
                    value={`${this.state.ratio}%`}
                    placeholder="% GIÁ NHẬP"
                />
                <TouchableOpacity
                    onPress={this.handleSubmitRatio}
                    style={[styleBase.p_md_horizontal,
                    styleBase.bgE5,
                    styleBase.row,
                    styleBase.p_md_vertical]}>
                    <Text>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

TableProducts.propTypes = {
    products: PropTypes.array,
    handleSubmitExport: PropTypes.func
};

TableProducts.defaultProps = {
    products: [],
    handleSubmitExport: () => {}
};

export default TableProducts;