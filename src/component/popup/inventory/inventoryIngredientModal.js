import React from "react";
import styleBase from "../../style/base";
import {Text, TouchableOpacity, View, Alert} from "react-native";
import * as _ from "lodash";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import {TextInputNormal} from "../../reusable/text";
import {numberwithThousandsSeparator} from "../../reusable/function";
import Ionicons from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import {closePopup} from "../../../action/popup";
import LoadingOverlay from "../../loadingOverlay/loadingOverlay";
import {createIngredient, deleteIngredient, getInventoryIngredient, updateIngredient} from "../../../action/companyInventory";

class IngredientCreatorModal extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    }

    static propTypes = {
        item: React.PropTypes.object,
        type: React.PropTypes.string
    };

    static defaultProps = {
        item: {
            name: "",
            description: "",
            unit: "",
            price: 0,
            quantity: 0
        },
        type: "create"
    };

    async onAddItem() {
        try {
            let validator = !this.item.name.length ? alert("Tên nguyên liệu bắt buộc")
                : !this.item.unit ? alert("Đơn vị bắt buộc") : true;
            if (validator !== true) {
                return;
            }

            let {loadingOverlay} = this.refs;
            if (loadingOverlay) {
                loadingOverlay.setLoading();
                let {account} = this.props;
                await createIngredient(this.item, account.access_token);
                Alert.alert("Thành Công", "Nguyên liệu đã được tạo", [
                    {text: "OK", onPress: () => this.props.closePopup()}
                ], { cancelable: false });
                loadingOverlay.stopLoading();
                await getInventoryIngredient(account.access_token);
            }
        } catch (e) {
            alert(e);
        }
    }

    async onUpdateItem() {
        try {
            let validator = !this.item.name.length ? alert("Tên nguyên liệu bắt buộc")
                : !this.item.unit ? alert("Đơn vị bắt buộc") : true;
            if (validator !== true) {
                return;
            }

            let {loadingOverlay} = this.refs;

            if (loadingOverlay) {
                loadingOverlay.setLoading();
                let {account} = this.props;
                await updateIngredient(this.item, account.access_token);
                Alert.alert("Thành Công", "Nguyên liệu đã cập nhật", [
                    {text: "OK", onPress: () => this.props.closePopup()}
                ], { cancelable: false });
                loadingOverlay.stopLoading();
                await getInventoryIngredient(account.access_token);
            }
        } catch(e) {
            alert(e);
        }
    }

    async onDeleteItem(item) {
        try {
            let {loadingOverlay} = this.refs;

            if (loadingOverlay) {
                loadingOverlay.setLoading();
                let { account } = this.props;
                await deleteIngredient(item, account.access_token);
                Alert.alert("Thành Công", "Nguyên liệu đã bị xoá", [
                    {text: "OK", onPress: () => this.props.closePopup()}
                ], { cancelable: false });
                loadingOverlay.stopLoading();
                await getInventoryIngredient(account.access_token);
            }
        } catch(e) {
            alert(e);
        }
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <ModalHeader
                    {...this.props}
                    onAddItem={this.onAddItem.bind(this)}
                    onUpdateItem={this.onUpdateItem.bind(this)}
                    type={this.props.type} instance={this}/>
                <ModalForm
                    {...this.props}
                    type={this.props.type}
                    onDeleteItem={this.onDeleteItem.bind(this)}
                    instance={this} item={this.props.item}/>
                <LoadingOverlay ref="loadingOverlay" message="Xin vui lòng chờ"/>
            </View>
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
                        {this.props.type === "create" ? "Thêm Nguyên Liệu" : "Cập Nhật Nguyên Liệu"}
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
                        {this.props.type === "create" ? "Tạo" : "Cập Nhật"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.item
    }

    static propTypes = {
        type: React.PropTypes.string,
        item: React.PropTypes.object,
        instance: React.PropTypes.object,
        onDeleteItem: React.PropTypes.func
    }
    ;

    static defaultProps = {
        item: {},
        onDeleteItem: () =>{},
        type: 'create'
    };

    onDeleteItem() {
        this.props.onDeleteItem(this.props.item)
    }

    onPressDelete() {
        Alert.alert("Cảnh báo", "Bạn có muốn xoá nguyên liệu này?", [
            {text: "Có", onPress: this.onDeleteItem.bind(this)},
            {text: "Không", style: 'cancel'}
        ])
    }

    render() {
        let {instance} = this.props;
        return (
            <KeyboardAwareScrollView>
                <View style={[styleBase.container]}>
                    <View style={[styleBase.row, {padding: 15, paddingVertical: 30}]}>
                        <Text style={[styleBase.font18, styleBase.text4, styleBase.bold]}>
                            Nhập liệu
                        </Text>
                    </View>
                    <View style={[{paddingHorizontal: 20}]}>
                        <TextInputNormal
                            style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                            placeholder="Tên nguyên liệu"
                            onChangeText={(name) => {
                                this.setState({name});
                                instance.item.name = name;
                            }}
                            value={this.state.name}
                        />
                        <TextInputNormal
                            keyboardType={'numeric'}
                            style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                            placeholder="0đ"
                            onChangeText={(text) => {
                                let newText = '';
                                let numbers = '0123456789';

                                for (let i = 0; i < text.length; i++) {
                                    if (numbers.indexOf(text[i]) > -1) {
                                        newText = newText + text[i];
                                    }
                                }

                                this.setState({price: newText});
                                instance.item.price = +newText
                            }}
                            value={`${this.state.price == 0 ? "" : numberwithThousandsSeparator(this.state.price)}`}
                        />
                        <TextInputNormal
                            style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                            placeholder="Đơn vị"
                            onChangeText={(unit) => {
                                this.setState({unit});
                                instance.item.unit = unit;
                            }}
                            value={this.state.unit}
                        />
                        <TextInputNormal
                            style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                            placeholder="Mô tả"
                            onChangeText={(description) => {
                                this.setState({description});
                                instance.item.description = description;
                            }}
                            value={this.state.description}
                        />
                        <TextInputNormal
                            keyboardType={'numeric'}
                            style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                            placeholder="Số lượng"
                            onChangeText={(text) => {
                                let newText = '';
                                let numbers = '0123456789';

                                for (let i = 0; i < text.length; i++) {
                                    if (numbers.indexOf(text[i]) > -1) {
                                        newText = newText + text[i];
                                    }
                                }

                                this.setState({quantity: newText});
                                instance.item.quantity = +newText;
                            }}
                            value={`${this.state.quantity == 0 ? "" : this.state.quantity}`}
                        />
                    </View>
                    {
                        this.props.type === "update" &&
                        <TouchableOpacity onPress={this.onPressDelete.bind(this)} style={[styleBase.row, styleBase.width60,
                            styleBase.backgroundError,
                            {
                                padding: 15,
                                paddingVertical: 30,
                                height: 54,
                                marginTop: 30,
                                alignSelf: 'center'
                            }, styleBase.center]}>
                            <Text style={[styleBase.textWhite, styleBase.font16]}>
                                Xoá
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

const mapDispatchToProps = {
    closePopup
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientCreatorModal);