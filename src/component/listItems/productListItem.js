import React from "react";
import {ActivityIndicator, Text, FlatList, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class ProductListItem extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.tag}>
                    {
                        this.props.tag === 'productIcon' &&
                        <MaterialCommunityIcons name={"paper-cut-vertical"} style={style.iconTag}/>
                    }
                    {
                        this.props.tag === 'categoryIcon' &&
                        <Entypo name={"colours"} style={style.iconTag}/>
                    }
                    {
                        this.props.tag === 'discountIcon' &&
                        <Entypo name={"price-tag"} style={style.iconTag}/>
                    }
                </View>
                <View style={style.content}>
                    <TextNormal style={{flex: 1}}>{this.props.title || ""}</TextNormal>
                    {
                        this.props.right === "chevron-right" &&
                        <Entypo name={"chevron-right"} style={style.icon}/>
                    }
                </View>

            </View>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flexDirection: "row",
        height: constantStyle.listItemHeight,
        borderBottomWidth:1,
        borderBottomColor:constantStyle.colorBorder
    },
    tag: {
        height: constantStyle.listItemHeight,
        width: constantStyle.listItemHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: constantStyle.color1
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: constantStyle.paddingHorizontal
    },
    icon: {
        fontSize: constantStyle.sizeNormal
    },
    iconTag:{
        fontSize: constantStyle.sizeNormal,
        color:constantStyle.color2
    },
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default ProductListItem;