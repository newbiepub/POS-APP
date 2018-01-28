import React from "react";
import {ActivityIndicator, Text, FlatList, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import ProductListItem from '../../component/listItems/productListItem';
class Library extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.box}>
                    {/*Header*/}
                    <View style={style.boxHeader}>
                        <TextNormal>
                            header
                        </TextNormal>
                    </View>
                    <View style={{flex:1}}>
                        <ProductListItem tag={"productIcon"} title={"Mặt hàng"} right={"chevron-right"}/>
                        <ProductListItem tag={"categoryIcon"} title={"Loại hàng"} right={"chevron-right"}/>
                        <ProductListItem tag={"discountIcon"} title={"Khuyến mãi"} right={"chevron-right"}/>
                    </View>
                </View>

            </View>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyle.colorBackground,
        padding: 20,
    },
    box: {
        flex: 1,
        borderWidth: 1,
        borderColor: constantStyle.colorBorder,
        borderRadius: 5
    },
    boxHeader: {
        borderBottomWidth: 1,
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: constantStyle.paddingHorizontal,
        borderBottomColor: constantStyle.colorBorder
    },
    boxContent: {},

    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default Library;