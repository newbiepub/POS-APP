import React from "react";
import {ScrollView, View, TouchableWithoutFeedback, Dimensions, FlatList, Alert} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import {TextLarge, TextNormal, TextSmall, TextInputNumber, TextInputPriceMask, TextInputNormal} from '../../text';
import {constantStyle} from '../../../style/base';
import {connect} from 'react-redux';
import PopupHeader from './_popupHeader';
import {closePopup} from '../../popup/popupAction';
import {numberwithThousandsSeparator, removeTypeName} from "../../../reuseable/function/function";
import {graphql, compose} from 'react-apollo';
import {QUERY} from '../../../constant/query';
import {MUTATION, FRAGMENT} from '../../../constant/mutation';
import {Navigator} from "react-native-deprecated-custom-components";
import Moment from '../../moment';
import {normalizeProductItemsIssueRefund,} from '../../../reuseable/function/normalizeData';
import MyDatePicker from '../../datePicker/datePicker';
import ListProduct from '../../listProduct/listProduct';
import LoadingOverlay from '../../loadingOverlay';
import {clearCart} from '../../cart/cartAction';
import _ from 'lodash';
import {client} from '../../../root';
import gql from 'graphql-tag';

class IssueRefund extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get('window');
        this.chargeProgressing = null;
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
                        this.props.issueRefund(
                            {
                                variables: {
                                    _id: this.props.id,
                                    issueRefundReason: this.state.reason,
                                    refundDate: new Date(),
                                    productItems: normalizeProductItemsIssueRefund(this.props.productItems)
                                }
                            }
                        );
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
    closePopup
}
const IssueRefundApollo = compose(
    graphql(MUTATION.ISSUE_REFUND, {name: 'issueRefund'})
)(IssueRefund);
export default connect(null, mapDispatchToProps)(IssueRefundApollo);