import React from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View, Alert} from "react-native";
import styleBase from "../../../style/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {closePopup} from "../../../../action/popup";
import {connect} from "react-redux";
import NoData from "../../../noData/noData";
import {numberwithThousandsSeparator} from "../../../reusable/function";
import LoadingOverlay from "../../../loadingOverlay/loadingOverlay";
import {
    getCompanyInventoryActivity, getInventoryActionIngredient, sendDelivery,
    sendExportIngredient
} from "../../../../action/inventoryActivity";

class InventoryRequestIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: this.props.ingredient,
            refreshing: false
        }
    }

    async componentWillMount() {
        try {
            if(this.props.fromCompany) {
                let ingredient = await getInventoryActionIngredient(this.props.employeeId);
                this.setState({ingredient});
            }
        } catch(e) {
            alert(e);
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

    async onPressAction() {
        let { loadingOverlay } = this.refs;
        try {
            loadingOverlay.setLoading();
            if(!this.props.fromCompany) {
                await sendExportIngredient();
            } else {
                await sendDelivery(this.props.employeeId, "ingredient");
            }

            Alert.alert("Thành Công", "Đã gửi yêu cầu thành công", [
                {text: "OK", onPress: () => {
                    this.props.closePopup();
                    if(this.props.fromCompany) {
                        getCompanyInventoryActivity()
                    }
                }}
            ])
        } catch(e) {
            alert(e);
        }
        loadingOverlay.stopLoading();
    }

    render() {
        return (
           <View style={[styleBase.container]}>
               <ModalHeader {...this.props} ingredient={this.state.ingredient} onPressAction={this.onPressAction.bind(this)}/>
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
               <LoadingOverlay ref="loadingOverlay" message="Đang gửi yêu cầu"/>
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
                        Yêu cầu nhập nguyên liệu
                    </Text>
                </View>
                <TouchableOpacity
                    disabled={(this.props.ingredient.length === 0 || this.props.ingredient === "No Data")}
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