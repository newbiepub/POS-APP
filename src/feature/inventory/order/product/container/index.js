import React from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text, TouchableWithoutFeedback} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import styleBase from "../../../../../styles/base";
import {closePopup} from "../../../../../component/popup/actions/popupAction";
import OrderProductList from "../component/list";

const modalStyles = EStyleSheet.create({
    listContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff'
    },
})

class OrderProductContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.center, styleBase.fillParent]}>
                <TouchableWithoutFeedback onPress={closePopup}>
                    <View style={[styleBase.fillParent, styleBase.overlay]}/>
                </TouchableWithoutFeedback>
                <View style={[modalStyles.listContainer, styleBase.shadowBox]}>
                    <OrderProductList
                        employeeId={this.props.employeeId}
                        activityId={this.props.activityId}
                        products={this.props.products}/>
                </View>
            </View>
        )
    }
}

OrderProductContainer.propTypes = {
    employeeId: PropTypes.string,
    activityId: PropTypes.string,
    products: PropTypes.array,

};

OrderProductContainer.defaultProps = {
    employeeId: "",
    activityId: "",
    products: []
};

export default OrderProductContainer;