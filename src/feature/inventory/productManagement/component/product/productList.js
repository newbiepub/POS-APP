import React from "react";
import PropTypes from "prop-types";
import {InteractionManager, ActivityIndicator, View, TextInput, SafeAreaView, Text} from "react-native";
import styleBase from "../../../../../styles/base";
import NoData from "../../../../../component/noData/noData";
import ProductItem from "./productItem";
import List from "../../../../../component/list/list";
import {INVENTORY} from "../../../action/index";
import {connect} from "react-redux";
import {equals} from "../../../../../utils/utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import ErrorBoundary from "../../../../../component/errorBoundary/errorBoundary";
import emitter from "../../../../../event/emitter";
import {EVENT_TYPE} from "../../../../../constant/eventType";

class ProductList extends React.PureComponent {
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
        this.list = null;
        this.state = {
            products: [],
            searchText: "",
            loading: true
        };

        this.handleUpdateList    = this.handleUpdateList.bind(this);
        this.handleChangeText    = this.handleChangeText.bind(this);
        this.handleFetchProducts = this.handleFetchProducts.bind(this);
        this.onRefresh           = this.onRefresh.bind(this);
    }

    static propTypes = {};

    static defaultProps = {};

    /**
     * Component life cycle
     * */
    componentDidMount() {
        emitter.addListener(EVENT_TYPE.UPDATE_PRODUCT, this.handleUpdateList)
        this.handleFetchProducts();
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                products: this.props.products
            }, () => this.setState({loading: false}))
        })
    }

    componentWillUnmount() {
        emitter.removeListener(EVENT_TYPE.UPDATE_PRODUCT, this.handleUpdateList)
    }

    componentWillReceiveProps(nextProps) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                products: nextProps.products
            }, () => this.setState({loading: false}))
        })
    }

    /**
     * Handle
     * */

    handleUpdateList() {
        this.list.onUpdateList();
    }

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
            products = this.props.products;
        }

        this.setState({
            searchText
        })
        InteractionManager.runAfterInteractions(() => {
            this.setState({products})
        })
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

    renderItem(rowData, index) {
        return <ErrorBoundary>
            <ProductItem key={index} navigator={this.props.navigator}
                         editable={this.props.editable}
                         item={rowData}/>
        </ErrorBoundary>
    }

    render() {
        let productItem = this.state.products || [];

        return (
            <SafeAreaView style={[styleBase.container, styleBase.bgWhite]}>
                <View style={[styleBase.container]}>
                    <View style={[
                        styleBase.row,
                        styleBase.alignCenter,
                        styleBase.p_md_horizontal,
                        styleBase.p_md_vertical,
                        styleBase.row,
                        ]}>
                        <View style={[styleBase.grow]}>
                            <TextInput
                                style={[styleBase.grow]}
                                onChangeText={this.handleChangeText}
                                value={this.state.searchText}
                                placeholder="TÌM KIẾM"/>
                        </View>
                        <Ionicons name="ios-search-outline" style={[styleBase.text4, {fontSize: 30}]}/>
                    </View>
                    {/* Search Box */}
                    <View style={[styleBase.p_md_vertical,
                        styleBase.row,
                        styleBase.p_md_horizontal, styleBase.bgE5]}>
                        <View style={[{flex: 0.33}, styleBase.center]}>
                            <Text>
                                TÊN SẢN PHẨM
                            </Text>
                        </View>
                        <View style={[{flex: 0.33}, styleBase.center]}>
                            <Text>
                                SỐ LƯỢNG
                            </Text>
                        </View>
                        <View style={[
                            {flex: 0.2},
                            styleBase.center
                        ]}>
                            <Text>
                                ĐƠN VỊ
                            </Text>
                        </View>
                        <View style={{flex: 0.13}}/>
                    </View>
                    <View style={[styleBase.container]}>
                        {
                            this.state.loading && (productItem.length === 0) &&
                            <ActivityIndicator size="large"/>
                        }
                        {
                            (productItem.length > 0 && this.state.products !== "NoData") &&
                            <List
                                ref={ref => this.list = ref}
                                onRefresh={this.onRefresh.bind(this)}
                                dataSources={productItem}
                                renderItem={(item, index) => this.renderItem(item, index)}
                            />
                        }
                        {
                            ((!productItem.length) && !this.state.loading) &&
                            <View style={[styleBase.m_xl_top]}>
                                <NoData/>
                            </View>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
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