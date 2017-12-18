import React from "react";
import {Image, Text, View} from "react-native";
import styleBase from "../style/base";

class NoData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View pointerEvents='none' style={[styleBase.fillParent, styleBase.center]}>
                <Image source={require("../../asset/img/website.jpg")} style={{width: 150, height: 150}}/>
                <Text style={[styleBase.text4, styleBase.bold, styleBase.font18, {backgroundColor: "transparent"}]}>
                    Không có gì ở đây cả !!
                </Text>
            </View>
        )
    }
}

export default NoData
