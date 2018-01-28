import React from "react";
import {ActivityIndicator, Text, FlatList, View, TouchableWithoutFeedback, Dimensions} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {constantStyle} from '../../style/base';
import {TextNormal, TextSmall} from '../../component/text';
import {numberwithThousandsSeparator} from '../../reuseable/function/function';
import Header from '../../component/header';

class Report extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');

    }

    render() {
        return (
            <View style={style.container}>
                <Header type={"normal"} titleLeft={"Báo cáo"} titleRight={"Theo ngày"} />
                <TextNormal>tran</TextNormal>

            </View>
        )
    }
}


const style = EStyleSheet.create({
    container: {
        flex: 1
    }
    ,
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});

export default Report;