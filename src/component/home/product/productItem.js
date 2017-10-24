import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import styleProduct from "../../style/product";
import styleBase from "../../style/base";

class ProductItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[styleProduct.productItem, styleBase.center]}>
                <Text style={[styleBase.font16, styleBase.textE5]}>
                    Hello
                </Text>
            </TouchableOpacity>
        )
    }
}

export default ProductItem;