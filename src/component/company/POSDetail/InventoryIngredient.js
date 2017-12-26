import React from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import styleBase from "../../style/base";
import {TextLarge} from "../../reusable/text";
import Ionicons from "react-native-vector-icons/Ionicons";
import styleHome from "../../style/home";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {getPOSInventory} from "../../../action/inventory";
import {connect} from "react-redux";
import {numberwithThousandsSeparator} from "../../reusable/function";
import * as _ from "lodash";
import NoData from "../../noData/noData";

class InventoryIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            POSInventory: {},
            ingredient: this.props.ingredient
        }
    }

    static propTypes = {
    };

    static defaultProps = {
    };

    componentWillReceiveProps (nextProps) {
        this.setState({ingredient: nextProps.ingredient});
    }

    async loadData() {
        try {
            let POSInventory = await getPOSInventory(this.props.employee._id);
            this.setState({POSInventory: POSInventory || {}})
        } catch(e) {
            this.setState({POSInventory: "No Data"})
        }
    }

    async componentWillMount() {
        await this.loadData();
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
                        <TextLarge style={[styleBase.color3]}>Danh Sách Nguyên Liệu</TextLarge>
                    </View>
                </View>
                <IngredientSearch {...this.props}/>
                {
                    this.state.ingredient.length === 0 &&
                    <NoData/>

                }
                {
                    (this.state.ingredient.length > 0 && this.state.ingredient !== "No Data") &&
                    <ListIngredient {...this.props}/>
                }
            </View>
        )
    }
}

class ListIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    static propTypes = {
        POSInventory: React.PropTypes.object,
    };

    static defaultProps = {
        POSInventory: {},
    };

    async onRefresh() {
        try {
            this.setState({refreshing: true});
        } catch (e) {
            alert(e);
        }
        this.setState({refreshing: false});
    }

    renderHeaderComponent() {
        return (
            <View style={[styleBase.row, styleBase.grow, {padding: 15}]}>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Tên Nguyên Liệu
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Giá Mua
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

    renderItem(item, index) {
        if(this.state.POSInventory != undefined && this.state.POSInventory !== "No Data") {
            let POSIngredient = _.find(this.state.POSInventory.ingredient, (item) => item.ingredientId === item._id);
            return (
                <IngredientItem {...this.props} item={item} POSIngredient={POSIngredient}/>
            )
        }
        return (
            <IngredientItem {...this.props} item={item}/>
        )
    };

    render() {
        return (
            <View style={[styleBase.container, {padding: 15}]}>
                <FlatList
                    data={this.props.ingredient}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    ListHeaderComponent={this.renderHeaderComponent.bind(this)}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                />
            </View>
        )
    }
}

class IngredientItem extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        item: React.PropTypes.object,
        POSIngredient: React.PropTypes.object
    };

    static defaultProps = {
        item: {},
        POSIngredient: {}
    };

    getQuantity() {
        let quantity = this.props.POSIngredient.quantity || 0;
        return quantity > 0 ? `${quantity} ${this.props.item.unit}` : "Hết Nguyên Liệu"
    }

    onPressItem() {

    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPressItem.bind(this)}
                              style={[styleBase.row, {padding: 15}, styleBase.borderBottomE5]}>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text numberOfLines={1} style={[styleBase.font16, styleBase.text4]}>
                        {this.props.item.name}
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    <Text style={[styleBase.font16, styleBase.text4]}>
                        {numberwithThousandsSeparator(this.props.item.price) + "đ"}
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

class IngredientSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: React.PropTypes.string
    };

    static defaultProps = {
        title: ""
    };

    onChangeText() {

    }

    render() {
        return (
            <View style={[styleBase.row, styleBase.borderBottomE5, styleBase.centerHorizontal,
                {paddingVertical: 10, paddingHorizontal: 15}]}>
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

const stateToProps = (state) => {
    return {
        ingredient: state.inventory.ingredient
    }
}

export default connect(stateToProps, null) (InventoryIngredient);