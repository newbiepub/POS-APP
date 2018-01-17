import React from "react";
import {Text, TouchableOpacity, View, Alert} from "react-native";
import styleBase from "../../../style/base";
import {closePopup} from "../../../../action/popup";
import Ionicons from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import LoadingOverlay from "../../../loadingOverlay/loadingOverlay";
import {acceptDelivery} from "../../../../action/inventoryActivity";
import {getInventoryProduct} from "../../../../action/inventory";
import {getInventoryIngredient} from "../../../../action/inventory";

class InventoryVerifyDelivery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            ingredient: this.props.ingredient
        }
    }

    static propTypes = {};

    static defaultProps = {};

    componentWillReceiveProps (nextProps) {
        this.setState({product: nextProps.product, ingredient: nextProps.ingredient});
    }

    async onPressAction() {
        let { loadingOverlay } = this.refs;
        try {
            loadingOverlay.setLoading();
            await acceptDelivery()
            Alert.alert("Thành Công", "Đã xác nhận", [
                {
                    text: "OK", onPress: () => {
                        this.props.closePopup();
                        getInventoryProduct(this.props.account.access_token);
                        getInventoryIngredient(this.props.account.access_token);
                }
                }
            ])
        } catch(e) {

        }
        loadingOverlay.stopLoading();
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <ModalHeader {...this.props} onPressAction={this.onPressAction.bind(this)}/>
                <View style={[{padding: 15}]}>
                    <View>
                        <Text style={[styleBase.font18, styleBase.text4, styleBase.bold]}>
                            Nhập kho
                        </Text>
                    </View>
                    <View style={{padding: 20}}>
                        <View style={[styleBase.row, {justifyContent: "space-between"}]}>
                            <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                                Loại
                            </Text>
                            <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                                Số lượng
                            </Text>
                        </View>
                        <View style={[styleBase.row, {justifyContent: "space-between", marginTop: 20}]}>
                            <Text style={[styleBase.font16, styleBase.text4]}>
                                Sản phẩm
                            </Text>
                            <Text style={[styleBase.font16, styleBase.text4]}>
                                {this.state.product.reduce((total, item) => {return total += item.quantity},0)}
                            </Text>
                        </View>
                        <View style={[styleBase.row, {justifyContent: "space-between", marginTop: 20}]}>
                            <Text style={[styleBase.font16, styleBase.text4]}>
                                Nguyên liệu
                            </Text>
                            <Text style={[styleBase.font16, styleBase.text4]}>
                                {this.state.ingredient.reduce((total, item) => {return total += item.quantity},0)}
                            </Text>
                        </View>
                    </View>
                </View>
                <LoadingOverlay ref="loadingOverlay" message="Đang xác nhận"/>
            </View>
        )
    }
}

class ModalHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        type: React.PropTypes.string,
        instance: React.PropTypes.object,
        onPressAction: React.PropTypes.func,
        onUpdateItem: React.PropTypes.func,
    };

    static defaultProps = {
        onPressAction: () => {
        },
        onUpdateItem: () => {
        }
    };

    onPressAction() {
        this.props.onPressAction();
    }

    onCloseModal() {
        this.props.closePopup();
    }

    render() {
        return (
            <View style={[styleBase.row, {height: 60}, styleBase.borderBottomE5]}>
                <TouchableOpacity onPress={this.onCloseModal.bind(this)} style={[{
                    flex: 0.05,
                    paddingHorizontal: 15
                }, styleBase.center, styleBase.borderRightE5]}>
                    <Ionicons name="ios-close-outline" style={[{fontSize: 50}, styleBase.text4]}/>
                </TouchableOpacity>
                <View style={[{flex: 0.75, paddingHorizontal: 15}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font18, styleBase.bold, styleBase.text4]}>
                        Xác nhận nhập kho
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={this.onPressAction.bind(this)}
                    style={[{
                        flex: 0.2,
                        paddingVertical: 10,
                        paddingHorizontal: 15
                    }, styleBase.background2, styleBase.center]}>
                    <Text style={[styleBase.textWhite, styleBase.font18, {backgroundColor: "transparent"}]}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const stateToProps = (state) => {
    return {
        ingredient: state.inventoryActivity.exportIngredient,
        product: state.inventoryActivity.exportProduct,
        account: state.account
    }
};

const dispatchProps = {
    closePopup
}

export default connect(stateToProps, dispatchProps)(InventoryVerifyDelivery);