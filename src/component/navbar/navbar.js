import React from "react";
import {NavigationBar, Icon, Title, TouchableOpacity, DropDownMenu} from "@shoutem/ui";
import PropTypes from "prop-types";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCenterComponent() {
        return (
            <Title>
                {this.props.title}
            </Title>
        )
    }

    renderLeftComponent() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigator.pop()}
            >
                <Icon name="back"/>
            </TouchableOpacity>
        )
    }

    renderRightComponent() {
        return this.props.renderRightComponent();
    }

    render() {
        return (
            <NavigationBar
                style={{container: {paddingHorizontal: 15}}}
                styleName="inline"
                centerComponent={this.renderCenterComponent()}
                leftComponent={this.renderLeftComponent()}
                rightComponent={this.renderRightComponent()}
            />
        )
    }
}

NavBar.propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object,
    renderRightComponent: PropTypes.func
};

NavBar.defaultProps = {
    title: "",
    navigator: null,
    renderRightComponent: () => {}
};

export default NavBar;