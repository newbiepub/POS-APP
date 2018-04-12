import React from "react";
import {View, Dimensions, Alert} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextInputNormal,TextNormal} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {closePopup} from '../../popup/popupAction';
import {issueRefund} from '../../../feature/transaction/transactionAction';
import {normalizeProductItemsIssueRefund,} from '../../../reuseable/function/normalizeData';

class IssueRefund extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.state = {
            width,
            height,
            reason: ""
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
        if (this.state.reason === "") {
            Alert.alert(
                'Thông báo !',
                'Bạn phải nhập lý do hoàn trả',
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ],
                {cancelable: false})
        } else {
            Alert.alert(
                'Thông báo !',
                'Bạn có muốn thực hiện hoàn trả này ?',
                [
                    {text: 'Không', style: 'cancel'},
                    {
                        text: 'Có', onPress: () => {
                            this.props.issueRefund(this.props.transaction, this.state.reason,normalizeProductItemsIssueRefund(this.props.transaction.productItems));
                            this.props.closePopup()
                        }
                    },
                ],
                {cancelable: false}
            )

        }

    }

    render() {
        //  console.warn(normalizeProductItemsInput(this.props.productItems));
        return (
            <View style={style.container}>
                <PopupHeader
                    title={"Xác nhận trả hàng"}
                    submitFunction={() => {
                        this.onIssueRefund()
                    }}
                    buttonText={"Trả hàng"}/>
                <View style={[style.body, style.container]}>
                    <TextNormal style={[style.spaceLine]}>Lý do trả hàng:</TextNormal>
                    <TextInputNormal multiline={true} value={this.state.reason}
                                     onChangeText={(text) => this.setState({reason: text})} placeholder={"ghi chú"}/>
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
    issueRefund
}
export default connect(null, mapDispatchToProps)(IssueRefund);