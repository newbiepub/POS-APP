import React from "react";
import {Button, Icon, Title, TouchableOpacity, View} from "@shoutem/ui";
import {StyleSheet} from "react-native";
import styleBase from "../../../styles/base";
import {closePopup} from "../../../component/popup/actions/popupAction";
import { Form, Input, Item, Label } from "native-base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";

class POSCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <View
                style={StyleSheet.flatten([styleBase.bgWhite, styleBase.m_xl_horizontal, styleBase.m_xl_vertical, styleBase.grow])}>
                <View styleName="horizontal v-center space-between" style={StyleSheet.flatten([styleBase.panelHeader])}>
                    <TouchableOpacity
                        onPress={() => closePopup()}>
                        <Icon name="close"/>
                    </TouchableOpacity>
                    <Title>
                        TẠO ĐIỂM BÁN HÀNG
                    </Title>
                    <Button
                        style={{backgroundColor: "transparent"}}
                        onPress={() => closePopup()}>
                        <Title>
                            TẠO
                        </Title>
                    </Button>
                </View>
                <POSForm/>
            </View>
        )
    }
}

class POSForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.fields.forEach((item, index) => {
            this.state[item.fieldName] = item.value
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState
    }

    static propTypes = {
        fields: PropTypes.array
    };

    static defaultProps = {
        fields: [
            {
                label: "Tên đăng nhập (bắt buộc)",
                secureTextEntry: false,
                fieldName: "username",
                value: "",
                type: "default",
                validator: {}
            },
            {
                label: "Mật khẩu (bắt buộc)",
                secureTextEntry: true,
                fieldName: "password",
                value: "",
                type: "default",
                validator: {}
            },
            {
                label: "Tên POS (bắt buộc)",
                secureTextEntry: false,
                fieldName: "name",
                value: "",
                type: "default",
                validator: {}
            },
            {
                label: "Địa chỉ (bắt buộc)",
                secureTextEntry: false,
                fieldName: "address",
                value: "",
                type: "default",
                validator: {}
            },
            {
                label: "Số điện thoại (bắt buộc)",
                secureTextEntry: false,
                fieldName: "phoneNumber",
                value: "",
                type: "numeric",
                validator: {}
            },

        ]
    };

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={[styleBase.p_md_horizontal, styleBase.p_sm_vertical]}>
                <Form>
                    {
                        this.props.fields.map((item, index) => {
                            return (
                                <Item key={index} floatingLabel>
                                    <Label>{item.label}</Label>
                                    <Input
                                        keyboardType={item.type}
                                        onChangeText={text => {
                                            let newState = {};
                                            newState[item.fieldName]= text;
                                            this.setState(newState);
                                        }}
                                        secureTextEntry={item.secureTextEntry || false}
                                        value={this.state[item.fieldName]}
                                    />
                                </Item>
                            )
                        })
                    }
                </Form>
            </KeyboardAwareScrollView>
        )
    }
}

export default POSCreator