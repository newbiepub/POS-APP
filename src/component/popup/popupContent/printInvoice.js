import React from "react";
import {View, Dimensions, Alert} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextInputNormal, TextNormal} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {closePopup} from '../../popup/popupAction';
import {issueRefund} from '../../../feature/transaction/transactionAction';
import {normalizeProductItemsIssueRefund,} from '../../../reuseable/function/normalizeData';
import {returnInventoryLocal} from '../../listProduct/productAction';
import {client} from '../../../root';
import {MUTATION} from "../../../constant/mutation";

class PrintInvoice extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
            email: ""
        }

    }

    componentDidMount() {
        Dimensions.addEventListener("change", () => {
            let {width, height} = Dimensions.get('window');
            this.setState({
                width,
                height
            })
        })
    }

    onIssueRefund() {
        if (this.state.email === "") {
            Alert.alert(
                'Thông báo !',
                'Bạn phải nhập email !',
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ],
                {cancelable: false})
        }
        else if (this.state.email && (new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm)).test(this.state.email)) {
            Alert.alert(
                'Thông báo !',
                'Bạn có muốn thực hiện gởi hoá đơn này ?',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'Có', onPress: async () => {
                            try {
                                console.warn(this.props.transaction)
                                const invoice = await client.mutate({
                                    mutation: MUTATION.SEND_INVOICE_EMAIL,
                                    variables: {
                                        transaction: this.props.transaction,
                                        email: this.state.email
                                    }
                                });
                                this.props.closePopup()
                            } catch (e) {
                                Alert.alert(
                                    'Thông báo !',
                                    'Đã có lỗi khi gởi email, vui lòng kiểm trại lại kết nối và thực hiện lại!',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                            }
                                        },
                                    ],
                                    {cancelable: false})
                            }
                        }
                    },
                ],
                {cancelable: false}
            )

        } else {
            Alert.alert(
                'Thông báo !',
                'Bạn phải nhập đúng email !',
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ],
                {cancelable: false})
        }

    }

    render() {
        //  console.warn(normalizeProductItemsInput(this.props.productItems));
        return (
            <View style={style.container}>
                <PopupHeader
                    title={"In hoá đơn"}
                    submitFunction={() => {
                        this.onIssueRefund()
                    }}
                    buttonText={"Gởi"}/>
                <View style={[style.body, style.container]}>
                    <TextNormal style={[style.spaceLine]}>Nhập địa chỉ email:</TextNormal>
                    <TextInputNormal multiline={true} value={this.state.email}
                                     onChangeText={(text) => this.setState({email: text.toLowerCase()})}
                                     placeholder={"Email"}/>
                </View>
            </View>
        )
    }
}

const style = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constantStyle.color2
    },
    spaceLine: {
        marginBottom: constantStyle.lg
    },
    body: {
        padding: constantStyle.headerHeight
    },
    titlePrice: {
        marginBottom: constantStyle.paddingHorizontal
    },
    priceHint: {
        color: 'gray',
        marginLeft: constantStyle.marginVerticalNormal
    },
    paymentMethodItem: {
        padding: constantStyle.paddingHorizontal,
        flexDirection: 'row',
        alignItems: 'center'
    },
    paymentMethodRadioButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        width: constantStyle.sizeNormal,
        height: constantStyle.sizeNormal,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentMethodRadioButtonChecked: {
        borderRadius: 50,
        backgroundColor: constantStyle.color1,
        width: constantStyle.sizeSmall,
        height: constantStyle.sizeSmall,
    },
    description: {},
    '@media (min-width: 768) and (max-width: 1024)': {},
    '@media (min-width: 1024)': {}
});
const mapDispatchToProps = {
    closePopup,
    issueRefund,
    returnInventoryLocal
};
export default connect(null, mapDispatchToProps)(PrintInvoice);