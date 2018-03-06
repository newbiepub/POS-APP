import React from "react";
import {
    ActivityIndicator,
    ScrollView,
    FlatList,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Easing,
    Animated,
    Alert
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

class GridProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            gridViewWidth: width * 60 / 100,
            height,
            columnNumber: 2,
            categoryFilter: 'all',
            searchText: ''
        };
        this.state.gridViewItemSize = ((width * 60) / 100 - 20 - constantStyle.headerHeight) / this.state.columnNumber;
    }

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                gridViewWidth: width * 60 / 100,
                height,
                gridViewItemSize: ((width * 60) / 100 - 20 - constantStyle.headerHeight ) / this.state.columnNumber
            })
        })

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
                return this.props.inventoryProduct.getUserProductInventory

            } else {
                let data = [];
                if (this.props.inventoryProduct && this.props.inventoryProduct.getUserProductInventory) {
                    this.props.inventoryProduct.getUserProductInventory.forEach((item) => {

                        if (item.product.categoryId._id === this.state.categoryFilter) {
                            if (item.product.name.includes(this.state.searchText)) {
                                data.push(item)
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
            console.warn(e);
            return []
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        const productChanged = this.props.inventoryProduct !== nextProps.inventoryProduct;
        const changedLoading = this.props.loading !== nextProps.loading;
        const onRotate = this.state.gridViewWidth !== nextState.gridItemWidth;
        return productChanged || changedLoading || onRotate;
    }

    onClickProduct(item) {
        this.props.openPopup(<ViewProduct item={item}/>)
    }

    _renderItem = ({item}) => (

        <View style={[{
            width: (this.state.gridViewItemSize ),
            height: (this.state.gridViewItemSize ),
            padding: 10
        }]}>
            <TouchableWithoutFeedback onPress={() => this.onClickProduct(item)}>
                <View style={{flex: 1}}>
                    <View style={style.gridItem}>
                        <TextSmall>Giá:{numberwithThousandsSeparator(_.get(item,"product.price[0].price",0))}{_.get(item,"product.price[0].currency.symbol","")}/{item.product.unit|| ""}</TextSmall>
                        <TextSmall>Số lượng: {item.quantity} {item.product.unit}</TextSmall>
                        <TextSmall>Mã sản phẩm: {item.product.productCode}</TextSmall>
                        <TextSmall>Loại hàng:{item.product.categoryId.name}</TextSmall>

                    </View>

                    <View style={style.gridItemName}>
                        <TextSmall numberOfLines={1}
                                   style={{color: constantStyle.color2}}>{item.product.name}</TextSmall>
                    </View>

                </View>

            </TouchableWithoutFeedback>
        </View>

    );

    _listHeaderComponent = (data) => (
        <View>
            {((data && data.length > 0) || this.state.searchText !== "" ) &&
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


    render() {
        this.props.checkLoginExpire(this.props.inventoryProduct);
        let data = this.filterByCategory();
        return (
            <View style={style.container}>
                {/*View category*/}
                <ListCategory onChangeCategoryFilter={(id) => this.onChangeCategoryFilter(id)}
                              categoryFilter={this.state.categoryFilter}/>
                {
                    data !== [] ?
                        <FlatList
                            data={data}
                            numColumns={this.state.columnNumber}
                            extraData={this.state}
                            initialNumToRender={0}
                            keyExtractor={(item) => item.product._id}
                            contentContainerStyle={style.gridView}
                            ListEmptyComponent={this._listEmptyComponent}
                            ListHeaderComponent={this._listHeaderComponent(data)}
                            renderItem={this._renderItem}
                        /> :
                        <View style={[{flex: 1, justifyContent: "center", alignItems: 'center'}]}>
                            <ActivityIndicator size={"large"}/>
                        </View>
                }


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
        flex: 0.8,
        zIndex: 5,
        padding: constantStyle.paddingGridItem,
        backgroundColor: constantStyle.color2
    },
    gridItemName: {
        padding: constantStyle.paddingGridItem,
        flex: 0.2,
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

let GridProductApollo = compose(

    graphql(QUERY.CURRENT_USER, {
        name: 'currentUser', options: {
            fetchPolicy: "cache-and-network"
        }
    }),
    graphql(QUERY.INVENTORY_PRODUCT, {
        name: 'inventoryProduct', options: (props) => ({
            variables: {
                userId: props.currentUser.currentUser._id,
            },
            fetchPolicy: "cache-and-network"
        })
    })
)(GridProduct);
const mapDispatchToProps = {
    openPopup
};
export default connect(null, mapDispatchToProps)(GridProductApollo);