import React from "react";
import {Text, TouchableOpacity, View, Alert} from "react-native";
import styleBase from "../../style/base";
import Fontello from "../../fontello/Fontello";
import {connect} from "react-redux";
import {openPopup, renderPopup} from "../../../action/popup";
import InventoryRequestProduct from "../../popup/inventory/request/InventoryRequestProduct";
import {checkDelivery, getExportIngredient, getExportProduct} from "../../../action/inventoryActivity";
import InventoryRequestIngredient from "../../popup/inventory/request/InventoryRequestIngredient";
import InventoryVerifyDelivery from "../../popup/inventory/request/InventoryVerifyDelivery";

class POSInventoryRequest extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};

    loadData() {
        getExportProduct()
        getExportIngredient();
    }

    componentWillMount() {
        this.loadData();
    }

    onRequestProduct() {
        this.props.openPopup();
        this.props.renderPopup(<InventoryRequestProduct {...this.props}/>)
    }

    onRequestIngredient() {
        this.props.openPopup();
        this.props.renderPopup(<InventoryRequestIngredient {...this.props}/>)
    }

    async onRequestProcessing() {
        try {
            let check = await checkDelivery();
            if(check) {
                this.loadData();
                this.props.openPopup();
                return this.props.renderPopup(<InventoryVerifyDelivery {...this.props}/>)
            }
        } catch (e) {
            alert(e);
        }
        Alert.alert("Thông báo", "Không có yêu cầu nhập kho nào");
    }

    render() {
        return (
            <View style={[styleBase.container, {marginTop: 30}]}>
                <TouchableOpacity
                    onPress={this.onRequestProcessing.bind(this)}
                    style={[styleBase.whiteBackground, styleBase.shadowBox, styleBase.row, styleBase.center,
                        {marginHorizontal: 100}]}>
                    <View
                        style={[{marginVertical: 20}, styleBase.center]}>
                        <Fontello name="cogwheel" style={[styleBase.color2, {fontSize: 80}]}/>
                        <Text style={[{marginTop: 20}, styleBase.font16, styleBase.text4]}>
                            Xác nhận nhập kho
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
        ingredient: state.inventoryActivity.exportIngredient,
        product: state.inventoryActivity.exportProduct
    }
};

const dispatchToProps = {
    openPopup,
    renderPopup
}

export default connect(stateProps, dispatchToProps)(POSInventoryRequest);