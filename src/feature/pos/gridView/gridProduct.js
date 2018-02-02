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
import {TextNormal, TextSmall} from '../../../component/text';
import {numberwithThousandsSeparator} from '../../../reuseable/function/function';
import {openPopup} from '../../../component/popup/popupAction';
import {connect} from 'react-redux';
import ViewProduct from '../../../component/popup/popupContent/viewProduct';
import {client} from '../../../root';
import {QUERY} from '../../../constant/query';
import NoData from '../../../component/noData';
import ListCategory from './listCategory';

class GridProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            gridViewWidth: width * 60 / 100,
            height,
            columnNumber: 2,
            product: [],
            categoryFilter: 'all'
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

    async componentWillMount() {
        try {
            client.query({
                query: QUERY.PRODUCTS,
                fetchPolicy: 'cache-first'
            }).then((res) => {
                this.setState({
                    product: res.data.products
                })
            }).catch(async err => {
                if (err.networkError.response.status === 500) {
                    this.props.loginExpire()
                }
            });
        } catch (e) {
            console.warn(e)
        }
    }

    onChangeCagegoryFilter(categoryId) {
        this.setState(
            {
                categoryFilter: categoryId
            }
        )
    }

    filterByCategory() {
        if (this.state.categoryFilter === 'all') {
            return this.state.product
        } else {
            let data = [];
            this.state.product.forEach((item) => {
                if (item.categoryId._id === this.state.categoryFilter) {
                    data.push(item)
                }
            });
            return data;

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const differentData = this.props.data !== nextProps.data;
        const changedLoading = this.props.loading !== nextProps.loading;
        const onRotate = this.state.gridViewWidth !== nextState.gridItemWidth;
        return differentData || changedLoading || onRotate;
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
                        <TextSmall>Giá:{numberwithThousandsSeparator(item.price[0].price)}{item.price[0].currency.name}/{item.unit}</TextSmall>
                        <TextSmall>Số lượng:</TextSmall>
                        <TextSmall>Mã sản phẩm:</TextSmall>
                        <TextSmall>Loại hàng:{item.categoryId.name}</TextSmall>

                    </View>

                    <View style={style.gridItemName}>
                        <TextSmall numberOfLines={1} style={{color: constantStyle.color2}}>{item.name}</TextSmall>
                    </View>

                </View>

            </TouchableWithoutFeedback>
        </View>

    );
    _listEmptyComponent = () => (
        <NoData style={{
            padding: 0,
            height: this.state.height - constantStyle.headerHeight - constantStyle.paddingGridItem * 2
        }}/>
    );


    render() {
        return (
            <View style={style.container}>
                {/*View category*/}
                <ListCategory onChangeCategoryFilter={(id) => this.onChangeCagegoryFilter(id)}/>
                {
                    this.state.product != undefined && !this.state.product.loading ?
                        <FlatList
                            data={this.filterByCategory()}
                            numColumns={this.state.columnNumber}
                            extraData={this.state}
                            initialNumToRender={10}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={style.gridView}
                            ListEmptyComponent={this._listEmptyComponent}
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

    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapDispatchToProps = {
    openPopup
}
export default connect(null, mapDispatchToProps)(GridProduct);