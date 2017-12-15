import React from "react";
import {View} from "react-native";
import styleBase from "../../style/base";
import InventoryProduct from "./inventoryProduct";
import Ingredient from "./inventoryIngredient";

class InventoryMain extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        view: React.PropTypes.string
    };

    static defaultProps = {
        view: "Nguyên Liệu"
    };

    render() {
        return (
            <View style={[styleBase.container, styleBase.background4]}>
                {this.props.view === "Nguyên Liệu" && <Ingredient/>}
                {this.props.view === "Sản Phẩm" && <InventoryProduct/>}
            </View>
        )
    }
}

export default InventoryMain;