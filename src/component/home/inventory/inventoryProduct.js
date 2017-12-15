import React from "react";
import {ActivityIndicator, FlatList, InteractionManager, Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import styleBase from "../../style/base";
import * as _ from "lodash";
import {getInventoryProduct} from "../../../action/inventory";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {numberwithThousandsSeparator} from "../../reusable/function";

class InventoryProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        let product = !_.isEqual(this.state.product, nextState.product);
        return product;
    }

    async componentDidMount() {
       await getInventoryProduct(this.props.account.access_token);
    }

    componentWillReceiveProps(nextProps) {
        InteractionManager.runAfterInteractions(() => {
            this.setState({product: nextProps.product})
        })
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

    render() {
        return (
            <View style={[styleBase.container]}>
                <InventoryProductSearch/>
                {
                    this.state.product.length === 0 &&
                        <View style={[styleBase.container, styleBase.center]}>
                            <ActivityIndicator size={"large"}/>
                        </View>
                }
                {
                    this.state.product.length > 0 &&
                        <FlatList
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
                        {this.props.item.quantity > 0 ? this.props.item.quantity : "Đã bán hết"}
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

    render() {
        return (
            <View style={[styleBase.row, styleBase.borderBottomE5, styleBase.centerHorizontal,
                {paddingVertical: 10, paddingHorizontal: 15}]}>
                <EvilIcons name="search" style={[styleBase.vector26]}/>
                <TextInput
                    onChangeText={(searchText) => this.setState({searchText})}
                    style={[{height: 54}, styleBase.font16, styleBase.grow]}
                    placeholder={"Tìm Kiếm..."}
                />
            </View>
        )
    }
}


class InventoryProductModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>

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