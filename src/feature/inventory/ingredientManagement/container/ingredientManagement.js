import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Image, View, TouchableOpacity} from "react-native";
import styleBase from "../../../../styles/base";
import CommingSoon from "../../../../component/commingSoon/commingSoon";

class IngredientManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styleBase.container]}>
                <CommingSoon/>
            </View>
        )
    }
}

IngredientManagement.propTypes = {
    title: PropTypes.string
};

IngredientManagement.defaultProps = {
    title: ""
};

export default IngredientManagement