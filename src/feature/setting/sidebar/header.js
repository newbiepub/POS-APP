import React from "react";
import PropTypes from "prop-types";
import {View, TouchableOpacity, Text, InteractionManager} from "react-native";
import styleBase from "../../../styles/base";
import Ionicons from "react-native-vector-icons/Ionicons";

class SidebarHeader extends React.Component {
    constructor(props) {
        super(props);

        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    handleToggleSidebar() {
        this.props.handleToggleSidebar();
    }

    render() {
        return (
            <View style={[styleBase.row, styleBase.panelHeader,{height: 60}]}>
                {
                    this.props.toggle &&
                    <HeaderTitle title={this.props.title}/>
                }
                <View style={[styleBase.row, styleBase.grow,
                    styleBase.borderButton,
                    styleBase.alignCenter,
                    {justifyContent: 'flex-end'}]}>
                    <TouchableOpacity onPress={this.handleToggleSidebar}>
                        {this.props.toggle
                            ?
                            <Ionicons name="ios-close" style={[styleBase.fontIcon, styleBase.textWhite]}/>
                            :
                            <Ionicons name="ios-menu" style={[styleBase.fontIcon, styleBase.textWhite]}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class HeaderTitle extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount (){
        setTimeout(() => {
            this.setState({visible: true})
        },200)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.visible &&
                <View style={[styleBase.row, styleBase.alignCenter]}>
                    <Text style={[styleBase.text4, styleBase.title, styleBase.textWhite]}>
                        {this.props.title}
                    </Text>
                </View>}
            </React.Fragment>
        )
    }
}

SidebarHeader.propTypes = {
    toggle: PropTypes.bool,
    title: PropTypes.string,
    handleToggleSidebar: PropTypes.func,
};

SidebarHeader.defaultProps = {
    toggle: true,
    title: '',
    handleToggleSidebar: () => {},
};

export default SidebarHeader;