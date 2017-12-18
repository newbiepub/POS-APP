import React from "react";
import {ActivityIndicator, FlatList, InteractionManager, Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import styleBase from "../../style/base";
import * as _ from "lodash";
import {getInventoryProduct} from "../../../action/inventory";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {numberwithThousandsSeparator} from "../../reusable/function";
import NoData from "../../noData/noData";

class InventoryProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            refreshing: false
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    }

    async componentDidMount() {
        this.props.product.length ? null: await getInventoryProduct(this.props.account.access_token)
    }

    componentWillReceiveProps(nextProps) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({product: nextProps.product})
        })
    }

    componentWillUnmount() {
        this.setState({product: []});
    }

    renderItem({item, index}) {
        return <InventoryProductItem key={index} item={item}/>
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
            let { account } = this.props;
            await getInventoryProduct(account.access_token);
        } catch(e) {
            alert(e);
        }
        this.setState({refreshing: false})
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <InventoryProductSearch instance={this}/>
                {
                    this.state.product.length === 0 &&
                        <View style={[styleBase.container, styleBase.center]}>
                            <ActivityIndicator size={"large"}/>
                        </View>
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
                {
                    this.state.product === "No Data" &&
                        <NoData />
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
        item: React.PropTypes.object
    };

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
                        {numberwithThousandsSeparator(this.props.item.price) + "đ"}
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4]}>
                        {this.props.item.quantity > 0 ? `${this.props.item.quantity} ${this.props.item.unit}` : "Đã bán hết"}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class InventoryProductSearch extends React.Component {
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
            let data = this.props.instance.props.product;
            let newData = data.filter(item => item.name.indexOf(searchText) > -1);
            this.props.instance.setState({product: !newData.length ? "No Data" : newData});
        } catch(e) {
            console.warn("Error - onChangeText - InventoryProductSearch");
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
        product: state.inventory.product
    }
}

export default connect(mapStateToProps, null)(InventoryProduct);