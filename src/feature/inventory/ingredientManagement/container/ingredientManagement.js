import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Image, View, TouchableOpacity, SafeAreaView} from "react-native";
import styleBase from "../../../../styles/base";
import CommingSoon from "../../../../component/commingSoon/commingSoon";
import NavBar from "../../../../component/navbar/navbar";

class IngredientManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={[styleBase.container]}>
                <NavBar title={this.props.title.toUpperCase()} navigator={this.props.navigator}/>
                <CommingSoon/>
            </SafeAreaView>
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