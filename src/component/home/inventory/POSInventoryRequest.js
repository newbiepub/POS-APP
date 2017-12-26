import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import Fontello from "../../fontello/Fontello";
import {connect} from "react-redux";
import {openPopup, renderPopup} from "../../../action/popup";
import InventoryRequestProduct from "../../popup/inventory/request/InventoryRequestProduct";
import {getExportIngredient, getExportProduct} from "../../../action/inventoryActivity";
import InventoryRequestIngredient from "../../popup/inventory/request/InventoryRequestIngredient";

class POSInventoryRequest extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};

    componentWillMount() {
        getExportProduct()
        getExportIngredient();
    }

    onRequestProduct() {
        this.props.openPopup();
        this.props.renderPopup(<InventoryRequestProduct {...this.props}/>)
    }

    onRequestIngredient() {
        this.props.openPopup();
        this.props.renderPopup(<InventoryRequestIngredient {...this.props}/>)
    }

    render() {
        return (
            <View style={[styleBase.container, {marginTop: 30}]}>
                <TouchableOpacity
                    style={[styleBase.whiteBackground, styleBase.shadowBox, styleBase.row, styleBase.center,
                        {marginHorizontal: 100}]}>
                    <View style={[{marginVertical: 20}, styleBase.center]}>
                        <Fontello name="cogwheel" style={[styleBase.color2, {fontSize: 80}]}/>
                        <Text style={[{marginTop: 20}, styleBase.font16, styleBase.text4]}>
                            Đang xử lý
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onRequestProduct.bind(this)}
                    style={[styleBase.whiteBackground, styleBase.shadowBox, styleBase.row, styleBase.center, {
                        marginTop: 20,
                        marginHorizontal: 100
                    }]}>
                    <View style={[{marginVertical: 20}, styleBase.center]}>
                        <Fontello name="product-realise" style={[styleBase.color2, {fontSize: 80}]}/>
                        <Text style={[{marginTop: 20}, styleBase.font16, styleBase.text4]}>
                            Yêu cầu nhập sản phẩm
                        </Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onRequestIngredient.bind(this)}
                    style={[styleBase.whiteBackground, styleBase.shadowBox, styleBase.row, styleBase.center, {
                        marginTop: 20,
                        marginHorizontal: 100
                    }]}>
                    <View style={[{marginVertical: 20}, styleBase.center]}>
                        <Fontello name="harvest" style={[styleBase.color2, {fontSize: 80}]}/>
                        <Text style={[{marginTop: 20}, styleBase.font16, styleBase.text4]}>
                            Yêu cầu nhập nguyên liệu
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const stateProps = (state) => {
    return {

    }
};

const dispatchToProps = {
    openPopup,
    renderPopup
}

export default connect(null, dispatchToProps)(POSInventoryRequest);