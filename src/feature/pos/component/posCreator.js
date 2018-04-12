import React from "react";
import {StyleSheet, Dimensions, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import styleBase from "../../../styles/base";
import {closePopup} from "../../../component/popup/actions/popupAction";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
import {createPOS, getAllPOS} from "../action/posAction";
import {pick} from "../../../utils/utils";

class POSCreator extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {};

    static defaultProps = {};

    async onCreatePOS() {
        try {
            let validator = this.refs.posCreator.getFormValidation(),
                formData = this.refs.posCreator.getValue(),
                messageValidator = this.refs.posCreator.getMessageValidator();
            let fields = Object.keys(formData);

            for(let field of fields) {
                if(!formData[field].length || !validator["validator"+field]) {
                    return alert(messageValidator[`messageValidator${field}`]);
                }
            }

            this.props.addNewPOS({
                variables: formData,
                optimisticResponse: {
                    addNewPOS: {
                        __typename: "CurrentEmployee",
                        _id: Math.round(Math.random() * -1000000).toString(),
                        profile: {
                            __typename: "CurrentEmployee_Profile",
                            name: formData.name,
                            address: formData.address,
                            phoneNumber: formData.phoneNumber
                        },
                        username: formData.username,
                        companyId: ""
                    }
                },
                update (store, {data: {addNewPOS}}) {
                    try {
                        const data = store.readQuery({query: getAllPOS});
                        console.log("Add New POS: ", addNewPOS);
                        data.getAllPOS.push(addNewPOS);
                        console.log("new Data: ", data);
                        store.writeQuery({query: getAllPOS, data});
                    }
                    catch(e) {
                        console.warn("error - update - addNewPOS")
                    }
                }
            });

            closePopup(); // Close Popup
        }
        catch (e) {
            alert(e.message);
            console.warn("error - onCreatePOS")
        }
    }

    modalStyle() {
        let screenWidth = Dimensions.get("window").width;
        if (screenWidth >= 768) return [styleBase.bgWhite, styleBase.m_xl_horizontal, styleBase.m_xl_vertical, styleBase.grow];
        else return [styleBase.bgWhite, styleBase.grow];
    }

    render() {
        return (
            <SafeAreaView style={[styleBase.container]}>
                <View
                    style={StyleSheet.flatten(this.modalStyle())}>
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
                            onPress={() => this.onCreatePOS()}>
                            <Title>
                                TẠO
                            </Title>
                        </Button>
                    </View>
                    <POSForm ref="posCreator"/>
                </View>
            </SafeAreaView>
        )
    }
}

class POSForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.fields.forEach((item, index) => {
            this.state[item.fieldName] = item.value;
            this.state["messageValidator"+item.fieldName] = item.messageValidator;
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
                validator: (v) => {
                    return v.length >= 6;
                },
                messageValidator: "Tên đăng nhập phải 6 kí tự trở lên"
            },
            {
                label: "Mật khẩu (bắt buộc)",
                secureTextEntry: true,
                fieldName: "password",
                value: "",
                type: "default",
                validator: (v) => {
                    return v.length >= 6;
                },
                messageValidator: "Mật khẩu phải 6 kí tự trở lên"
            },
            {
                label: "Tên POS (bắt buộc)",
                secureTextEntry: false,
                fieldName: "name",
                value: "",
                type: "default",
                validator: (v) => true,
                messageValidator: "Tên POS là bắt buộc"
            },
            {
                label: "Địa chỉ (bắt buộc)",
                secureTextEntry: false,
                fieldName: "address",
                value: "",
                type: "default",
                validator: (v) => true,
                messageValidator: "Địa chỉ POS là bắt buộc"
            },
            {
                label: "Số điện thoại (bắt buộc)",
                secureTextEntry: false,
                fieldName: "phoneNumber",
                value: "",
                type: "numeric",
                validator: (v) => {
                    return new RegExp(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/igm).test(v);
                },
                messageValidator: "Số điện thoại không hợp lệ"
            },

        ]
    };

    getMessageValidator() {
        return pick(this.state, this.props.fields.map(item => `messageValidator${item.fieldName}`));
    }

    getFormValidation() {
        return pick(this.state, this.props.fields.map(item => `validator${item.fieldName}`));
    }

    getValue() {
        return pick(this.state, this.props.fields.map(item => item.fieldName));
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={[styleBase.p_md_horizontal, styleBase.p_sm_vertical]}>
                {
                    this.props.fields.map((item, index) => {
                        return (
                            <View key={index} styleName="md-gutter-vertical">
                                <FormGroup styleName="stretch">
                                    <TextInput
                                        placeholder={item.label}
                                        keyboardType={item.type}
                                        secureTextEntry={item.secureTextEntry}
                                        onChangeText={(text) => {
                                            let newState = {};
                                            newState[item.fieldName] = text;
                                            newState["validator"+item.fieldName] = item.validator(text);
                                            this.setState(newState);
                                        }}
                                        value={this.state[item.fieldName]}
                                    />
                                    {
                                        (this.state[item.fieldName].length > 0) &&
                                        <View style={{position: "absolute", right: 0}}>
                                            {
                                                this.state["validator"+item.fieldName] ?
                                                    <Icon name="checkbox-on" style={{color: "green"}}/>
                                                    :
                                                    <Icon name="error" style={{color: "red"}}/>
                                            }
                                        </View>
                                    }
                                </FormGroup>
                                <Divider styleName="line"/>
                            </View>
                        )
                    })
                }
            </KeyboardAwareScrollView>
        )
    }
}

export default POSCreator;