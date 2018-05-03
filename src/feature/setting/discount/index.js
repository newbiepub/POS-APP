import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import styleBase from "../../../styles/base";
import DiscountInput from "./discountInput/index";

class Discount extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.bgWhite]}>
                <DiscountInput/>
            </View>
        )
    }
}

Discount.propTypes = {};

Discount.defaultProps = {};

export default Discount;