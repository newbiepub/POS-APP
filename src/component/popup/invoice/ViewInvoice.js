import React from "react";
import {Text, TouchableOpacity, View, WebView, Alert} from "react-native";
import styleBase from "../../style/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "../../momentJs";
import {closePopup} from "../../../action/popup";
import {connect} from "react-redux";
import {deleteInvoice, getInvoice} from "../../../action/invoice";
import LoadingOverlay from "../../loadingOverlay/loadingOverlay";

class ViewInvoice extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        invoice: React.PropTypes.object
    };

    static defaultProps = {
        invoice: {}
    };

    async submitDelete() {
        try {
            let { loadingOverlay } = this.refs;
            loadingOverlay.setLoading();
            await deleteInvoice(this.props.invoice);
            Alert.alert("Thành Công", "Đã xoá hoá đơn", [
                {text: "OK", onPress: async () => {
                    this.props.closePopup();
                    await getInvoice()
                }}
            ]);
            loadingOverlay.stopLoading();
        } catch(e) {
            alert(e);
        }
    }

    onDeleteItem() {
        Alert.alert("Cảnh Báo", "Bạn có muốn xoá hoá đơn này?", [
            {
                text: "Có", onPress: () => this.submitDelete()
            },
            {
                text: "Không", style: "cancel"
            }
        ])
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <ModalHeader instance={this} onDeleteItem={this.onDeleteItem.bind(this)} invoice={this.props.invoice} {...this.props}/>
                <View style={[styleBase.row]}>
                    <TouchableOpacity style={[styleBase.center,
                        {flex: 0.5, paddingVertical: 10, marginHorizontal: 20, marginVertical: 15}, styleBase.background2]}>
                        <Text style={[styleBase.font16, styleBase.textWhite]}>
                            In Hoá Đơn
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styleBase.center,
                        {flex: 0.5, paddingVertical: 10, marginHorizontal: 20, marginVertical: 15}, styleBase.background2]}>
                        <Text style={[styleBase.font16, styleBase.textWhite]}>
                            Gửi E-Mail cho khách hàng
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styleBase.grow]}>
                    <WebView
                        style={[styleBase.fillParent]}
                        source={{html: this.props.invoice.invoiceContent}}
                    />
                </View>
                <LoadingOverlay ref="loadingOverlay"/>
            </View>
        )
    }
}

class ModalHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        instance: React.PropTypes.object,
        onDeleteItem: React.PropTypes.func,
        invoice: React.PropTypes.object
    };

    static defaultProps = {
        onDeleteItem: () => {
        },
        invoice: {}
    };

    onDeleteItem() {
        this.props.onDeleteItem();
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
                        {moment(this.props.invoice.createdAt).format("dddd, DD/MM/YYYY, h:mm:ss a")}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={this.onDeleteItem.bind(this)}
                    style={[{
                        flex: 0.2,
                        paddingVertical: 10,
                        paddingHorizontal: 15
                    }, styleBase.backgroundError, styleBase.center]}>
                    <Text style={[styleBase.textWhite, styleBase.font18, {backgroundColor: "transparent"}]}>
                        Xoá
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapDispatchToProps = {
    closePopup
};

export default connect(null, mapDispatchToProps) (ViewInvoice);
