import React from "react";
import PropTypes from "prop-types";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import styleBase from "../../../../styles/base";
import EStyleSheet from "react-native-extended-stylesheet";
import {equals} from "../../../../utils/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {POS_MANAGEMENT} from "../../action/posAction";

const customStyles = EStyleSheet.create({
    inputGroup: {
        flexDirection: 'row'
    },
    font16: {
        fontSize: 16
    },
    label: {
        flex: 0.2,
        marginHorizontal: 5,
    },
    inputWrapper: {
        flex: 0.8
    },
    formWidth: {
        width: '80%'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#e5e5e5',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    errorInput: {
        borderColor: 'red'
    },
    greenInput: {
        borderColor: 'green'
    },
    bgGreen: {
        backgroundColor: '#55db55'
    },
    red: {
        backgroundColor: '#ed5e67'
    }
})

class POSInfo extends React.Component {
    constructor(props) {
        super(props);
        this.formData = [
            {
                label: 'TÊN ĐĂNG NHẬP',
                value: 'username',
                validate: (v) => v.length > 6,
                message: 'TÊN ĐĂNG NHẬP PHẢI CÓ 6 KÍ TỰ',
            },
            {
                label: 'MẬT KHẨU',
                type: 'password',
                value: 'password',
                validate: (v) => v.length > 6,
                message: 'MẬT KHẨU PHẢI CÓ 6 KÍ TỰ',
            },
            {
                label: 'TÊN ĐIỂM BÁN HÀNG',
                value: 'name',
                validate: (v) => true,
                message: '',
            },
            {
                label: 'ĐỊA CHỈ',
                value: 'address',
                validate: (v) => true,
                message: '',
            },
            {
                label: 'SỐ ĐIỆN THOẠI',
                value: 'phoneNumber',
                validate: (v) => true,
                message: '',
            },
        ]
        this.state = {
            username: '',
            password: '',
            name: '',
            address: '',
            phoneNumber: '',
            onSubmitting: false
        }

        this.handlePressDeactivate = this.handlePressDeactivate.bind(this);
        this.handlePressUpdate     = this.handlePressUpdate.bind(this);
    }

    componentDidMount() {
        this.setState({
            username: this.props.user.username,
            name: this.props.user.profile.name,
            address: this.props.user.profile.address,
            phoneNumber: this.props.user.profile.phoneNumber
        })
    }

    /**
     * Handler
     */

    handleSubmitForm () {
        // Validate input
        for (let form of this.formData) {
            if(equals(this.state[`error-${form.value}`], customStyles.errorInput))
                alert(form.message)
        }


    }

    handleChangeText(text, form) {
        this.setState(state => {
            state[form.value] = text;

            if(form.validate(text)) {
                state[`error-${form.value}`] = customStyles.greenInput
            } else {
                state[`error-${form.value}`] = customStyles.errorInput
            }
            return {
                ...state
            }
        })
    }

    async handleUpdate() {
        try {
            let {user} = this.props;
            let { username, password, name, address, phoneNumber } = this.state;

            await POS_MANAGEMENT.UPDATE_POS(user._id, username, password, name, address, phoneNumber)
        } catch (e) {
            Alert.alert('THÔNG BÁO!', "ĐÃ CÓ LỖI XẢY RA");
        }
    }

    handlePressUpdate() {
        this.handleUpdate()
        this.props.navigator.pop();
    }

    async handleDeactivate (status) {
        try {
            let {user} = this.props;
            await POS_MANAGEMENT.DEACTIVATE_POS(user._id, status)
        } catch (e) {
            Alert.alert('THÔNG BÁO!', "ĐÃ CÓ LỖI XẢY RA");
        }
    }

    handlePressDeactivate(active = false) {
        if(this.state.onSubmitting) {
            active ? this.handleDeactivate('deactivate') : this.handleDeactivate('activate');
            return this.props.navigator.pop();
        }
        this.setState({
            onSubmitting: true
        })
        setTimeout(() => {
            this.setState({
                onSubmitting: false
            })
        }, 2000);
    }

    /**
     * Renderer
     * @returns {XML}
     */

    render() {
        return (
            <View style={[styleBase.container]}>
                <View style={[styleBase.container, styleBase.p_md_vertical, styleBase.p_md_horizontal]}>
                    <View style={[styleBase.center]}>
                        <Text style={[styleBase.fontRubik, styleBase.title]}>
                            THÔNG TIN ĐIỂM BÁN HÀNG
                        </Text>
                        <View style={[customStyles.formWidth, styleBase.m_md_vertical]}>
                            <KeyboardAwareScrollView>
                                {this.formData.map((form, index) => {
                                    return (
                                        <View key={index} style={[customStyles.inputGroup, styleBase.m_md_vertical, styleBase.alignCenter]}>
                                            <View style={[customStyles.label]}>
                                                <Text style={[styleBase.fontRubik,
                                                    styleBase.fontBold, styleBase.font16]}>
                                                    {form.label}
                                                </Text>
                                            </View>
                                            <View style={[customStyles.inputWrapper]}>
                                                <TextInput
                                                    secureTextEntry={form.type === 'password'}
                                                    value={this.state[form.value]}
                                                    onChangeText={(text) => this.handleChangeText(text, form)}
                                                    style={[customStyles.input, this.state[`error-${form.value}`]]}
                                                    placeholder={form.label}/>
                                            </View>
                                        </View>
                                    )
                                })}
                                <View style={[styleBase.row, styleBase.p_md_vertical]}>
                                    <SubmitButton onPress={this.handlePressUpdate}/>
                                    <View style={[styleBase.m_md_horizontal]}/>
                                    {this.props.user.status === 'activate' &&
                                    <DeactivateButton onPress={() => this.handlePressDeactivate(true)}
                                                      buttonText="NGƯNG HOẠT ĐỘNG"
                                                      bg={customStyles.red}
                                                      confirmBg="red"
                                                      onSubmitting={this.state.onSubmitting}
                                    />
                                    }
                                    {
                                        this.props.user.status === 'deactivate' &&
                                        <DeactivateButton onPress={() => this.handlePressDeactivate(false)}
                                                          buttonText="TÁI HOẠT ĐỘNG"
                                                          bg={customStyles.bgGreen}
                                                          confirmBg="#55db55"
                                                          onSubmitting={this.state.onSubmitting}
                                        />
                                    }
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const SubmitButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styleBase.row,
            styleBase.bgBlack, styleBase.center, styleBase.p_md_vertical, styleBase.p_md_horizontal]}>
            <Text style={[styleBase.fontRubik, styleBase.textWhite, styleBase.title]}>
                CẬP NHẬT
            </Text>
        </TouchableOpacity>
    )
}

const DeactivateButton = (props) => {
    let backgroundColor = props.onSubmitting ? {backgroundColor: props.confirmBg} : props.bg

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styleBase.row, backgroundColor, styleBase.center,
            styleBase.p_md_vertical, styleBase.p_md_horizontal,]}>
            <Text style={[styleBase.fontRubik, styleBase.textWhite, styleBase.title]}>
                {props.onSubmitting ? `XÁC NHẬN` : props.buttonText}
            </Text>
        </TouchableOpacity>
    )
}

POSInfo.propTypes = {
    user: PropTypes.object
};

POSInfo.defaultProps = {
    user: null
};

export default POSInfo;