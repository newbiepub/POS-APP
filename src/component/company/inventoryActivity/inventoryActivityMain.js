import React from "react";
import {View, FlatList, ActivityIndicator, Text, TouchableOpacity} from "react-native";
import styleBase from "../../style/base";
import * as _ from "lodash";
import moment from "../../momentJs";
import InventoryRequestProduct from "../../popup/inventory/request/InventoryRequestProduct";
import InventoryRequestIngredient from "../../popup/inventory/request/InventoryRequestIngredient";

class InventoryActivityMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryActions: this.props.inventoryActions
        }
    }

    static propTypes = {
        inventoryActions: React.PropTypes.array
    };

    static defaultProps = {
        inventoryActions: []
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state.inventoryActions, nextState.inventoryActions);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({inventoryActions: nextProps.inventoryActions});
    }

    formatDate(timestamp) {
        return moment(timestamp).format("h:mm:ss a")
    }

    renderSectionHeader() {
        return (
            <View style={[styleBase.row, styleBase.grow, {padding: 15}]}>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Tên POS
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Thời Gian
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Yêu cầu
                    </Text>
                </View>
            </View>
        )
    }

    onPressItem(item) {
        this.props.openPopup();
        if(item.type === "product") {
            this.props.renderPopup(<InventoryRequestProduct {...this.props}

                                                            product={item.productItems} fromCompany={true} employeeId={item.employeeId}/>)
        } else {
            this.props.renderPopup(<InventoryRequestIngredient {...this.props}

                                                               employeeId={item.employeeId}
                                                               ingredient={item.ingredient} fromCompany={true}/>)
        }

    }

    renderItem({item, index}) {
        return (
            <TouchableOpacity
                onPress={() => {this.onPressItem(item)}}
                style={[styleBase.row, {padding: 15}, styleBase.borderBottomE5]}>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text numberOfLines={1} style={[styleBase.font16, styleBase.text4]}>
                        {item.employee.hasOwnProperty("employeeProfile") ? (item.employee.employeeProfile.name || "") : ""}
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    <Text style={[styleBase.font16, styleBase.text4]}>
                        {this.formatDate(item.createdAt)}
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4]}>
                        {item.hasOwnProperty("productItems") ? item.productItems.reduce((total, item) => {return total += item.quantity},0) :
                            item.hasOwnProperty("ingredient") ? item.ingredient.reduce((total, item) => {return total += item.quantity }, 0) : 0
                        }
                        {
                            item.type === "ingredient" ? " Nguyên Liệu" : " Sản Phẩm"
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                {
                    this.state.inventoryActions.length === 0 &&
                    <View style={[styleBase.center]}>
                        <ActivityIndicator size="large"/>
                    </View>
                }
                {
                    this.state.inventoryActions.length > 0 &&
                    <FlatList
                        data={this.state.inventoryActions}
                        ListHeaderComponent={this.renderSectionHeader.bind(this)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem.bind(this)}
                    />
                }
            </View>
        )
    }
}

export default InventoryActivityMain;