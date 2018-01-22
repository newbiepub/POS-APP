import React from "react";
import {ActivityIndicator, Text, FlatList, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../reuseable/ui/text';
import {numberwithThousandsSeparator} from '../reuseable/function/function';

class GridProduct extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            gridViewWidth: width * 60 / 100,
            gridViewItemSize: ((width * 60) / 100 - 20) / 3,
            columnNumber: 3
        }
    }

    itemPress(product) {
        this.props.openPopup();
        this.props.renderPopup(
            <ViewProduct productData={product}/>
        );

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

    shouldComponentUpdate(nextProps, nextState) {
        const differentData = this.props.data !== nextProps.data;
        const changedLoading = this.props.loading !== nextProps.loading;
        const onRotate = this.state.gridViewWidth !== nextState.gridItemWidth;
        return differentData || changedLoading || onRotate;
    }

    _renderItem = ({item}) => (

        <View style={[{
            width: (this.state.gridViewItemSize ),
            height: (this.state.gridViewItemSize ),
            padding: 10
        }]}>
            <TouchableWithoutFeedback onPress={() => this.itemPress(item)}>
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
            <View style={{flex: 1, backgroundColor: constantStyle.colorBackground}}>
                {
                    this.props.data != undefined && !this.props.data.loading ?
                        <FlatList
                            data={this.props.data}
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
        flex: 1
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

export default GridProduct;