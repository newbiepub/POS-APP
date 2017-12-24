import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styleBase from "../../../style/base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {TextInputNormal, TextInputPriceMask} from "../../../reusable/text";

class CreatePOSModal extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
    }

    static propTypes = {
        item: React.PropTypes.object,
        type: React.PropTypes.string
    };

    static defaultProps = {
        type: "create",
        item: {
            username: "",
            password: "",
            name: "",
            fund: 0,
        }
    };

    onCreateItem() {
        alert(JSON.stringify(this.item, null, 4));
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <ModalHeader {...this.props} onCreateItem={this.onCreateItem.bind(this)}/>
                <POSForm {...this.props} instance={this} item={this.props.item}/>
            </View>
        )
    }
}

class POSForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.item
    }

    static propTypes = {
        item: React.PropTypes.object
    };

    render() {
        let { instance } = this.props;
        return (
            <KeyboardAwareScrollView>
                <View style={[styleBase.row, {padding: 15, paddingVertical: 30}]}>
                    <Text style={[styleBase.font18, styleBase.text4, styleBase.bold]}>
                        Nhập liệu
                    </Text>
                </View>
                <View style={[{paddingHorizontal: 20}]}>
                    <TextInputNormal
                        style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                        placeholder="Tên đăng nhập"
                        onChangeText={(username) => {
                            this.setState({username});
                            instance.item.username = username;
                        }}
                        value={this.state.username}
                    />
                    <TextInputNormal
                        style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        onChangeText={(password) => {
                            this.setState({password});
                            instance.item.password = password;
                        }}
                        value={this.state.password}
                    />
                    <TextInputNormal
                        style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                        placeholder="Tên điểm bán hàng"
                        onChangeText={(name) => {
                            this.setState({name});
                            instance.item.name = name;
                        }}
                        value={this.state.name}
                    />
                    <TextInputPriceMask
                        style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                        placeholder="Vốn ban đầu"
                        onChangeText={(fund) => {
                            this.setState({fund});
                            instance.item.fund = fund;
                        }}
                        value={this.state.fund}
                    />
                </View>
            </KeyboardAwareScrollView>
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
        onCreateItem: React.PropTypes.func,
        onUpdateItem: React.PropTypes.func
    };

    static defaultProps = {
        type: "create",
        onCreateItem: () => {
        },
        onUpdateItem: () => {}
    };

    onCreateItem() {
        this.props.onCreateItem();
    }

    onUpdateItem() {
        this.props.onUpdateItem();
    }

    onPressAction() {
        if(this.props.type === "create") {
            this.onCreateItem();
        } else {
            this.onUpdateItem();
        }
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
                        {this.props.type === "create" ? "Tạo điểm bán hàng" : "Cập nhật điểm bán hàng"}
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
                        {this.props.type === "create" ? "Tạo" : "Cập nhật"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CreatePOSModal;