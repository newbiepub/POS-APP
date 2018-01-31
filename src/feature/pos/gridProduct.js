import React from "react";
import {ActivityIndicator, Text, FlatList, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import {openPopup} from '../../component/popup/popupAction';
import {connect} from 'react-redux';
import ViewProduct from '../../component/popup/popupContent/viewProduct';
import {client} from '../../root';
import {QUERY} from '../../constant/query';

class GridProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            gridViewWidth: width * 60 / 100,
            gridViewItemSize: ((width * 60) / 100 - 20) / 3,
            columnNumber: 3,
            product: []
        }
    }

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                gridViewWidth: width * 60 / 100,
                gridViewItemSize: ((width * 60) / 100 - 20) / 3
            })
        })
    }

    async componentWillMount() {
        try {
            const res = await client.query({
                query: QUERY.PRODUCTS,
                fetchPolicy: 'network-only'
            });

            this.setState({
                product: res.data.products
            })
        } catch (e) {
            const res = await client.query({
                query: QUERY.PRODUCTS,
                fetchPolicy: 'cache-only'
            });
            this.setState({
                product: res.data.products
            })
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


    render() {
        return (
            <View style={style.container}>
                {
                    this.state.product != undefined && !this.state.product.loading ?
                        <FlatList
                            data={this.state.product}
                            numColumns={this.state.columnNumber}
                            extraData={this.state}
                            initialNumToRender={5}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={style.gridView}
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
        backgroundColor: constantStyle.colorBackground
    },
    gridItem: {
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        borderTopRightRadius: 20,
        flex: 0.8,
        padding: 10,
        backgroundColor: constantStyle.color2
    },
    gridItemName: {
        padding: 10,
        flex: 0.2,
        justifyContent: 'center',
        backgroundColor: constantStyle.color1
    },
    gridView: {
        padding: 10,

    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

const mapDispatchToProps = {
    openPopup
}
export default connect(null, mapDispatchToProps)(GridProduct);