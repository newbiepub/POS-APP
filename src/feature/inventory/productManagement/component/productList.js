import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, InteractionManager} from "react-native";
import styleBase from "../../../../styles/base";
import {Caption, Icon, Spinner, TextInput, View} from "@shoutem/ui";
import NoData from "../../../../component/noData/noData";
import ProductItem from "./productItem";
import List from "../../../../component/list/list";
import {INVENTORY} from "../../action/index";
import {connect} from "react-redux";
import {equals} from "../../../../utils/utils";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.routes = [
            {
                title: "MẶT HÀNG", route: "product",
            },
            {
                title: "LOẠI HÀNG", route: "category"
            }
        ];
        this.delayed = (time) => new Promise((resolve) => setTimeout(resolve, time));
        this.ITEM_HEIGHT = 65;
        this.NUMBER_OF_ITEM = 5;
        this.state = {
            products: [],
            searchText: "",
            loading: true
        };

        this.handleChangeText    = this.handleChangeText.bind(this);
        this.onEndReach          = this.onEndReach.bind(this);
        this.handleFetchProducts = this.handleFetchProducts.bind(this);
        this.onRefresh           = this.onRefresh.bind(this);
    }

    static propTypes = {};

    static defaultProps = {};

    /**
     * Component life cycle
     * */
    componentDidMount() {
        this.handleFetchProducts()
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                products: this.props.products.slice(0, this.NUMBER_OF_ITEM),
                loading: false
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !equals(this.state, nextState);
    }

    componentWillReceiveProps(nextProps) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                products: nextProps.products.slice(0, this.NUMBER_OF_ITEM),
                loading: false
            })
        })
    }

    /**
     * Handle
     * */

    async handleFetchProducts () {
        try {
            let { user = {}, type } = this.props;
            await INVENTORY.FETCH_USER_PRODUCT(user._id, type)
        } catch (e) {
            console.warn(e.message);
        }
    }

    handleChangeText(searchText) {
        let { products = [] } = this.state;

        if(searchText.length > 0) {
            products = this.props.products.filter(item => {
                return new RegExp(searchText, 'gi').test(item.product.name);
            });
        } else {
            products = this.props.products.slice(0, this.NUMBER_OF_ITEM);
        }

        this.setState({
            searchText,
            products
        })
    }

    async onEndReach() {
        try {
            let { products = [] } = this.state;

            if(products.length <= this.props.products.length) {
                products = products.concat( this.props.products.slice(this.state.products - 1, this.NUMBER_OF_ITEM))
                this.setState({
                    products
                })
            }
        } catch (e) {
            console.warn(e.message);
        }
    }

    async onRefresh() {
        try {
            this.setState({loading: true}); // Set refreshing indicator
            await this.handleFetchProducts(); // Refetch New data
            return this.setState({loading: false});
        } catch(e) {
            console.warn("ERROR onRefresh() - productList.js");
        }
    }

    /**
     * Render
     * */

    renderItem(rowData, sectionId, index, numberOfRows) {
        return <ProductItem key={index} navigator={this.props.navigator} item={rowData}/>
    }

    render() {
        try {
            let productItem = this.state.products || [];
            return (
                <View style={StyleSheet.flatten([styleBase.container])}>
                    <View styleName="horizontal v-center" style={StyleSheet.flatten([styleBase.p_md_right])}>
                        <View style={StyleSheet.flatten([styleBase.grow])}>
                            <TextInput
                                styleName="full-width"
                                onChangeText={this.handleChangeText}
                                value={this.state.searchText}
                                placeholder="TÌM KIẾM"/>
                        </View>
                        <Icon name="search" style={{color: "#444"}}/>
                    </View>
                    {/* Search Box */}
                    <View styleName="horizontal"
                          style={StyleSheet.flatten([styleBase.p_md_vertical, styleBase.p_md_horizontal, styleBase.bgE5])}>
                        <View style={{flex: 0.33}}>
                            <Caption>
                                TÊN SẢN PHẨM
                            </Caption>
                        </View>
                        <View styleName="horizontal v-center h-center" style={{flex: 0.33}}>
                            <Caption>
                                SỐ LƯỢNG
                            </Caption>
                        </View>
                        <View styleName="horizontal v-center h-center" style={{flex: 0.2}}>
                            <Caption>
                                ĐƠN VỊ
                            </Caption>
                        </View>
                        <View style={{flex: 0.13}}/>
                    </View>
                    <View style={StyleSheet.flatten([styleBase.container])}>
                        {
                            this.state.loading && (productItem.length === 0) &&
                            <Spinner/>
                        }
                        {
                            (productItem.length > 0 && this.state.products !== "NoData") &&
                            <List
                                onRefresh={this.onRefresh.bind(this)}
                                initialNumToRender={this.NUMBER_OF_ITEM}
                                getItemLayout={(item, index) => ({
                                    length: this.ITEM_HEIGHT, offset: this.ITEM_HEIGHT * index, index
                                })}
                                onEndReachedThreshold={400}
                                onEndReach={this.onEndReach}
                                dataSources={productItem}
                                renderItem={this.renderItem.bind(this)}
                            />
                        }
                        {
                            ((productItem === "NoData") && !this.state.loading) &&
                            <View styleName="xl-gutter-top">
                                <NoData/>
                            </View>
                        }
                    </View>
                </View>
            )
        }
        catch (e) {
            console.log(e);
            console.warn("error - render ProductList");
            throw e;
        }
    }
}

ProductList.propTypes = {
    products: PropTypes.array
}

ProductList.defaultProps = {
    products: []
}

const mapStateToProps = (state) => {
    return {
        products: state.inventory.products
    }
}

export default connect(mapStateToProps) (ProductList);