import React from "react";
import {View, TouchableOpacity, Text} from "react-native";
import PropTypes from "prop-types";
import styleBase from "../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCenterComponent() {
        let centerComponent = (
            <Text style={[styleBase.title, styleBase.fontRubik]}>
                {this.props.title}
            </Text>
        )

        if(this.props.renderCenterComponent) {
            centerComponent = this.props.renderCenterComponent();
        }

        return centerComponent;
    }

    renderLeftComponent() {
        let leftComponent = (
            <TouchableOpacity
                onPress={() => this.props.navigator.pop()}
            >
                <Ionicons name="ios-arrow-round-back" style={{fontSize: 40}}/>
            </TouchableOpacity>
        )
        if(this.props.renderLeftComponent) {
            leftComponent = this.props.renderLeftComponent();
        }
        return leftComponent;
    }

    renderRightComponent() {
        return this.props.renderRightComponent();
    }

    render() {
        return (
            <View style={[
                styleBase.row,
                styleBase.nav,
                styleBase.p_md_horizontal,
                styleBase.spaceBetween,
                styleBase.alignCenter,
                styleBase.panelHeader
            ]}>
                <View style={[{flex: 0.33}]}>
                    {this.renderLeftComponent()}
                </View>
                <View style={[{flex: 0.33}, styleBase.center]}>
                    {this.renderCenterComponent()}
                </View>
                <View style={[{flex: 0.33, justifyContent: 'flex-end'}, styleBase.row]}>
                    {this.renderRightComponent()}
                </View>
            </View>
        )
    }
}

NavBar.propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object,
    renderRightComponent: PropTypes.func,
    renderLeftComponent: PropTypes.func,
    renderCenterComponent: PropTypes.func,
};

NavBar.defaultProps = {
    title: "",
    navigator: null,
    renderRightComponent: () => {},
    renderLeftComponent: null,
    renderCenterComponent: null
};

export default NavBar;