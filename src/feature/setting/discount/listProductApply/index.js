import React from "react";
import PropTypes from "prop-types";
import {View} from "react-native";
import styleBase from "../../../../styles/base";

class ListProductApply extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container, styleBase.bgWhite]}>

            </View>
        )
    }
}

ListProductApply.propTypes = {};

ListProductApply.defaultProps = {};

export default ListProductApply;