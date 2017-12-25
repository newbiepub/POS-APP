import React from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import styleHome from "../../style/home";
import styleBase from "../../style/base";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {TextLarge, TextNormal} from "../../reusable/text";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Navigator } from "react-native-deprecated-custom-components";
import {getPOSInventory} from "../../../action/inventory";
import {numberwithThousandsSeparator} from "../../reusable/function";
import {getProduct} from "../../../action/product";
import NoData from "../../noData/noData";
import * as _ from "lodash";

class InventoryNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "inventorycategory":
                return <InventoryCategory {...this.props} navigator={navigator} parentNavigator={this.props.navigator}/>;
            case "categoryproduct":
                return <InventoryCategoryProduct {...this.props} categoryId={route.categoryId} navigator={navigator}/>
        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.whiteBackground]}>
                <Navigator
                    ref='navigator'
                    initialRoute={{id: 'inventorycategory', index: 0}}
                    renderScene={this.renderScene.bind(this)}
                    configureScene={this.configureScene.bind(this)}
                />
            </View>
        )
    }
}

class InventoryCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category
        }
    }

    static propTypes = {};

    static defaultProps = {};

    onPressItem(item) {
        this.props.navigator.push({id: "categoryproduct", categoryId: item._id})
    }

    renderItem({item, index}) {
        return (
            <TouchableOpacity onPress={() => this.onPressItem(item)}>
                <View style={[styleHome.categoryBar]}>
                    <TextNormal style={{flex: 1}}>{item.name}</TextNormal>
                    <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.whiteBackground]}>
                <View
                    style={[styleHome.header, styleBase.borderBottomE5, styleBase.whiteBackground,
                        styleBase.centerHorizontal, styleBase.row, {marginBottom: 15}]}>
                    <TouchableOpacity onPress={() => this.props.parentNavigator.pop()}>
                        <View style={[styleHome.menuButton]}>
                            <Ionicons name="md-arrow-back" style={[styleBase.vector26, styleBase.color3]}/>
                        </View>
                    </TouchableOpacity>
                    <View style={[styleBase.center, styleBase.wrappedText]}>
                        <TextLarge style={[styleBase.color3]}>Loại hàng</TextLarge>
                    </View>
                </View>
                {
                    this.state.category.length > 0 && this.state.category !== undefined ?
                        <FlatList
                            data={this.state.category}
                            extraData={this.state}
                            initialNumToRender={15}
                            keyExtractor={(item) => item._id}
                            renderItem={this.renderItem.bind(this)}
                        /> :
                        <NotFound/>
                }


            </View>
        )
    }
}

class InventoryCategoryProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product.filter(item => item.categoryId === this.props.categoryId),
            POSInventory: {},
            refreshing: false
        }
    }

    renderHeaderComponent() {
        return (
            <View style={[styleBase.row, styleBase.grow, {padding: 15}]}>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Tên Sản Phẩm
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Giá
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Số Lượng Còn
                    </Text>
                </View>
            </View>
        )
    }

    async loadData() {
        try {
            let POSInventory = await getPOSInventory(this.props.employee._id);
            this.setState({POSInventory: POSInventory || {}})
        } catch(e) {
            this.setState({POSInventory: "No Data"})
        }
    }

    async componentDidMount() {
        await this.loadData()
    }

    async onRefresh() {
        try {
            this.setState({refreshing: true});
            await this.loadData();
            await this.props.getProduct();
        } catch(e) {
            console.warn("On refresh Inventory Product");
        }
        this.setState({refreshing: false})
    }

    renderItem({item, index}) {
        if(this.state.POSInventory != undefined && this.state.POSInventory !== "No Data") {
            let POSProduct = _.find(this.state.POSInventory.productItems, (item) => item.productId === item._id);
            return (
                <InventoryProductItem {...this.props} item={item} POSProduct={POSProduct}/>
            )
        }
        return (
            <InventoryProductItem {...this.props} item={item}/>
        )
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.whiteBackground]}>
                <View
                    style={[styleHome.header, styleBase.borderBottomE5, styleBase.whiteBackground,
                        styleBase.centerHorizontal, styleBase.row, {marginBottom: 15}]}>
                    <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                        <View style={[styleHome.menuButton]}>
                            <Ionicons name="md-close" style={[styleBase.vector26, styleBase.color3]}/>
                        </View>
                    </TouchableOpacity>
                    <View style={[styleBase.center, styleBase.wrappedText]}>
                        <TextLarge style={[styleBase.color3]}>Mặt hàng</TextLarge>
                    </View>
                </View>
                {
                    this.state.product.length === 0 &&
                    <NoData />
                }
                {
                    (this.state.product.length > 0 && this.state.product !== "No Data") &&
                    <FlatList
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        data={this.state.product}
                        keyExtractor={(item, index) =>index}
                        ListHeaderComponent={this.renderHeaderComponent.bind(this)}
                        renderItem={this.renderItem.bind(this)}
                    />
                }
            </View>
        )
    }
}

class InventoryProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        item: React.PropTypes.object,
        POSProduct: React.PropTypes.object
    };

    static defaultProps = {
        POSProduct: {}
    };


    getQuantity() {
        let quantity = this.props.POSProduct.quantity || 0;
        return quantity > 0 ? `${quantity} ${this.props.item.unit}` : "Đã bán hết"
    }

    render() {
        return (
            <TouchableOpacity style={[styleBase.row, {padding: 15}, styleBase.borderBottomE5]}>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text numberOfLines={1} style={[styleBase.font16, styleBase.text4]}>
                        {this.props.item.name}
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    <Text style={[styleBase.font16, styleBase.text4]}>
                        {numberwithThousandsSeparator(this.props.item.price[0].price) + "đ"}
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4]}>
                        {this.getQuantity()}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const stateToProps = (state) => {
    return {
        category: state.product.category,
        product: state.product.allProduct
    }
};

const dispatchProps = {
    getProduct
};

export default connect(stateToProps, dispatchProps) (InventoryNavigator);