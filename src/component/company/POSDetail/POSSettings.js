import React from "react";
import {Text, TouchableOpacity, View, Alert} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import styleBase from "../../style/base";
import {TextInputNormal, TextInputPriceMask} from "../../reusable/text";
import LoadingOverlay from "../../loadingOverlay/loadingOverlay";
import {getEmployee, updateEmployee} from "../../../action/employeeCompany";

class POSSettings extends React.Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
    }

    static propTypes = {
        item: React.PropTypes.object,
        type: React.PropTypes.string
    };

    static defaultProps = {
        item: {}
    };

    async update() {
        let { loadingOverlay } = this.refs;
        try {
            if (!this.props.item.username.length) return Alert.alert("Cảnh báo", "Không được để trống tên đăng nhập");
            if (!this.props.item.name.length) return Alert.alert("Cảnh báo", "Không được bỏ trống tên");

            loadingOverlay.setLoading();
            await updateEmployee(this.props.item);
            Alert.alert("Thành Công", "Cập nhật thành công", [{text: "OK", onPress: () => {
                getEmployee()
            }}]);
        } catch (e) {
            alert(e);
        }
        loadingOverlay.stopLoading();
    }

    deactivate() {

    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <POSForm {...this.props} instance={this} item={this.props.item}
                         update={this.update.bind(this)}
                         deactivate={this.deactivate.bind(this)}
                />
                <LoadingOverlay ref="loadingOverlay"/>
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
        item: React.PropTypes.object,
        update: React.PropTypes.func,
        deactivate: React.PropTypes.func
    };

    static defaultProps = {
        item: React.PropTypes.object,
        update: () => {
        },
        deactivate: () => {
        }
    };

    update() {
        this.props.update();
    }

    deactivate() {
        this.props.deactivate();
    }

    render() {
        let {instance} = this.props;
        return (
            <KeyboardAwareScrollView>
                <View style={[styleBase.row, {padding: 15, paddingVertical: 30}]}>
                    <Text style={[styleBase.font18, styleBase.text4, styleBase.bold]}>
                        Cập nhật
                    </Text>
                </View>
                <View style={[{paddingHorizontal: 20}]}>
                    <TextInputNormal
                        style={[styleBase.borderBottomE5, {paddingVertical: 20, marginHorizontal: 30}]}
                        placeholder="Tên đăng nhập"
                        onChangeText={(username) => {
                            this.setState({username});
                            instance.item.username = username.toLowerCase();
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
                <View style={[{marginVertical: 20}, styleBase.row]}>
                    <View style={[{flex: .5}, styleBase.center]}>
                        <View style={[{flex: .5}, styleBase.center]}>
                            <TouchableOpacity
                                onPress={this.update.bind(this)}
                                style={[styleBase.background2, {
                                    paddingVertical: 15,
                                    paddingHorizontal: 20,
                                    borderRadius: 5
                                }]}>
                                <Text style={[styleBase.textWhite, styleBase.font16]}>
                                    Cập nhật
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[{flex: .5}, styleBase.center]}>
                        <TouchableOpacity
                            onPress={this.deactivate.bind(this)}
                            style={[styleBase.backgroundError, {
                                paddingVertical: 15,
                                paddingHorizontal: 20,
                                borderRadius: 5
                            }]}>
                            <Text style={[styleBase.textWhite, styleBase.font16]}>
                                Ngừng Hoạt Động
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

export default POSSettings