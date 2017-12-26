import React from "react";
import {View, ScrollView, Text, TouchableOpacity} from "react-native";
import {Navigator} from "react-native-deprecated-custom-components";
import styleBase from "../../style/base";
import Fontello from "../../fontello/Fontello";
import InventoryProduct from "./InventoryProduct";
import {getPOSInventory} from "../../../action/inventory";
import * as _ from "lodash";
import InventoryIngredient from "./InventoryIngredient";
import {getInventoryIngredient, getInventoryProduct} from "../../../action/companyInventory";

class InventoryManagementNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = null;
    }

    async componentWillMount() {
        try {
            await getInventoryIngredient();
            await getInventoryProduct()
        } catch (e) {
            console.warn(JSON.stringify(e));
        }
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "main":
                return <InventoryManagement {...this.props} navigator={navigator}/>;
            case "product":
                return <InventoryProduct {...this.props} navigator={navigator}/>
            case "ingredient":
                return <InventoryIngredient {...this.props} navigator={navigator}/>
        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <Navigator
                    ref={(ref) => {
                        this.navigator = ref;
                    }}
                    initialRoute={{id: 'main', index: 0}}
                    configureScene={this.configureScene.bind(this)}
                    renderScene={this.renderScene.bind(this)}
                />
            </View>
        )
    }
}

class InventoryManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            POSInventory: {}
        }
    }

    static propTypes = {};

    static defaultProps = {};

    async loadData() {
        try {
            let POSInventory = await getPOSInventory(this.props.employee._id);
            this.setState({POSInventory: POSInventory || {}})
        } catch (e) {
            this.setState({POSInventory: "No Data"})
        }
    }

    async componentDidMount() {
        await this.loadData()
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity
                    onPress={() => this.props.navigator.push({id: "product"})}
                    style={[
                        styleBase.backgroundGreen, styleBase.shadowBox,
                        {
                            paddingVertical: 15,
                            paddingHorizontal: 20, marginHorizontal: 20, marginVertical: 30
                        }]}>
                    <View style={[styleBase.center, styleBase.row]}>
                        <Fontello name="warehouse" style={[{fontSize: 90}, styleBase.textE5]}/>
                        <Text style={[styleBase.font16, styleBase.textWhite, styleBase.bold, {
                            marginTop: 20,
                            marginLeft: 10
                        }]}>
                            Kho Sản Phẩm
                        </Text>
                    </View>
                    <View style={[styleBase.row, styleBase.center, {marginTop: 20}]}>
                        <Text style={[styleBase.font16, styleBase.textWhite, styleBase.bold]}>
                            Tổng Số lượng:
                        </Text>
                        <Text style={[styleBase.font16, styleBase.textWhite, {marginLeft: 10}]}>
                            {!_.isEmpty(this.state.POSInventory) && this.state.POSInventory.productItems.reduce((total, item) => {
                                return total + (+item.quantity)
                            }, 0)} sản phẩm
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigator.push({id: "ingredient"})}
                    style={[
                        styleBase.backgroundYellow, styleBase.shadowBox,
                        {
                            marginTop: 50,
                            paddingVertical: 15,
                            paddingHorizontal: 20, marginHorizontal: 20, marginVertical: 30
                        }]}>
                    <View style={[styleBase.center, styleBase.row]}>
                        <Fontello name="harvest" style={[{fontSize: 90}, styleBase.textE5]}/>
                        <Text style={[styleBase.font16, styleBase.textWhite, styleBase.bold, {
                            marginTop: 20,
                            marginLeft: 10
                        }]}>
                            Kho nguyên liệu
                        </Text>
                    </View>
                    <View style={[styleBase.row, styleBase.center, {marginTop: 20}]}>
                        <Text style={[styleBase.font16, styleBase.textWhite, styleBase.bold]}>
                            Tổng Số lượng:
                        </Text>
                        <Text style={[styleBase.font16, styleBase.textWhite, {marginLeft: 10}]}>
                            {!_.isEmpty(this.state.POSInventory) && this.state.POSInventory.ingredient.reduce((total, item) => {
                                return total + (+item.quantity)
                            }, 0)} nguyên liệu
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default InventoryManagementNavigator