import React from "react";
import {Text, View} from "react-native";
import styleProduct from "../../style/product";
import styleBase from "../../style/base";

class ProductItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        return (
            <View style={styleProduct.productItem}>
                <View style={[ styleBase.center,{flex:3}]}>
                    <Text style={[styleBase.font26, styleBase.textE5]}>
                        {data.name.substr(0, 2)}
                    </Text>
                </View>
                <View style={[styleProduct.productName,styleBase.background4,styleBase.center,{flex:1}]}>
                    <Text style={[styleBase.font14,styleBase.color3]} numberOfLines={1}>{data.name}</Text>
                </View>
            </View>
        )
    }
}

export default ProductItem;