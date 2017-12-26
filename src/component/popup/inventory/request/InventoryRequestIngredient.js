import React from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import styleBase from "../../../style/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {closePopup} from "../../../../action/popup";
import {connect} from "react-redux";
import NoData from "../../../noData/noData";
import {numberwithThousandsSeparator} from "../../../reusable/function";

class InventoryRequestIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: this.props.ingredient,
            refreshing: false
        }
    }

    static propTypes = {};

    static defaultProps = {};

    componentWillReceiveProps(nextProps) {
        if(nextProps.ingredient.length)
            this.setState({ingredient: nextProps.ingredient});
        else
            this.setState({ingredient: "No Data"});
    }

    renderHeaderComponent() {
        return (
            <View style={[styleBase.row, styleBase.grow, {padding: 15}]}>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Tên nguyên liệu
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Giá
                    </Text>
                </View>
                <View style={[{flex: 0.33}, styleBase.centerVertical]}>
                    <Text style={[styleBase.font16, styleBase.text4, styleBase.bold]}>
                        Số lượng nhập
                    </Text>
                </View>
            </View>
        )
    }

    onRefresh() {

    }

    renderItem({item, index}) {
        return <InventoryRequestIngredientItem key={index} item={item}/>
    }

    render() {
        return (
           <View style={[styleBase.container]}>
               <ModalHeader {...this.props}/>
               {
                   this.state.ingredient.length === 0 &&
                   <View style={[styleBase.container, styleBase.center]}>
                       <ActivityIndicator size={"large"}/>
                   </View>
               }
               {
                   (this.state.ingredient.length > 0 && this.state.ingredient !== "No Data") &&
                   <FlatList
                       refreshing={this.state.refreshing}
                       onRefresh={this.onRefresh.bind(this)}
                       data={this.state.ingredient}
                       keyExtractor={(item, index) =>index}
                       ListHeaderComponent={this.renderHeaderComponent.bind(this)}
                       renderItem={this.renderItem.bind(this)}
                   />
               }
               {
                   this.state.ingredient === "No Data" &&
                   <NoData />
               }
           </View>
        )
    }
}

class InventoryRequestIngredientItem extends React.Component {
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

class ModalHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        type: React.PropTypes.string,
        instance: React.PropTypes.object,
        onAddItem: React.PropTypes.func,
        onUpdateItem: React.PropTypes.func,
    };

    static defaultProps = {
        onAddItem: () => {
        },
        onUpdateItem: () => {
        }
    };

    onUpdateItem() {
        this.props.onUpdateItem()
    }

    onAddItem() {
        this.props.onAddItem();
    }

    onPressAction() {
        this.props.type === 'create' ? this.onAddItem() : this.onUpdateItem();
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
                        Yêu cầu nhập nguyên liệu
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
                        Gửi
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const stateToProps = (state) => {
    return {
        ingredient: state.inventoryActivity.exportIngredient
    }
};

const dispatchProps = {
    closePopup
}


export default connect(stateToProps, dispatchProps) (InventoryRequestIngredient);