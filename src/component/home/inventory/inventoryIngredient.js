import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container, {paddingVertical: 30}]}>
                <TouchableOpacity style={[styleBase.row, styleBase.center,
                    {marginHorizontal: 50, paddingVertical: 15, borderRadius: 5,
                        backgroundColor: "#f9f9f9", borderColor: "#999", borderWidth: 0.5}]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Thêm Nguyên Liệu
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Ingredient;