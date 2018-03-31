import React from "react";
import {View, Screen, NavigationBar, Title, TouchableOpacity, Icon} from "@shoutem/ui"
import PropTypes from "prop-types";
import {StyleSheet, Image} from "react-native";
import styleBase from "../../../../styles/base";
import CommingSoon from "../../../../component/commingSoon/commingSoon";

class IngredientManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Left Component
     * @returns {XML}
     */
    renderCenter() {
        return (
            <Title>
                {this.props.title.toUpperCase()}
            </Title>
        )
    }

    renderLeft() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigator.pop()}
            >
                <Icon name="back"/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Screen styleName="paper">
                <NavigationBar
                    style={{container: {paddingHorizontal: 15}}}
                    styleName="inline"
                    centerComponent={this.renderCenter()}
                    leftComponent={this.renderLeft()}
                />
                <CommingSoon/>
            </Screen>
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