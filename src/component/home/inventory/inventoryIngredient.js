import React from "react";
import {Text, TouchableOpacity, View, InteractionManager, ActivityIndicator, FlatList, TextInput} from "react-native";
import styleBase from "../../style/base";
import {connect} from "react-redux";
import * as _ from "lodash";
import {getInventoryIngredient} from "../../../action/inventory";
import NoData from "../../noData/noData";
import {openPopup, renderPopup} from "../../../action/popup";
import IngredientCreatorModal from "../../popup/inventory/inventoryIngredientModal";
import {numberwithThousandsSeparator} from "../../reusable/function";
import EvilIcons from "react-native-vector-icons/EvilIcons";

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: this.props.ingredient
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let ingredient = !_.isEqual(this.state.ingredient, nextState.ingredient);
        return ingredient;
    }

    async componentDidMount() {
        this.props.ingredient.length ? null : await getInventoryIngredient(this.props.account.access_token)
    }

    componentWillReceiveProps(nextProps) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ingredient: nextProps.ingredient});
        })
    }

    onAddIngredient() {
        this.props.openPopup();
        this.props.renderPopup(<IngredientCreatorModal type="create" item={{
            name: "",
            description: "",
            unit: "",
            price: 0,
            quantity: 0
        }}/>)
    }

    onPressIngredientItem(item) {
        this.props.openPopup();
        this.props.renderPopup(<IngredientCreatorModal type="update" item={item}/>)
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <InventoryIngredientSearch instance={this}/>
                <View style={[styleBase.container, {paddingVertical: 30}]}>
                    <TouchableOpacity onPress={this.onAddIngredient.bind(this)} style={[styleBase.row, styleBase.center,
                        {
                            marginHorizontal: 50, paddingVertical: 15, borderRadius: 5,
                            backgroundColor: "#f9f9f9", borderColor: "#999", borderWidth: 0.5
                        }]}>
                        <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                            Thêm Nguyên Liệu
                        </Text>
                    </TouchableOpacity>
                    {
                        this.state.ingredient.length === 0 &&
                        <View style={{paddingTop: 30}}>
                            <ActivityIndicator size="large"/>
                        </View>

                    }
                    {
                        (this.state.ingredient.length > 0 && this.state.ingredient !== "No Data") &&
                        <ListIngredient {...this.props} onPressItem={this.onPressIngredientItem.bind(this)}
                                        data={this.state.ingredient}/>
                    }
                    {
                        this.state.ingredient === "No Data" &&
                        <NoData/>
                    }
                </View>
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
        data: React.PropTypes.array,
        onPressItem: React.PropTypes.func
    };

    static defaultProps = {
        data: [],
        onPressItem: () => {
        }
    };

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
        return <IngredientItem key={index} item={item} onPressItem={this.props.onPressItem}/>
    };

    async onRefresh() {
        try {
            let {account} = this.props;
            this.setState({refreshing: true});
            await getInventoryIngredient(account.access_token);
        } catch (e) {
            alert(e);
        }
        this.setState({refreshing: false});
    }

    render() {
        return (
            <View style={[styleBase.container, {padding: 15}]}>
                <FlatList
                    data={this.props.data}
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
        onPressItem: React.PropTypes.func
    };

    static defaultProps = {
        item: {},
        onPressItem: () => {
        }
    };

    onPressItem() {
        this.props.onPressItem(this.props.item);
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
                        {this.props.item.quantity > 0 ? `${this.props.item.quantity} ${this.props.item.unit}` : "Hết Nguyên Liệu"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class InventoryIngredientSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    static propTypes = {
        instance: React.PropTypes.object
    };

    static defaultProps = {
        instance: {}
    };

    onChangeText(searchText) {
        try {
            this.setState({searchText});
            let data = this.props.instance.props.ingredient;
            let newData = data.filter(item => item.name.indexOf(searchText) > -1);
            this.props.instance.setState({ingredient: !newData.length ? "No Data" : newData});

        } catch (e) {
            alert(e);
            console.warn("Error - onChangeText - InventoryIngredientSearch");
        }
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

const mapStateToProps = (state) => {
    return {
        account: state.account,
        ingredient: state.inventory.ingredient
    }
};

const mapDispatchToProps = {
    openPopup,
    renderPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);