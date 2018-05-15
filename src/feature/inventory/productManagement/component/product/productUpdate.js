import React from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import styleBase from "../../../../../styles/base";
import {closePopup} from "../../../../../component/popup/actions/popupAction";
import EStyleSheet from "react-native-extended-stylesheet";

const modalStyle = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    },
})

class ProductUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    }

    handleUpdateProduct() {

    }

    render() {
        return (
            <View style={[styleBase.fillParent, styleBase.center]}>
                <TouchableWithoutFeedback onPress={closePopup}>
                    <View style={[styleBase.fillParent, styleBase.overlay]}/>
                </TouchableWithoutFeedback>
                <View style={[modalStyle.listContainer, styleBase.shadowBox]}>
                    <ListHeader
                        onSubmit={this.handleUpdateProduct}/>

                </View>
            </View>
        )
    }
}

const ListHeader = (props) => {
    return (
        <View style={[styleBase.panelHeader, styleBase.row, styleBase.alignCenter, styleBase.spaceBetween, {
            height: 65, padding: 0
        }]}>
            <View>
                <Text style={[styleBase.text4, styleBase.title, styleBase.p_md_horizontal, styleBase.p_md_vertical]}>
                    CẬP NHẬT MẶT HÀNG
                </Text>
            </View>
            <TouchableOpacity
                onPress={props.onSubmit}
                style={[styleBase.p_md_horizontal, styleBase.bgBlue,
                    styleBase.p_md_vertical, styleBase.center, styleBase.row]}>
                <Text style={[styleBase.fontRubik, styleBase.title, styleBase.textWhite]}>
                    {`CẬP NHẬT`}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

ProductUpdate.propTypes = {};

ProductUpdate.defaultProps = {};

export default ProductUpdate;