import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import styleBase from "../../../../../styles/base";
import RequestOrderList from "../component/list";

class OrderRequestContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.bgWhite]}>
                <RequestOrderList navigator={this.props.navigator}/>
            </View>
        )
    }
}

OrderRequestContainer.propTypes = {};

OrderRequestContainer.defaultProps = {};

export default OrderRequestContainer;