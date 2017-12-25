import React from "react";
import {ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TextLarge, TextSmall} from "../../reusable/text";
import styleHome from "../../style/home";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {Navigator} from "react-native-deprecated-custom-components";
import {connect} from "react-redux";
import {getPOSInventory} from "../../../action/inventory";
import NoData from "../../noData/noData";
import {getProduct} from "../../../action/productCompany";
import {numberwithThousandsSeparator} from "../../reusable/function";
import * as _ from "lodash";
import InventoryCategory from "./InventoryCategory";

class InventoryProduct extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = null;
        this.state = {
            searchText: ""
        }
    }

    static propTypes = {
        title: React.PropTypes.string
    };

    static defaultProps = {
        title: "Danh sách"
    };

    renderScene(route, navigator) {
        switch (route.id) {
            case "filter":
                return <InventoryEmployeeFilter {...this.props} navigator={navigator}/>;
            case "product":
                return <InventoryFilterProduct {...this.props} navigator={navigator}/>;
            case "category":
                return <InventoryCategory {...this.props} navigator={navigator}/>

        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromRight;
    }

    onChangeText(searchText) {
        this.setState({searchText});
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
                        <TextLarge style={[styleBase.color3]}>{this.props.title}</TextLarge>
                    </View>
                </View>
                <View style={[styleBase.container]}>
                    <InventoryProductSearch {...this.props} onChangeText={this.onChangeText.bind(this)}/>
                    {this.state.searchText.length === 0 &&
                    <Navigator
                        ref={(ref) => {
                            this.navigator = ref;
                        }}
                        initialRoute={{id: 'filter', index: 0}}
                        renderScene={this.renderScene.bind(this)}
                        configureScene={this.configureScene.bind(this)}
                    />
                    }
                    {
                        this.state.searchText.length > 0 &&
                        <InventoryFilterProduct {...this.props} product={this.props.product.filter(item => item.name.indexOf(this.state.searchText) > -1)}/>
                    }
                </View>
            </View>
        )
    }
}

class InventoryEmployeeFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {/*Product*/}
                <TouchableOpacity onPress={() => {
                    this.props.navigator.push({id: "product"});
                }}>
                    <View style={styleHome.itemBar}>
                        <View style={styleHome.itemBarIcon}>
                            <EvilIcons name="archive" style={[styleBase.vector26]}/>
                        </View>
                        <View style={styleHome.itemBarTitle}>
                            <TextSmall style={{flex: 1}}>
                                Mặt hàng
                            </TextSmall>
                            <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                        </View>
                    </View>
                </TouchableOpacity>
                {/*------category------------*/}
                <TouchableOpacity onPress={() => {
                    this.props.navigator.push({id: "category"});
                }}>
                    <View style={styleHome.itemBar}>
                        <View style={styleHome.itemBarIcon}>
                            <EvilIcons name="credit-card"
                                       style={styleBase.vector26}/>
                        </View>
                        <View style={[styleHome.itemBarTitle]}>
                            <TextSmall style={[{flex: 1}]}>
                                Loại hàng
                            </TextSmall>
                            <EvilIcons name="chevron-right" style={styleBase.vector32}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class InventoryFilterProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            POSInventory: {},
            refreshing: false,
            product: this.props.product
        }
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

    componentWillReceiveProps(nextProps) {
        this.setState({product: nextProps.product});
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
            <View style={[styleBase.container]}>
                <View
                    style={[styleHome.header, styleBase.borderBottomE5, styleBase.whiteBackground,
                        styleBase.centerHorizontal, styleBase.row, {marginBottom: 15}]}>
                    <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                        <View style={[styleHome.menuButton]}>
                            <Ionicons name="md-arrow-back" style={[styleBase.vector26, styleBase.color3]}/>
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

class InventoryProductSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeText(searchText) {
        this.props.onChangeText(searchText)
    }

    render() {
        return (
            <View style={[styleBase.row, styleBase.borderBottomE5, styleBase.centerHorizontal,
                {paddingHorizontal: 15}]}>
                <EvilIcons name="search" style={[styleBase.vector26]}/>
                <TextInput
                    onChangeText={this.onChangeText.bind(this)}
                    style={[{height: 54}, styleBase.font16, styleBase.grow]}
                    placeholder={"Tìm Kiếm..."}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product.allProduct
    }
};

const dispatchToProps = {
    getProduct
};

export default connect(mapStateToProps, dispatchToProps)(InventoryProduct);