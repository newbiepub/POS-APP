import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import styleBase from "../../../../styles/base";
import POSInfo from "../component/info";

class POSSettingContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <POSInfo user={this.props.user} navigator={this.props.navigator}/>
            </View>
        )
    }
}

POSSettingContainer.propTypes = {
    user: PropTypes.object
};

POSSettingContainer.defaultProps = {
    user: null
};

export default POSSettingContainer;