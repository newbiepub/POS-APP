import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    FlatList,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Easing,
    RefreshControl,
    Alert,
    InteractionManager
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../../style/base';
import {SearchInput, TextSmall} from '../../text';
import {numberwithThousandsSeparator} from '../../../reuseable/function/function';
import {openPopup} from '../../popup/popupAction';
import {connect} from 'react-redux';
import ViewProduct from '../../popup/popupContent/viewProduct';
import {QUERY} from '../../../constant/query';
import NoData from '../../noData';
import ListCategory from './listCategory';
import {graphql, compose} from 'react-apollo';
import _ from 'lodash';
import {getProduct, getProductAmount} from '../productAction';
import {client} from '../../../root';

class GridProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.gridWidthPercent = 70;
        this.state = {
            gridViewWidth: width * this.gridWidthPercent / 100,
            height,
            columnNumber: 3,
            categoryFilter: 'all',
            searchText: '',
            refreshing: false,

        };
        this.state.gridViewItemSize = ((width * this.gridWidthPercent) / 100 - constantStyle.sm*2 - constantStyle.headerHeight) / this.state.columnNumber;
        this.props.length = 0;

    }

    async initProduct() {
        let {_id} = this.props.user;
        let amount = await this.props.getProductAmount(_id);
        InteractionManager.runAfterInteractions(async () => {
            for (let i = 0; i <= amount; i += 10) {
                await this.props.getProduct(_id, 10, i);
            }
        });

    }

    async componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
        });
        this.initProduct()

    }

    onChangeCategoryFilter(categoryId) {
        this.setState(
            {
                categoryFilter: categoryId
            }
        )
    }

    filterByCategory() {
        try {
            if (this.state.categoryFilter === 'all' && this.state.searchText === "") {
                return this.props.products

            } else {
                let data = [];
                if (this.props.products) {
                    this.props.products.forEach((item) => {

                        if (item.product.categoryId) {
                            if (item.product.categoryId._id === this.state.categoryFilter) {
                                if (item.product.name.includes(this.state.searchText)) {
                                    data.push(item)
                                }
                            }
                        }

                        if (this.state.categoryFilter === 'all') {

                            if (item.product.name.includes(this.state.searchText)) {
                                data.push(item)
                            }
                        }
                    });
                }

                return data;

            }
        } catch (e) {
            console.warn("filter-category" + e);
            return []
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        const productChanged = this.props.products !== nextProps.products;
        const onRotate = this.state.gridViewWidth !== nextState.gridItemWidth;
        return productChanged || onRotate;
    }

    onClickProduct(item) {
        this.props.openPopup(<ViewProduct item={item}/>)
    }

    async _onRefresh() {
        // console.warn('refreshing');
        await this.setState({
            refreshing: true
        });
        await this.initProduct();
        this.setState({
            refreshing: false
        })

    }

    _renderItem = ({item}) => (

        <View style={[{
            width: (this.state.gridViewItemSize),
            height: (this.state.gridViewItemSize),
            padding: constantStyle.sm
        }]}>
            <TouchableWithoutFeedback onPress={() => this.onClickProduct(item)}>
                <View style={{flex: 1}}>
                    <View style={style.gridItem}>
                        <TextSmall>Giá: {numberwithThousandsSeparator(_.get(item, "product.price[0].price", 0))}{_.get(item, "product.price[0].currency.symbol", "")}</TextSmall>
                        <TextSmall>Đơn vị: {item.product.unit || ""}</TextSmall>
                        <TextSmall>Số lượng: {item.quantity}</TextSmall>
                        {/*<TextSmall>Mã sản phẩm: {item.product.productCode}</TextSmall>*/}
                        {
                            item.product.categoryId &&
                            <TextSmall>Loại hàng:{_.get(item, "product.categoryId.name", "")}</TextSmall>
                        }


                    </View>

                    <View style={style.gridItemName}>
                        <TextSmall numberOfLines={3}
                                   style={{color: constantStyle.color2}}>{item.product.name}</TextSmall>
                    </View>

                </View>

            </TouchableWithoutFeedback>
        </View>

    );

    _listHeaderComponent = (data) => (
        <View>
            {((data && data.length > 0) || this.state.searchText !== "") &&
            <View style={style.search}>
                <SearchInput value={this.state.searchText} onChangeText={(text) => this.setState({searchText: text})}
                             clean={() => this.setState({searchText: ''})}/>
            </View>
            }
        </View>

    );
    _listEmptyComponent = () => (
        <NoData style={{
            padding: 0,
            height: this.state.height - constantStyle.headerHeight - constantStyle.paddingGridItem * 2
        }}/>
    );
    _renderFooter = () => (
        {/*<View style={{height: constantStyle.sm*2}}/>*/}
    );

    onLayout(event) {
        const {width} = event.nativeEvent.layout;
        this.setState({
            gridViewWidth: width,
            gridViewItemSize: (width - 20 - constantStyle.headerHeight) / this.state.columnNumber
        })
    }

    render() {
        // this.props.checkLoginExpire(this.props.inventoryProduct);
        let data = this.filterByCategory();
        // console.warn("render")
        // console.warn(this.props.products.length)
        return (
            <View style={style.container} onLayout={(event) => this.onLayout(event)}>
                {/*View category*/}
                <ListCategory onChangeCategoryFilter={(id) => this.onChangeCategoryFilter(id)}
                              categoryFilter={this.state.categoryFilter}/>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    data={data}
                    extraData={this.props.products}
                    numColumns={this.state.columnNumber}
                    initialNumToRender={10}
                    getItemLayout={(data, index) => (
                        {length: this.props.productAmount, offset: this.state.gridViewItemSize * index, index}
                    )}
                    keyExtractor={(item) => item.product._id}
                    contentContainerStyle={style.gridView}
                    ListEmptyComponent={this._listEmptyComponent}
                    ListHeaderComponent={this._listHeaderComponent(this.props.products)}
                    // ListFooterComponent={this._renderFooter}
                    renderItem={this._renderItem}
                />

            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyle.colorBackground,
        flexDirection: 'row'
    },
    gridItem: {
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        borderTopRightRadius: 10,
        flex: 0.6,
        zIndex: 5,
        padding: constantStyle.sm,
        backgroundColor: constantStyle.color2
    },
    gridItemName: {
        padding: constantStyle.paddingGridItem,
        flex: 0.4,
        justifyContent: 'center',
        backgroundColor: constantStyle.color1
    },
    gridView: {
        padding: constantStyle.paddingGridItem,

    },
    search: {
        padding: constantStyle.paddingGridItem
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        products: state.productReducer.product,
        productAmount: state.productReducer.productAmount
    }
};
const mapDispatchToProps = {
    openPopup,
    getProduct,
    getProductAmount
};
export default connect(mapStateToProps, mapDispatchToProps)(GridProduct);