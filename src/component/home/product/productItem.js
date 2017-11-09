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
                    {this.props.data.name.substr(0, 2)}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default ProductItem;